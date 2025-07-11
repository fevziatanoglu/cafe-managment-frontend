import React from 'react';
import { Search, Filter, ArrowUpDown } from 'lucide-react';
import type { Product } from './Menu';

interface MenuFiltersProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedAvailability: string;
  onAvailabilityChange: (availability: string) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  sortBy: string;
  onSortByChange: (sortBy: string) => void;
  sortOrder: 'asc' | 'desc';
  onSortOrderChange: (order: 'asc' | 'desc') => void;
  products: Product[];
}

export const MenuFilters: React.FC<MenuFiltersProps> = ({
  selectedCategory,
  onCategoryChange,
  selectedAvailability,
  onAvailabilityChange,
  searchTerm,
  onSearchChange,
  sortBy,
  onSortByChange,
  sortOrder,
  onSortOrderChange,
  products
}) => {
  const categories = Array.from(new Set(products.map(p => p.category)));
  
  const categoryOptions = [
    { value: 'all', label: 'All Categories', count: products.length },
    ...categories.map(cat => ({
      value: cat,
      label: cat,
      count: products.filter(p => p.category === cat).length
    }))
  ];

  const availabilityOptions = [
    { value: 'all', label: 'All Products' },
    { value: 'available', label: 'Available' },
    { value: 'unavailable', label: 'Unavailable' }
  ];

  const sortOptions = [
    { value: 'name', label: 'Name' },
    { value: 'price', label: 'Price' },
    { value: 'popularity', label: 'Popularity' },
    { value: 'category', label: 'Category' },
    { value: 'createdAt', label: 'Date Added' },
    { value: 'preparationTime', label: 'Prep Time' }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-amber-100 p-6 mb-8">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-gradient-to-r from-orange-500 to-red-600 p-3 rounded-xl">
          <Filter className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Filter & Sort Products</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Search */}
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search Products
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, description, or category..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Sort */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sort By
          </label>
          <div className="flex space-x-2">
            <select
              value={sortBy}
              onChange={(e) => onSortByChange(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <button
              onClick={() => onSortOrderChange(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <ArrowUpDown className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Availability */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Availability
          </label>
          <select
            value={selectedAvailability}
            onChange={(e) => onAvailabilityChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          >
            {availabilityOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Category Filter Buttons */}
      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Categories
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
          {categoryOptions.map(option => (
            <button
              key={option.value}
              onClick={() => onCategoryChange(option.value)}
              className={`px-3 py-2 rounded-lg font-medium transition-all duration-300 text-xs sm:text-sm ${
                selectedCategory === option.value
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg transform scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <div className="text-center">
                <div className="font-semibold">{option.label}</div>
                <div className="text-xs opacity-75">({option.count})</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
