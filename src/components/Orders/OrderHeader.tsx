import React from 'react';
import { ShoppingCart, Plus } from 'lucide-react';
import useStore from '../../store';
import OrderForm from './OrderForm';



export const OrderHeader: React.FC = () => {
  const {openModal} = useStore();
  return (
    <div className="bg-white/90 backdrop-blur-md shadow-lg border-b border-amber-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-2 sm:p-3 rounded-xl">
              <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                Orders Management
              </h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1">
                Manage your cafe orders and payments
              </p>
            </div>
          </div>
          
          <button
          onClick={()=>openModal(<OrderForm /> , "Create an order")}
            className="flex items-center justify-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl hover:from-amber-700 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-lg text-sm sm:text-base"
          >
            <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="font-medium">Add Order</span>
          </button>
        </div>
      </div>
    </div>
  );
};
