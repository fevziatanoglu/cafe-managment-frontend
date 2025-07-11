import React from 'react';
import { Users, UserCheck, UserX, Clock, DollarSign, TrendingUp } from 'lucide-react';
import { StatsCard } from '../Dashboard/StatsCard';
import type { Worker } from './Workers';

interface WorkerStatsProps {
  workers: Worker[];
}

export const WorkerStats: React.FC<WorkerStatsProps> = ({ workers }) => {
  const totalWorkers = workers.length;
  const activeWorkers = workers.filter(w => w.status === 'active').length;
  const inactiveWorkers = workers.filter(w => w.status === 'inactive').length;
  const totalSalary = workers.reduce((sum, w) => sum + w.salary, 0);
  const avgPerformance = workers.reduce((sum, w) => sum + w.performance, 0) / workers.length;

  return (
    <div className="flex flex-col w-full gap-4 md:flex-row items-center justify-between mb-8">
      <StatsCard
        title="Total Workers"
        value={totalWorkers}
        icon={Users}
        iconColor="from-blue-500 to-blue-600"
      />
      <StatsCard
        title="Active Workers"
        value={activeWorkers}
        icon={UserCheck}
        iconColor="from-green-500 to-green-600"
        valueColor="text-green-600"
      />
      <StatsCard
        title="Inactive"
        value={inactiveWorkers}
        icon={UserX}
        iconColor="from-red-500 to-red-600"
        valueColor="text-red-600"
      />
      <StatsCard
        title="Total Salary"
        value={`$${totalSalary.toLocaleString()}`}
        icon={DollarSign}
        iconColor="from-purple-500 to-purple-600"
        valueColor="text-purple-600"
      />
      <StatsCard
        title="Avg Performance"
        value={`${avgPerformance.toFixed(1)}/5`}
        icon={TrendingUp}
        iconColor="from-indigo-500 to-indigo-600"
        valueColor="text-indigo-600"
      />
    </div>
  );
};
