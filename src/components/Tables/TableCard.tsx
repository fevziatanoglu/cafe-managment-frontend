import React from 'react';
import { Edit2, Trash2, Users, Clock, DollarSign, User } from 'lucide-react';
import type { Table } from './Tables';

interface TableCardProps {
  table: Table;
  onEdit: () => void;
  onDelete: () => void;
  onStatusChange: (status: Table['status']) => void;
}

export const TableCard: React.FC<TableCardProps> = ({ table, onEdit, onDelete, onStatusChange }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'from-green-500 to-green-600';
      case 'occupied':
        return 'from-red-500 to-red-600';
      case 'reserved':
        return 'from-blue-500 to-blue-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getCardBackground = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-gradient-to-br from-green-50 to-green-100';
      case 'occupied':
        return 'bg-gradient-to-br from-red-50 to-red-100';
      case 'reserved':
        return 'bg-gradient-to-br from-blue-50 to-blue-100';
      default:
        return 'bg-white';
    }
  };

  const getCardBorder = (status: string) => {
    switch (status) {
      case 'available':
        return 'border-green-200';
      case 'occupied':
        return 'border-red-200';
      case 'reserved':
        return 'border-blue-200';
      default:
        return 'border-amber-100';
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
      default:
        return 'Unknown';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-700';
      case 'occupied':
        return 'bg-red-100 text-red-700';
      case 'reserved':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available':
        return '✅';
      case 'occupied':
        return '🔴';
      case 'reserved':
        return '🔵';
      default:
        return '⚪';
    }
  };

  return (
    <div className={`${getCardBackground(table.status)} rounded-2xl p-6 shadow-lg border ${getCardBorder(table.status)} hover:shadow-xl transition-all duration-300 min-h-[420px] flex flex-col`}>
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className={`bg-gradient-to-r ${getStatusColor(table.status)} p-4 rounded-xl`}>
            <div className="text-white text-xl font-bold">T{table.number}</div>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Table {table.number}</h3>
            <p className="text-sm text-gray-600">{table.location}</p>
          </div>
        </div>
        <div className="flex flex-col items-end space-y-2">
          <div className="text-2xl">{getStatusIcon(table.status)}</div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(table.status)}`}>
            {getStatusText(table.status)}
          </span>
        </div>
      </div>

      {/* Basic Info */}
      <div className="bg-white/70 rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-2 rounded-lg">
              <Users className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Capacity</p>
              <p className="text-lg font-bold text-gray-900">{table.capacity} people</p>
            </div>
          </div>
        </div>
      </div>

      {/* Status-specific Information - Fixed height container */}
      <div className="flex-1 mb-6">
        {table.status === 'occupied' && (
          <div className="bg-white/70 rounded-xl p-4 h-full">
            <h4 className="font-semibold text-red-800 mb-3">Occupied Details</h4>
            <div className="space-y-2">
              {table.currentGuests && (
                <div className="flex items-center space-x-3 text-sm">
                  <Users className="h-4 w-4 text-red-600" />
                  <span className="text-gray-700">Current Guests: <strong>{table.currentGuests}</strong></span>
                </div>
              )}
              {table.waiter && (
                <div className="flex items-center space-x-3 text-sm">
                  <User className="h-4 w-4 text-red-600" />
                  <span className="text-gray-700">Waiter: <strong>{table.waiter}</strong></span>
                </div>
              )}
              {table.orderTotal && (
                <div className="flex items-center space-x-3 text-sm">
                  <DollarSign className="h-4 w-4 text-red-600" />
                  <span className="text-gray-700">Order Total: <strong>${table.orderTotal}</strong></span>
                </div>
              )}
              {table.estimatedTime && (
                <div className="flex items-center space-x-3 text-sm">
                  <Clock className="h-4 w-4 text-red-600" />
                  <span className="text-gray-700">Estimated Time: <strong>{table.estimatedTime}</strong></span>
                </div>
              )}
            </div>
          </div>
        )}

        {table.status === 'reserved' && (
          <div className="bg-white/70 rounded-xl p-4 h-full">
            <h4 className="font-semibold text-blue-800 mb-3">Reservation Details</h4>
            <div className="space-y-2">
              {table.reservationName && (
                <div className="flex items-center space-x-3 text-sm">
                  <User className="h-4 w-4 text-blue-600" />
                  <span className="text-gray-700">Reserved by: <strong>{table.reservationName}</strong></span>
                </div>
              )}
              {table.reservationTime && (
                <div className="flex items-center space-x-3 text-sm">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <span className="text-gray-700">Time: <strong>{table.reservationTime}</strong></span>
                </div>
              )}
              {table.estimatedTime && (
                <div className="flex items-center space-x-3 text-sm">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <span className="text-gray-700">Estimated: <strong>{table.estimatedTime}</strong></span>
                </div>
              )}
            </div>
          </div>
        )}

        {table.status === 'available' && (
          <div className="bg-white/70 rounded-xl p-4 h-full flex items-center justify-center">
            <div className="text-center text-gray-600">
              <p className="text-sm">This table is ready for new guests</p>
            </div>
          </div>
        )}
      </div>

      {/* Quick Status Change Buttons */}
      <div className="mb-6">
        <p className="text-sm font-medium text-gray-700 mb-3">Quick Actions:</p>
        <div className="flex flex-wrap gap-2">
          {table.status !== 'available' && (
            <button
              onClick={() => onStatusChange('available')}
              className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors"
            >
              Set Available
            </button>
          )}
          {table.status !== 'occupied' && (
            <button
              onClick={() => onStatusChange('occupied')}
              className="px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors"
            >
              Set Occupied
            </button>
          )}
          {table.status !== 'reserved' && (
            <button
              onClick={() => onStatusChange('reserved')}
              className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors"
            >
              Set Reserved
            </button>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-3">
        <button
          onClick={onEdit}
          className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
        >
          <Edit2 className="h-4 w-4" />
          <span className="font-medium">Edit</span>
        </button>
        <button
          onClick={onDelete}
          className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105"
        >
          <Trash2 className="h-4 w-4" />
          <span className="font-medium">Delete</span>
        </button>
      </div>
    </div>
  );
};
