import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShoppingCart, 
  Users, 
  DollarSign,
  TableProperties
} from 'lucide-react';
import { RevenueChart } from './RevenueChart';
import { DashboardHeader } from './DashboardHeader';
import { StatsCard } from './StatsCard';
import { RecentOrders } from './RecentOrders';
import { StaffList } from './StaffList';
import { PopularMenu } from './PopularMenu';
import { TablesStatus } from './TablesStatus';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const recentOrders = [
    { id: 1, table: '5', customer: 'John D.', amount: 125, time: '14:30', status: 'completed' as const },
    { id: 2, table: '2', customer: 'Sarah M.', amount: 89, time: '14:15', status: 'preparing' as const },
    { id: 3, table: '8', customer: 'Mike K.', amount: 156, time: '13:45', status: 'completed' as const },
    { id: 4, table: '3', customer: 'Emma S.', amount: 67, time: '13:30', status: 'completed' as const }
  ];

  const employees = [
    { id: 1, name: 'John Smith', position: 'Waiter', status: 'active' as const, avatar: '👨‍💼' },
    { id: 2, name: 'Sarah Johnson', position: 'Cashier', status: 'active' as const, avatar: '👩‍💼' },
    { id: 3, name: 'Mike Brown', position: 'Chef', status: 'break' as const, avatar: '👨‍🍳' },
    { id: 4, name: 'Emma Wilson', position: 'Waiter', status: 'active' as const, avatar: '👩‍💼' }
  ];

  const menuItems = [
    { id: 1, name: 'Turkish Coffee', price: 15, category: 'Beverage', orders: 23, trending: true },
    { id: 2, name: 'Cheesecake', price: 35, category: 'Dessert', orders: 12, trending: false },
    { id: 3, name: 'Americano', price: 20, category: 'Beverage', orders: 18, trending: true },
    { id: 4, name: 'Croissant', price: 25, category: 'Snack', orders: 8, trending: false }
  ];


  const tables = [
    { id: 1, number: '1', capacity: 4, status: 'occupied' as const, currentGuests: 3, estimatedTime: '20 min', waiter: 'John Smith' },
    { id: 2, number: '2', capacity: 2, status: 'available' as const },
    { id: 3, number: '3', capacity: 6, status: 'reserved' as const, estimatedTime: '15 min' },
    { id: 4, number: '4', capacity: 4, status: 'cleaning' as const },
    { id: 5, number: '5', capacity: 8, status: 'occupied' as const, currentGuests: 6, estimatedTime: '30 min', waiter: 'Emma Wilson' }
  ];

  const todayStats = {
    totalRevenue: 2847,
    totalOrders: 156,
    avgOrderValue: 18.25,
    growth: 12.5
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <DashboardHeader totalRevenue={todayStats.totalRevenue} growth={todayStats.growth} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Orders"
            value={todayStats.totalOrders}
            icon={ShoppingCart}
            iconColor="from-blue-500 to-blue-600"
          />
          <StatsCard
            title="Average Order"
            value={`$${todayStats.avgOrderValue}`}
            icon={DollarSign}
            iconColor="from-green-500 to-green-600"
          />
          <StatsCard
            title="Active Staff"
            value={employees.filter(e => e.status === 'active').length}
            icon={Users}
            iconColor="from-purple-500 to-purple-600"
          />
          <StatsCard
            title="Available Tables"
            value={tables.filter(t => t.status === 'available').length}
            icon={TableProperties}
            iconColor="from-indigo-500 to-purple-600"
          />
        </div>

        <div className="mb-8">
          <RevenueChart />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <RecentOrders orders={recentOrders} onViewAll={() => navigate('/orders')} />
          <StaffList employees={employees} onViewAll={() => navigate('/employees')} />
          <PopularMenu menuItems={menuItems} onViewAll={() => navigate('/menu')} />
          <TablesStatus tables={tables} onViewAll={() => navigate('/tables')} />
        </div>
      </div>
    </div>
  );
};
