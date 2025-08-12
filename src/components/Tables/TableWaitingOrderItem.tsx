import { useStore } from '../../store';
import type { ORDER } from '../../types/Order';
import OrderItem from '../Orders/OrderItem';
import { Clock } from 'lucide-react';

interface TableWaitingOrderItemProps {
  order: ORDER;
}

export default function TableWaitingOrderItem({ order }: TableWaitingOrderItemProps) {
  const { openModal } = useStore();

  const getMinutesAgo = (dateString: string) => {
    const orderDate = new Date(dateString.replace(' ', 'T'));
    const now = new Date();
    const diffMs = now.getTime() - orderDate.getTime();
    const diffMin = Math.floor(diffMs / 60000);
    if (diffMin < 1) return 'just now';
    if (diffMin === 1) return '1 minute ago';
    return `${diffMin} minutes ago`;
  };

  return (
    <button
      className="w-full flex flex-col items-start bg-white/90 rounded-lg p-3 border border-gray-200 shadow-sm hover:shadow-lg transition-shadow hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-400"
      onClick={() => openModal(<OrderItem order={order} />, `Order #${order._id.slice(-4)}`)}
      title={`Show order #${order._id.slice(-4)}`}
    >
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center space-x-2">
          <span className={`w-3 h-3 rounded-full ${order.status === 'pending' ? 'bg-yellow-400' :
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
      <div className="flex justify-between items-center w-full mt-1">
        <span className="text-xs text-gray-500 capitalize">
          {order.status}
        </span>
        <div className="flex items-center space-x-1 text-xs text-gray-400">
          <Clock className="h-3 w-3" />
          <span>{getMinutesAgo(order.createdAt)}</span>
        </div>
      </div>
    </button>
  );
}
