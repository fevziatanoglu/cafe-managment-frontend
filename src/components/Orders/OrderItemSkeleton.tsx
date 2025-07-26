const OrderItemSkeleton = () => {
    return (
        <div className="flex flex-col justify-between bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden animate-pulse">
            {/* Header Skeleton */}
            <div className="bg-gray-100 px-6 py-8 border-b-2 border-dashed border-gray-200 relative">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="h-5 bg-gray-300 rounded w-16"></div>
                        <div className="h-4 bg-gray-300 rounded-full w-12"></div>
                    </div>
                    <div className="text-right space-y-1">
                        <div className="flex items-center space-x-2">
                            <div className="h-3 w-3 bg-gray-300 rounded"></div>
                            <div className="h-3 bg-gray-300 rounded w-12"></div>
                        </div>
                        <div className="h-2 bg-gray-300 rounded w-16"></div>
                    </div>
                </div>
            </div>

            {/* Receipt Body Skeleton */}
            <div className="px-6 py-3 space-y-3 h-full flex flex-col justify-between">
                {/* Table & Waiter Info Skeleton */}
                <div className="space-y-1.5">
                    <div className="flex justify-between">
                        <div className="h-3 bg-gray-300 rounded w-10"></div>
                        <div className="h-3 bg-gray-300 rounded w-14"></div>
                    </div>
                    <div className="flex justify-between">
                        <div className="h-3 bg-gray-300 rounded w-12"></div>
                        <div className="h-3 bg-gray-300 rounded w-16"></div>
                    </div>
                    <div className="flex justify-between">
                        <div className="h-3 bg-gray-300 rounded w-8"></div>
                        <div className="h-3 bg-gray-300 rounded w-20"></div>
                    </div>
                </div>

                {/* Items Section Skeleton */}
                <div className="border-t border-dashed border-gray-300 pt-2 space-y-2">
                    {/* Table Header Skeleton */}
                    <div className="grid grid-cols-12 gap-2 border-b border-gray-200 pb-1">
                        <div className="col-span-5 h-2 bg-gray-300 rounded"></div>
                        <div className="col-span-2 h-2 bg-gray-300 rounded mx-auto w-6"></div>
                        <div className="col-span-2 h-2 bg-gray-300 rounded mx-auto w-8"></div>
                        <div className="col-span-3 h-2 bg-gray-300 rounded ml-auto w-8"></div>
                    </div>

                    {/* Items Skeleton - Only 2 items */}
                    {[1, 2].map((_, index) => (
                        <div key={index} className="grid grid-cols-12 gap-2">
                            <div className="col-span-5 h-3 bg-gray-300 rounded"></div>
                            <div className="col-span-2 h-3 bg-gray-300 rounded mx-auto w-3"></div>
                            <div className="col-span-2 h-3 bg-gray-300 rounded mx-auto w-8"></div>
                            <div className="col-span-3 h-3 bg-gray-300 rounded ml-auto w-12"></div>
                        </div>
                    ))}
                </div>

                {/* Total Section Skeleton */}
                <div className="border-t-2 border-double border-gray-400 pt-2">
                    <div className="flex justify-between items-center">
                        <div className="h-4 bg-gray-300 rounded w-10"></div>
                        <div className="h-4 bg-gray-300 rounded w-16"></div>
                    </div>
                </div>

                {/* Actions Skeleton */}
                <div className="border-t-2 border-gray-200 pt-3 -mx-6 px-6 bg-gray-50">
                    <div className="flex flex-row gap-1 justify-between w-full">
                        {[1, 2, 3, 4, 5].map((_, index) => (
                            <div key={index} className="flex items-center space-x-1 px-2 py-1.5 bg-gray-300 rounded-md flex-1">
                                <div className="h-2 w-2 bg-gray-400 rounded"></div>
                                <div className="h-2 bg-gray-400 rounded flex-1"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderItemSkeleton;
