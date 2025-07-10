import React from 'react';
import { TrendingUp } from 'lucide-react';

interface DashboardHeaderProps {
  totalRevenue: number;
  growth: number;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ totalRevenue, growth }) => {
  return (
    <div className="bg-white/90 backdrop-blur-md shadow-lg border-b border-amber-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-gray-600 mt-1">Welcome! View your business's current status.</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-sm text-gray-500">Today's Revenue</div>
              <div className="text-2xl font-bold text-green-600">${totalRevenue.toLocaleString()}</div>
            </div>
            <div className="flex items-center space-x-1 text-green-600">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm font-medium">+{growth}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
