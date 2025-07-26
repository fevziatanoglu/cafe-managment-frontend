import { useState } from 'react';
import useStore from '../../store';
import { Coffee } from 'lucide-react';
import OrderItem from './OrderItem';
import OrderListFilters from './OrderFilters';
import type { ORDER, ORDER_STATUS } from '../../types';
import OrderItemSkeleton from './OrderItemSkeleton';

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
        selectedStatus={selectedStatus === null ? 'all' : selectedStatus}
        onStatusChange={status => setSelectedStatus(status === 'all' ? null : status)}
        orders={orders}
      />

      {/* Order Count */}
      <div className="mb-4">
        <p className="text-sm text-amber-600">
          Showing {filteredOrders.length} of {orders.length} orders
        </p>
      </div>

      {/* Order List */}
      {isOrdersLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[1, 2, 3].map((index) => (
            <OrderItemSkeleton key={index} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols- gap-4">
          {filteredOrders.length === 0 ? (
            <div className="col-span-full text-center py-12">
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
