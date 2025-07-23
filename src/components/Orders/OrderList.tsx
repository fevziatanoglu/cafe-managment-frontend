import { useState } from 'react';
import useStore from '../../store';
import { Coffee } from 'lucide-react';
import OrderItem from './OrderItem';
import OrderListFilters from './OrderFilters';
import OrderListStatusBar from './OrderListStatusBar';
import type { ORDER, ORDER_STATUS } from '../../types';

export default function OrderList() {
  const { orders, isOrdersLoading } = useStore();

  // Local filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<ORDER_STATUS | null>(null);
  const [sortBy, setSortBy] = useState<'createdAt' | 'total' | 'tableId' | 'status'>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Filter and sort logic
  let filteredOrders = orders.filter(order => {
    const matchesSearch =
      order.tableId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order.createdBy?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
    const matchesStatus =
      !selectedStatus
        ? true
        : order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  filteredOrders = filteredOrders.sort((a: ORDER, b: ORDER) => {
    const aValue = a[sortBy as keyof ORDER];
    const bValue = b[sortBy as keyof ORDER];
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      if (sortOrder === 'asc') return aValue.localeCompare(bValue);
      else return bValue.localeCompare(aValue);
    }
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      if (sortOrder === 'asc') return aValue - bValue;
      else return bValue - aValue;
    }
    return 0;
  });

  // Status options for filter
  const statusOptions = [
    { value: 'all', label: 'All', count: orders.length },
    { value: 'pending', label: 'Pending', count: orders.filter(o => o.status === 'pending').length },
    { value: 'preparing', label: 'Preparing', count: orders.filter(o => o.status === 'preparing').length },
    { value: 'served', label: 'Served', count: orders.filter(o => o.status === 'served').length },
    { value: 'paid', label: 'Paid', count: orders.filter(o => o.status === 'paid').length }
  ];

  // Sort options
  const sortOptions = [
    { value: 'createdAt', label: 'Order Date' },
    { value: 'total', label: 'Total Amount' },
    { value: 'tableId', label: 'Table' },
    { value: 'status', label: 'Status' }
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      {/* Filter Bar */}
      <OrderListFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        sortOptions={sortOptions}
      />

      {/* Status Filter Buttons */}
      <OrderListStatusBar
        selectedStatus={selectedStatus === null ? 'all' : selectedStatus}
        setSelectedStatus={status => setSelectedStatus(status === 'all' ? null : status)}
        statusOptions={statusOptions}
      />

      {/* Order Count */}
      <div className="mb-4">
        <p className="text-sm text-amber-600">
          Showing {filteredOrders.length} of {orders.length} orders
        </p>
      </div>

      {/* Order List */}
      {isOrdersLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
          <span className="ml-2 text-amber-600">Loading orders...</span>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-12">
              <Coffee className="h-16 w-16 text-amber-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-amber-800 mb-2">No orders found</h3>
              <p className="text-amber-600 mb-4">
                {searchTerm || selectedStatus !== null
                  ? 'Try adjusting your search or filter criteria.'
                  : 'No orders yet.'
                }
              </p>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <OrderItem order={order} key={order._id} />
            ))
          )}
        </div>
      )}
    </div>
  );
}
