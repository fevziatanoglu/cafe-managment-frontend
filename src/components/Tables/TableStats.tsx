import type React from "react";
import type { TABLE } from "../../types";

interface TableStatsProps {
  tables: TABLE[];
}

const TableStats: React.FC<TableStatsProps> = ({ tables }) => {
  const stats = {
    total: tables.length,
    empty: tables.filter(t => t.status === 'empty').length,
    occupied: tables.filter(t => t.status === 'occupied').length,
    reserved: tables.filter(t => t.status === 'reserved').length
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-amber-100">
        <div className="flex items-center">
          <div className="bg-gray-100 p-3 rounded-xl">
            <span className="text-2xl">🏪</span>
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Total Tables</p>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-lg border border-amber-100">
        <div className="flex items-center">
          <div className="bg-green-100 p-3 rounded-xl">
            <span className="text-2xl">✅</span>
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Empty</p>
            <p className="text-2xl font-bold text-green-600">{stats.empty}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-lg border border-amber-100">
        <div className="flex items-center">
          <div className="bg-red-100 p-3 rounded-xl">
            <span className="text-2xl">🔴</span>
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Occupied</p>
            <p className="text-2xl font-bold text-red-600">{stats.occupied}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-lg border border-amber-100">
        <div className="flex items-center">
          <div className="bg-blue-100 p-3 rounded-xl">
            <span className="text-2xl">🔵</span>
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Reserved</p>
            <p className="text-2xl font-bold text-blue-600">{stats.reserved}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableStats;
