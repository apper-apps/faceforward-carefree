import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center space-y-4">
        <div className="relative w-16 h-16 mx-auto">
          <div className="absolute inset-0 border-4 border-slate-200 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-transparent border-t-primary-500 rounded-full animate-spin"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-slate-200 rounded shimmer w-32 mx-auto"></div>
          <div className="h-3 bg-slate-200 rounded shimmer w-24 mx-auto"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;