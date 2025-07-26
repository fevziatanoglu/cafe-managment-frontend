import { Filter, Search } from 'lucide-react';
import type { ORDER } from '../../types/Order';

interface OrderListFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  sortBy: string;
  setSortBy: (sortBy: "createdAt" | "total" | "tableId" | "status") => void;
  sortOrder: 'asc' | 'desc';
  setSortOrder: (order: 'asc' | 'desc') => void;
  sortOptions: { value: string; label: string }[];
  selectedStatus: 'all' | 'pending' | 'preparing' | 'served' | 'paid';
  onStatusChange: (status: 'all' | 'pending' | 'preparing' | 'served' | 'paid') => void;
  orders: ORDER[];
}

export default function OrderListFilters({
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  sortOptions,
  selectedStatus,
  onStatusChange,
  orders,
}: OrderListFiltersProps) {
  const statusCounts = {
    all: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    preparing: orders.filter(o => o.status === 'preparing').length,
    served: orders.filter(o => o.status === 'served').length,
    paid: orders.filter(o => o.status === 'paid').length
  };

  const statusOptions = [
    {
      value: 'all' as const,
      label: 'All Orders',
      count: statusCounts.all,
      color: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
      icon: '📋'
    },
    {
      value: 'pending' as const,
      label: 'Pending',
      count: statusCounts.pending,
      color: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200',
      icon: '⏳'
    },
    {
      value: 'preparing' as const,
      label: 'Preparing',
      count: statusCounts.preparing,
      color: 'bg-blue-100 text-blue-700 hover:bg-blue-200',
      icon: '👨‍🍳'
    },
    {
      value: 'served' as const,
      label: 'Served',
      count: statusCounts.served,
      color: 'bg-green-100 text-green-700 hover:bg-green-200',
      icon: '✅'
    },
    {
      value: 'paid' as const,
      label: 'Paid',
      count: statusCounts.paid,
      color: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
      icon: '💰'
    }
  ];

  return (
    <div className="mb-6 space-y-6">
      {/* Search and Sort - Original */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Search */}
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search Orders
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by table or creator..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
        </div>
        {/* Sort */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sort By
          </label>
          <div className="flex space-x-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "createdAt" | "total" | "tableId" | "status")}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors"
            >
              {sortOrder === 'asc' ? '↑' : '↓'}
            </button>
          </div>
        </div>
      </div>

      {/* Status Filter - New */}
      <div className="bg-white rounded-2xl shadow-lg border border-amber-100 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-3 rounded-xl">
            <Filter className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Filter Orders by Status</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {statusOptions.map(option => (
            <button
              key={option.value}
              onClick={() => onStatusChange(option.value)}
              className={`flex items-center space-x-3 px-6 py-4 rounded-xl font-medium transition-all duration-300 ${
                selectedStatus === option.value
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg transform scale-105'
                  : option.color
                }`}
            >
              <span className="text-xl">{option.icon}</span>
              <div className="text-left">
                <div className="font-semibold">{option.label}</div>
                <div className={`text-sm ${
                  selectedStatus === option.value ? 'text-white opacity-90' : 'opacity-70'
                }`}>
                  {option.count} orders
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
