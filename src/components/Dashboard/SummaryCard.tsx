import React from 'react';
import { ArrowRight } from 'lucide-react';

interface SummaryCardProps {
  title: string;
  icon: React.ReactNode;
  iconColor: string;
  children: React.ReactNode;
  onViewAll: () => void;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({ 
  title, 
  icon, 
  iconColor,
  children, 
  onViewAll 
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-amber-100 overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`bg-gradient-to-r ${iconColor} p-3 rounded-xl text-white`}>
              {icon}
            </div>
            <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          </div>
          <button 
            onClick={onViewAll}
            className="group flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg hover:from-amber-700 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-md"
          >
            <span className="text-sm font-medium">View All</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
      
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};
