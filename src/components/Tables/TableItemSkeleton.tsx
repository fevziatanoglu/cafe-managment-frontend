const TableItemSkeleton = () => {
    return (
      <div className="bg-gradient-to-br from-gray-50 via-white to-gray-100 rounded-3xl p-6 shadow-xl border-2 border-gray-200 min-h-[280px] flex flex-col relative overflow-hidden animate-pulse">
        {/* Header and Status Row Skeleton */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2 md:space-x-3">
            {/* Table name skeleton */}
            <div className="h-6 md:h-7 bg-gray-300 rounded w-20 md:w-24"></div>
            {/* Status badge skeleton */}
            <div className="h-6 md:h-7 bg-gray-300 rounded-full w-16 md:w-20"></div>
          </div>
          {/* Actions menu skeleton */}
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        </div>
  
        {/* Table Visual Representation Skeleton */}
        <div className="flex flex-col items-center mb-4 flex-1">
          <div className="relative">
            {/* Table Base Skeleton */}
            <div className="w-32 h-32 bg-gray-300 rounded-full relative">
              {/* Table Top Surface Skeleton */}
              <div className="absolute inset-2 bg-gray-200 rounded-full flex flex-col items-center justify-center">
                {/* Table Number Skeleton */}
                <div className="h-8 bg-gray-400 rounded w-8 mb-1"></div>
                {/* Status Icon Skeleton */}
                <div className="w-8 h-8 bg-gray-400 rounded"></div>
              </div>
            </div>
          </div>
        </div>
  
        {/* Orders Section Skeleton - Sometimes visible */}
        {Math.random() > 0.5 && (
          <div className="mb-4 bg-gray-100 rounded-xl p-4 border-2 border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded w-24"></div>
              </div>
              <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
            </div>
            
            <div className="space-y-2">
              {[1, 3].map((index) => (
                <div key={index} className="bg-gray-200 rounded-lg p-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                      <div className="h-3 bg-gray-400 rounded w-12"></div>
                    </div>
                    <div className="h-3 bg-gray-400 rounded w-10"></div>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <div className="h-2 bg-gray-300 rounded w-10"></div>
                    <div className="h-2 bg-gray-300 rounded w-16"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
  
        {/* Action Buttons Skeleton */}
        <div className="mt-auto">
          <div className="flex justify-center gap-1 md:gap-2">
            {[1, 2].map((index) => (
              <div 
                key={index} 
                className="h-10 md:h-12 bg-gray-300 rounded-xl w-20 md:w-28"
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default TableItemSkeleton;
