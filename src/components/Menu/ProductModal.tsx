import React, { useState, useEffect } from 'react';
import { X, Save, Coffee, Plus, Trash2 } from 'lucide-react';
import type { Product } from './Menu';

interface ProductModalProps {
  product: Product | null;
  onSave: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    category: 'Beverage',
    image: '☕',
    isAvailable: true,
    ingredients: [] as string[],
    allergens: [] as string[],
    calories: 0,
    preparationTime: 0,
    popularity: 50
  });

  const [newIngredient, setNewIngredient] = useState('');
  const [newAllergen, setNewAllergen] = useState('');

  const categories = ['Beverage', 'Food', 'Dessert', 'Snack'];
  const commonAllergens = ['Dairy', 'Eggs', 'Gluten', 'Nuts', 'Soy', 'Seafood'];
  const imageOptions = ['☕', '🍰', '🥐', '🥗', '🍔', '🍕', '🍜', '🥪', '🧁', '🍪'];

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        image: product.image,
        isAvailable: product.isAvailable,
        ingredients: product.ingredients,
        allergens: product.allergens,
        calories: product.calories || 0,
        preparationTime: product.preparationTime,
        popularity: product.popularity
      });
    }
  }, [product]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      calories: formData.calories > 0 ? formData.calories : undefined
    });
  };

  const addIngredient = () => {
    if (newIngredient.trim() && !formData.ingredients.includes(newIngredient.trim())) {
      setFormData(prev => ({
        ...prev,
        ingredients: [...prev.ingredients, newIngredient.trim()]
      }));
      setNewIngredient('');
    }
  };

  const removeIngredient = (ingredient: string) => {
    setFormData(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter(i => i !== ingredient)
    }));
  };

  const addAllergen = (allergen: string) => {
    if (!formData.allergens.includes(allergen)) {
      setFormData(prev => ({
        ...prev,
        allergens: [...prev.allergens, allergen]
      }));
    }
  };

  const removeAllergen = (allergen: string) => {
    setFormData(prev => ({
      ...prev,
      allergens: prev.allergens.filter(a => a !== allergen)
    }));
  };

  const addCustomAllergen = () => {
    if (newAllergen.trim() && !formData.allergens.includes(newAllergen.trim())) {
      setFormData(prev => ({
        ...prev,
        allergens: [...prev.allergens, newAllergen.trim()]
      }));
      setNewAllergen('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-orange-500 to-red-600 p-3 rounded-xl">
                <Coffee className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                {product ? 'Edit Product' : 'Add New Product'}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-6 w-6 text-gray-500" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price ($)
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: Number(e.target.value) }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image/Emoji
              </label>
              <div className="grid grid-cols-5 gap-2">
                {imageOptions.map(emoji => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, image: emoji }))}
                    className={`p-3 text-2xl rounded-lg border transition-colors ${
                      formData.image === emoji
                        ? 'border-amber-500 bg-amber-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              required
            />
          </div>

          {/* Additional Details */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preparation Time (min)
              </label>
              <input
                type="number"
                min="0"
                value={formData.preparationTime}
                onChange={(e) => setFormData(prev => ({ ...prev, preparationTime: Number(e.target.value) }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Calories (optional)
              </label>
              <input
                type="number"
                min="0"
                value={formData.calories}
                onChange={(e) => setFormData(prev => ({ ...prev, calories: Number(e.target.value) }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Popularity (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.popularity}
                onChange={(e) => setFormData(prev => ({ ...prev, popularity: Number(e.target.value) }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Availability
              </label>
              <select
                value={formData.isAvailable.toString()}
                onChange={(e) => setFormData(prev => ({ ...prev, isAvailable: e.target.value === 'true' }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                <option value="true">Available</option>
                <option value="false">Unavailable</option>
              </select>
            </div>
          </div>

          {/* Ingredients */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ingredients
            </label>
            <div className="flex space-x-2 mb-3">
              <input
                type="text"
                value={newIngredient}
                onChange={(e) => setNewIngredient(e.target.value)}
                placeholder="Add ingredient..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addIngredient())}
              />
              <button
                type="button"
                onClick={addIngredient}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.ingredients.map((ingredient, index) => (
                <span
                  key={index}
                  className="flex items-center space-x-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                >
                  <span>{ingredient}</span>
                  <button
                    type="button"
                    onClick={() => removeIngredient(ingredient)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Allergens */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Allergens
            </label>
            <div className="mb-3">
              <p className="text-sm text-gray-600 mb-2">Common allergens:</p>
              <div className="flex flex-wrap gap-2">
                {commonAllergens.map(allergen => (
                  <button
                    key={allergen}
                    type="button"
                    onClick={() => addAllergen(allergen)}
                    className={`px-3 py-1 text-sm rounded-lg border transition-colors ${
                      formData.allergens.includes(allergen)
                        ? 'bg-red-100 text-red-700 border-red-300'
                        : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                    }`}
                  >
                    {allergen}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex space-x-2 mb-3">
              <input
                type="text"
                value={newAllergen}
                onChange={(e) => setNewAllergen(e.target.value)}
                placeholder="Add custom allergen..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomAllergen())}
              />
              <button
                type="button"
                onClick={addCustomAllergen}
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.allergens.map((allergen, index) => (
                <span
                  key={index}
                  className="flex items-center space-x-2 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm"
                >
                  <span>{allergen}</span>
                  <button
                    type="button"
                    onClick={() => removeAllergen(allergen)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg hover:from-amber-700 hover:to-orange-700 transition-all duration-300"
            >
              <Save className="h-5 w-5" />
              <span>{product ? 'Update Product' : 'Create Product'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
