import React from 'react';

interface MenuCategoryProps {
  name: string;
  isSelected: boolean;
  onClick: () => void;
  count: number;
}

export const MenuCategory: React.FC<MenuCategoryProps> = ({ name, isSelected, onClick, count }) => {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 ${
        isSelected
          ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg'
          : 'bg-white text-gray-700 hover:bg-amber-50 hover:text-amber-700 shadow-md border border-amber-100'
      }`}
    >
      <div className="text-center">
        <div className="font-semibold">{name}</div>
        <div className={`text-xs mt-1 ${isSelected ? 'text-white/80' : 'text-gray-500'}`}>
          {count} item{count !== 1 ? 's' : ''}
        </div>
      </div>
    </button>
  );
};
