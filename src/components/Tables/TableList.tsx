import { useState } from 'react';
import useStore from '../../store';
import { Coffee } from 'lucide-react';
import { GenericFilter, type FilterOption } from '../Common/GenericFilter';
import TableForm from './TableForm';
import TableItemSkeleton from './TableItemSkeleton';
import TableItem from './TableItem';

export default function TableList() {
  const { tablesWithOrders, isTablesLoading, openModal } = useStore();

  // Local filter state
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'empty' | 'occupied' | 'reserved'>('all');

  // Status options for GenericFilter
  const statusOptions: FilterOption<'all' | 'empty' | 'occupied' | 'reserved'>[] = [
    { value: 'all', label: 'All', count: tablesWithOrders?.length || 0, color: 'bg-gray-100 text-gray-700 hover:bg-gray-200', icon: '📋' },
    { value: 'empty', label: 'Empty', count: tablesWithOrders?.filter(t => t.status === 'empty').length || 0, color: 'bg-green-100 text-green-700 hover:bg-green-200', icon: '🟢' },
    { value: 'occupied', label: 'Occupied', count: tablesWithOrders?.filter(t => t.status === 'occupied').length || 0, color: 'bg-red-100 text-red-700 hover:bg-red-200', icon: '🔴' },
    { value: 'reserved', label: 'Reserved', count: tablesWithOrders?.filter(t => t.status === 'reserved').length || 0, color: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200', icon: '🟡' }
  ];

  // Filter logic (only by status)
  const filteredTables = (tablesWithOrders || []).filter(table => {
    const matchesStatus = selectedStatus === 'all' || table.status === selectedStatus;
    return matchesStatus;
  });

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      {/* Generic Filter Bar */}
      <GenericFilter
        options={statusOptions}
        selected={selectedStatus}
        onChange={setSelectedStatus}
        onOpenModal={() => openModal(<TableForm />, "Create New Table")}
        createLabel="Create Table"
      />

      {/* Table Count */}
      <div className="mb-4">
        <p className="text-sm text-amber-600">
          Showing {filteredTables.length} of {tablesWithOrders?.length || 0} tables
        </p>
      </div>

      {/* Table List */}
      {isTablesLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[1, 2, 3].map((index) => (
            <TableItemSkeleton key={index} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredTables.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <Coffee className="h-16 w-16 text-amber-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-amber-800 mb-2">No tables found</h3>
              <p className="text-amber-600 mb-4">
                {selectedStatus !== 'all'
                  ? 'Try adjusting your filter criteria.'
                  : 'No tables yet.'
                }
              </p>
            </div>
          ) : (
            filteredTables.map((table) => (
              <TableItem table={table} key={table._id} />
            ))
          )}
        </div>
      )}
    </div>
  );
}
