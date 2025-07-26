import React from "react";
import Slider from "@/components/atoms/Slider";

const AdjustmentControl = ({ label, value, onChange, min = 0, max = 100, step = 1 }) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-slate-700">{label}</label>
        <span className="text-sm text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
          {value}
        </span>
      </div>
      <Slider
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        className="w-full"
      />
    </div>
  );
};

export default AdjustmentControl;