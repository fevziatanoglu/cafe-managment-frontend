import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconColor: string;
  valueColor?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  icon: Icon, 
  iconColor, 
  valueColor = 'text-gray-900' 
}) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-amber-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className={`text-2xl font-bold ${valueColor}`}>{value}</p>
        </div>
        <div className={`bg-gradient-to-r ${iconColor} p-3 rounded-xl`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );
};
