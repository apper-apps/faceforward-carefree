import React from "react";
import Card from "@/components/atoms/Card";
import AdjustmentControl from "@/components/molecules/AdjustmentControl";
import ApperIcon from "@/components/ApperIcon";

const AdjustmentPanel = ({ adjustments, onAdjustmentChange }) => {
  const handleSliderChange = (key, value) => {
    onAdjustmentChange({
      ...adjustments,
      [key]: parseInt(value)
    });
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-gradient-to-br from-accent-500 to-accent-600 rounded-lg flex items-center justify-center">
          <ApperIcon name="Sliders" className="w-4 h-4 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-slate-800">Adjustments</h3>
      </div>

      <div className="space-y-6">
        <AdjustmentControl
          label="Brightness"
          value={adjustments.brightness}
          onChange={(e) => handleSliderChange('brightness', e.target.value)}
          min={0}
          max={100}
        />

        <AdjustmentControl
          label="Contrast"
          value={adjustments.contrast}
          onChange={(e) => handleSliderChange('contrast', e.target.value)}
          min={0}
          max={100}
        />

        <AdjustmentControl
          label="Saturation"
          value={adjustments.saturation}
          onChange={(e) => handleSliderChange('saturation', e.target.value)}
          min={0}
          max={100}
        />
      </div>
    </Card>
  );
};

export default AdjustmentPanel;