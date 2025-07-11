import React from 'react';
import { Coffee, CheckCircle, XCircle, TrendingUp, DollarSign } from 'lucide-react';
import { StatsCard } from '../Dashboard/StatsCard';
import type { Product } from './Menu';

interface MenuStatsProps {
  products: Product[];
}

export const MenuStats: React.FC<MenuStatsProps> = ({ products }) => {
  const totalProducts = products.length;
  const availableProducts = products.filter(p => p.isAvailable).length;
  const unavailableProducts = products.filter(p => !p.isAvailable).length;
  const avgPrice = products.reduce((sum, p) => sum + p.price, 0) / products.length;
  const avgPopularity = products.reduce((sum, p) => sum + p.popularity, 0) / products.length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
      <StatsCard
        title="Total Products"
        value={totalProducts}
        icon={Coffee}
        iconColor="from-orange-500 to-red-600"
      />
      <StatsCard
        title="Available"
        value={availableProducts}
        icon={CheckCircle}
        iconColor="from-green-500 to-green-600"
        valueColor="text-green-600"
      />
      <StatsCard
        title="Unavailable"
        value={unavailableProducts}
        icon={XCircle}
        iconColor="from-red-500 to-red-600"
        valueColor="text-red-600"
      />
      <StatsCard
        title="Avg Price"
        value={`$${avgPrice.toFixed(2)}`}
        icon={DollarSign}
        iconColor="from-blue-500 to-blue-600"
        valueColor="text-blue-600"
      />
      <StatsCard
        title="Avg Popularity"
        value={`${avgPopularity.toFixed(1)}%`}
        icon={TrendingUp}
        iconColor="from-purple-500 to-purple-600"
        valueColor="text-purple-600"
      />
    </div>
  );
};
