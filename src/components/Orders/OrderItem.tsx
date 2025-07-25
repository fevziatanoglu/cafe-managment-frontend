import { Edit, Trash2, Clock, User, MapPin } from 'lucide-react';
import type { ORDER } from '../../types/Order';
import useStore from '../../store';
import OrderForm from './OrderForm';

interface OrderItemProps {
    order: ORDER;
}

function getStatusBadgeColor(status: string) {
    switch (status) {
        case 'pending':
            return 'bg-yellow-100 text-yellow-800 border-yellow-300';
        case 'preparing':
            return 'bg-blue-100 text-blue-800 border-blue-300';
        case 'served':
            return 'bg-green-100 text-green-800 border-green-300';
        case 'paid':
            return 'bg-gray-100 text-gray-800 border-gray-300';
        default:
            return 'bg-gray-100 text-gray-800 border-gray-300';
    }
}

const OrderItem: React.FC<OrderItemProps> = ({ order }) => {
    const { deleteOrderFetch, openModal } = useStore();

    // Generate order number from _id (last 8 characters)
    const orderNumber = `#${order._id.slice(-8).toUpperCase()}`;

    return (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200">
            {/* Header - Receipt Style */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 px-6 py-4 border-b border-dashed border-gray-300">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="text-lg font-bold text-gray-800">
                            {orderNumber}
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusBadgeColor(order.status)}`}>
                            {order.status.toUpperCase()}
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">
                            {new Date(order.createdAt).toLocaleTimeString('en-US', { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                            })}
                        </span>
                    </div>
                </div>
            </div>

            {/* Order Details */}
            <div className="px-6 py-4">
                {/* Table & Waiter Info */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-amber-600" />
                        <span className="text-sm font-medium text-gray-700">
                            {order.tableName || `Table ${order.tableId}`}
                        </span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-amber-600" />
                        <span className="text-sm text-gray-600">
                            {order.waiterName || 'Unknown Waiter'}
                        </span>
                    </div>
                </div>

                {/* Items List - Receipt Style */}
                <div className="border-t border-dashed border-gray-300 pt-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">ITEMS</h4>
                    <div className="space-y-2">
                        {order.items.map((item, index) => (
                            <div key={item.productId || index} className="flex justify-between items-center">
                                <div className="flex-1">
                                        <span className="text-sm text-gray-800">
                                            {item.productName}
                                        </span>
                                    <span className="text-xs text-gray-500 ml-2">
                                        x{item.quantity}
                                    </span>
                                </div>
                                <div className="text-sm font-medium text-gray-800">
                                    ₺{(item.price * item.quantity).toFixed(2)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Note Section */}
                {order.note && (
                    <div className="border-t border-dashed border-gray-300 mt-4 pt-4">
                        <h4 className="text-sm font-semibold text-gray-700 mb-2">NOTE</h4>
                        <p className="text-sm text-gray-600">{order.note}</p>
                    </div>
                )}

                {/* Total */}
                <div className="border-t border-dashed border-gray-300 mt-4 pt-4">
                    <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-gray-800">TOTAL</span>
                        <span className="text-lg font-bold text-amber-600">
                            ₺{order.total}
                        </span>
                    </div>
                </div>

                {/* Additional Info */}
                <div className="border-t border-gray-200 mt-4 pt-4">
                    <div className="text-xs text-gray-500 space-y-1">
                        <p>Created by: {order.createdBy}</p>
                        <p>Order ID: {order._id}</p>
                        <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end space-x-2 mt-4 pt-4 border-t border-gray-200">
                    <button
                        onClick={() => openModal(<OrderForm order={order} />, "Edit Order")}
                        className="flex items-center space-x-1 px-3 py-2 text-sm bg-amber-100 text-amber-700 rounded-md hover:bg-amber-200 transition-colors"
                        title="Edit order"
                    >
                        <Edit className="h-4 w-4" />
                        <span>Edit</span>
                    </button>
                    <button
                        onClick={() => deleteOrderFetch(order._id)}
                        className="flex items-center space-x-1 px-3 py-2 text-sm bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
                        title="Delete order"
                    >
                        <Trash2 className="h-4 w-4" />
                        <span>Delete</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderItem;
