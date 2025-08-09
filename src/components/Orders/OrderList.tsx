import { useState } from 'react';
import useStore from '../../store';
import { Coffee } from 'lucide-react';
import OrderItem from './OrderItem';
import type { ORDER, ORDER_STATUS } from '../../types/Order';
import OrderItemSkeleton from './OrderItemSkeleton';
import OrderForm from './OrderForm';
import { GenericFilter, type FilterOption } from '../Common/GenericFilter';

export default function OrderList() {
  function getFilteredSortedOrders(
    orders: ORDER[],
    searchTerm: string,
    selectedStatus: 'all' | ORDER_STATUS,
    sortBy: 'createdAt' | 'total' | 'tableId' | 'status',
    sortOrder: 'asc' | 'desc'
  ): ORDER[] {
    return orders
      .filter(order => {
        const matchesSearch =
          order.tableName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (order.createdBy?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
        const matchesStatus =
          selectedStatus === 'all'
            ? true
            : order.status === selectedStatus;
        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        }
        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
        }
        return 0;
      });
  }
  const { orders, paidOrders , getPaidOrdersFetch, isOrdersLoading, openModal } = useStore();

  const [selectedStatus, setSelectedStatus] = useState<'all' | ORDER_STATUS>('all');
  const [sortBy, setSortBy] = useState<'createdAt' | 'total' | 'tableId' | 'status'>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [searchTerm, setSearchTerm] = useState('');

  const [showPaidOrders, setShowPaidOrders] = useState(false);

  const sortOptions = [
    { value: 'createdAt', label: 'Order Date' },
    { value: 'total', label: 'Total Amount' },
    { value: 'tableName', label: 'Table' },
    { value: 'status', label: 'Status' }
  ];

  const statusOptions: FilterOption<'all' | ORDER_STATUS>[] = [
    { value: 'all', label: 'All', count: orders.length, color: 'bg-gray-100 text-gray-700 hover:bg-gray-200', icon: '📋' },
    { value: 'pending', label: 'Pending', count: orders.filter(o => o.status === 'pending').length, color: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200', icon: '⏳' },
    { value: 'preparing', label: 'Preparing', count: orders.filter(o => o.status === 'preparing').length, color: 'bg-blue-100 text-blue-700 hover:bg-blue-200', icon: '👨‍🍳' },
    { value: 'served', label: 'Served', count: orders.filter(o => o.status === 'served').length, color: 'bg-green-100 text-green-700 hover:bg-green-200', icon: '✅' },
  ];

  const onStatusChange = (status: 'all' | ORDER_STATUS) => {
    setSelectedStatus(status);
  };

    const filteredOrders = getFilteredSortedOrders(
      showPaidOrders ? paidOrders : orders,
      searchTerm,
      selectedStatus,
      sortBy,
      sortOrder
    );

  const handleTogglePaidOrders = async () => {
    if (!showPaidOrders && paidOrders.length === 0) {
      await getPaidOrdersFetch();
    }
    setShowPaidOrders(prev => !prev);
    setSelectedStatus('all');
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <GenericFilter
        options={statusOptions}
        selected={selectedStatus}
        onChange={onStatusChange}
        onOpenModal={() => openModal(<OrderForm />, "Create New Order")}
        createLabel="Create Order"
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortBy={sortBy}
        setSortBy={(value: string) => setSortBy(value as "createdAt" | "total" | "tableId" | "status")} sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        sortOptions={sortOptions}
      />



      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-green-600">
          {showPaidOrders
            ? `Showing ${filteredOrders.length} of ${paidOrders.length} paid orders`
            : `Showing ${filteredOrders.length} of ${orders.length} orders`}
        </p>
        <button
          className={`px-3 py-1 rounded text-sm font-medium ${showPaidOrders ? 'bg-purple-100 text-purple-700 hover:bg-purple-200' : 'bg-green-100 text-green-700 hover:bg-green-200'}`}
          onClick={handleTogglePaidOrders}
          type="button"
        >
          {showPaidOrders ? 'Show All Orders' : 'Show Paid Orders'}
        </button>
      </div>



      {isOrdersLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4">
          {[1, 2, 3].map((index) => (
            <OrderItemSkeleton key={index} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4">
          {filteredOrders.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <Coffee className="h-16 w-16 text-amber-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-amber-800 mb-2">No orders found</h3>
              <p className="text-amber-600 mb-4">
                {searchTerm || selectedStatus !== 'all'
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
