import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import { toast } from "react-toastify";

const ExportModal = ({ isOpen, onClose, canvasRef }) => {
  const [selectedSize, setSelectedSize] = useState("linkedin");
  const [selectedFormat, setSelectedFormat] = useState("png");
  const [isExporting, setIsExporting] = useState(false);

  const exportSizes = [
    { id: "linkedin", name: "LinkedIn Profile", width: 400, height: 400, description: "Square format" },
    { id: "resume", name: "Resume Photo", width: 300, height: 400, description: "3:4 ratio" },
    { id: "passport", name: "Passport Size", width: 300, height: 300, description: "Square format" },
    { id: "email", name: "Email Signature", width: 200, height: 200, description: "Small square" }
  ];

  const formats = [
    { id: "png", name: "PNG", description: "Best quality, larger file" },
    { id: "jpg", name: "JPEG", description: "Smaller file, good quality" }
  ];

  const handleExport = async () => {
    if (!canvasRef.current) return;

    setIsExporting(true);
    
    try {
      const canvas = canvasRef.current;
      const selectedSizeData = exportSizes.find(s => s.id === selectedSize);
      
      // Create a new canvas with the desired size
      const exportCanvas = document.createElement('canvas');
      const exportCtx = exportCanvas.getContext('2d');
      
      exportCanvas.width = selectedSizeData.width;
      exportCanvas.height = selectedSizeData.height;
      
      // Draw the original canvas content scaled to the new size
      exportCtx.drawImage(canvas, 0, 0, exportCanvas.width, exportCanvas.height);
      
      // Convert to blob and download
      exportCanvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `headshot-${selectedSize}.${selectedFormat}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        toast.success("Headshot downloaded successfully!");
        onClose();
      }, `image/${selectedFormat}`, selectedFormat === 'jpg' ? 0.95 : 1);
      
    } catch (error) {
      toast.error("Failed to export image. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative z-10 w-full max-w-md mx-4"
          >
            <Card className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                    <ApperIcon name="Download" className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800">Export Headshot</h3>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                >
                  <ApperIcon name="X" className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">
                    Choose Size
                  </label>
                  <div className="space-y-2">
                    {exportSizes.map((size) => (
                      <div
                        key={size.id}
                        onClick={() => setSelectedSize(size.id)}
                        className={`cursor-pointer p-3 rounded-lg border-2 transition-all duration-200 ${
                          selectedSize === size.id
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium text-slate-700">{size.name}</p>
                            <p className="text-xs text-slate-500">{size.description}</p>
                          </div>
                          <p className="text-xs text-slate-400">
                            {size.width}×{size.height}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">
                    File Format
                  </label>
                  <div className="flex space-x-2">
                    {formats.map((format) => (
                      <div
                        key={format.id}
                        onClick={() => setSelectedFormat(format.id)}
                        className={`cursor-pointer flex-1 p-3 rounded-lg border-2 text-center transition-all duration-200 ${
                          selectedFormat === format.id
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <p className="font-medium text-slate-700">{format.name}</p>
                        <p className="text-xs text-slate-500">{format.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <Button
                  variant="secondary"
                  size="md"
                  onClick={onClose}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleExport}
                  disabled={isExporting}
                  className="flex-1"
                >
                  {isExporting ? (
                    <>
                      <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                      Exporting...
                    </>
                  ) : (
                    <>
                      <ApperIcon name="Download" className="w-4 h-4 mr-2" />
                      Download
                    </>
                  )}
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ExportModal;