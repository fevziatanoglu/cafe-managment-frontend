import React from 'react';
import { Users, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { SummaryCard } from './SummaryCard';

interface Table {
  id: number;
  number: string;
  capacity: number;
  status: 'available' | 'occupied' | 'reserved' | 'cleaning';
  currentGuests?: number;
  estimatedTime?: string;
  waiter?: string;
}

interface TablesStatusProps {
  tables: Table[];
  onViewAll: () => void;
}

export const TablesStatus: React.FC<TablesStatusProps> = ({ tables, onViewAll }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available':
        return <CheckCircle className="h-4 w-4 text-green-700" />;
      case 'occupied':
        return <Users className="h-4 w-4 text-red-700" />;
      case 'reserved':
        return <Clock className="h-4 w-4 text-blue-700" />;
      case 'cleaning':
        return <AlertCircle className="h-4 w-4 text-yellow-700" />;
      default:
        return <CheckCircle className="h-4 w-4 text-gray-700" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-700';
      case 'occupied':
        return 'bg-red-100 text-red-700';
      case 'reserved':
        return 'bg-blue-100 text-blue-700';
      case 'cleaning':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available':
        return 'Available';
      case 'occupied':
        return 'Occupied';
      case 'reserved':
        return 'Reserved';
      case 'cleaning':
        return 'Cleaning';
      default:
        return 'Unknown';
    }
  };

  return (
    <SummaryCard
      title="Tables Status"
      icon={<Users className="h-6 w-6" />}
      iconColor="from-indigo-500 to-purple-600"
      onViewAll={onViewAll}
    >
      <div className="space-y-4">
        {tables.map(table => (
          <div key={table.id} className="flex items-center justify-between p-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
            <div className="flex items-center space-x-3">
              <div className="bg-indigo-100 p-2 rounded-lg">
                <span className="text-sm font-semibold text-indigo-700">T{table.number}</span>
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <p className="font-medium text-gray-900">Table {table.number}</p>
                  {getStatusIcon(table.status)}
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <span>Capacity: {table.capacity}</span>
                  {table.currentGuests && (
                    <>
                      <span>•</span>
                      <span>Guests: {table.currentGuests}</span>
                    </>
                  )}
                  {table.estimatedTime && (
                    <>
                      <span>•</span>
                      <span>{table.estimatedTime}</span>
                    </>
                  )}
                </div>
                {table.waiter && (
                  <p className="text-xs text-gray-500 mt-1">Waiter: {table.waiter}</p>
                )}
              </div>
            </div>
            <div className="text-right">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(table.status)}`}>
                {getStatusText(table.status)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </SummaryCard>
  );
};
