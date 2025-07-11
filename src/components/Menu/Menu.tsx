import React, { useState, useMemo } from 'react';
import { Coffee } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { ProductModal } from './ProductModal';
import { MenuHeader } from './MenuHeader';
import { MenuStats } from './MenuStats';
import { MenuFilters } from './MenuFilters';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  isAvailable: boolean;
  ingredients: string[];
  allergens: string[];
  calories?: number;
  preparationTime: number;
  popularity: number;
  createdAt: string;
  updatedAt: string;
}

export const Menu: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: 'Turkish Coffee',
      description: 'Traditional Turkish coffee served with Turkish delight',
      price: 15,
      category: 'Beverage',
      image: '☕',
      isAvailable: true,
      ingredients: ['Coffee beans', 'Water', 'Sugar'],
      allergens: [],
      calories: 25,
      preparationTime: 5,
      popularity: 95,
      createdAt: '2024-01-10T10:00:00Z',
      updatedAt: '2024-01-15T14:30:00Z'
    },
    {
      id: 2,
      name: 'Americano',
      description: 'Fresh espresso shots with hot water',
      price: 20,
      category: 'Beverage',
      image: '☕',
      isAvailable: true,
      ingredients: ['Espresso', 'Hot water'],
      allergens: [],
      calories: 15,
      preparationTime: 3,
      popularity: 88,
      createdAt: '2024-01-10T10:00:00Z',
      updatedAt: '2024-01-15T14:30:00Z'
    },
    {
      id: 3,
      name: 'Cheesecake',
      description: 'Creamy New York style cheesecake with berry sauce',
      price: 35,
      category: 'Dessert',
      image: '🍰',
      isAvailable: true,
      ingredients: ['Cream cheese', 'Sugar', 'Eggs', 'Graham crackers', 'Berries'],
      allergens: ['Dairy', 'Eggs', 'Gluten'],
      calories: 450,
      preparationTime: 0,
      popularity: 92,
      createdAt: '2024-01-10T10:00:00Z',
      updatedAt: '2024-01-15T14:30:00Z'
    },
    {
      id: 4,
      name: 'Croissant',
      description: 'Buttery, flaky French pastry',
      price: 25,
      category: 'Snack',
      image: '🥐',
      isAvailable: false,
      ingredients: ['Flour', 'Butter', 'Yeast', 'Salt'],
      allergens: ['Gluten', 'Dairy'],
      calories: 280,
      preparationTime: 2,
      popularity: 75,
      createdAt: '2024-01-10T10:00:00Z',
      updatedAt: '2024-01-15T14:30:00Z'
    },
    {
      id: 5,
      name: 'Latte',
      description: 'Espresso with steamed milk and foam art',
      price: 25,
      category: 'Beverage',
      image: '☕',
      isAvailable: true,
      ingredients: ['Espresso', 'Steamed milk'],
      allergens: ['Dairy'],
      calories: 120,
      preparationTime: 4,
      popularity: 90,
      createdAt: '2024-01-10T10:00:00Z',
      updatedAt: '2024-01-15T14:30:00Z'
    },
    {
      id: 6,
      name: 'Caesar Salad',
      description: 'Fresh romaine lettuce with Caesar dressing and croutons',
      price: 45,
      category: 'Food',
      image: '🥗',
      isAvailable: true,
      ingredients: ['Romaine lettuce', 'Parmesan', 'Croutons', 'Caesar dressing'],
      allergens: ['Dairy', 'Gluten'],
      calories: 320,
      preparationTime: 8,
      popularity: 78,
      createdAt: '2024-01-10T10:00:00Z',
      updatedAt: '2024-01-15T14:30:00Z'
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAvailability, setSelectedAvailability] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesAvailability = selectedAvailability === 'all' || 
        (selectedAvailability === 'available' && product.isAvailable) ||
        (selectedAvailability === 'unavailable' && !product.isAvailable);
      const matchesSearch = 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesCategory && matchesAvailability && matchesSearch;
    });

    // Sort products
    filtered.sort((a, b) => {
      let aValue: any = a[sortBy as keyof Product];
      let bValue: any = b[sortBy as keyof Product];

      if (sortBy === 'createdAt' || sortBy === 'updatedAt') {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }

      if (sortBy === 'price' || sortBy === 'popularity' || sortBy === 'calories' || sortBy === 'preparationTime') {
        aValue = Number(aValue);
        bValue = Number(bValue);
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [products, selectedCategory, selectedAvailability, searchTerm, sortBy, sortOrder]);

  const handleAddProduct = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const handleSaveProduct = (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingProduct) {
      setProducts(products.map(product => 
        product.id === editingProduct.id 
          ? { 
              ...productData, 
              id: editingProduct.id,
              createdAt: editingProduct.createdAt,
              updatedAt: new Date().toISOString()
            }
          : product
      ));
    } else {
      const newProduct: Product = {
        ...productData,
        id: Math.max(...products.map(p => p.id)) + 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setProducts([...products, newProduct]);
    }
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleAvailabilityToggle = (productId: number) => {
    setProducts(products.map(product => 
      product.id === productId 
        ? { ...product, isAvailable: !product.isAvailable, updatedAt: new Date().toISOString() }
        : product
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <MenuHeader onAddProduct={handleAddProduct} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <MenuStats products={products} />
        
        <MenuFilters
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedAvailability={selectedAvailability}
          onAvailabilityChange={setSelectedAvailability}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          sortBy={sortBy}
          onSortByChange={setSortBy}
          sortOrder={sortOrder}
          onSortOrderChange={setSortOrder}
          products={products}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={() => handleEditProduct(product)}
              onDelete={() => handleDeleteProduct(product.id)}
              onToggleAvailability={() => handleAvailabilityToggle(product.id)}
            />
          ))}
        </div>

        {filteredAndSortedProducts.length === 0 && (
          <div className="text-center py-12">
            <Coffee className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your filters or add a new product</p>
          </div>
        )}
      </div>

      {isModalOpen && (
        <ProductModal
          product={editingProduct}
          onSave={handleSaveProduct}
          onClose={() => {
            setIsModalOpen(false);
            setEditingProduct(null);
          }}
        />
      )}
    </div>
  );
};
