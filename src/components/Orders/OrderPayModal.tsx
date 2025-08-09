import { useState, useMemo, useEffect } from "react";
import { useStore } from "../../store";
import type { ORDER, ORDER_ITEM } from "../../types/Order";
import type { TABLE } from "../../types/Table";

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
    const { createPaidOrderFetch } = useStore();
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

    // Calculate total for selected items (served + checked not-served)
    const selectedGroupedItems = [
        ...groupedServedItems,
        ...groupedNotServedItems.filter(item =>
            selectedItems.some(i => i.productId === item.productId)
        ),
    ];
    // Remove duplicates (served already included)
    const uniqueSelectedGroupedItems = Array.from(
        new Map(selectedGroupedItems.map(item => [item.productId, item])).values()
    );
    const total = uniqueSelectedGroupedItems.reduce((sum, item) => sum + item.total, 0);

    // Submit handler
    const handleSubmit = async () => {
        const orderData = {
            tableId: table._id,
            tableNumber: table.number,
            items: selectedItems,
        };
        await createPaidOrderFetch(orderData);
    };

    return (
        <div className="mx-auto bg-white rounded-2xl shadow-2xl p-6">
            <h2 className="text-2xl font-bold mb-2 text-emerald-700 flex items-center gap-2">
                {/* You can add an icon here if you want */}
                Table {table.number} Orders
            </h2>
            <div className="mb-4 text-gray-600">
                Status: <span className="font-semibold capitalize">{table.status}</span>
            </div>
            <div className="space-y-4 max-h-[400px] overflow-y-auto">
                {groupedServedItems.length > 0 && (
                    <>
                        <div className="font-bold text-emerald-700 mb-2">Served Items</div>
                        <div className="grid grid-cols-5 gap-2 font-bold mb-2 text-xs text-emerald-800 border-b border-emerald-300 pb-1">
                            <span className="col-span-2">Item</span>
                            <span className="col-span-1 text-center">Qty</span>
                            <span className="col-span-1 text-center">Price</span>
                            <span className="col-span-1 text-right">Total</span>
                        </div>
                        {groupedServedItems.map(item => (
                            <div key={item.productId} className="grid grid-cols-5 gap-2 mb-2 items-center text-emerald-900">
                                <span className="col-span-2 truncate">{item.productName}</span>
                                <span className="col-span-1 text-center">{item.quantity}</span>
                                <span className="col-span-1 text-center">₺{item.price.toFixed(2)}</span>
                                <span className="col-span-1 text-right font-semibold">₺{item.total.toFixed(2)}</span>
                            </div>
                        ))}
                    </>
                )}

                {groupedNotServedItems.length > 0 && (
                    <>
                        <div className="font-bold text-amber-700 mb-2">Not Served Items</div>
                        <div className="grid grid-cols-6 gap-2 font-bold mb-2 text-xs text-amber-800 border-b border-amber-300 pb-1">
                            <span className="col-span-1">Select</span>
                            <span className="col-span-2">Item</span>
                            <span className="col-span-1 text-center">Qty</span>
                            <span className="col-span-1 text-center">Price</span>
                            <span className="col-span-1 text-right">Total</span>
                        </div>
                        {groupedNotServedItems.map(item => {
                            return (
                                <div key={item.productId} className="grid grid-cols-6 gap-2 mb-2 items-center text-amber-900">
                                    <input
                                        type="checkbox"
                                        onChange={e => handleCheckbox(item, e.target.checked)}
                                        className="col-span-1"
                                    />
                                    <span className="col-span-2 truncate">{item.productName}</span>
                                    <span className="col-span-1 text-center">{item.quantity}</span>
                                    <span className="col-span-1 text-center">₺{item.price.toFixed(2)}</span>
                                    <span className="col-span-1 text-right font-semibold">₺{item.total.toFixed(2)}</span>
                                </div>
                            );
                        })}
                    </>
                )}
            </div>

            <div className="border-t-2 border-double border-emerald-600 pt-3 mt-4">
                <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-emerald-800">TOTAL:</span>
                    <span className="text-xl font-bold text-emerald-600">₺{total.toFixed(2)}</span>
                </div>
            </div>
            <button
                onClick={handleSubmit}
                className="mt-4 w-full bg-emerald-600 text-white py-2 rounded-md hover:bg-emerald-700"
            >
                Pay
            </button>
        </div>
    );
}
