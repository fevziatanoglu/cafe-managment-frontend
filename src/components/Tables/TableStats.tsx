import React from 'react';
import { TableProperties, CheckCircle, Users, Clock } from 'lucide-react';
import { StatsCard } from '../Dashboard/StatsCard';
import type { Table } from './Tables';

interface TableStatsProps {
  tables: Table[];
}

export const TableStats: React.FC<TableStatsProps> = ({ tables }) => {
  const totalTables = tables.length;
  const availableTables = tables.filter(t => t.status === 'available').length;
  const occupiedTables = tables.filter(t => t.status === 'occupied').length;
  const reservedTables = tables.filter(t => t.status === 'reserved').length;
  const totalCapacity = tables.reduce((sum, t) => sum + t.capacity, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
      <StatsCard
        title="Total Tables"
        value={totalTables}
        icon={TableProperties}
        iconColor="from-blue-500 to-blue-600"
      />
      <StatsCard
        title="Available"
        value={availableTables}
        icon={CheckCircle}
        iconColor="from-green-500 to-green-600"
        valueColor="text-green-600"
      />
      <StatsCard
        title="Occupied"
        value={occupiedTables}
        icon={Users}
        iconColor="from-red-500 to-red-600"
        valueColor="text-red-600"
      />
      <StatsCard
        title="Reserved"
        value={reservedTables}
        icon={Clock}
        iconColor="from-blue-500 to-blue-600"
        valueColor="text-blue-600"
      />
      <StatsCard
        title="Total Capacity"
        value={totalCapacity}
        icon={Users}
        iconColor="from-purple-500 to-purple-600"
        valueColor="text-purple-600"
      />
    </div>
  );
};
