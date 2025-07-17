interface OrderListStatusBarProps {
    selectedStatus: string;
    setSelectedStatus: (status: 'all' | 'pending' | 'preparing' | 'served' | 'paid') => void;
    statusOptions: { value: string; label: string; count: number }[];
  }
  
  export default function OrderListStatusBar({
    selectedStatus,
    setSelectedStatus,
    statusOptions,
  }: OrderListStatusBarProps) {
    return (
      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Order Status
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
          {statusOptions.map(option => (
            <button
              key={option.value}
              onClick={() => setSelectedStatus(option.value as 'all' | 'pending' | 'preparing' | 'served' | 'paid')}
              className={`px-3 py-2 rounded-lg font-medium transition-all duration-300 text-xs sm:text-sm ${
                selectedStatus === option.value
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg transform scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <div className="text-center">
                <div className="font-semibold">{option.label}</div>
                <div className="text-xs opacity-75">({option.count})</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }
