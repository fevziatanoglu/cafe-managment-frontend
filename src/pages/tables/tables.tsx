import { useEffect, useState } from "react";
import useStore from "../../store";
import type { TABLE_WITH_ORDERS } from "../../types/Table";
import TableHeader from "../../components/Tables/TableHeader";
import TableStats from "../../components/Tables/TableStats";
import TableCard from "../../components/Tables/TableCard";
import { TableFilters } from "../../components/Tables/TableFilters";


// Main TablesPage Component
export default function Tables() {
  const { getTablesWithOrders, tablesWithOrders } = useStore();
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'empty' | 'occupied' | 'reserved'>('all');
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    const fetchTables = async () => {
      setIsLoading(true);
      await getTablesWithOrders();
      setIsLoading(false);
    };
    fetchTables();
  }, [getTablesWithOrders]);

  const filteredTables = (tablesWithOrders || []).filter((table: TABLE_WITH_ORDERS) => {
    const matchesStatus = selectedStatus === 'all' || table.status === selectedStatus;
    return matchesStatus;
  });


  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <TableHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TableStats tables={tablesWithOrders || []} />

        <TableFilters
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          tables={tablesWithOrders || []}
        />

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
            <span className="ml-2 text-amber-600">Loading tables...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTables.map(table => (
              <TableCard
                key={table._id}
                table={table}
              />
            ))}
          </div>
        )}

        {filteredTables.length === 0 && (
          <div className="text-center py-12">
            <div className="text-amber-300 mx-auto mb-4 text-6xl">🏪</div>
            <h3 className="text-lg font-medium text-amber-800 mb-2">No tables found</h3>
            <p className="text-amber-600">Try adjusting your filters or add a new table</p>
          </div>
        )}
      </div>

    </div>
  );
}
