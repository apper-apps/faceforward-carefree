import React from "react";
import { cn } from "@/utils/cn";

const BackgroundOption = ({ name, preview, active, onClick, className }) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "cursor-pointer rounded-lg border-2 p-2 transition-all duration-200 filter-preview",
        active 
          ? "border-primary-500 shadow-lg shadow-primary-500/25" 
          : "border-slate-200 hover:border-slate-300",
        className
      )}
    >
      <div className="aspect-video rounded-md overflow-hidden mb-2">
        {preview.startsWith('#') ? (
          <div 
            className="w-full h-full rounded-md"
            style={{ backgroundColor: preview }}
          />
        ) : (
          <div 
            className="w-full h-full rounded-md"
            style={{ 
              background: preview.includes('gradient') 
                ? preview 
                : `url(${preview}) center/cover`
            }}
          />
        )}
      </div>
      <p className="text-xs font-medium text-center text-slate-600">{name}</p>
    </div>
  );
};

export default BackgroundOption;