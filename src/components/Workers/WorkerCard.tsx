import React from 'react';
import { Edit2, Trash2, Phone, Mail, Calendar, DollarSign, Star } from 'lucide-react';
import type { Worker } from './Workers';

interface WorkerCardProps {
  worker: Worker;
  onEdit: () => void;
  onDelete: () => void;
}

export const WorkerCard: React.FC<WorkerCardProps> = ({ worker, onEdit, onDelete }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'inactive':
        return 'bg-red-100 text-red-700';
      case 'on-break':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'inactive':
        return 'Inactive';
      case 'on-break':
        return 'On Break';
      default:
        return 'Unknown';
    }
  };

  const getDepartmentColor = (department: string) => {
    switch (department) {
      case 'Service':
        return 'bg-blue-100 text-blue-700';
      case 'Kitchen':
        return 'bg-orange-100 text-orange-700';
      case 'Sales':
        return 'bg-green-100 text-green-700';
      case 'Management':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-amber-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
      <div className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="text-4xl">{worker.avatar}</div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900">{worker.name}</h3>
            <p className="text-gray-600">{worker.position}</p>
            <div className="flex items-center space-x-2 mt-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDepartmentColor(worker.department)}`}>
                {worker.department}
              </span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(worker.status)}`}>
                {getStatusText(worker.status)}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Mail className="h-4 w-4" />
            <span>{worker.email}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Phone className="h-4 w-4" />
            <span>{worker.phone}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Calendar className="h-4 w-4" />
            <span>Hired: {new Date(worker.hireDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <DollarSign className="h-4 w-4" />
            <span>${worker.salary.toLocaleString()}/month</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Star className="h-4 w-4" />
            <span>Performance: {worker.performance}/5</span>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">Shifts:</p>
          <div className="flex flex-wrap gap-2">
            {worker.shifts.map(shift => (
              <span key={shift} className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs">
                {shift}
              </span>
            ))}
          </div>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={onEdit}
            className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
          >
            <Edit2 className="h-4 w-4" />
            <span>Edit</span>
          </button>
          <button
            onClick={onDelete}
            className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300"
          >
            <Trash2 className="h-4 w-4" />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};
