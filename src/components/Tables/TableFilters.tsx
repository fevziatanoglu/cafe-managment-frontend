import { Filter } from 'lucide-react';
import type { TABLE_WITH_ORDERS } from '../../types/Table';

interface TableFiltersProps {
  selectedStatus: 'all' | 'empty' | 'occupied' | 'reserved';
  onStatusChange: (status: 'all' | 'empty' | 'occupied' | 'reserved') => void;
  tables: TABLE_WITH_ORDERS[];
}

export default function TableFilters({
  selectedStatus,
  onStatusChange,
  tables,
}: TableFiltersProps) {
  // Status counts and options
  const statusCounts = {
    all: tables.length,
    empty: tables.filter(t => t.status === 'empty').length,
    occupied: tables.filter(t => t.status === 'occupied').length,
    reserved: tables.filter(t => t.status === 'reserved').length
  };

  const statusOptions = [
    {
      value: 'all' as const,
      label: 'All Tables',
      count: statusCounts.all,
      color: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
      icon: '🏪'
    },
    {
      value: 'empty' as const,
      label: 'Empty',
      count: statusCounts.empty,
      color: 'bg-green-100 text-green-700 hover:bg-green-200',
      icon: '✅'
    },
    {
      value: 'occupied' as const,
      label: 'Occupied',
      count: statusCounts.occupied,
      color: 'bg-red-100 text-red-700 hover:bg-red-200',
      icon: '🔴'
    },
    {
      value: 'reserved' as const,
      label: 'Reserved',
      count: statusCounts.reserved,
      color: 'bg-blue-100 text-blue-700 hover:bg-blue-200',
      icon: '🔵'
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-amber-100 p-6 mb-8">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-xl">
          <Filter className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Filter Tables by Status</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statusOptions.map(option => (
          <button
            key={option.value}
            onClick={() => onStatusChange(option.value)}
            className={`flex items-center space-x-3 px-6 py-4 rounded-xl font-medium transition-all duration-300 hover:cursor-pointer ${
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
                {option.count} tables
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
