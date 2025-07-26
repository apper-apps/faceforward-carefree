import React, { useRef, useEffect, useState } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const ImageCanvas = ({ 
  image, 
  adjustments, 
  background, 
  filter, 
  cropData,
  onImageLoad,
  className 
}) => {
  const canvasRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (!image || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      // Set canvas size
      canvas.width = 400;
      canvas.height = 400;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Apply background
      if (background) {
        if (background.startsWith('#')) {
          ctx.fillStyle = background;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        } else if (background.includes('gradient')) {
          const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
          if (background.includes('blue')) {
            gradient.addColorStop(0, '#3b82f6');
            gradient.addColorStop(1, '#1e40af');
          } else if (background.includes('purple')) {
            gradient.addColorStop(0, '#8b5cf6');
            gradient.addColorStop(1, '#7c3aed');
          } else {
            gradient.addColorStop(0, '#6b7280');
            gradient.addColorStop(1, '#374151');
          }
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
      } else {
        // Default white background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Calculate image dimensions to fit canvas
      const aspectRatio = img.width / img.height;
      let drawWidth, drawHeight, offsetX, offsetY;

      if (aspectRatio > 1) {
        // Landscape
        drawHeight = canvas.height;
        drawWidth = drawHeight * aspectRatio;
        offsetX = (canvas.width - drawWidth) / 2;
        offsetY = 0;
      } else {
        // Portrait or square
        drawWidth = canvas.width;
        drawHeight = drawWidth / aspectRatio;
        offsetX = 0;
        offsetY = (canvas.height - drawHeight) / 2;
      }

      // Apply crop if specified
      if (cropData) {
        const { x, y, width, height } = cropData;
        ctx.drawImage(
          img,
          x, y, width, height,
          offsetX, offsetY, drawWidth, drawHeight
        );
      } else {
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      }

      // Apply adjustments
      if (adjustments) {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        const brightness = (adjustments.brightness - 50) * 2;
        const contrast = adjustments.contrast / 50;
        const saturation = adjustments.saturation / 50;

        for (let i = 0; i < data.length; i += 4) {
          // Brightness
          data[i] += brightness;     // Red
          data[i + 1] += brightness; // Green
          data[i + 2] += brightness; // Blue

          // Contrast
          data[i] = ((data[i] - 128) * contrast) + 128;
          data[i + 1] = ((data[i + 1] - 128) * contrast) + 128;
          data[i + 2] = ((data[i + 2] - 128) * contrast) + 128;

          // Saturation (simplified)
          const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
          data[i] = gray + saturation * (data[i] - gray);
          data[i + 1] = gray + saturation * (data[i + 1] - gray);
          data[i + 2] = gray + saturation * (data[i + 2] - gray);

          // Clamp values
          data[i] = Math.max(0, Math.min(255, data[i]));
          data[i + 1] = Math.max(0, Math.min(255, data[i + 1]));
          data[i + 2] = Math.max(0, Math.min(255, data[i + 2]));
        }

        ctx.putImageData(imageData, 0, 0);
      }

      // Apply filters
      if (filter && filter !== 'none') {
        switch (filter) {
          case 'bw':
            ctx.filter = 'grayscale(100%)';
            break;
          case 'warm':
            ctx.filter = 'sepia(30%) saturate(1.2) hue-rotate(10deg)';
            break;
          case 'cool':
            ctx.filter = 'saturate(1.1) hue-rotate(-10deg) brightness(1.1)';
            break;
          case 'professional':
            ctx.filter = 'contrast(1.1) saturate(0.9) brightness(1.05)';
            break;
          default:
            ctx.filter = 'none';
        }
        
        // Redraw with filter
        if (ctx.filter !== 'none') {
          const tempCanvas = document.createElement('canvas');
          const tempCtx = tempCanvas.getContext('2d');
          tempCanvas.width = canvas.width;
          tempCanvas.height = canvas.height;
          tempCtx.drawImage(canvas, 0, 0);
          
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(tempCanvas, 0, 0);
          ctx.filter = 'none';
        }
      }

      setImageLoaded(true);
      if (onImageLoad) onImageLoad();
    };

    img.src = image;
  }, [image, adjustments, background, filter, cropData, onImageLoad]);

  if (!image) {
    return (
      <div className={cn(
        "flex items-center justify-center bg-slate-100 rounded-xl border-2 border-dashed border-slate-300",
        "w-full h-[400px] canvas-container",
        className
      )}>
        <div className="text-center space-y-3">
          <div className="w-16 h-16 bg-gradient-to-br from-slate-300 to-slate-400 rounded-full flex items-center justify-center mx-auto">
            <ApperIcon name="Image" className="w-8 h-8 text-white" />
          </div>
          <p className="text-slate-500 font-medium">No image selected</p>
          <p className="text-sm text-slate-400">Upload a photo to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      "canvas-container rounded-xl p-4 bg-grid",
      className
    )}>
      <canvas
        ref={canvasRef}
        className="w-full h-auto rounded-lg shadow-lg max-w-full"
        style={{ maxHeight: '400px', objectFit: 'contain' }}
      />
      {!imageLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-xl">
          <div className="text-center space-y-2">
            <div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full mx-auto"></div>
            <p className="text-sm text-slate-600">Processing image...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageCanvas;