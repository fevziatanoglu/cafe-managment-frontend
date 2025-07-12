import React from 'react';
import { Coffee, MapPin, Phone, Clock } from 'lucide-react';

export const MenuHeader: React.FC = () => {
  return (
    <header className="bg-white/95 backdrop-blur-md shadow-lg border-b border-amber-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-2 rounded-xl">
              <Coffee className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                Café Delight
              </h1>
              <p className="text-sm text-gray-600">Premium Coffee & Dining</p>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-amber-600" />
              <span>123 Coffee Street</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-amber-600" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-amber-600" />
              <span>7:00 AM - 10:00 PM</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
