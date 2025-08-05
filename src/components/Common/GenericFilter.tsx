import React from "react";
import { Plus, Search } from "lucide-react";

export interface FilterOption<T extends string> {
  value: T;
  label: string;
  count?: number;
  color?: string;
  icon?: React.ReactNode;
}

interface GenericFilterProps<T extends string> {
  options: FilterOption<T>[];
  selected: T;
  onChange: (value: T) => void;
  onOpenModal?: () => void;
  createLabel?: string;

  // Optional search
  searchTerm?: string;
  setSearchTerm?: (term: string) => void;

  // Optional sort
  sortBy?: string;
  setSortBy?: (sortBy: string) => void;
  sortOrder?: 'asc' | 'desc';
  setSortOrder?: (order: 'asc' | 'desc') => void;
  sortOptions?: { value: string; label: string }[];
}

export function GenericFilter<T extends string>({
  options,
  selected,
  onChange,
  onOpenModal,
  createLabel = "Create",
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  sortOptions,
}: GenericFilterProps<T>) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-amber-100 p-6 mb-6">
      {/* Search, Sort, and Create */}
          <div className="flex flex-col lg:flex-row lg:col-span-2 gap-6 mb-5">
            {/* Search */}
            {setSearchTerm && (
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}
            {/* Sort */}
            {setSortBy && sortOptions && sortBy && setSortOrder && sortOrder && (
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort By
                </label>
                <div className="flex space-x-2">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  >
                    {sortOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                    className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    {sortOrder === 'asc' ? '↑' : '↓'}
                  </button>
                </div>
              </div>
            )}
            {/* Create Button */}
            {onOpenModal && (
              <div className="flex items-end">
                <button
                  onClick={onOpenModal}
                  className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-semibold shadow transition"
                >
                  <Plus className="h-4 w-4" />
                  <span>{createLabel}</span>
                </button>
              </div>
            )}
          </div>
      

      {/* Status Filter */}
      <div className="flex flex-col lg:flex-row gap-4">
        {options.map(option => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`flex flex-1 items-center space-x-3 px-6 py-4 rounded-xl font-medium transition-all duration-300 hover:cursor-pointer ${selected === option.value
              ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg transform scale-105'
              : option.color || 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            {option.icon && <span className="text-xl">{option.icon}</span>}
            <div className="text-left">
              <div className="font-semibold">{option.label}</div>
              {typeof option.count === "number" && (
                <div className={`text-sm ${selected === option.value ? 'text-white opacity-90' : 'opacity-70'
                  }`}>
                  {option.count} items
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
