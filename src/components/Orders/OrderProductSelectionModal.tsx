import React, { useState } from 'react';
import type { PRODUCT } from '../../types/Product';
import type { ORDER_ITEM } from '../../types/Order';
import useStore from '../../store';

interface Props {
  initialItems: ORDER_ITEM[];
  onOk: (items: ORDER_ITEM[]) => void;
  onCancel: () => void;
}

const OrderProductSelectionModal: React.FC<Props> = ({ initialItems, onOk, onCancel }) => {
  const { products } = useStore();
  const [selectedItems, setSelectedItems] = useState<ORDER_ITEM[]>(initialItems);
  
  const getQuantity = (productId: string) =>
    selectedItems.find((item) => item.productId === productId)?.quantity || 0;

  const handleChange = (product: PRODUCT, delta: number) => {
    setSelectedItems((prev) => {
      const idx = prev.findIndex((item) => item.productId === product._id);
      if (idx === -1 && delta > 0) {
        return [
          ...prev,
          {
            productId: product._id,
            productName: product.name,
            price: product.price,
            quantity: 1,
          },
        ];
      }
      if (idx !== -1) {
        const newQty = prev[idx].quantity + delta;
        if (newQty <= 0) {
          return prev.filter((_, i) => i !== idx);
        }
        return prev.map((item, i) =>
          i === idx ? { ...item, quantity: newQty } : item
        );
      }
      return prev;
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
        <h2 className="text-lg font-bold mb-4 text-amber-700">Select Products</h2>
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {products.map((product) => (
            <div key={product._id} className="flex items-center justify-between border-b pb-2">
              <div>
                <div className="font-medium">{product.name}</div>
                <div className="text-xs text-gray-500">₺{product.price.toFixed(2)}</div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  className="px-2 py-1 bg-amber-100 rounded hover:bg-amber-200"
                  onClick={() => handleChange(product, -1)}
                  disabled={getQuantity(product._id) === 0}
                >
                  -
                </button>
                <span className="w-6 text-center">{getQuantity(product._id)}</span>
                <button
                  type="button"
                  className="px-2 py-1 bg-amber-100 rounded hover:bg-amber-200"
                  onClick={() => handleChange(product, 1)}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end space-x-2 mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded bg-gray-100 text-gray-700 hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onOk(selectedItems)}
            className="px-4 py-2 rounded bg-amber-600 text-white hover:bg-amber-700"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderProductSelectionModal;
