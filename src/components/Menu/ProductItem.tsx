
import React from "react";
import type { PRODUCT } from "../../types/Product";
import { ShoppingBag } from "lucide-react";

interface ProductItemProps {
  product: PRODUCT;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => (
  <div className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between border border-amber-100 hover:shadow-lg transition-all duration-200">
    <div className="flex items-center space-x-3 mb-4">
      <div className="bg-gradient-to-r from-orange-400 to-red-400 p-3 rounded-xl">
        <ShoppingBag className="h-6 w-6 text-white" />
      </div>
      <div>
        <h3 className="text-lg font-bold text-gray-900">{product.name}</h3>
        <p className="text-xs text-gray-500">{product.category || "Uncategorized"}</p>
      </div>
    </div>
    <div className="flex-1 mb-4">
      <p className="text-sm text-gray-700">{product.description || <span className="text-gray-300">No description.</span>}</p>
    </div>
    <div className="flex items-center justify-between mt-auto">
      <span className="text-lg font-semibold text-amber-700">₺{product.price}</span>
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${product.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-400"}`}>
        {product.isActive ? "Active" : "Inactive"}
      </span>
    </div>
  </div>
);

export default ProductItem;
