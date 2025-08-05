import type { PRODUCT } from "../../types/Product";
import { Coffee, Edit2, Trash2 } from "lucide-react";
import ProductForm from "./ProductForm";
import useStore from "../../store";

interface ProductItemProps {
  product: PRODUCT;
}

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Beverage':
      return 'bg-blue-100 text-blue-700';
    case 'Food':
      return 'bg-orange-100 text-orange-700';
    case 'Dessert':
      return 'bg-pink-100 text-pink-700';
    case 'Snack':
      return 'bg-purple-100 text-purple-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

function ProductItem({ product }: ProductItemProps) {

  const { openModal} = useStore();
 
  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex flex-row border border-amber-100 hover:shadow-lg transition-all duration-200 relative">
      {/* Top right: Edit & Delete buttons */}
      <div className="absolute top-3 right-3 flex space-x-2 z-10">
        <button
          onClick={() => openModal(<ProductForm product={product} /> , "Update Product")}
          className="p-2 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-700 transition"
          title="Edit"
        >
          <Edit2 className="h-4 w-4" />
        </button>
        <button
          className="p-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 transition"
          title="Delete"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
      {/* Left: Image/Icon */}
      <div className="flex-shrink-0 flex items-center justify-center w-32 h-32 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl overflow-hidden">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="object-cover w-full h-full"
          />
        ) : (
          <Coffee className="h-20 w-20 text-white" />
        )}
      </div>
      {/* Right: Details */}
      <div className="flex flex-col justify-between flex-1 pl-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{product.name}</h3>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(product.category || "Uncategorized")}`}>
            {product.category || "Uncategorized"}
          </span>
        </div>
        <div className="flex-1 my-3">
          <p className="text-sm text-gray-700">{product.description || <span className="text-gray-300">No description.</span>}</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-3 mt-auto w-fit">
          <p className="text-sm text-gray-600">Price</p>
          <p className="text-xl font-bold text-green-600">₺{product.price}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
