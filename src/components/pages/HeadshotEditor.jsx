import React, { useState, useRef, useCallback } from "react";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import UploadZone from "@/components/molecules/UploadZone";
import ImageCanvas from "@/components/organisms/ImageCanvas";
import AdjustmentPanel from "@/components/organisms/AdjustmentPanel";
import BackgroundSelector from "@/components/organisms/BackgroundSelector";
import FilterPanel from "@/components/organisms/FilterPanel";
import ExportModal from "@/components/organisms/ExportModal";
import ApperIcon from "@/components/ApperIcon";

const HeadshotEditor = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const canvasRef = useRef(null);

  const [adjustments, setAdjustments] = useState({
    brightness: 50,
    contrast: 50,
    saturation: 50
  });

  const [selectedBackground, setSelectedBackground] = useState('#ffffff');
  const [selectedFilter, setSelectedFilter] = useState('none');

  const backgrounds = [
    { id: 1, name: "White", value: '#ffffff', preview: '#ffffff' },
    { id: 2, name: "Light Gray", value: '#f8fafc', preview: '#f8fafc' },
    { id: 3, name: "Blue Gradient", value: 'linear-gradient(135deg, #3b82f6, #1e40af)', preview: 'linear-gradient(135deg, #3b82f6, #1e40af)' },
    { id: 4, name: "Purple Gradient", value: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', preview: 'linear-gradient(135deg, #8b5cf6, #7c3aed)' },
    { id: 5, name: "Gray Gradient", value: 'linear-gradient(135deg, #6b7280, #374151)', preview: 'linear-gradient(135deg, #6b7280, #374151)' },
    { id: 6, name: "Navy", value: '#1e3a8a', preview: '#1e3a8a' }
  ];

  const filters = [
    { id: 1, name: "None", value: 'none', preview: '/api/placeholder/100/100' },
    { id: 2, name: "Professional", value: 'professional', preview: '/api/placeholder/100/100' },
    { id: 3, name: "Warm", value: 'warm', preview: '/api/placeholder/100/100' },
    { id: 4, name: "Cool", value: 'cool', preview: '/api/placeholder/100/100' },
    { id: 5, name: "B&W", value: 'bw', preview: '/api/placeholder/100/100' }
  ];

  const handleFileSelect = useCallback((file) => {
    if (file && file.type.startsWith('image/')) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File size must be less than 10MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
        toast.success("Image uploaded successfully!");
      };
      reader.readAsDataURL(file);
    } else {
      toast.error("Please select a valid image file");
    }
  }, []);

  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    setIsDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragActive(false);
  }, []);

  const handleReset = () => {
    setSelectedImage(null);
    setAdjustments({ brightness: 50, contrast: 50, saturation: 50 });
    setSelectedBackground('#ffffff');
    setSelectedFilter('none');
    toast.info("Editor reset successfully");
  };

  const handleOneClickEnhance = () => {
    setAdjustments({
      brightness: 55,
      contrast: 60,
      saturation: 45
    });
    setSelectedFilter('professional');
    toast.success("Auto-enhancement applied!");
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold gradient-text font-display">
            Transform Your Photo into a Professional Headshot
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Upload your casual photo and let our AI-powered tools create the perfect professional headshot for LinkedIn, resumes, and business profiles.
          </p>
        </div>
        
        {selectedImage && (
          <div className="flex justify-center space-x-4">
            <Button
              variant="outline"
              size="md"
              onClick={handleOneClickEnhance}
            >
              <ApperIcon name="Sparkles" className="w-4 h-4 mr-2" />
              Auto Enhance
            </Button>
            <Button
              variant="secondary"
              size="md"
              onClick={handleReset}
            >
              <ApperIcon name="RotateCcw" className="w-4 h-4 mr-2" />
              Reset
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={() => setIsExportModalOpen(true)}
              disabled={!selectedImage}
            >
              <ApperIcon name="Download" className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        )}
      </div>

      {/* Main Editor */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Canvas Area */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            {!selectedImage ? (
              <div
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                className="relative"
              >
                <UploadZone
                  onFileSelect={handleFileSelect}
                  isDragActive={isDragActive}
                  className="min-h-[400px]"
                />
              </div>
            ) : (
              <ImageCanvas
                ref={canvasRef}
                image={selectedImage}
                adjustments={adjustments}
                background={selectedBackground}
                filter={selectedFilter}
                className="relative"
              />
            )}
          </Card>

          {selectedImage && (
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="p-4">
                <div className="flex items-center space-x-3 mb-4">
                  <ApperIcon name="Info" className="w-5 h-5 text-blue-500" />
                  <h3 className="font-semibold text-slate-700">Quick Tips</h3>
                </div>
                <ul className="text-sm text-slate-600 space-y-2">
                  <li>• Use good lighting for best results</li>
                  <li>• Face the camera directly</li>
                  <li>• Keep a professional expression</li>
                  <li>• Ensure your face takes up most of the frame</li>
                </ul>
              </Card>

              <Card className="p-4">
                <div className="flex items-center space-x-3 mb-4">
                  <ApperIcon name="Target" className="w-5 h-5 text-green-500" />
                  <h3 className="font-semibold text-slate-700">Best Practices</h3>
                </div>
                <ul className="text-sm text-slate-600 space-y-2">
                  <li>• Choose neutral backgrounds</li>
                  <li>• Apply subtle enhancements</li>
                  <li>• Match your industry standards</li>
                  <li>• Test different formats</li>
                </ul>
              </Card>
            </div>
          )}
        </div>

        {/* Controls Panel */}
        <div className="space-y-6">
          {selectedImage && (
            <>
              <AdjustmentPanel
                adjustments={adjustments}
                onAdjustmentChange={setAdjustments}
              />

              <BackgroundSelector
                selectedBackground={selectedBackground}
                onBackgroundChange={setSelectedBackground}
                backgrounds={backgrounds}
              />

              <FilterPanel
                selectedFilter={selectedFilter}
                onFilterChange={setSelectedFilter}
                filters={filters}
                currentImage={selectedImage}
              />
            </>
          )}

          {!selectedImage && (
            <Card className="p-6 space-y-4">
              <div className="flex items-center space-x-3">
                <ApperIcon name="Camera" className="w-6 h-6 text-primary-500" />
                <h3 className="text-lg font-semibold text-slate-800">Getting Started</h3>
              </div>
              <div className="space-y-3 text-sm text-slate-600">
                <p>1. Upload your photo using the area on the left</p>
                <p>2. Adjust brightness, contrast, and saturation</p>
                <p>3. Choose a professional background</p>
                <p>4. Apply filters for the perfect look</p>
                <p>5. Download in your preferred size and format</p>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Export Modal */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        canvasRef={{ current: document.querySelector('canvas') }}
      />
    </div>
  );
};

export default HeadshotEditor;