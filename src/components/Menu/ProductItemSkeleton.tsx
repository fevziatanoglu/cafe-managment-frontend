const ProductItemSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex flex-row border border-amber-100 relative animate-pulse">
      {/* Top right: Skeleton buttons */}
      <div className="absolute top-3 right-3 flex space-x-2 z-10">
        <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
        <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
      </div>

      {/* Left: Image skeleton */}
      <div className="flex-shrink-0 w-32 h-32 bg-gray-200 rounded-xl"></div>

      {/* Right: Details skeleton */}
      <div className="flex flex-col justify-between flex-1 pl-6">
        <div>
          {/* Title skeleton */}
          <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
          {/* Category badge skeleton */}
          <div className="h-6 bg-gray-200 rounded-full w-20"></div>
        </div>

        {/* Description skeleton */}
        <div className="flex-1 my-3">
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>

        {/* Price section skeleton */}
        <div className="bg-gray-50 rounded-xl p-3 mt-auto w-fit">
          <div className="h-4 bg-gray-200 rounded w-8 mb-1"></div>
          <div className="h-6 bg-gray-200 rounded w-12"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductItemSkeleton;
