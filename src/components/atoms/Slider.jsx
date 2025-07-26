import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Slider = forwardRef(({ className, ...props }, ref) => {
  return (
    <input
      type="range"
      ref={ref}
      className={cn("custom-slider w-full", className)}
      {...props}
    />
  );
});

Slider.displayName = "Slider";

export default Slider;