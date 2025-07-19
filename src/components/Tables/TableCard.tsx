import { useState } from 'react';
import { Coffee, Edit2, Trash2, MoreVertical } from 'lucide-react';
import type { TABLE, TABLE_STATUS } from '../../types/Table';
import useStore from '../../store';
import TableForm from './TableForm';

interface TableCardProps {
  table: TABLE;
}

export default function TableCard({ table }: TableCardProps) {
  const { openModal , deleteTableFetch , pendingOrders , updateTableFetch } = useStore();
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


  const getStatusColor = (status: string) => {
    switch (status) {
      case 'empty': return 'from-green-500 to-green-600';
      case 'occupied': return 'from-red-500 to-red-600';
      case 'reserved': return 'from-blue-500 to-blue-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getCardBackground = (status: string) => {
    switch (status) {
      case 'empty': return 'bg-gradient-to-br from-green-50 to-green-100';
      case 'occupied': return 'bg-gradient-to-br from-red-50 to-red-100';
      case 'reserved': return 'bg-gradient-to-br from-blue-50 to-blue-100';
      default: return 'bg-white';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'empty': return 'Empty';
      case 'occupied': return 'Occupied';
      case 'reserved': return 'Reserved';
      default: return 'Unknown';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'empty': return 'bg-green-100 text-green-700';
      case 'occupied': return 'bg-red-100 text-red-700';
      case 'reserved': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'empty': return '✅';
      case 'occupied': return '🔴';
      case 'reserved': return '🔵';
      default: return '⚪';
    }
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this table?')) {
      await deleteTableFetch(table._id);
    }
    setShowActions(false);
  };

  const handleEdit = () => {
    openModal(<TableForm table={table} />, 'Edit Table');
  };

  const handleStatusChange = async (newStatus: TABLE_STATUS) => {
    await updateTableFetch(table._id, {
      status: newStatus,
      number: table.number
    });
  };


  return (
    <>
      <div className={`${getCardBackground(table.status)} rounded-2xl p-6 shadow-lg border border-amber-100 hover:shadow-xl transition-all duration-300 min-h-[300px] flex flex-col relative`}>
        {/* Actions Menu */}
        <div className="absolute top-4 right-4">
          <button
            onClick={() => setShowActions(!showActions)}
            className="p-2 rounded-lg bg-white/80 hover:bg-white shadow-sm transition-colors"
          >
            <MoreVertical className="h-4 w-4 text-gray-600" />
          </button>

          {showActions && (
            <div className="absolute top-12 right-0 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10 min-w-[120px]">
              <button
                onClick={() => openModal(<TableForm table={table} />, 'Edit Table')}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-amber-50 flex items-center space-x-2"
              >
                <Edit2 className="h-4 w-4" />
                <span>Edit</span>
              </button>
              <button
                onClick={handleDelete}
                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
              >
                <Trash2 className="h-4 w-4" />
                <span>Delete</span>
              </button>
            </div>
          )}
        </div>

        {/* Header Section */}
        <div className="flex items-center justify-between mb-6 pr-8">
          <div className="flex items-center space-x-4">
            <div className={`bg-gradient-to-r ${getStatusColor(table.status)} p-4 rounded-xl`}>
              <div className="text-white text-xl font-bold">T{table.number}</div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Table {table.number}</h3>
              <p className="text-sm text-gray-600">Cafe Table</p>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <div className="text-2xl">{getStatusIcon(table.status)}</div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(table.status)}`}>
              {getStatusText(table.status)}
            </span>
          </div>
        </div>

        {/* Status Info */}
        <div className="bg-white/70 rounded-xl p-4 mb-6 flex-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-2 rounded-lg">
                <Coffee className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <p className="text-lg font-bold text-gray-900">{getStatusText(table.status)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Status Change Buttons */}
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-700 mb-3">Quick Actions:</p>
          <div className="flex flex-wrap gap-2">
            {table.status !== 'empty' && (
              <button
                onClick={() => handleStatusChange('empty')}
                className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-medium hover:bg-green-200 transition-colors"
              >
                Set Empty
              </button>
            )}
            {table.status !== 'occupied' && (
              <button
                onClick={() => handleStatusChange('occupied')}
                className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-xs font-medium hover:bg-red-200 transition-colors"
              >
                Set Occupied
              </button>
            )}
            {table.status !== 'reserved' && (
              <button
                onClick={() => handleStatusChange('reserved')}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-medium hover:bg-blue-200 transition-colors"
              >
                Set Reserved
              </button>
            )}
          </div>
        </div>

        {/* Click to Edit Info */}
        <div className="mt-auto">
          <button
            onClick={handleEdit}
            className="w-full py-2 text-sm text-amber-600 hover:text-amber-700 transition-colors border border-amber-200 rounded-lg hover:bg-amber-50"
          >
            Click to edit table details
          </button>
        </div>
        <div className="mt-4">
          <h4 className="font-semibold text-amber-700 mb-2">Orders</h4>
          {pendingOrders.length === 0 ? (
            <div className="text-sm text-gray-400">No orders for this table.</div>
          ) : (
            <ul className="space-y-1">
              {pendingOrders.map(order => (
                <li key={order._id} className="text-xs text-gray-700 flex justify-between">
                  <span>
                    Order - {order.status}
                  </span>
                  <span>
                    {getMinutesAgo(order.createdAt)} | ₺{order.total}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

    </>
  );
}
