import React from 'react';
import { Coffee } from 'lucide-react';

const Loading: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center relative overflow-hidden">
            {/* Background decoration matching hero section */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-100/50 via-orange-100/30 to-yellow-100/50" />
            <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-amber-200 to-orange-200 rounded-full opacity-20 blur-3xl" />
            <div className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-br from-orange-200 to-yellow-200 rounded-full opacity-20 blur-3xl" />

            <div className="relative text-center">
                {/* Coffee Icon with Steam Animation */}
                <div className="relative mb-8 flex justify-center ">
                    <Coffee className="w-24 h-24 text-amber-600 animate-pulse" />

                    {/* Decorative dots like hero section */}
                    <div className="absolute -top-4 -right-4 w-8 h-8 bg-orange-400 rounded-full animate-bounce"></div>
                    <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-amber-400 rounded-full animate-bounce delay-1000"></div>
                </div>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 drop-shadow-lg tracking-tight">
                    <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-500 bg-clip-text text-transparent">
                        Cafe Management
                    </span>
                </h1>

                {/* Subtitle */}
                <p className="text-xl text-gray-600 mb-8 opacity-90 leading-relaxed">
                    Brewing your perfect experience...
                </p>

                {/* Loading Spinner */}
                <div className="flex justify-center mb-6">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-300 border-t-amber-600"></div>
                </div>

                {/* Loading Dots */}
                <div className="flex justify-center space-x-2">
                    <div className="w-3 h-3 bg-amber-600 rounded-full animate-bounce delay-0"></div>
                    <div className="w-3 h-3 bg-amber-600 rounded-full animate-bounce delay-150"></div>
                    <div className="w-3 h-3 bg-amber-600 rounded-full animate-bounce delay-300"></div>
                </div>
            </div>
        </div>
    );
};

export default Loading;
