import React from 'react';
import { Users } from 'lucide-react';
import { SummaryCard } from './SummaryCard';

interface Employee {
  id: number;
  name: string;
  position: string;
  status: 'active' | 'break';
  avatar: string;
}

interface StaffListProps {
  employees: Employee[];
  onViewAll: () => void;
}

export const StaffList: React.FC<StaffListProps> = ({ employees, onViewAll }) => {
  return (
    <SummaryCard
      title="Staff"
      icon={<Users className="h-6 w-6" />}
      iconColor="from-purple-500 to-purple-600"
      onViewAll={onViewAll}
    >
      <div className="space-y-4">
        {employees.map(employee => (
          <div key={employee.id} className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">{employee.avatar}</div>
              <div>
                <p className="font-medium text-gray-900">{employee.name}</p>
                <p className="text-sm text-gray-600">{employee.position}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                employee.status === 'active' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-yellow-100 text-yellow-700'
              }`}>
                {employee.status === 'active' ? 'Active' : 'Break'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </SummaryCard>
  );
};
