import React from 'react';
import { Edit2, Trash2, Users, Clock, DollarSign, User, CreditCard, FileText } from 'lucide-react';
import type { Order } from './Orders';

interface OrderCardProps {
  order: Order;
  onEdit: () => void;
  onDelete: () => void;
  onStatusChange: (status: Order['status']) => void;
  onPaymentStatusChange: (status: Order['paymentStatus']) => void;
}

export const OrderCard: React.FC<OrderCardProps> = ({ 
  order, 
  onEdit, 
  onDelete, 
  onStatusChange, 
  onPaymentStatusChange 
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'from-yellow-500 to-yellow-600';
      case 'preparing':
        return 'from-orange-500 to-orange-600';
      case 'ready':
        return 'from-green-500 to-green-600';
      case 'delivered':
        return 'from-green-600 to-green-700';
      case 'cancelled':
        return 'from-red-500 to-red-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'preparing':
        return 'bg-orange-100 text-orange-700';
      case 'ready':
        return 'bg-green-100 text-green-700';
      case 'delivered':
        return 'bg-green-200 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'paid':
        return 'bg-green-100 text-green-700';
      case 'refunded':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return '🟡';
      case 'preparing':
        return '🟠';
      case 'ready':
        return '🟢';
      case 'delivered':
        return '✅';
      case 'cancelled':
        return '❌';
      default:
        return '⚪';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-amber-100 hover:shadow-xl transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className={`bg-gradient-to-r ${getStatusColor(order.status)} p-3 rounded-xl`}>
            <div className="text-white text-sm font-bold">{order.orderNumber}</div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">{order.orderNumber}</h3>
            <p className="text-sm text-gray-600">Table {order.table}</p>
          </div>
        </div>
        <div className="flex flex-col items-end space-y-2">
          <div className="text-xl">{getStatusIcon(order.status)}</div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(order.status)}`}>
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </span>
        </div>
      </div>

      {/* Customer & Basic Info */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 rounded-xl p-3">
          <div className="flex items-center space-x-2 mb-2">
            <User className="h-4 w-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Customer</span>
          </div>
          <p className="font-semibold text-gray-900">{order.customer}</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-3">
          <div className="flex items-center space-x-2 mb-2">
            <DollarSign className="h-4 w-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Total</span>
          </div>
          <p className="font-semibold text-gray-900">${order.total}</p>
        </div>
      </div>

      {/* Order Items */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Order Items</h4>
        <div className="space-y-2 max-h-32 overflow-y-auto">
          {order.items.map(item => (
            <div key={item.id} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
              <div>
                <p className="font-medium text-gray-900">{item.name}</p>
                <p className="text-sm text-gray-600">{item.category}</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">
                  {item.quantity} × ${item.price}
                </p>
                <p className="text-sm font-semibold text-green-600">
                  ${item.quantity * item.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Info */}
      <div className="space-y-3 mb-6">
        {order.waiter && (
          <div className="flex items-center space-x-3 text-sm">
            <Users className="h-4 w-4 text-gray-600" />
            <span className="text-gray-700">Waiter: <strong>{order.waiter}</strong></span>
          </div>
        )}
        {order.paymentMethod && (
          <div className="flex items-center space-x-3 text-sm">
            <CreditCard className="h-4 w-4 text-gray-600" />
            <span className="text-gray-700">Payment: <strong>{order.paymentMethod}</strong></span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
              {order.paymentStatus}
            </span>
          </div>
        )}
        {order.notes && (
          <div className="flex items-start space-x-3 text-sm">
            <FileText className="h-4 w-4 text-gray-600 mt-0.5" />
            <span className="text-gray-700">Notes: <em>{order.notes}</em></span>
          </div>
        )}
        <div className="flex items-center space-x-3 text-sm">
          <Clock className="h-4 w-4 text-gray-600" />
          <span className="text-gray-700">Created: {formatDate(order.createdAt)}</span>
        </div>
      </div>

      {/* Status Change Buttons */}
      <div className="mb-6">
        <p className="text-sm font-medium text-gray-700 mb-3">Quick Actions:</p>
        <div className="flex flex-wrap gap-2 mb-3">
          {order.status !== 'preparing' && order.status !== 'delivered' && order.status !== 'cancelled' && (
            <button
              onClick={() => onStatusChange('preparing')}
              className="px-3 py-1 bg-orange-100 text-orange-700 rounded-lg text-xs font-medium hover:bg-orange-200 transition-colors"
            >
              Set Preparing
            </button>
          )}
          {order.status === 'preparing' && (
            <button
              onClick={() => onStatusChange('ready')}
              className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-medium hover:bg-green-200 transition-colors"
            >
              Set Ready
            </button>
          )}
          {order.status === 'ready' && (
            <button
              onClick={() => onStatusChange('delivered')}
              className="px-3 py-1 bg-green-200 text-green-800 rounded-lg text-xs font-medium hover:bg-green-300 transition-colors"
            >
              Set Delivered
            </button>
          )}
          {order.status !== 'delivered' && order.status !== 'cancelled' && (
            <button
              onClick={() => onStatusChange('cancelled')}
              className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-xs font-medium hover:bg-red-200 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
        
        {/* Payment Status Buttons */}
        <div className="flex flex-wrap gap-2">
          {order.paymentStatus === 'pending' && (
            <button
              onClick={() => onPaymentStatusChange('paid')}
              className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-medium hover:bg-green-200 transition-colors"
            >
              Mark Paid
            </button>
          )}
          {order.paymentStatus === 'paid' && order.status === 'cancelled' && (
            <button
              onClick={() => onPaymentStatusChange('refunded')}
              className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-xs font-medium hover:bg-red-200 transition-colors"
            >
              Refund
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
