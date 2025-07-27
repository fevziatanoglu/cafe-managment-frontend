import { useState } from 'react';
import { Coffee, Edit2, Trash2, MoreVertical, Clock, Utensils, Calendar, CheckCircle } from 'lucide-react';
import type { TABLE_STATUS, TABLE_WITH_ORDERS } from '../../types/Table';
import useStore from '../../store';
import TableForm from './TableForm';

interface TableCardProps {
  table: TABLE_WITH_ORDERS;
}

export default function TableItem({ table }: TableCardProps) {
  const { openModal, deleteTableFetch, updateTableFetch } = useStore();
  const [showActions, setShowActions] = useState(false);

  const getMinutesAgo = (dateString: string) => {
    const orderDate = new Date(dateString.replace(' ', 'T'));
    const now = new Date();
    const diffMs = now.getTime() - orderDate.getTime();
    const diffMin = Math.floor(diffMs / 60000);
    if (diffMin < 1) return 'just now';
    if (diffMin === 1) return '1 minute ago';
    return `${diffMin} minutes ago`;
  }

  const getTableStyle = (status: string) => {
    switch (status) {
      case 'empty':
        return {
          background: 'bg-gradient-to-br from-green-50 via-white to-green-100',
          tableColor: 'bg-gradient-to-br from-amber-600 via-amber-500 to-amber-700',
          borderColor: 'border-green-300',
          shadowColor: 'shadow-green-200',
          statusColor: 'text-green-700',
          statusBg: 'bg-green-100',
          tableTop: 'bg-gradient-to-br from-amber-200 via-amber-100 to-amber-300'
        };
      case 'occupied':
        return {
          background: 'bg-gradient-to-br from-red-50 via-white to-red-100',
          tableColor: 'bg-gradient-to-br from-amber-600 via-amber-500 to-amber-700',
          borderColor: 'border-red-300',
          shadowColor: 'shadow-red-200',
          statusColor: 'text-red-700',
          statusBg: 'bg-red-100',
          tableTop: 'bg-gradient-to-br from-red-200 via-red-100 to-red-300'
        };
      case 'reserved':
        return {
          background: 'bg-gradient-to-br from-blue-50 via-white to-blue-100',
          tableColor: 'bg-gradient-to-br from-amber-600 via-amber-500 to-amber-700',
          borderColor: 'border-blue-300',
          shadowColor: 'shadow-blue-200',
          statusColor: 'text-blue-700',
          statusBg: 'bg-blue-100',
          tableTop: 'bg-gradient-to-br from-blue-200 via-blue-100 to-blue-300'
        };
      default:
        return {
          background: 'bg-gradient-to-br from-gray-50 via-white to-gray-100',
          tableColor: 'bg-gradient-to-br from-amber-600 via-amber-500 to-amber-700',
          borderColor: 'border-gray-300',
          shadowColor: 'shadow-gray-200',
          statusColor: 'text-gray-700',
          statusBg: 'bg-gray-100',
          tableTop: 'bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300'
        };
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'empty': return <CheckCircle className="h-8 w-8 text-green-600" />;
      case 'occupied': return <Utensils className="h-8 w-8 text-red-600" />;
      case 'reserved': return <Calendar className="h-8 w-8 text-blue-600" />;
      default: return <Coffee className="h-8 w-8 text-gray-600" />;
    }
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this table?')) {
      await deleteTableFetch(table._id);
    }
    setShowActions(false);
  };

  const handleStatusChange = async (newStatus: TABLE_STATUS) => {
    await updateTableFetch(table._id, {
      status: newStatus,
      number: table.number
    });
  };

  const tableStyle = getTableStyle(table.status);

  return (
    <div className={`${tableStyle.background} rounded-3xl p-6 ${tableStyle.shadowColor} shadow-xl border-2 ${tableStyle.borderColor} hover:shadow-2xl transition-all duration-300 min-h-[280px] flex flex-col relative overflow-hidden`}>
      {/* Header and Status Row */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2 md:space-x-3">
          <h3 className="text-lg md:text-xl font-bold text-gray-800">Table {table.number}</h3>
          <span className={`px-2 py-1 md:px-3 rounded-full text-xs md:text-sm font-semibold ${tableStyle.statusBg} ${tableStyle.statusColor} border-2 border-current/30`}>
            {table.status.charAt(0).toUpperCase() + table.status.slice(1)}
          </span>
        </div>

        {/* Actions Menu */}
        <button
          onClick={() => setShowActions(!showActions)}
          className="p-2 rounded-full bg-white/80 hover:bg-white shadow-lg transition-colors backdrop-blur-sm hover:cursor-pointer "
          >
          <MoreVertical className="h-4 w-4 text-gray-600" />
        </button>

        {showActions && (
          <div className="absolute top-12 right-4 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-20 min-w-[140px] backdrop-blur-sm">
            <button
              onClick={() => openModal(<TableForm table={table} />, 'Edit Table')}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-amber-50 flex items-center space-x-2 transition-colors"
            >
              <Edit2 className="h-4 w-4" />
              <span>Edit Table</span>
            </button>
            <button
              onClick={handleDelete}
              className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
              <span>Delete</span>
            </button>
          </div>
        )}
      </div>

      {/* Table Visual Representation */}
      <div className="flex flex-col items-center mb-4 flex-1">
        {/* Table Top View */}
        <div className="relative">
          {/* Table Base/Legs */}
          <div className={`w-32 h-32 ${tableStyle.tableColor} rounded-full shadow-2xl border-4 border-amber-800 relative`}>
            {/* Table Top Surface */}
            <div className={`absolute inset-2 ${tableStyle.tableTop} rounded-full shadow-inner border-2 border-amber-300 flex flex-col items-center justify-center`}>
              {/* Table Number */}
              <div className="text-2xl font-bold text-amber-900 mb-1">
                {table.number}
              </div>
              
              {/* Status Icon */}
              <div>
                {getStatusIcon(table.status)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Orders Section - Only show if there are orders */}
      {table.orders.length > 0 && (
        <div className="mb-4 bg-white/80 backdrop-blur-sm rounded-xl p-4 border-2 border-white/60">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-gray-700 flex items-center space-x-2">
              <Coffee className="h-4 w-4" />
              <span>Waited Orders</span>
            </h4>
            <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm font-bold">
              {table.orders.length}
            </span>
          </div>
          
          <div className="space-y-2 max-h-24 overflow-y-auto">
            {table.orders.slice(0, 3).map(order => (
              <div key={order._id} className="bg-white/90 rounded-lg p-2 border border-gray-200">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <span className={`w-3 h-3 rounded-full ${
                      order.status === 'pending' ? 'bg-yellow-400' :
                      order.status === 'preparing' ? 'bg-blue-400' :
                      order.status === 'served' ? 'bg-green-400' : 'bg-gray-400'
                    }`}></span>
                    <span className="text-sm font-medium text-gray-700">
                      #{order._id.slice(-4)}
                    </span>
                  </div>
                  <span className="text-sm font-bold text-amber-600">
                    ₺{order.total.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs text-gray-500 capitalize">
                    {order.status}
                  </span>
                  <div className="flex items-center space-x-1 text-xs text-gray-400">
                    <Clock className="h-3 w-3" />
                    <span>{getMinutesAgo(order.createdAt)}</span>
                  </div>
                </div>
              </div>
            ))}
            {table.orders.length > 3 && (
              <div className="text-center text-xs text-gray-500 pt-1">
                +{table.orders.length - 3} more orders
              </div>
            )}
          </div>
        </div>
      )}

      {/* Quick Status Actions - Always at bottom */}
      <div className="mt-auto">
        <div className="flex justify-center gap-1 md:gap-2">
          {table.status !== 'empty' && (
            <button
              onClick={() => handleStatusChange('empty')}
              className="flex items-center space-x-1 md:space-x-2 px-2 py-2 md:px-4 md:py-3 bg-green-100 text-green-700 rounded-xl text-xs md:text-sm font-medium hover:bg-green-200 transition-colors border-2 border-green-200 shadow-lg hover:shadow-xl"
              title="Set Empty"
            >
              <CheckCircle className="h-4 w-4 md:h-5 md:w-5" />
              <span>Empty</span>
            </button>
          )}
          {table.status !== 'occupied' && (
            <button
              onClick={() => handleStatusChange('occupied')}
              className="flex items-center space-x-1 md:space-x-2 px-2 py-2 md:px-4 md:py-3 bg-red-100 text-red-700 rounded-xl text-xs md:text-sm font-medium hover:bg-red-200 transition-colors border-2 border-red-200 shadow-lg hover:shadow-xl"
              title="Set Occupied"
            >
              <Utensils className="h-4 w-4 md:h-5 md:w-5" />
              <span>Occupied</span>
            </button>
          )}
          {table.status !== 'reserved' && (
            <button
              onClick={() => handleStatusChange('reserved')}
              className="flex items-center space-x-1 md:space-x-2 px-2 py-2 md:px-4 md:py-3 bg-blue-100 text-blue-700 rounded-xl text-xs md:text-sm font-medium hover:bg-blue-200 transition-colors border-2 border-blue-200 shadow-lg hover:shadow-xl"
              title="Set Reserved"
            >
              <Calendar className="h-4 w-4 md:h-5 md:w-5" />
              <span>Reserved</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
