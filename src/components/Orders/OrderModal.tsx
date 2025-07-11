import React, { useState, useEffect } from 'react';
import { X, Save, ShoppingCart, Plus, Trash2 } from 'lucide-react';
import type { Order, OrderItem } from './Orders';

interface OrderModalProps {
  order: Order | null;
  onSave: (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onClose: () => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({ order, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    orderNumber: '',
    table: '',
    customer: '',
    status: 'pending' as Order['status'],
    items: [] as OrderItem[],
    waiter: '',
    notes: '',
    paymentMethod: 'cash' as Order['paymentMethod'],
    paymentStatus: 'pending' as Order['paymentStatus']
  });

  const [newItem, setNewItem] = useState({
    name: '',
    quantity: 1,
    price: 0,
    category: 'Beverage'
  });

  const availableItems = [
    { name: 'Turkish Coffee', price: 15, category: 'Beverage' },
    { name: 'Americano', price: 20, category: 'Beverage' },
    { name: 'Latte', price: 25, category: 'Beverage' },
    { name: 'Cappuccino', price: 22, category: 'Beverage' },
    { name: 'Espresso', price: 18, category: 'Beverage' },
    { name: 'Cheesecake', price: 35, category: 'Dessert' },
    { name: 'Croissant', price: 25, category: 'Snack' },
    { name: 'Muffin', price: 18, category: 'Snack' },
    { name: 'Sandwich', price: 45, category: 'Food' }
  ];

  useEffect(() => {
    if (order) {
      setFormData({
        orderNumber: order.orderNumber,
        table: order.table,
        customer: order.customer,
        status: order.status,
        items: order.items,
        waiter: order.waiter || '',
        notes: order.notes || '',
        paymentMethod: order.paymentMethod || 'cash',
        paymentStatus: order.paymentStatus
      });
    } else {
      // Generate new order number
      const orderNumber = `ORD-${Date.now().toString().slice(-6)}`;
      setFormData(prev => ({ ...prev, orderNumber }));
    }
  }, [order]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const total = formData.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    
    onSave({
      ...formData,
      total
    });
  };

  const handleItemSelect = (itemName: string) => {
    const selectedItem = availableItems.find(item => item.name === itemName);
    if (selectedItem) {
      setNewItem({
        name: selectedItem.name,
        quantity: 1,
        price: selectedItem.price,
        category: selectedItem.category
      });
    }
  };

  const addItem = () => {
    if (newItem.name && newItem.quantity > 0 && newItem.price > 0) {
      const item: OrderItem = {
        id: Date.now(),
        ...newItem
      };
      setFormData(prev => ({
        ...prev,
        items: [...prev.items, item]
      }));
      setNewItem({
        name: '',
        quantity: 1,
        price: 0,
        category: 'Beverage'
      });
    }
  };

  const removeItem = (itemId: number) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== itemId)
    }));
  };

  const updateItemQuantity = (itemId: number, quantity: number) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.map(item =>
        item.id === itemId ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    }));
  };

  const total = formData.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-xl">
                <ShoppingCart className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                {order ? 'Edit Order' : 'Add New Order'}
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
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Order Number
              </label>
              <input
                type="text"
                value={formData.orderNumber}
                onChange={(e) => setFormData(prev => ({ ...prev, orderNumber: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Table
              </label>
              <input
                type="text"
                value={formData.table}
                onChange={(e) => setFormData(prev => ({ ...prev, table: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Customer Name
              </label>
              <input
                type="text"
                value={formData.customer}
                onChange={(e) => setFormData(prev => ({ ...prev, customer: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Status and Payment */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Order Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as Order['status'] }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                <option value="pending">Pending</option>
                <option value="preparing">Preparing</option>
                <option value="ready">Ready</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Method
              </label>
              <select
                value={formData.paymentMethod}
                onChange={(e) => setFormData(prev => ({ ...prev, paymentMethod: e.target.value as Order['paymentMethod'] }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                <option value="cash">Cash</option>
                <option value="card">Card</option>
                <option value="digital">Digital</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Status
              </label>
              <select
                value={formData.paymentStatus}
                onChange={(e) => setFormData(prev => ({ ...prev, paymentStatus: e.target.value as Order['paymentStatus'] }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="refunded">Refunded</option>
              </select>
            </div>
          </div>

          {/* Waiter and Notes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Waiter (Optional)
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
                Notes (Optional)
              </label>
              <input
                type="text"
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Add Items */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Add Items
            </label>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <select
                value={newItem.name}
                onChange={(e) => handleItemSelect(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                <option value="">Select Item</option>
                {availableItems.map(item => (
                  <option key={item.name} value={item.name}>
                    {item.name} - ${item.price}
                  </option>
                ))}
              </select>
              <input
                type="number"
                min="1"
                value={newItem.quantity}
                onChange={(e) => setNewItem(prev => ({ ...prev, quantity: Number(e.target.value) }))}
                placeholder="Quantity"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
              <input
                type="number"
                min="0"
                step="0.01"
                value={newItem.price}
                onChange={(e) => setNewItem(prev => ({ ...prev, price: Number(e.target.value) }))}
                placeholder="Price"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={addItem}
                className="flex items-center justify-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Add</span>
              </button>
            </div>
          </div>

          {/* Order Items List */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Order Items
            </label>
            {formData.items.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No items added yet</p>
            ) : (
              <div className="space-y-3">
                {formData.items.map(item => (
                  <div key={item.id} className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-600">{item.category}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        <button
                          type="button"
                          onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
                        >
                          -
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">${item.price}</p>
                        <p className="text-sm text-green-600">${(item.quantity * item.price).toFixed(2)}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Total */}
          <div className="bg-amber-50 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-900">Total:</span>
              <span className="text-2xl font-bold text-amber-600">${total.toFixed(2)}</span>
            </div>
          </div>

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
              <span>{order ? 'Update Order' : 'Create Order'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
