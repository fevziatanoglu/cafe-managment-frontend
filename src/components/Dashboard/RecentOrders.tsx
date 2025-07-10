import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { SummaryCard } from './SummaryCard';

interface Order {
  id: number;
  table: string;
  customer: string;
  amount: number;
  time: string;
  status: 'completed' | 'preparing';
}

interface RecentOrdersProps {
  orders: Order[];
  onViewAll: () => void;
}

export const RecentOrders: React.FC<RecentOrdersProps> = ({ orders, onViewAll }) => {
  return (
    <SummaryCard
      title="Recent Orders"
      icon={<ShoppingCart className="h-6 w-6" />}
      iconColor="from-blue-500 to-blue-600"
      onViewAll={onViewAll}
    >
      <div className="space-y-4">
        {orders.map(order => (
          <div key={order.id} className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <span className="text-sm font-semibold text-blue-700">#{order.table}</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">{order.customer}</p>
                <p className="text-sm text-gray-600">{order.time}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-gray-900">${order.amount}</p>
              <span className={`text-xs px-2 py-1 rounded-full ${
                order.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
              }`}>
                {order.status === 'completed' ? 'Completed' : 'Preparing'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </SummaryCard>
  );
};
