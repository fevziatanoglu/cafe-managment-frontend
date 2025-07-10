import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, TrendingUp, ShoppingCart, DollarSign, Calendar } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

interface ChartData {
  name: string;
  value: number;
  orders?: number;
}

interface ChartConfig {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  gradientColor: string;
  data: ChartData[];
  type: 'line' | 'bar';
  dataKey: string;
  unit: string;
}

export const RevenueChart: React.FC = () => {
  const [currentChart, setCurrentChart] = useState(0);

  const chartConfigs: ChartConfig[] = [
    {
      title: "Daily Revenue",
      subtitle: "Last 7 days revenue",
      icon: <DollarSign className="h-5 w-5" />,
      color: "#10B981",
      gradientColor: "from-green-500 to-emerald-600",
      type: "line",
      dataKey: "value",
      unit: "$",
      data: [
        { name: 'Mon', value: 2400 },
        { name: 'Tue', value: 2210 },
        { name: 'Wed', value: 2290 },
        { name: 'Thu', value: 2000 },
        { name: 'Fri', value: 2781 },
        { name: 'Sat', value: 3200 },
        { name: 'Sun', value: 2847 }
      ]
    },
    {
      title: "Weekly Revenue",
      subtitle: "Last 4 weeks revenue",
      icon: <TrendingUp className="h-5 w-5" />,
      color: "#3B82F6",
      gradientColor: "from-blue-500 to-indigo-600",
      type: "bar",
      dataKey: "value",
      unit: "$",
      data: [
        { name: 'Week 1', value: 15400 },
        { name: 'Week 2', value: 18200 },
        { name: 'Week 3', value: 16800 },
        { name: 'Week 4', value: 19200 }
      ]
    },
    {
      title: "Monthly Revenue",
      subtitle: "Last 6 months revenue",
      icon: <Calendar className="h-5 w-5" />,
      color: "#8B5CF6",
      gradientColor: "from-purple-500 to-violet-600",
      type: "line",
      dataKey: "value",
      unit: "$",
      data: [
        { name: 'Jan', value: 65000 },
        { name: 'Feb', value: 72000 },
        { name: 'Mar', value: 68000 },
        { name: 'Apr', value: 78000 },
        { name: 'May', value: 82000 },
        { name: 'Jun', value: 85000 }
      ]
    },
    {
      title: "Daily Orders",
      subtitle: "Last 7 days orders",
      icon: <ShoppingCart className="h-5 w-5" />,
      color: "#F59E0B",
      gradientColor: "from-amber-500 to-orange-600",
      type: "bar",
      dataKey: "value",
      unit: "",
      data: [
        { name: 'Mon', value: 145 },
        { name: 'Tue', value: 132 },
        { name: 'Wed', value: 128 },
        { name: 'Thu', value: 119 },
        { name: 'Fri', value: 167 },
        { name: 'Sat', value: 189 },
        { name: 'Sun', value: 156 }
      ]
    },
    {
      title: "Weekly Orders",
      subtitle: "Last 4 weeks orders",
      icon: <ShoppingCart className="h-5 w-5" />,
      color: "#EF4444",
      gradientColor: "from-red-500 to-pink-600",
      type: "line",
      dataKey: "value",
      unit: "",
      data: [
        { name: 'Week 1', value: 890 },
        { name: 'Week 2', value: 1020 },
        { name: 'Week 3', value: 945 },
        { name: 'Week 4', value: 1150 }
      ]
    }
  ];

  const nextChart = () => {
    setCurrentChart((prev) => (prev + 1) % chartConfigs.length);
  };

  const prevChart = () => {
    setCurrentChart((prev) => (prev - 1 + chartConfigs.length) % chartConfigs.length);
  };

  const currentConfig = chartConfigs[currentChart];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{label}</p>
          <p className="text-sm" style={{ color: currentConfig.color }}>
            {`${currentConfig.unit}${payload[0].value.toLocaleString()}`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-amber-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className={`bg-gradient-to-r ${currentConfig.gradientColor} p-3 rounded-xl`}>
            <div className="text-white">
              {currentConfig.icon}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{currentConfig.title}</h3>
            <p className="text-sm text-gray-600">{currentConfig.subtitle}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 text-sm text-gray-500">
            <span>{currentChart + 1}</span>
            <span>/</span>
            <span>{chartConfigs.length}</span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={prevChart}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <ChevronLeft className="h-4 w-4 text-gray-600" />
            </button>
            <button
              onClick={nextChart}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <ChevronRight className="h-4 w-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          {currentConfig.type === 'line' ? (
            <LineChart data={currentConfig.data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="name" 
                stroke="#6b7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="#6b7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${currentConfig.unit}${value.toLocaleString()}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey={currentConfig.dataKey}
                stroke={currentConfig.color}
                strokeWidth={3}
                dot={{ fill: currentConfig.color, strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: currentConfig.color, strokeWidth: 2 }}
              />
            </LineChart>
          ) : (
            <BarChart data={currentConfig.data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="name" 
                stroke="#6b7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="#6b7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${currentConfig.unit}${value.toLocaleString()}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey={currentConfig.dataKey}
                fill={currentConfig.color}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Chart indicators */}
      <div className="flex justify-center mt-4 space-x-2">
        {chartConfigs.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentChart(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentChart ? 'bg-amber-500' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
