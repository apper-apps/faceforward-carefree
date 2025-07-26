import React from "react";
import Card from "@/components/atoms/Card";
import BackgroundOption from "@/components/molecules/BackgroundOption";
import ApperIcon from "@/components/ApperIcon";

const BackgroundSelector = ({ selectedBackground, onBackgroundChange, backgrounds }) => {
  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-lg flex items-center justify-center">
          <ApperIcon name="Palette" className="w-4 h-4 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-slate-800">Backgrounds</h3>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {backgrounds.map((bg) => (
          <BackgroundOption
            key={bg.id}
            name={bg.name}
            preview={bg.preview}
            active={selectedBackground === bg.value}
            onClick={() => onBackgroundChange(bg.value)}
          />
        ))}
      </div>
    </Card>
  );
};

export default BackgroundSelector;