import React from 'react';
import { ShoppingCart, Clock, CheckCircle, XCircle, DollarSign, CreditCard } from 'lucide-react';
import { StatsCard } from '../Dashboard/StatsCard';
import type { Order } from './Orders';

interface OrderStatsProps {
  orders: Order[];
}

export const OrderStats: React.FC<OrderStatsProps> = ({ orders }) => {
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const preparingOrders = orders.filter(o => o.status === 'preparing').length;
  const readyOrders = orders.filter(o => o.status === 'ready').length;
  const deliveredOrders = orders.filter(o => o.status === 'delivered').length;
  const cancelledOrders = orders.filter(o => o.status === 'cancelled').length;
  const totalRevenue = orders.filter(o => o.paymentStatus === 'paid').reduce((sum, o) => sum + o.total, 0);
  const pendingPayments = orders.filter(o => o.paymentStatus === 'pending').length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatsCard
        title="Total Orders"
        value={totalOrders}
        icon={ShoppingCart}
        iconColor="from-blue-500 to-blue-600"
      />
      <StatsCard
        title="Pending"
        value={pendingOrders}
        icon={Clock}
        iconColor="from-yellow-500 to-yellow-600"
        valueColor="text-yellow-600"
      />
      <StatsCard
        title="Preparing"
        value={preparingOrders}
        icon={Clock}
        iconColor="from-orange-500 to-orange-600"
        valueColor="text-orange-600"
      />
      <StatsCard
        title="Ready"
        value={readyOrders}
        icon={CheckCircle}
        iconColor="from-green-500 to-green-600"
        valueColor="text-green-600"
      />
      <StatsCard
        title="Delivered"
        value={deliveredOrders}
        icon={CheckCircle}
        iconColor="from-green-600 to-green-700"
        valueColor="text-green-700"
      />
      <StatsCard
        title="Cancelled"
        value={cancelledOrders}
        icon={XCircle}
        iconColor="from-red-500 to-red-600"
        valueColor="text-red-600"
      />
      <StatsCard
        title="Revenue"
        value={`$${totalRevenue}`}
        icon={DollarSign}
        iconColor="from-purple-500 to-purple-600"
        valueColor="text-purple-600"
      />
      <StatsCard
        title="Pending Payments"
        value={pendingPayments}
        icon={CreditCard}
        iconColor="from-indigo-500 to-indigo-600"
        valueColor="text-indigo-600"
      />
    </div>
  );
};
