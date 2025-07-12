import React from 'react';
import { Star, Clock, Users, AlertTriangle } from 'lucide-react';
import type { PublicMenuItem } from './PublicMenu';

interface MenuItemProps {
  item: PublicMenuItem;
  featured?: boolean;
}

export const MenuItem: React.FC<MenuItemProps> = ({ item, featured = false }) => {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" className="h-4 w-4 text-yellow-400 fill-current opacity-50" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />
      );
    }

    return stars;
  };

  return (
    <div className={`bg-white rounded-3xl shadow-lg border border-amber-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 ${
      featured ? 'ring-2 ring-amber-200' : ''
    }`}>
      {/* Image and badges */}
      <div className="relative h-48 bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
        <div className="text-6xl">{item.image}</div>
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col space-y-2">
          {item.isPopular && (
            <span className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-3 py-1 rounded-full text-xs font-medium">
              Popular
            </span>
          )}
          {item.isNew && (
            <span className="bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1 rounded-full text-xs font-medium">
              New
            </span>
          )}
        </div>

        {/* Price */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-full">
          <span className="text-xl font-bold text-amber-600">${item.price}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="mb-3">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
        </div>

        {/* Rating */}
        <div className="flex items-center space-x-2 mb-4">
          <div className="flex items-center space-x-1">
            {renderStars(item.rating)}
          </div>
          <span className="text-sm font-medium text-gray-700">{item.rating}</span>
        </div>

        {/* Info items */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-amber-600" />
              <span>Prep time: {item.preparationTime} min</span>
            </div>
            {item.calories && (
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-amber-600" />
                <span>{item.calories} cal</span>
              </div>
            )}
          </div>

          {item.allergens.length > 0 && (
            <div className="flex items-start space-x-2 text-sm">
              <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
              <div>
                <span className="text-yellow-700 font-medium">Contains: </span>
                <span className="text-gray-600">{item.allergens.join(', ')}</span>
              </div>
            </div>
          )}
        </div>

        {/* Category badge */}
        <div className="flex justify-between items-center">
          <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
            {item.category}
          </span>
          
          {featured && (
            <div className="text-amber-600 font-medium text-sm">⭐ Featured</div>
          )}
        </div>
      </div>
    </div>
  );
};
