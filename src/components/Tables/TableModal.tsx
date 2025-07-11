import React, { useState, useEffect } from 'react';
import { X, Save, TableProperties } from 'lucide-react';
import type { Table } from './Tables';

interface TableModalProps {
  table: Table | null;
  onSave: (table: Omit<Table, 'id'>) => void;
  onClose: () => void;
}

export const TableModal: React.FC<TableModalProps> = ({ table, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    number: '',
    capacity: 2,
    status: 'available' as Table['status'],
    location: '',
    currentGuests: 0,
    estimatedTime: '',
    waiter: '',
    reservationName: '',
    reservationTime: '',
    orderTotal: 0
  });

  useEffect(() => {
    if (table) {
      setFormData({
        number: table.number,
        capacity: table.capacity,
        status: table.status,
        location: table.location,
        currentGuests: table.currentGuests || 0,
        estimatedTime: table.estimatedTime || '',
        waiter: table.waiter || '',
        reservationName: table.reservationName || '',
        reservationTime: table.reservationTime || '',
        orderTotal: table.orderTotal || 0
      });
    }
  }, [table]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tableData: Omit<Table, 'id'> = {
      ...formData,
      currentGuests: formData.currentGuests > 0 ? formData.currentGuests : undefined,
      estimatedTime: formData.estimatedTime || undefined,
      waiter: formData.waiter || undefined,
      reservationName: formData.reservationName || undefined,
      reservationTime: formData.reservationTime || undefined,
      orderTotal: formData.orderTotal > 0 ? formData.orderTotal : undefined
    };
    onSave(tableData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-3 rounded-xl">
                <TableProperties className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                {table ? 'Edit Table' : 'Add New Table'}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-6 w-6 text-gray-500" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Table Number
              </label>
              <input
                type="text"
                value={formData.number}
                onChange={(e) => setFormData(prev => ({ ...prev, number: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Capacity
              </label>
              <select
                value={formData.capacity}
                onChange={(e) => setFormData(prev => ({ ...prev, capacity: Number(e.target.value) }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                required
              >
                <option value={2}>2 people</option>
                <option value={4}>4 people</option>
                <option value={6}>6 people</option>
                <option value={8}>8 people</option>
                <option value={10}>10 people</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <select
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                required
              >
                <option value="">Select Location</option>
                <option value="Main Hall">Main Hall</option>
                <option value="Window Side">Window Side</option>
                <option value="VIP Area">VIP Area</option>
                <option value="Garden Area">Garden Area</option>
                <option value="Balcony">Balcony</option>
                <option value="Private Room">Private Room</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as Table['status'] }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                <option value="available">Available</option>
                <option value="occupied">Occupied</option>
                <option value="reserved">Reserved</option>
                <option value="cleaning">Cleaning</option>
              </select>
            </div>
          </div>

          {/* Status-specific fields */}
          {formData.status === 'occupied' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Guests
                </label>
                <input
                  type="number"
                  min="0"
                  max={formData.capacity}
                  value={formData.currentGuests}
                  onChange={(e) => setFormData(prev => ({ ...prev, currentGuests: Number(e.target.value) }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Waiter
                </label>
                <input
                  type="text"
                  value={formData.waiter}
                  onChange={(e) => setFormData(prev => ({ ...prev, waiter: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Order Total ($)
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.orderTotal}
                  onChange={(e) => setFormData(prev => ({ ...prev, orderTotal: Number(e.target.value) }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

          {formData.status === 'reserved' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reservation Name
                </label>
                <input
                  type="text"
                  value={formData.reservationName}
                  onChange={(e) => setFormData(prev => ({ ...prev, reservationName: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reservation Time
                </label>
                <input
                  type="time"
                  value={formData.reservationTime}
                  onChange={(e) => setFormData(prev => ({ ...prev, reservationTime: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

          {(formData.status === 'occupied' || formData.status === 'reserved') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estimated Time
              </label>
              <input
                type="text"
                placeholder="e.g., 30 min"
                value={formData.estimatedTime}
                onChange={(e) => setFormData(prev => ({ ...prev, estimatedTime: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
          )}

          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg hover:from-amber-700 hover:to-orange-700 transition-all duration-300"
            >
              <Save className="h-5 w-5" />
              <span>{table ? 'Update' : 'Create'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
