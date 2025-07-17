import { Edit, Trash2 } from 'lucide-react';
import type { ORDER } from '../../types/Order';
import useStore from '../../store';
import OrderForm from './OrderForm';

interface OrderItemProps {
    order: ORDER;
}

function getStatusBadgeColor(status: string) {
    switch (status) {
        case 'pending':
            return 'bg-yellow-100 text-yellow-800';
        case 'preparing':
            return 'bg-blue-100 text-blue-800';
        case 'served':
            return 'bg-green-100 text-green-800';
        case 'paid':
            return 'bg-amber-100 text-amber-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
}

const OrderItem: React.FC<OrderItemProps> = ({ order }) => {
    const { deleteOrderFetch , openModal } = useStore();
    return (
        <div
            className="flex items-center justify-between p-4 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors"
        >
            <div className="flex flex-col space-y-1">
                <span className="font-medium text-amber-800">Table: {order.tableId}</span>
                <span className="text-sm text-amber-600">Created by: {order.createdBy}</span>
                <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full capitalize ${getStatusBadgeColor(order.status)}`}>
                    {order.status}
                </span>
                <span className="text-xs text-gray-500">Total: ₺{order.total}</span>
                <span className="text-xs text-gray-500">
                    Items: {order.items.map(item => `${item.productId} x${item.quantity}`).join(', ')}
                </span>
            </div>
            <div className="flex items-center space-x-2">
                <button
                    onClick={() => openModal(<OrderForm order={order}/> , "Edit Order")}
                    className="p-2 text-amber-600 hover:text-amber-800 hover:bg-amber-200 rounded-lg transition-colors"
                    title="Edit order"
                >
                    <Edit className="h-5 w-5" />
                </button>
                <button
                    onClick={() => deleteOrderFetch(order._id)}
                    className={"p-2 rounded-lg transition-colors text-red-600 hover:text-red-800 hover:bg-red-100"}
                    title="Delete order"
                >
                    <Trash2 className="h-5 w-5" />
                </button>
            </div>
        </div >
    );
};

export default OrderItem;
