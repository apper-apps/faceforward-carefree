import { useState, useCallback } from "react";
import { photoService } from "@/services/api/photoService";
import { toast } from "react-toastify";

export const useImageProcessor = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedImage, setProcessedImage] = useState(null);
  const [error, setError] = useState(null);

  const processImage = useCallback(async (imageData, adjustments) => {
    setIsProcessing(true);
    setError(null);
    
    try {
      const result = await photoService.processImage(imageData, adjustments);
      setProcessedImage(result);
      return result;
    } catch (err) {
      const errorMessage = err.message || "Failed to process image";
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const applyBackground = useCallback(async (imageData, background) => {
    setIsProcessing(true);
    setError(null);
    
    try {
      const result = await photoService.applyBackground(imageData, background);
      setProcessedImage(prev => ({ ...prev, background: result.background }));
      return result;
    } catch (err) {
      const errorMessage = err.message || "Failed to apply background";
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const applyFilter = useCallback(async (imageData, filter) => {
    setIsProcessing(true);
    setError(null);
    
    try {
      const result = await photoService.applyFilter(imageData, filter);
      setProcessedImage(prev => ({ ...prev, filter: result.filter }));
      return result;
    } catch (err) {
      const errorMessage = err.message || "Failed to apply filter";
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const reset = useCallback(() => {
    setProcessedImage(null);
    setError(null);
    setIsProcessing(false);
  }, []);

const detectFaces = useCallback(async (imageElement) => {
    setIsProcessing(true);
    setError(null);
    
    try {
      // Load face-api.js models if not already loaded
      const { nets, detectAllFaces, SsdMobilenetv1Options } = await import('face-api.js');
      
      const MODEL_URL = '/models';
      
      // Load models (in production, serve these from public/models folder)
      if (!nets.ssdMobilenetv1.isLoaded) {
        await nets.ssdMobilenetv1.loadFromUri(MODEL_URL);
      }
      
      // Detect faces in the image
      const detections = await detectAllFaces(
        imageElement,
        new SsdMobilenetv1Options({ minConfidence: 0.5 })
      );
      
      return detections;
    } catch (err) {
      const errorMessage = err.message || "Failed to detect faces";
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const suggestCrop = useCallback(async (imageElement, imageWidth, imageHeight) => {
    try {
      const faces = await detectFaces(imageElement);
      
      if (faces.length === 0) {
        toast.info("No faces detected. Using center crop.");
        // Default center crop
        const size = Math.min(imageWidth, imageHeight);
        return {
          x: (imageWidth - size) / 2,
          y: (imageHeight - size) / 2,
          width: size,
          height: size
        };
      }
      
      // Find the largest face or group faces together
      let minX = imageWidth, minY = imageHeight, maxX = 0, maxY = 0;
      
      faces.forEach(face => {
        const box = face.detection.box;
        minX = Math.min(minX, box.x);
        minY = Math.min(minY, box.y);
        maxX = Math.max(maxX, box.x + box.width);
        maxY = Math.max(maxY, box.y + box.height);
      });
      
      // Add padding around faces (20% of face area)
      const faceWidth = maxX - minX;
      const faceHeight = maxY - minY;
      const padding = Math.max(faceWidth, faceHeight) * 0.2;
      
      // Calculate crop area
      const cropX = Math.max(0, minX - padding);
      const cropY = Math.max(0, minY - padding);
      const cropWidth = Math.min(imageWidth - cropX, faceWidth + padding * 2);
      const cropHeight = Math.min(imageHeight - cropY, faceHeight + padding * 2);
      
      // Make it square for headshot
      const size = Math.max(cropWidth, cropHeight);
      const finalX = Math.max(0, Math.min(cropX - (size - cropWidth) / 2, imageWidth - size));
      const finalY = Math.max(0, Math.min(cropY - (size - cropHeight) / 2, imageHeight - size));
      
      toast.success(`${faces.length} face${faces.length > 1 ? 's' : ''} detected. Crop suggested!`);
      
      return {
        x: finalX,
        y: finalY,
        width: Math.min(size, imageWidth - finalX),
        height: Math.min(size, imageHeight - finalY)
      };
    } catch (err) {
      // Fallback to center crop
      const size = Math.min(imageWidth, imageHeight);
      return {
        x: (imageWidth - size) / 2,
        y: (imageHeight - size) / 2,
        width: size,
        height: size
      };
    }
  }, [detectFaces]);

  return {
    isProcessing,
    processedImage,
    error,
    processImage,
    applyBackground,
    applyFilter,
    detectFaces,
    suggestCrop,
    reset
  };
};