import ProductList from "../../components/Menu/ProductList";
import { MenuHeader } from "../../components/Menu/MenuHeader";
import useStore from "../../store";
import { useEffect } from "react";

export default function Menu() {
  const { products, getProductsFetch } = useStore();

  useEffect(() => {
    getProductsFetch()
  }, [getProductsFetch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <MenuHeader />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductList products={products} />
      </div>
    </div>
  );
}
