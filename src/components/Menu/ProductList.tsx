import React, { useState } from "react";
import type { PRODUCT, PRODUCT_CATEGORY } from "../../types";
import ProductItem from "./ProductItem";
import ProductItemSkeleton from "./ProductItemSkeleton";
import { GenericFilter, type FilterOption } from "../Common/GenericFilter";
import useStore from "../../store";
import ProductForm from "./ProductForm";
import { Coffee, CupSoda, IceCream, Utensils } from "lucide-react";

const productCategoryOptions: FilterOption<PRODUCT_CATEGORY | "all">[] = [
  {
    value: "all",
    label: "All",
    count: undefined,
    color: "bg-gray-100 text-gray-700 hover:bg-gray-200",
    icon: <Coffee className="w-4 h-4" />, // You can use a generic icon for "All"
  },
  {
    value: "hot drink",
    label: "Hot Drink",
    count: undefined,
    color: "bg-red-100 text-red-700 hover:bg-red-200",
    icon: <Coffee className="w-4 h-4" />,
  },
  {
    value: "cold drink",
    label: "Cold Drink",
    count: undefined,
    color: "bg-blue-100 text-blue-700 hover:bg-blue-200",
    icon: <CupSoda className="w-4 h-4" />,
  },
  {
    value: "dessert",
    label: "Dessert",
    count: undefined,
    color: "bg-yellow-100 text-yellow-700 hover:bg-yellow-200",
    icon: <IceCream className="w-4 h-4" />,
  },
  {
    value: "food",
    label: "Food",
    count: undefined,
    color: "bg-green-100 text-green-700 hover:bg-green-200",
    icon: <Utensils className="w-4 h-4" />,
  },
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
  const [selectedCategory, setSelectedCategory] = useState<PRODUCT_CATEGORY | "all">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<string>("name");
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  let filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
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

  const onCategoryChange = (category: 'all' | PRODUCT_CATEGORY) => {
      setSelectedCategory(category);
    };

  return (
    <div>
      <GenericFilter
        options={productCategoryOptions}
        selected={selectedCategory}
        onChange={onCategoryChange}
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
