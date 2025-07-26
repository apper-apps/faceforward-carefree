import React from "react";
import Card from "@/components/atoms/Card";
import FilterOption from "@/components/molecules/FilterOption";
import ApperIcon from "@/components/ApperIcon";

const FilterPanel = ({ selectedFilter, onFilterChange, filters, currentImage }) => {
  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
          <ApperIcon name="Zap" className="w-4 h-4 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-slate-800">Filters</h3>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {filters.map((filter) => (
          <FilterOption
            key={filter.id}
            name={filter.name}
            preview={currentImage || filter.preview}
            active={selectedFilter === filter.value}
            onClick={() => onFilterChange(filter.value)}
          />
        ))}
      </div>
    </Card>
  );
};

export default FilterPanel;