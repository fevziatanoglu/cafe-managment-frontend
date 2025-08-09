import { useState, useMemo, useEffect } from "react";
import { useStore } from "../../store";
import type { ORDER, ORDER_ITEM } from "../../types/Order";
import type { TABLE } from "../../types/Table";
import { CreditCard } from "lucide-react";

interface OrdersPayModalProps {
    orders: ORDER[];
    table: TABLE;
}

// Group items by productId, sum quantity and total
function groupOrderItems(items: (ORDER_ITEM & { orderStatus: string })[]) {
    const map = new Map<string, ORDER_ITEM & { total: number; orderStatus: string }>();
    items.forEach(item => {
        const key = item.productId;
        if (!map.has(key)) {
            map.set(key, {
                ...item,
                total: item.price * item.quantity,
            });
        } else {
            const grouped = map.get(key)!;
            grouped.quantity += item.quantity;
            grouped.total += item.price * item.quantity;
        }
    });
    return Array.from(map.values());
}

export default function OrdersPayModal({ orders, table }: OrdersPayModalProps) {
    const { createPaidOrderFetch , isOrdersLoading , getTablesWithOrders , closeModal } = useStore();
    // Flatten all items and add orderStatus
    const allItems = useMemo(
        () =>
            orders.flatMap(order =>
                order.items.map(item => ({
                    ...item,
                    orderStatus: order.status,
                }))
            ),
        [orders]
    );

    // Split served and not-served items
    const servedItems = allItems.filter(item => item.orderStatus === "served");
    const notServedItems = allItems.filter(item => item.orderStatus !== "served");

    // Group items by productId
    const groupedServedItems = groupOrderItems(servedItems);
    const groupedNotServedItems = groupOrderItems(notServedItems);

    // State for selected items (productId + quantity)
    const [selectedItems, setSelectedItems] = useState<{ productId: string; quantity: number }[]>([]);

    // Add groupedServedItems to selectedItems by default
    useEffect(() => {
        const servedDefaults = groupedServedItems.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
        }));
        setSelectedItems(servedDefaults);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [orders]);

    // Checkbox handler for not-served items
    const handleCheckbox = (item: typeof groupedNotServedItems[0], checked: boolean) => {
        setSelectedItems(prev => {
            const found = prev.find(i => i.productId === item.productId);
            if (checked) {
                // Checked: add or increase quantity
                if (found) {
                    return prev.map(i =>
                        i.productId === item.productId
                            ? { ...i, quantity: i.quantity + item.quantity }
                            : i
                    );
                } else {
                    return [...prev, { productId: item.productId, quantity: item.quantity }];
                }
            } else {
                // Unchecked: decrease quantity or remove
                if (found) {
                    const newQty = found.quantity - item.quantity;
                    if (newQty > 0) {
                        return prev.map(i =>
                            i.productId === item.productId
                                ? { ...i, quantity: newQty }
                                : i
                        );
                    } else {
                        return prev.filter(i => i.productId !== item.productId);
                    }
                }
                return prev;
            }
        });
    };

    // Calculate total for selected items based on selectedItems quantities and item prices
    const allGroupedItems = [...groupedServedItems, ...groupedNotServedItems];
    const total = selectedItems.reduce((sum, sel) => {
        const item = allGroupedItems.find(i => i.productId === sel.productId);
        if (item) {
            return sum + item.price * sel.quantity;
        }
        return sum;
    }, 0);

    // Submit handler
    const handleSubmit = async () => {
        const orderData = { tableId: table._id, tableNumber: table.number, items: selectedItems };
        const response = await createPaidOrderFetch(orderData);
        if (response.success) {
            await getTablesWithOrders(); 
            closeModal(); 
        }
    };

    return (
        <div className="mx-auto bg-white rounded-lg shadow-lg border border-amber-200 overflow-hidden">
            {/* Receipt Header - Paper Style */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 px-5 py-4 border-b-2 border-dashed border-amber-300">
                {/* Perforated edge effect */}
                <div className="absolute left-0 top-0 w-full h-2 bg-repeat-x"
                    style={{
                        backgroundImage: `radial-gradient(circle at 10px center, transparent 4px, transparent 4px)`
                    }}>
                </div>

                <div className="flex items-center justify-between pt-2">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-amber-800 font-mono mb-1">
                            TABLE {table.number}
                        </h2>
                        <div className="text-sm text-amber-700">
                            Status: <span className="font-semibold capitalize px-2 py-1 bg-amber-100 rounded">{table.status}</span>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-lg font-bold text-amber-800 font-mono">PAYMENT</div>
                        <div className="text-sm text-amber-600">
                            {new Date().toLocaleDateString()}
                        </div>
                    </div>
                </div>
            </div>

            {/* Receipt Body */}
            <div className="p-4 font-mono text-sm bg-amber-25">
                <div className="space-y-4 max-h-[400px] overflow-y-auto">
                    <div className="border-t border-dashed border-amber-400 pt-3 mb-4">
                        {/* Table Header */}
                        <div className="grid grid-cols-12 gap-2 font-bold mb-2 text-xs text-amber-800 border-b border-amber-300 pb-1">
                            <span className="col-span-1 text-center">✓</span>
                            <span className="col-span-4">ITEM</span>
                            <span className="col-span-2 text-center">QTY</span>
                            <span className="col-span-2 text-center">PRICE</span>
                            <span className="col-span-3 text-right">TOTAL</span>
                        </div>

                        {/* Served Items */}
                        {groupedServedItems.length > 0 && (
                            <>
                                {groupedServedItems.map(item => (
                                    <div key={item.productId} className="grid grid-cols-12 gap-2 mb-2 items-center text-green-900">
                                        <div className="col-span-1 flex justify-center">
                                            <span className="text-green-600 text-lg">✓</span>
                                        </div>
                                        <span className="col-span-4 truncate">{item.productName}</span>
                                        <span className="col-span-2 text-center">{item.quantity}</span>
                                        <span className="col-span-2 text-center">₺{item.price.toFixed(2)}</span>
                                        <span className="col-span-3 text-right font-semibold">₺{item.total.toFixed(2)}</span>
                                    </div>
                                ))}
                            </>
                        )}

                        {/* Not Served Items */}
                        {groupedNotServedItems.length > 0 && (
                            <>
                                {groupedNotServedItems.map(item => {
                                    return (
                                        <div key={item.productId} className="grid grid-cols-12 gap-2 mb-2 items-center text-red-700">
                                            <div className="col-span-1 flex justify-center">
                                                <input
                                                    type="checkbox"
                                                    onChange={e => handleCheckbox(item, e.target.checked)}
                                                    className="w-4 h-4 text-red-600 border-red-300 rounded focus:ring-red-500"
                                                />
                                            </div>
                                            <span className="col-span-4 truncate">{item.productName}</span>
                                            <span className="col-span-2 text-center">{item.quantity}</span>
                                            <span className="col-span-2 text-center">₺{item.price.toFixed(2)}</span>
                                            <span className="col-span-3 text-right font-semibold">₺{item.total.toFixed(2)}</span>
                                        </div>
                                    );
                                })}
                            </>
                        )}
                    </div>
                </div>

                {/* Total Section */}
                <div className="border-t-2 border-double border-amber-600 pt-3 mt-4">
                    <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-amber-800">TOTAL:</span>
                        <span className="text-xl font-bold text-amber-600">₺{total.toFixed(2)}</span>
                    </div>
                </div>

                {/* Payment Button */}
                <div className="mt-6 pt-4 border-t border-dashed border-amber-400">
                    <button
                        disabled={isOrdersLoading}
                        onClick={handleSubmit}
                        className="w-full flex justify-center bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-6 rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                        {isOrdersLoading ? 'LOADING...' : 'PROCESS PAYMENT'} <CreditCard className="inline-block ml-2" />
                    </button>
                </div>
            </div>
        </div>
    );
}
