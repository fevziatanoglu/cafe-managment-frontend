import React, { useState } from "react";
import type { PRODUCT } from "../../types";
import ProductItem from "./ProductItem";
import ProductItemSkeleton from "./ProductItemSkeleton";
import { GenericFilter, type FilterOption } from "../Common/GenericFilter";
import useStore from "../../store";
import ProductForm from "./ProductForm";

// Dummy data for status options they will be change
const dummyStatusOptions: FilterOption<string>[] = [
  { value: "all", label: "All", count: undefined, color: "bg-gray-100 text-gray-700 hover:bg-gray-200", icon: "📦" },
  { value: "active", label: "Active", count: undefined, color: "bg-green-100 text-green-700 hover:bg-green-200", icon: "✅" },
  { value: "inactive", label: "Inactive", count: undefined, color: "bg-gray-100 text-gray-700 hover:bg-gray-200", icon: "🚫" }
];

const sortOptions = [
  { value: "name", label: "Name" },
  { value: "price", label: "Price" },
  { value: "category", label: "Category" }
];

interface ProductListProps {
  products: PRODUCT[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const { openModal, isProductsLoading } = useStore();
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<string>("name");
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  let filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  filteredProducts = filteredProducts.sort((a, b) => {
    const aValue = a[sortBy as keyof PRODUCT];
    const bValue = b[sortBy as keyof PRODUCT];
    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortOrder === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortOrder === "asc"
        ? aValue - bValue
        : bValue - aValue;
    }
    return 0;
  });


  return (
    <div>
      <GenericFilter
        options={dummyStatusOptions}
        selected={selectedStatus}
        onChange={setSelectedStatus}
        onOpenModal={() => openModal(<ProductForm />, "Create New Order")}
        createLabel="Create Product"
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        sortOptions={sortOptions}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {isProductsLoading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <ProductItemSkeleton key={index} />
          ))
        ) : filteredProducts.length === 0 ? (
          <div className="col-span-full text-center text-gray-400 py-12">No products found.</div>
        ) : (
          filteredProducts.map((product) => <ProductItem key={product._id} product={product} />)
        )}
      </div>
    </div>
  );
};

export default ProductList;
