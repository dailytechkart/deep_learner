import React from 'react';

interface FilterOption {
  id: string;
  label: string;
  value: string;
}

interface FilterBarProps {
  filters: {
    id: string;
    label: string;
    options: FilterOption[];
    value: string;
    onChange: (value: string) => void;
  }[];
  className?: string;
}

export const FilterBar: React.FC<FilterBarProps> = ({ filters, className = '' }) => {
  return (
    <div className={`flex flex-wrap gap-4 ${className}`}>
      {filters.map((filter) => (
        <div key={filter.id} className="flex-1 min-w-[200px]">
          <label htmlFor={filter.id} className="block text-sm font-medium text-gray-700 mb-1">
            {filter.label}
          </label>
          <select
            id={filter.id}
            value={filter.value}
            onChange={(e) => filter.onChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
          >
            <option value="">All</option>
            {filter.options.map((option) => (
              <option key={option.id} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}; 