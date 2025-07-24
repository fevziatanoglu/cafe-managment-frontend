import React from "react";
import type { PRODUCT } from "../../types";

interface Props {
  products: PRODUCT[];
  selectedItems: { productId: string; name: string; price: number; quantity: number }[];
  onQuantityChange: (productId: string, delta: number) => void;
  onOk: () => void;
}

export const OrderProductSelectionSection: React.FC<Props> = ({
  products,
  selectedItems,
  onQuantityChange,
  onOk,
}) => (
  <div className="p-6 space-y-6">
    <h2 className="text-xl font-bold text-amber-700 mb-4">Select Products</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-amber-50 p-4 rounded-lg mb-2">
      {products.map(product => {
        const selected = selectedItems.find(i => i.productId === product._id);
        return (
          <div key={product._id} className="flex items-center justify-between bg-white rounded-lg p-3 shadow">
            <div>
              <div className="font-semibold">{product.name}</div>
              <div className="text-xs text-gray-500">₺{product.price}</div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="px-2 py-1 bg-amber-200 rounded text-amber-700"
                onClick={() => onQuantityChange(product._id, -1)}
                disabled={!selected}
              >-</button>
              <span className="w-6 text-center">{selected?.quantity || 0}</span>
              <button
                type="button"
                className="px-2 py-1 bg-amber-200 rounded text-amber-700"
                onClick={() => onQuantityChange(product._id, 1)}
              >+</button>
            </div>
          </div>
        );
      })}
    </div>
    <div className="flex justify-end mt-2">
      <button
        type="button"
        className="px-4 py-2 bg-amber-600 text-white rounded-lg"
        onClick={onOk}
      >
        OK
      </button>
    </div>
  </div>
);
