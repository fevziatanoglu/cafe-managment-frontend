import React, { useState, useMemo } from 'react';
import { Users } from 'lucide-react';
import { WorkerCard } from './WorkerCard';
import { WorkerStats } from './WorkerStats';
import { WorkerFilters } from './WorkerFilters';
import { WorkerModal } from './WorkerModal';
import { WorkerHeader } from './WorkerHeader';

export interface Worker {
  id: number;
  name: string;
  position: string;
  department: string;
  status: 'active' | 'inactive' | 'on-break';
  avatar: string;
  email: string;
  phone: string;
  salary: number;
  hireDate: string;
  shifts: string[];
  performance: number;
}

export const Workers: React.FC = () => {
  const [workers, setWorkers] = useState<Worker[]>([
    {
      id: 1,
      name: 'John Smith',
      position: 'Waiter',
      department: 'Service',
      status: 'active',
      avatar: '👨‍💼',
      email: 'john.smith@cafe.com',
      phone: '+1 (555) 123-4567',
      salary: 3500,
      hireDate: '2023-01-15',
      shifts: ['Morning', 'Afternoon'],
      performance: 4.8
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      position: 'Cashier',
      department: 'Sales',
      status: 'active',
      avatar: '👩‍💼',
      email: 'sarah.johnson@cafe.com',
      phone: '+1 (555) 234-5678',
      salary: 3200,
      hireDate: '2023-02-20',
      shifts: ['Morning', 'Evening'],
      performance: 4.9
    },
    {
      id: 3,
      name: 'Mike Brown',
      position: 'Chef',
      department: 'Kitchen',
      status: 'on-break',
      avatar: '👨‍🍳',
      email: 'mike.brown@cafe.com',
      phone: '+1 (555) 345-6789',
      salary: 4500,
      hireDate: '2022-08-10',
      shifts: ['Morning', 'Afternoon'],
      performance: 4.7
    },
    {
      id: 4,
      name: 'Emma Wilson',
      position: 'Waiter',
      department: 'Service',
      status: 'active',
      avatar: '👩‍💼',
      email: 'emma.wilson@cafe.com',
      phone: '+1 (555) 456-7890',
      salary: 3500,
      hireDate: '2023-03-05',
      shifts: ['Afternoon', 'Evening'],
      performance: 4.6
    },
    {
      id: 5,
      name: 'David Lee',
      position: 'Barista',
      department: 'Kitchen',
      status: 'inactive',
      avatar: '👨‍🍳',
      email: 'david.lee@cafe.com',
      phone: '+1 (555) 567-8901',
      salary: 3800,
      hireDate: '2022-12-01',
      shifts: ['Morning'],
      performance: 4.4
    },
    {
      id: 6,
      name: 'Lisa Chen',
      position: 'Manager',
      department: 'Management',
      status: 'active',
      avatar: '👩‍💼',
      email: 'lisa.chen@cafe.com',
      phone: '+1 (555) 678-9012',
      salary: 5500,
      hireDate: '2021-06-15',
      shifts: ['Morning', 'Afternoon', 'Evening'],
      performance: 4.9
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPosition, setSelectedPosition] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingWorker, setEditingWorker] = useState<Worker | null>(null);

  const filteredWorkers = useMemo(() => {
    return workers.filter(worker => {
      const matchesSearch = worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           worker.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           worker.position.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDepartment = selectedDepartment === 'all' || worker.department === selectedDepartment;
      const matchesStatus = selectedStatus === 'all' || worker.status === selectedStatus;
      const matchesPosition = selectedPosition === 'all' || worker.position === selectedPosition;

      return matchesSearch && matchesDepartment && matchesStatus && matchesPosition;
    });
  }, [workers, searchTerm, selectedDepartment, selectedStatus, selectedPosition]);

  const handleAddWorker = () => {
    setEditingWorker(null);
    setIsModalOpen(true);
  };

  const handleEditWorker = (worker: Worker) => {
    setEditingWorker(worker);
    setIsModalOpen(true);
  };

  const handleDeleteWorker = (id: number) => {
    setWorkers(workers.filter(worker => worker.id !== id));
  };

  const handleSaveWorker = (workerData: Omit<Worker, 'id'>) => {
    if (editingWorker) {
      setWorkers(workers.map(worker => 
        worker.id === editingWorker.id 
          ? { ...workerData, id: editingWorker.id }
          : worker
      ));
    } else {
      const newWorker: Worker = {
        ...workerData,
        id: Math.max(...workers.map(w => w.id)) + 1
      };
      setWorkers([...workers, newWorker]);
    }
    setIsModalOpen(false);
    setEditingWorker(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <WorkerHeader onAddWorker={handleAddWorker} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <WorkerStats workers={workers} />
        
        <WorkerFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedDepartment={selectedDepartment}
          onDepartmentChange={setSelectedDepartment}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          selectedPosition={selectedPosition}
          onPositionChange={setSelectedPosition}
          workers={workers}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkers.map(worker => (
            <WorkerCard
              key={worker.id}
              worker={worker}
              onEdit={() => handleEditWorker(worker)}
              onDelete={() => handleDeleteWorker(worker.id)}
            />
          ))}
        </div>

        {filteredWorkers.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No workers found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {isModalOpen && (
        <WorkerModal
          worker={editingWorker}
          onSave={handleSaveWorker}
          onClose={() => {
            setIsModalOpen(false);
            setEditingWorker(null);
          }}
        />
      )}
    </div>
  );
};
