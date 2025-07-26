import React, { useCallback } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const UploadZone = ({ onFileSelect, isDragActive, className }) => {
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0 && files[0].type.startsWith('image/')) {
      onFileSelect(files[0]);
    }
  }, [onFileSelect]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
  }, []);

  const handleFileInput = useCallback((e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      onFileSelect(files[0]);
    }
  }, [onFileSelect]);

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className={cn(
        "relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300",
        isDragActive 
          ? "border-primary-500 bg-primary-50 drag-overlay" 
          : "border-slate-300 hover:border-primary-400 hover:bg-slate-50",
        className
      )}
    >
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
          <ApperIcon name="Upload" className="w-8 h-8 text-white" />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-slate-700">
            {isDragActive ? "Drop your photo here" : "Upload your photo"}
          </h3>
          <p className="text-sm text-slate-500">
            Drag and drop or click to select a photo
          </p>
          <p className="text-xs text-slate-400">
            Supports JPG, PNG, and WEBP up to 10MB
          </p>
        </div>

        <label className="cursor-pointer">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
          />
          <div className="px-6 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 shadow-lg hover:shadow-xl">
            Choose File
          </div>
        </label>
      </div>
    </div>
  );
};

export default UploadZone;