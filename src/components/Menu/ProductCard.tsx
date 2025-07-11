import React from 'react';
import { Edit2, Trash2, Clock, TrendingUp, Users, AlertTriangle } from 'lucide-react';
import type { Product } from './Menu';

interface ProductCardProps {
  product: Product;
  onEdit: () => void;
  onDelete: () => void;
  onToggleAvailability: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onEdit, 
  onDelete, 
  onToggleAvailability 
}) => {
  const getAvailabilityColor = (isAvailable: boolean) => {
    return isAvailable 
      ? 'from-green-500 to-green-600' 
      : 'from-gray-400 to-gray-500';
  };

  const getAvailabilityBadgeColor = (isAvailable: boolean) => {
    return isAvailable 
      ? 'bg-green-100 text-green-700' 
      : 'bg-red-100 text-red-700';
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Beverage':
        return 'bg-blue-100 text-blue-700';
      case 'Food':
        return 'bg-orange-100 text-orange-700';
      case 'Dessert':
        return 'bg-pink-100 text-pink-700';
      case 'Snack':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getPopularityColor = (popularity: number) => {
    if (popularity >= 90) return 'text-green-600';
    if (popularity >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className={`bg-white rounded-2xl p-6 shadow-lg border border-amber-100 hover:shadow-xl transition-all duration-300 ${!product.isAvailable ? 'opacity-75' : ''}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`bg-gradient-to-r ${getAvailabilityColor(product.isAvailable)} p-3 rounded-xl`}>
            <div className="text-white text-2xl">{product.image}</div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">{product.name}</h3>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(product.category)}`}>
              {product.category}
            </span>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getAvailabilityBadgeColor(product.isAvailable)}`}>
          {product.isAvailable ? 'Available' : 'Unavailable'}
        </span>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>

      {/* Price and Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-gray-50 rounded-xl p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Price</p>
              <p className="text-xl font-bold text-green-600">${product.price}</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 rounded-xl p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Popularity</p>
              <p className={`text-lg font-bold ${getPopularityColor(product.popularity)}`}>
                {product.popularity}%
              </p>
            </div>
            <TrendingUp className={`h-4 w-4 ${getPopularityColor(product.popularity)}`} />
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center space-x-3 text-sm text-gray-600">
          <Clock className="h-4 w-4" />
          <span>Prep time: <strong>{product.preparationTime} min</strong></span>
        </div>
        {product.calories && (
          <div className="flex items-center space-x-3 text-sm text-gray-600">
            <Users className="h-4 w-4" />
            <span>Calories: <strong>{product.calories}</strong></span>
          </div>
        )}
        {product.allergens.length > 0 && (
          <div className="flex items-start space-x-3 text-sm text-gray-600">
            <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />
            <div>
              <span className="text-yellow-700">Allergens: </span>
              <span className="text-gray-700">{product.allergens.join(', ')}</span>
            </div>
          </div>
        )}
      </div>

      {/* Ingredients */}
      <div className="mb-6">
        <p className="text-sm font-medium text-gray-700 mb-2">Ingredients:</p>
        <div className="flex flex-wrap gap-1">
          {product.ingredients.slice(0, 3).map((ingredient, index) => (
            <span key={index} className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs">
              {ingredient}
            </span>
          ))}
          {product.ingredients.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
              +{product.ingredients.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Toggle Availability */}
      <div className="mb-4">
        <button
          onClick={onToggleAvailability}
          className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
            product.isAvailable
              ? 'bg-red-100 text-red-700 hover:bg-red-200'
              : 'bg-green-100 text-green-700 hover:bg-green-200'
          }`}
        >
          {product.isAvailable ? 'Mark Unavailable' : 'Mark Available'}
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-3">
        <button
          onClick={onEdit}
          className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
        >
          <Edit2 className="h-4 w-4" />
          <span className="font-medium">Edit</span>
        </button>
        <button
          onClick={onDelete}
          className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105"
        >
          <Trash2 className="h-4 w-4" />
          <span className="font-medium">Delete</span>
        </button>
      </div>
    </div>
  );
};
