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

  return {
    isProcessing,
    processedImage,
    error,
    processImage,
    applyBackground,
    applyFilter,
    reset
  };
};