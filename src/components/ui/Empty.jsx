import React from "react";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No content yet", 
  description = "Get started by adding some content",
  icon = "Image",
  children 
}) => {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center space-y-4 max-w-md mx-auto p-6">
        <div className="w-16 h-16 bg-gradient-to-br from-slate-400 to-slate-500 rounded-full flex items-center justify-center mx-auto">
          <ApperIcon name={icon} className="w-8 h-8 text-white" />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-slate-700">{title}</h3>
          <p className="text-sm text-slate-500">{description}</p>
        </div>

        {children}
      </div>
    </div>
  );
};

export default Empty;