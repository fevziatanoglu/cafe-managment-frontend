import { useEffect, useState } from "react";
import useStore from "../../store";
import ProductItem from "../../components/Menu/ProductItem";
import ProductItemSkeleton from "../../components/Menu/ProductItemSkeleton";
import { useParams } from "react-router-dom";
import { Coffee, CupSoda, CakeSlice, Utensils, Store } from "lucide-react";

export default function PublicMenu() {

  const { slug } = useParams<{ slug: string }>();
  const { menu, getPublicMenuFetch, isCafeLoading, cafeName, cafeImage } = useStore();
  const [category, setCategory] = useState<string>('hot drink');

  useEffect(() => {
    if (slug) {
      getPublicMenuFetch(slug, category);
    }
  }, [getPublicMenuFetch, slug, category]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 py-8">
      <div className="max-w-5xl mx-auto px-4 flex flex-col items-center justify-center ">
        {/* Cafe Header */}
        {isCafeLoading ? (
          <div className="flex justify-center items-center gap-4 mb-4 py-5 px-20 text-orange-500 bg-white rounded-xl shadow-md w-fit">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-orange-500 shadow-lg bg-gray-200 animate-pulse">
            </div>
            <div>
              <div className="h-8 md:h-12 w-48 md:w-72 bg-gray-200 rounded animate-pulse mb-2"></div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center gap-4 mb-4 py-5 px-20 text-orange-500 bg-white rounded-xl shadow-md w-fit  ">
            {cafeImage ? (
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-4 border-orange-500 shadow-lg bg-amber-500">
                <img
                  src={cafeImage}
                  alt="Cafe Logo"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : <Store className="w-16 h-16 md:w-20 md:h-20 text-amber-500" />}
            <div>
              <h1 className="text-3xl md:text-5xl font-bold drop-shadow-lg">
                {cafeName?.toLocaleUpperCase() || 'Our Cafe'} MENU
              </h1>
            </div>
          </div>
        )}
        <div className="flex justify-center mb-8 px-4">
          <div className="grid justify-between grid-cols-2 md:flex gap-2 md:gap-3 p-2  bg-white rounded-xl shadow-md w-full max-w-2xl">
            <button
              onClick={() => setCategory('hot drink')}
              className={`flex items-center justify-center gap-1 md:gap-2 px-2 md:px-4 py-2 md:py-3 rounded-lg font-medium text-sm md:text-base transition-all duration-200 ${category === 'hot drink'
                ? 'bg-red-100 text-red-700 shadow-sm'
                : 'text-gray-600 hover:bg-gray-50'
                }`}
            >
              <Coffee className="w-4 h-4 md:w-5 md:h-5" />
              <span className="hidden sm:inline">Hot Drinks</span>
              <span className="sm:hidden">Hot</span>
            </button>
            <button
              onClick={() => setCategory('cold drink')}
              className={`flex items-center justify-center gap-1 md:gap-2 px-2 md:px-4 py-2 md:py-3 rounded-lg font-medium text-sm md:text-base transition-all duration-200 ${category === 'cold drink'
                ? 'bg-blue-100 text-blue-700 shadow-sm'
                : 'text-gray-600 hover:bg-gray-50'
                }`}
            >
              <CupSoda className="w-4 h-4 md:w-5 md:h-5" />
              <span className="hidden sm:inline">Cold Drinks</span>
              <span className="sm:hidden">Cold</span>
            </button>
            <button
              onClick={() => setCategory('dessert')}
              className={`flex items-center justify-center gap-1 md:gap-2 px-2 md:px-4 py-2 md:py-3 rounded-lg font-medium text-sm md:text-base transition-all duration-200 ${category === 'dessert'
                ? 'bg-yellow-100 text-yellow-700 shadow-sm'
                : 'text-gray-600 hover:bg-gray-50'
                }`}
            >
              <CakeSlice className="w-4 h-4 md:w-5 md:h-5" />
              <span className="hidden sm:inline">Desserts</span>
              <span className="sm:hidden">Dessert</span>
            </button>
            <button
              onClick={() => setCategory('food')}
              className={`flex items-center justify-center gap-1 md:gap-2 px-2 md:px-4 py-2 md:py-3 rounded-lg font-medium text-sm md:text-base transition-all duration-200 ${category === 'food'
                ? 'bg-green-100 text-green-700 shadow-sm'
                : 'text-gray-600 hover:bg-gray-50'
                }`}
            >
              <Utensils className="w-4 h-4 md:w-5 md:h-5" />
              <span className="hidden sm:inline">Food</span>
              <span className="sm:hidden">Food</span>
            </button>
          </div>
        </div>
        {isCafeLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, idx) => (
              <ProductItemSkeleton key={idx} />
            ))}
          </div>
        ) : menu.length === 0 ? (
          <div className="text-center text-gray-400 py-12">No products found for this cafe.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {menu.map((product) => (
              <ProductItem key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

