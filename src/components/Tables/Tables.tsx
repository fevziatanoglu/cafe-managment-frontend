import React, { useState, useMemo } from 'react';
import { TableProperties } from 'lucide-react';
import { TableCard } from './TableCard';
import { TableModal } from './TableModal';
import { TableHeader } from './TableHeader';
import { TableStats } from './TableStats';
import { TableFilters } from './TableFilters';

export interface Table {
  id: number;
  number: string;
  capacity: number;
  status: 'available' | 'occupied' | 'reserved';
  currentGuests?: number;
  estimatedTime?: string;
  waiter?: string;
  location: string;
  reservationName?: string;
  reservationTime?: string;
  orderTotal?: number;
}

export const Tables: React.FC = () => {
  const [tables, setTables] = useState<Table[]>([
    {
      id: 1,
      number: '1',
      capacity: 4,
      status: 'occupied',
      currentGuests: 3,
      estimatedTime: '20 min',
      waiter: 'John Smith',
      location: 'Main Hall',
      orderTotal: 125
    },
    {
      id: 2,
      number: '2',
      capacity: 2,
      status: 'available',
      location: 'Window Side'
    },
    {
      id: 3,
      number: '3',
      capacity: 6,
      status: 'reserved',
      estimatedTime: '15 min',
      location: 'VIP Area',
      reservationName: 'Sarah Johnson',
      reservationTime: '19:00'
    },
    {
      id: 4,
      number: '4',
      capacity: 4,
      status: 'available',
      location: 'Main Hall'
    },
    {
      id: 5,
      number: '5',
      capacity: 8,
      status: 'occupied',
      currentGuests: 6,
      estimatedTime: '30 min',
      waiter: 'Emma Wilson',
      location: 'Garden Area',
      orderTotal: 245
    },
    {
      id: 6,
      number: '6',
      capacity: 2,
      status: 'available',
      location: 'Balcony'
    },
    {
      id: 7,
      number: '7',
      capacity: 4,
      status: 'reserved',
      estimatedTime: '45 min',
      location: 'Main Hall',
      reservationName: 'Mike Brown',
      reservationTime: '20:30'
    },
    {
      id: 8,
      number: '8',
      capacity: 6,
      status: 'occupied',
      currentGuests: 4,
      estimatedTime: '25 min',
      waiter: 'Lisa Chen',
      location: 'VIP Area',
      orderTotal: 189
    }
  ]);

  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTable, setEditingTable] = useState<Table | null>(null);

  const filteredTables = useMemo(() => {
    return tables.filter(table => {
      const matchesStatus = selectedStatus === 'all' || table.status === selectedStatus;
      return matchesStatus;
    });
  }, [tables, selectedStatus]);

  const handleAddTable = () => {
    setEditingTable(null);
    setIsModalOpen(true);
  };

  const handleEditTable = (table: Table) => {
    setEditingTable(table);
    setIsModalOpen(true);
  };

  const handleDeleteTable = (id: number) => {
    setTables(tables.filter(table => table.id !== id));
  };

  const handleSaveTable = (tableData: Omit<Table, 'id'>) => {
    if (editingTable) {
      setTables(tables.map(table => 
        table.id === editingTable.id 
          ? { ...tableData, id: editingTable.id }
          : table
      ));
    } else {
      const newTable: Table = {
        ...tableData,
        id: Math.max(...tables.map(t => t.id)) + 1
      };
      setTables([...tables, newTable]);
    }
    setIsModalOpen(false);
    setEditingTable(null);
  };

  const handleStatusChange = (tableId: number, newStatus: Table['status']) => {
    setTables(tables.map(table => 
      table.id === tableId 
        ? { ...table, status: newStatus }
        : table
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <TableHeader onAddTable={handleAddTable} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TableStats tables={tables} />
        
        <TableFilters
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          tables={tables}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTables.map(table => (
            <TableCard
              key={table.id}
              table={table}
              onEdit={() => handleEditTable(table)}
              onDelete={() => handleDeleteTable(table.id)}
              onStatusChange={(newStatus) => handleStatusChange(table.id, newStatus)}
            />
          ))}
        </div>

        {filteredTables.length === 0 && (
          <div className="text-center py-12">
            <TableProperties className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tables found</h3>
            <p className="text-gray-600">Try adjusting your filters or add a new table</p>
          </div>
        )}
      </div>

      {isModalOpen && (
        <TableModal
          table={editingTable}
          onSave={handleSaveTable}
          onClose={() => {
            setIsModalOpen(false);
            setEditingTable(null);
          }}
        />
      )}
    </div>
  );
};
