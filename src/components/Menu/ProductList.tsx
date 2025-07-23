import React from "react";
import type { PRODUCT } from "../../types";
import ProductItem from "./ProductItem";


interface ProductListProps {
  products: PRODUCT[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {products.length === 0 ? (
      <div className="col-span-full text-center text-gray-400 py-12">No products found.</div>
    ) : (
      products.map((product) => <ProductItem key={product._id} product={product} />)
    )}
  </div>
);

export default ProductList;
