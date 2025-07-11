import React from 'react';
import { ArrowRight, Play, Coffee } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative py-12 sm:py-16 lg:py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-100/50 via-orange-100/30 to-yellow-100/50" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-amber-200 to-orange-200 rounded-full opacity-20 blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-br from-orange-200 to-yellow-200 rounded-full opacity-20 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
          {/* Content */}
          <div className="lg:col-span-6 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-gray-900 leading-tight mb-6 sm:mb-8 tracking-tight">
              Manage Your{' '}
              <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-500 bg-clip-text text-transparent drop-shadow-sm">
                Cafe
              </span>{' '}
              <span className="block">Effortlessly</span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Manage your cafe with a single system. From inventory tracking to customer orders, 
              everything you need for a successful coffee business is here.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12 justify-center lg:justify-start">
              <button className="group flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl hover:from-amber-700 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-xl text-sm sm:text-base font-medium">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="group flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-white text-gray-700 rounded-xl border-2 border-gray-200 hover:border-amber-300 hover:bg-amber-50 transition-all duration-300 shadow-lg text-sm sm:text-base font-medium">
                <Play className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-amber-600" />
                Watch Demo
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-md mx-auto lg:max-w-none lg:mx-0">
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-bold text-gray-900">500+</div>
                <div className="text-xs sm:text-sm text-gray-600">Happy Cafes</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-bold text-gray-900">99.9%</div>
                <div className="text-xs sm:text-sm text-gray-600">Uptime</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-bold text-gray-900">24/7</div>
                <div className="text-xs sm:text-sm text-gray-600">Support</div>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="lg:col-span-6 mt-8 sm:mt-12 lg:mt-0 flex justify-center">
            <div className="relative">
              <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-full p-8 sm:p-12 lg:p-16 shadow-2xl">
                <Coffee className="w-24 h-24 sm:w-32 sm:h-32 lg:w-48 lg:h-48 text-amber-600 animate-pulse" />
              </div>
              <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-4 h-4 sm:w-8 sm:h-8 bg-orange-400 rounded-full animate-bounce"></div>
              <div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 w-3 h-3 sm:w-6 sm:h-6 bg-amber-400 rounded-full animate-bounce delay-1000"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
