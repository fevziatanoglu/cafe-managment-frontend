import { Clock, ReceiptIcon } from "lucide-react";
import type { ORDER } from "../../types/Order";
import type { TABLE } from "../../types/Table";

interface TablePayModalProps {
  table: TABLE;
  orders: ORDER[];
}

export default function TablePayModal({ table, orders }: TablePayModalProps) {
  return (
    <div className=" mx-auto bg-white rounded-2xl shadow-2xl p-6">
      <h2 className="text-2xl font-bold mb-2 text-emerald-700 flex items-center gap-2">
        <ReceiptIcon className="h-6 w-6" />
        Table {table.number} Orders
      </h2>
      <div className="mb-4 text-gray-600">
        Status: <span className="font-semibold capitalize">{table.status}</span>
      </div>
      <div className="space-y-4 max-h-[400px] overflow-y-auto">
        {orders.length === 0 && (
          <div className="text-center text-gray-400 py-8">No orders for this table.</div>
        )}
        {orders.map(order => (
          <div key={order._id} className="border rounded-xl p-4 bg-gray-50 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-amber-700">Order #{order._id.slice(-4)}</span>
              <span className="text-xs px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 capitalize">
                {order.status}
              </span>
            </div>
            <div className="mb-2">
              <span className="text-sm text-gray-500">Created: </span>
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {new Date(order.createdAt).toLocaleString()}
              </span>
            </div>
            <div className="mb-2">
              <span className="text-sm font-medium text-gray-700">Items:</span>
              <ul className="ml-4 list-disc text-sm text-gray-600">
                {order.items.map(item => (
                  <li key={item.productId}>
                    {item.productName} × {item.quantity} <span className="text-amber-700">₺{item.price.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="font-bold text-emerald-700">Total:</span>
              <span className="font-bold text-amber-600 text-lg">₺{order.total.toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
