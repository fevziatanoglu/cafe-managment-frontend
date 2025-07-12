import React, { useState, useMemo } from 'react';
import { Coffee, Search, Star, Clock, Users } from 'lucide-react';
import { MenuCategory } from './MenuCategory';
import { MenuItem } from './MenuItem';
import { MenuHeader } from './MenuHeader';

export interface PublicMenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  isAvailable: boolean;
  isPopular: boolean;
  isNew: boolean;
  preparationTime: number;
  calories?: number;
  allergens: string[];
  rating: number;
}

export const PublicMenu: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const menuItems: PublicMenuItem[] = [
    {
      id: 1,
      name: 'Turkish Coffee',
      description: 'Traditional Turkish coffee served with Turkish delight and a glass of water',
      price: 15,
      category: 'Hot Beverages',
      image: '☕',
      isAvailable: true,
      isPopular: true,
      isNew: false,
      preparationTime: 5,
      calories: 25,
      allergens: [],
      rating: 4.8
    },
    {
      id: 2,
      name: 'Signature Latte',
      description: 'Espresso with steamed milk, vanilla syrup, and beautiful latte art',
      price: 25,
      category: 'Hot Beverages',
      image: '☕',
      isAvailable: true,
      isPopular: true,
      isNew: false,
      preparationTime: 4,
      calories: 120,
      allergens: ['Dairy'],
      rating: 4.9
    },
    {
      id: 3,
      name: 'Iced Caramel Macchiato',
      description: 'Cold espresso with caramel syrup, milk, and whipped cream',
      price: 28,
      category: 'Cold Beverages',
      image: '🧊',
      isAvailable: true,
      isPopular: false,
      isNew: true,
      preparationTime: 3,
      calories: 180,
      allergens: ['Dairy'],
      rating: 4.6
    },
    {
      id: 4,
      name: 'Fresh Orange Juice',
      description: 'Freshly squeezed orange juice, served chilled',
      price: 18,
      category: 'Cold Beverages',
      image: '🍊',
      isAvailable: true,
      isPopular: false,
      isNew: false,
      preparationTime: 2,
      calories: 110,
      allergens: [],
      rating: 4.3
    },
    {
      id: 5,
      name: 'New York Cheesecake',
      description: 'Creamy cheesecake with fresh berry compote and mint garnish',
      price: 35,
      category: 'Desserts',
      image: '🍰',
      isAvailable: true,
      isPopular: true,
      isNew: false,
      preparationTime: 0,
      calories: 450,
      allergens: ['Dairy', 'Eggs', 'Gluten'],
      rating: 4.7
    },
    {
      id: 6,
      name: 'Chocolate Lava Cake',
      description: 'Warm chocolate cake with molten center, served with vanilla ice cream',
      price: 32,
      category: 'Desserts',
      image: '🍫',
      isAvailable: true,
      isPopular: false,
      isNew: true,
      preparationTime: 8,
      calories: 520,
      allergens: ['Dairy', 'Eggs', 'Gluten'],
      rating: 4.8
    },
    {
      id: 7,
      name: 'Truffle Mushroom Pasta',
      description: 'Homemade pasta with truffle oil, wild mushrooms, and parmesan',
      price: 55,
      category: 'Main Courses',
      image: '🍝',
      isAvailable: true,
      isPopular: true,
      isNew: false,
      preparationTime: 15,
      calories: 680,
      allergens: ['Gluten', 'Dairy'],
      rating: 4.9
    },
    {
      id: 8,
      name: 'Caesar Salad',
      description: 'Crispy romaine lettuce, parmesan, croutons, and our signature Caesar dressing',
      price: 42,
      category: 'Salads',
      image: '🥗',
      isAvailable: true,
      isPopular: false,
      isNew: false,
      preparationTime: 5,
      calories: 320,
      allergens: ['Dairy', 'Gluten'],
      rating: 4.4
    },
    {
      id: 9,
      name: 'Avocado Toast',
      description: 'Sourdough bread topped with smashed avocado, cherry tomatoes, and feta',
      price: 28,
      category: 'Light Bites',
      image: '🥑',
      isAvailable: true,
      isPopular: true,
      isNew: false,
      preparationTime: 5,
      calories: 380,
      allergens: ['Gluten', 'Dairy'],
      rating: 4.5
    },
    {
      id: 10,
      name: 'Artisan Croissant',
      description: 'Freshly baked buttery croissant, served warm',
      price: 12,
      category: 'Light Bites',
      image: '🥐',
      isAvailable: false,
      isPopular: false,
      isNew: false,
      preparationTime: 2,
      calories: 280,
      allergens: ['Gluten', 'Dairy'],
      rating: 4.2
    }
  ];

  const categories = Array.from(new Set(menuItems.map(item => item.category)));

  const filteredItems = useMemo(() => {
    return menuItems.filter(item => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch = 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesCategory && matchesSearch && item.isAvailable;
    });
  }, [menuItems, selectedCategory, searchTerm]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <MenuHeader />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-amber-600 to-orange-600 text-white py-16">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Our Menu
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Crafted with love, served with passion
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search our menu..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/90 backdrop-blur-md rounded-2xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/30 transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Categories</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <MenuCategory
              name="All"
              isSelected={selectedCategory === 'all'}
              onClick={() => setSelectedCategory('all')}
              count={menuItems.filter(item => item.isAvailable).length}
            />
            {categories.map(category => (
              <MenuCategory
                key={category}
                name={category}
                isSelected={selectedCategory === category}
                onClick={() => setSelectedCategory(category)}
                count={menuItems.filter(item => item.category === category && item.isAvailable).length}
              />
            ))}
          </div>
        </div>

        {/* Popular Items Section */}
        {selectedCategory === 'all' && (
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Customer Favorites</h2>
              <p className="text-gray-600">Our most loved items by customers</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {menuItems
                .filter(item => item.isPopular && item.isAvailable)
                .map(item => (
                  <MenuItem key={item.id} item={item} featured />
                ))}
            </div>
          </div>
        )}

        {/* New Items Section */}
        {selectedCategory === 'all' && (
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">New Arrivals</h2>
              <p className="text-gray-600">Fresh additions to our menu</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {menuItems
                .filter(item => item.isNew && item.isAvailable)
                .map(item => (
                  <MenuItem key={item.id} item={item} featured />
                ))}
            </div>
          </div>
        )}

        {/* All Items */}
        <div>
          {selectedCategory !== 'all' && (
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">{selectedCategory}</h2>
              <p className="text-gray-600">
                {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''} available
              </p>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map(item => (
              <MenuItem key={item.id} item={item} />
            ))}
          </div>
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <Coffee className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No items found</h3>
            <p className="text-gray-500">Try searching for something else or browse our categories</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Coffee className="h-8 w-8 text-amber-400" />
            <h3 className="text-2xl font-bold">Café Delight</h3>
          </div>
          <p className="text-gray-400 mb-4">Crafting exceptional experiences, one cup at a time</p>
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-400">
            <span>📍 123 Coffee Street, City</span>
            <span>📞 +1 (555) 123-4567</span>
            <span>🕒 Open 7:00 AM - 10:00 PM</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
