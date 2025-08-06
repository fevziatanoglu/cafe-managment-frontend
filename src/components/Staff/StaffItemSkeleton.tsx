export default function StaffItemSkeleton() {
    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 animate-pulse">
            <div className="flex">
                {/* Left side - Image and basic info skeleton */}
                <div className="w-32 bg-gradient-to-br from-gray-300 to-gray-400 p-4 flex flex-col items-center justify-center">
                    {/* Profile image skeleton */}
                    <div className="w-20 h-20 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center mb-3">
                        <div className="w-8 h-8 bg-white/50 rounded-full"></div>
                    </div>
                    
                    {/* ID and date skeleton */}
                    <div className="text-center space-y-1">
                        <div className="h-3 bg-white/40 rounded w-16 mx-auto"></div>
                        <div className="h-3 bg-white/30 rounded w-12 mx-auto"></div>
                    </div>
                </div>

                {/* Right side - Staff details skeleton */}
                <div className="flex-1 p-4">
                    {/* Header section */}
                    <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                            {/* Name skeleton */}
                            <div className="h-5 bg-gray-300 rounded w-32 mb-2"></div>
                            
                            {/* Role badge skeleton */}
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 bg-gray-300 rounded"></div>
                                <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                            </div>
                        </div>
                        
                        {/* Action buttons skeleton */}
                        <div className="flex gap-2">
                            <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
                            <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
                        </div>
                    </div>

                    {/* Details section */}
                    <div className="space-y-2">
                        {/* Email skeleton */}
                        <div className="flex items-center gap-2">
                            <div className="w-3.5 h-3.5 bg-gray-300 rounded"></div>
                            <div className="h-4 bg-gray-300 rounded w-40"></div>
                        </div>

                        {/* Status skeleton */}
                        <div className="flex items-center gap-2">
                            <div className="w-3.5 h-3.5 bg-gray-300 rounded-full"></div>
                            <div className="h-4 bg-gray-300 rounded w-24"></div>
                        </div>
                    </div>

                    {/* Bottom stripe skeleton */}
                    <div className="mt-4 pt-3 border-t border-gray-100">
                        <div className="flex items-center justify-between">
                            <div className="h-3 bg-gray-200 rounded w-24"></div>
                            <div className="flex gap-1">
                                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
