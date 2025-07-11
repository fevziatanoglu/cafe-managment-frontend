import React, { useState, useMemo } from 'react';
import { ShoppingCart } from 'lucide-react';
import { OrderCard } from './OrderCard';
import { OrderModal } from './OrderModal';
import { OrderHeader } from './OrderHeader';
import { OrderStats } from './OrderStats';
import { OrderFilters } from './OrderFilters';


export interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
  category: string;
}

export interface Order {
  id: number;
  orderNumber: string;
  table: string;
  customer: string;
  status: 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  items: OrderItem[];
  total: number;
  createdAt: string;
  updatedAt: string;
  waiter?: string;
  notes?: string;
  paymentMethod?: 'cash' | 'card' | 'digital';
  paymentStatus: 'pending' | 'paid' | 'refunded';
}

export const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 1,
      orderNumber: 'ORD-001',
      table: '5',
      customer: 'John Doe',
      status: 'preparing',
      items: [
        { id: 1, name: 'Turkish Coffee', quantity: 2, price: 15, category: 'Beverage' },
        { id: 2, name: 'Cheesecake', quantity: 1, price: 35, category: 'Dessert' }
      ],
      total: 65,
      createdAt: '2024-01-15T14:30:00Z',
      updatedAt: '2024-01-15T14:35:00Z',
      waiter: 'John Smith',
      notes: 'Extra sugar for coffee',
      paymentMethod: 'card',
      paymentStatus: 'pending'
    },
    {
      id: 2,
      orderNumber: 'ORD-002',
      table: '2',
      customer: 'Sarah Johnson',
      status: 'delivered',
      items: [
        { id: 3, name: 'Americano', quantity: 1, price: 20, category: 'Beverage' },
        { id: 4, name: 'Croissant', quantity: 2, price: 25, category: 'Snack' }
      ],
      total: 70,
      createdAt: '2024-01-15T13:45:00Z',
      updatedAt: '2024-01-15T14:15:00Z',
      waiter: 'Emma Wilson',
      paymentMethod: 'cash',
      paymentStatus: 'paid'
    },
    {
      id: 3,
      orderNumber: 'ORD-003',
      table: '8',
      customer: 'Mike Brown',
      status: 'ready',
      items: [
        { id: 5, name: 'Latte', quantity: 1, price: 25, category: 'Beverage' },
        { id: 6, name: 'Sandwich', quantity: 1, price: 45, category: 'Food' }
      ],
      total: 70,
      createdAt: '2024-01-15T15:00:00Z',
      updatedAt: '2024-01-15T15:20:00Z',
      waiter: 'Lisa Chen',
      paymentMethod: 'digital',
      paymentStatus: 'pending'
    },
    {
      id: 4,
      orderNumber: 'ORD-004',
      table: '3',
      customer: 'Emma Davis',
      status: 'pending',
      items: [
        { id: 7, name: 'Cappuccino', quantity: 2, price: 22, category: 'Beverage' },
        { id: 8, name: 'Muffin', quantity: 1, price: 18, category: 'Snack' }
      ],
      total: 62,
      createdAt: '2024-01-15T15:30:00Z',
      updatedAt: '2024-01-15T15:30:00Z',
      waiter: 'John Smith',
      paymentMethod: 'card',
      paymentStatus: 'pending'
    },
    {
      id: 5,
      orderNumber: 'ORD-005',
      table: '7',
      customer: 'David Wilson',
      status: 'cancelled',
      items: [
        { id: 9, name: 'Espresso', quantity: 1, price: 18, category: 'Beverage' }
      ],
      total: 18,
      createdAt: '2024-01-15T14:00:00Z',
      updatedAt: '2024-01-15T14:05:00Z',
      waiter: 'Emma Wilson',
      notes: 'Customer left',
      paymentMethod: 'cash',
      paymentStatus: 'refunded'
    }
  ]);

  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState('all');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);

  const filteredAndSortedOrders = useMemo(() => {
    let filtered = orders.filter(order => {
      const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
      const matchesPaymentStatus = selectedPaymentStatus === 'all' || order.paymentStatus === selectedPaymentStatus;
      const matchesSearch = 
        order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.table.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesStatus && matchesPaymentStatus && matchesSearch;
    });

    // Sort orders
    filtered.sort((a, b) => {
      let aValue: any = a[sortBy as keyof Order];
      let bValue: any = b[sortBy as keyof Order];

      if (sortBy === 'createdAt' || sortBy === 'updatedAt') {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }

      if (sortBy === 'total') {
        aValue = Number(aValue);
        bValue = Number(bValue);
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [orders, selectedStatus, selectedPaymentStatus, searchTerm, sortBy, sortOrder]);

  const handleAddOrder = () => {
    setEditingOrder(null);
    setIsModalOpen(true);
  };

  const handleEditOrder = (order: Order) => {
    setEditingOrder(order);
    setIsModalOpen(true);
  };

  const handleDeleteOrder = (id: number) => {
    setOrders(orders.filter(order => order.id !== id));
  };

  const handleSaveOrder = (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingOrder) {
      setOrders(orders.map(order => 
        order.id === editingOrder.id 
          ? { 
              ...orderData, 
              id: editingOrder.id,
              createdAt: editingOrder.createdAt,
              updatedAt: new Date().toISOString()
            }
          : order
      ));
    } else {
      const newOrder: Order = {
        ...orderData,
        id: Math.max(...orders.map(o => o.id)) + 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setOrders([...orders, newOrder]);
    }
    setIsModalOpen(false);
    setEditingOrder(null);
  };

  const handleStatusChange = (orderId: number, newStatus: Order['status']) => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { ...order, status: newStatus, updatedAt: new Date().toISOString() }
        : order
    ));
  };

  const handlePaymentStatusChange = (orderId: number, newPaymentStatus: Order['paymentStatus']) => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { ...order, paymentStatus: newPaymentStatus, updatedAt: new Date().toISOString() }
        : order
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <OrderHeader onAddOrder={handleAddOrder} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <OrderStats orders={orders} />
        
        <OrderFilters
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          selectedPaymentStatus={selectedPaymentStatus}
          onPaymentStatusChange={setSelectedPaymentStatus}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          sortBy={sortBy}
          onSortByChange={setSortBy}
          sortOrder={sortOrder}
          onSortOrderChange={setSortOrder}
          orders={orders}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredAndSortedOrders.map(order => (
            <OrderCard
              key={order.id}
              order={order}
              onEdit={() => handleEditOrder(order)}
              onDelete={() => handleDeleteOrder(order.id)}
              onStatusChange={(newStatus) => handleStatusChange(order.id, newStatus)}
              onPaymentStatusChange={(newPaymentStatus) => handlePaymentStatusChange(order.id, newPaymentStatus)}
            />
          ))}
        </div>

        {filteredAndSortedOrders.length === 0 && (
          <div className="text-center py-12">
            <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
            <p className="text-gray-600">Try adjusting your filters or add a new order</p>
          </div>
        )}
      </div>

      {isModalOpen && (
        <OrderModal
          order={editingOrder}
          onSave={handleSaveOrder}
          onClose={() => {
            setIsModalOpen(false);
            setEditingOrder(null);
          }}
        />
      )}
    </div>
  );
};
