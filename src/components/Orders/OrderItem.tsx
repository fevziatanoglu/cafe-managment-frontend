import { Edit, Trash2, Clock, ChefHat, CheckCircle, MoreVertical } from 'lucide-react';
import type { ORDER } from '../../types/Order';
import useStore from '../../store';
import OrderForm from './OrderForm';
import { useState } from 'react';
import OrderItemSkeleton from './OrderItemSkeleton';

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

function getHeaderBackgroundColor(status: string) {
    switch (status) {
        case 'pending':
            return 'bg-gradient-to-r from-yellow-50 to-yellow-100';
        case 'preparing':
            return 'bg-gradient-to-r from-blue-50 to-blue-100';
        case 'served':
            return 'bg-gradient-to-r from-green-100 to-green-200';
        case 'paid':
            return 'bg-gradient-to-r from-gray-50 to-gray-100';
        default:
            return 'bg-gradient-to-r from-amber-50 to-orange-50';
    }
}

const OrderItem: React.FC<OrderItemProps> = ({ order }) => {
    const { deleteOrderFetch, openModal, updateOrderFetch } = useStore();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showActions, setShowActions] = useState(false);

    const handleAction = async (action: 'pending' | 'preparing' | 'served' | 'delete') => {
        setIsLoading(true);
        try {
            if (action === 'delete') {
                await deleteOrderFetch(order._id);
            } else {
                await updateOrderFetch(order._id, { status: action });
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async () => {
        if (confirm('Are you sure you want to delete this order?')) {
            await handleAction('delete');
        }
        setShowActions(false);
    };

    // Generate order number from _id (last 4 characters)
    const orderNumber = `#${order._id.slice(-4).toUpperCase()}`;

    // Show skeleton when loading
    if (isLoading) {
        return <OrderItemSkeleton />;
    }

    return (
        <div className="bg-white rounded-lg shadow-lg border border-amber-200 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full">
            {/* Receipt Header - Paper Style */}
            <div className={`${getHeaderBackgroundColor(order.status)} px-5 py-2 border-b-2 border-dashed border-amber-300`}>
                {/* Perforated edge effect */}
                <div className="absolute left-0 top-0 w-full h-2 bg-repeat-x"
                    style={{
                        backgroundImage: `radial-gradient(circle at 10px center, transparent 4px, transparent 4px)`
                    }}>
                </div>

                <div className="flex items-center justify-between pt-2">
                    <div className="flex flex-col md:flex-row space-x-4">
                        <div className="w-full text-center text-xl font-bold text-amber-800 font-mono">
                            {orderNumber}
                        </div>
                        <div className={`px-4 py-1 rounded-md text-xs font-semibold border-2 ${getStatusBadgeColor(order.status)}`}>
                            {order.status.toUpperCase()}
                        </div>
                    </div>

                    {/* Time */}
                    <div className="mt-2 text-right">
                        <div className="flex items-center justify-end space-x-2 text-amber-700">
                            <Clock className="h-4 w-4" />
                            <span className="text-sm font-mono">
                                {new Date(order.createdAt).toLocaleTimeString('en-US', {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </span>
                        </div>
                        <span className="text-xs text-amber-600">
                            {Math.floor((Date.now() - new Date(order.createdAt).getTime()) / 60000)} min ago
                        </span>
                    </div>

                    {/* Actions Menu */}
                    <div className="relative">
                        <button
                            onClick={() => setShowActions(!showActions)}
                            className="p-2 rounded-full bg-white/80 hover:bg-white shadow-lg transition-colors backdrop-blur-sm hover:cursor-pointer "
                        >
                            <MoreVertical className="h-4 w-4 text-gray-600" />
                        </button>

                        {showActions && (
                            <div className="absolute top-12 right-0 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-20 min-w-[140px] backdrop-blur-sm">
                                <button
                                    onClick={() => openModal(<OrderForm order={order} />, "Edit Order")}
                                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-amber-50 flex items-center space-x-2 transition-colors"
                                >
                                    <Edit className="h-4 w-4" />
                                    <span>Edit Order</span>
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
                </div>
            </div>

            {/* Receipt Body - Flex grow to push actions to bottom */}
            <div className="p-4 font-mono text-sm bg-amber-25 flex flex-col h-full justify-between">
                {/* Table & Waiter Info */}
                <div className="space-y-2 mb-2">
                    <div className="flex justify-between">
                        <span className="text-amber-700">TABLE:</span>
                        <span className="font-semibold text-amber-900">{order.tableName || `Table ${order.tableId}`}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-amber-700">WAITER:</span>
                        <span className="font-semibold text-amber-900">{order.waiterName || 'Unknown'}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-amber-700">DATE:</span>
                        <span className="font-semibold text-amber-900">{new Date(order.createdAt).toLocaleDateString()}</span>
                    </div>
                </div>

                {/* Items Section */}
                <div className="border-t border-dashed border-amber-400 pt-3 mb-4 h-full">
                    {/* Table Header */}
                    <div className="grid grid-cols-10 gap-2 font-bold mb-2 text-xs text-amber-800 border-b border-amber-300 pb-1">
                        <span className="col-span-3">ITEM</span>
                        <span className="col-span-2 text-center">QTY</span>
                        <span className="col-span-2 text-center">PRICE</span>
                        <span className="col-span-3 text-right">TOTAL</span>
                    </div>

                    {/* Items */}
                    {order.items.map((item, index) => (
                        <div key={item.productId || index} className="grid grid-cols-10 gap-2 mb-2 text-amber-900">
                            <span className="col-span-3 truncate">
                                {item.productName}
                            </span>
                            <span className="col-span-2 text-center">
                                {item.quantity}
                            </span>
                            <span className="col-span-2 text-center">
                                ₺{item.price.toFixed(2)}
                            </span>
                            <span className="col-span-3 text-right font-semibold">
                                ₺{(item.price * item.quantity).toFixed(2)}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Note Section */}
                {order.note && (
                    <div className="border-t border-dashed border-amber-400 pt-3 mb-4">
                        <div className="text-xs text-amber-700 mb-1">NOTE:</div>
                        <div className="text-sm bg-yellow-50 p-2 rounded border-l-4 border-yellow-400 text-amber-800">
                            {order.note}
                        </div>
                    </div>
                )}

                {/* Total Section */}
                <div className="border-t-2 border-double border-amber-600 pt-3 mb-4">
                    <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-amber-800">TOTAL:</span>
                        <span className="text-xl font-bold text-amber-600">
                            ₺{order.total.toFixed(2)}
                        </span>
                    </div>
                </div>
            </div>

            {/* Actions - Always at bottom */}
            <div className="border-t-2 border-amber-200 pt-4 px-6 bg-amber-50 mt-auto">
                <div className="flex flex-row gap-2 justify-center w-full pb-4">
                    <button
                        onClick={() => handleAction('pending')}
                        className="flex items-center space-x-1 px-1 lg:px-3 py-3 hover:cursor-pointer text-xs md:text-sm bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-medium"
                        disabled={order.status === 'pending'}
                    >
                        <Clock className="h-4 w-4" />
                        <span>Pending</span>
                    </button>
                    <button
                        onClick={() => handleAction('preparing')}
                        className="flex items-center space-x-1 px-1 lg:px-3 py-2 hover:cursor-pointer text-xs md:text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-medium"
                        disabled={order.status === 'preparing'}
                    >
                        <ChefHat className="h-4 w-4" />
                        <span>Preparing</span>
                    </button>
                    <button
                        onClick={() => handleAction('served')}
                        className="flex items-center space-x-1 px-1 lg:px-3 py-2 hover:cursor-pointer text-xs md:text-sm bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-medium"
                        disabled={order.status === 'served'}
                    >
                        <CheckCircle className="h-4 w-4" />
                        <span>Served</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderItem;
