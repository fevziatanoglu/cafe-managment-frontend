import React from 'react';
import { Coffee, TrendingUp } from 'lucide-react';
import { SummaryCard } from './SummaryCard';

interface MenuItem {
  id: number;
  name: string;
  price: number;
  category: string;
  orders: number;
  trending: boolean;
}

interface PopularMenuProps {
  menuItems: MenuItem[];
  onViewAll: () => void;
}

export const PopularMenu: React.FC<PopularMenuProps> = ({ menuItems, onViewAll }) => {
  return (
    <SummaryCard
      title="Popular Menu"
      icon={<Coffee className="h-6 w-6" />}
      iconColor="from-amber-500 to-orange-600"
      onViewAll={onViewAll}
    >
      <div className="space-y-4">
        {menuItems.map(item => (
          <div key={item.id} className="flex items-center justify-between p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-100">
            <div className="flex items-center space-x-3">
              <div className="bg-amber-100 p-2 rounded-lg">
                <Coffee className="h-4 w-4 text-amber-700" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <p className="font-medium text-gray-900">{item.name}</p>
                  {item.trending && <TrendingUp className="h-4 w-4 text-green-500" />}
                </div>
                <p className="text-sm text-gray-600">{item.category} • {item.orders} orders</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-green-600">${item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </SummaryCard>
  );
};
