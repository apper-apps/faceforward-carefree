import React from "react";
import ApperIcon from "@/components/ApperIcon";

const Header = () => {
  return (
    <header className="bg-white/80 backdrop-blur-lg border-b border-slate-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
              <ApperIcon name="Camera" className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text font-display">FaceForward</h1>
              <p className="text-sm text-slate-500">Professional Headshot Generator</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-slate-600 hover:text-primary-600 transition-colors duration-200">
              Features
            </a>
            <a href="#examples" className="text-slate-600 hover:text-primary-600 transition-colors duration-200">
              Examples
            </a>
            <a href="#pricing" className="text-slate-600 hover:text-primary-600 transition-colors duration-200">
              Pricing
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;