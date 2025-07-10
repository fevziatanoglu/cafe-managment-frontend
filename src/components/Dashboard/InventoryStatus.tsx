import React from 'react';
import { Package } from 'lucide-react';
import { SummaryCard } from './SummaryCard';

interface Product {
  id: number;
  name: string;
  stock: number;
  unit: string;
  minStock: number;
  status: 'good' | 'low' | 'critical';
}

interface InventoryStatusProps {
  products: Product[];
  onViewAll: () => void;
}

export const InventoryStatus: React.FC<InventoryStatusProps> = ({ products, onViewAll }) => {
  return (
    <SummaryCard
      title="Inventory Status"
      icon={<Package className="h-6 w-6" />}
      iconColor="from-green-500 to-teal-600"
      onViewAll={onViewAll}
    >
      <div className="space-y-4">
        {products.map(product => (
          <div key={product.id} className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-teal-50 rounded-xl border border-green-100">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <Package className="h-4 w-4 text-green-700" />
              </div>
              <div>
                <p className="font-medium text-gray-900">{product.name}</p>
                <p className="text-sm text-gray-600">{product.stock} {product.unit}</p>
              </div>
            </div>
            <div className="text-right">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                product.status === 'good' 
                  ? 'bg-green-100 text-green-700'
                  : product.status === 'low'
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'bg-red-100 text-red-700'
              }`}>
                {product.status === 'good' ? 'Good' : product.status === 'low' ? 'Low' : 'Critical'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </SummaryCard>
  );
};
