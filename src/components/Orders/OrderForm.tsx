import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import useStore from '../../store';
import ErrorBox from '../Auth/ErrorBox';
import { createOrderSchema, type CreateOrderFormValues } from '../../validations/orderSchema';
import type { ORDER, ORDER_ITEM } from '../../types/Order';
import OrderProductSelectionModal from './OrderProductSelectionModal';
import type { TABLE } from '../../types';

export default function OrderForm({ order, table }: { order?: ORDER, table?: TABLE }) {
  const { createOrderFetch, updateOrderFetch, closeModal, tables, getTablesFetch, getProductsFetch , getTablesWithOrders } = useStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [productModalOpen, setProductModalOpen] = useState<boolean>(false);


  // State for product selection section
  const [selectedItems, setSelectedItems] = useState<ORDER_ITEM[]>(order?.items || []);

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<CreateOrderFormValues>({
    resolver: zodResolver(createOrderSchema),
    defaultValues: {
      tableId: table?._id || order?.tableId || '',
      tableName: table?.number + " Table" || order?.tableName || '',
      items: order?.items || [],
      note: order?.note || '',
      status: order?.status || 'pending',
    },
  });

  useEffect(() => {
    if (!table) {
      getTablesFetch();
    }
    getProductsFetch();
  }, [getProductsFetch, getTablesFetch, table]);

  const onSubmit = async (data: CreateOrderFormValues) => {
    setIsLoading(true);
    setError(null);
    try {
      let response;
      if (order) {
        response = await updateOrderFetch(order._id, {
          tableId: data.tableId,
          tableName: data.tableName,
          items: data.items,
          note: data.note,
          status: data.status,
        });
      } else {
        response = await createOrderFetch({
          tableId: data.tableId,
          tableName: data.tableName,
          items: data.items,
          note: data.note,
          status: data.status,
        });
      }
      if (response.success) {
        reset();
        getTablesWithOrders()
        closeModal();
      } else {
        setError(response.message || "Operation failed. Please try again.");
      }
    } catch (error) {
      console.error("Order submission error:", error);
      setError('Network error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (productModalOpen) {
    return <OrderProductSelectionModal
      initialItems={selectedItems}
      onOk={(items) => {
        setSelectedItems(items);
        setValue('items', items);
        setProductModalOpen(false);
      }}
      onCancel={() => setProductModalOpen(false)}
    />
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
      {error && <ErrorBox message={error} />}

      {/* Table Field */}
      <div>
        <label className="block text-sm font-medium text-amber-700 mb-2">
          Table Number
        </label>
        <select
          {...register('tableId')}
          className={`
                w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200
                ${errors.tableId
              ? 'border-red-500 bg-red-50'
              : 'border-amber-300 hover:border-amber-400 focus:bg-white'
            }
          `}
          defaultValue={table?._id || order?.tableId || ''}
          onChange={(e) => {
            const selectedTable = e.target.options[e.target.selectedIndex];
            setValue('tableId', selectedTable.value);
            setValue('tableName', selectedTable.dataset.name);
          }}
        >
          {table ? (
            <option value={table._id} data-name={`Table ${table.number}`}>
              Table {table.number} ({table.status})
            </option>
          ) : (
            <>
              <option value="" disabled>
                Select a table
              </option>
              {tables.map((t) => (
                <option
                  key={t._id}
                  value={t._id}
                  data-name={`Table ${t.number}`}
                >
                  Table {t.number} ({t.status})
                </option>
              ))}
            </>
          )}
        </select>
        {errors.tableId && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <span className="mr-1">⚠️</span>
            {errors.tableId.message}
          </p>
        )}
      </div>

      {/* Product Selection Button */}
      <div>
        <label className="block text-sm font-medium text-amber-700 mb-2">
          Products
        </label>
        <button
          type="button"
          className="mb-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
          onClick={() => setProductModalOpen(true)}
        >
          Select Products
        </button>

        {/* Selected Products Summary */}
        {selectedItems.length > 0 ? (
          <div className="mt-3 p-3 bg-amber-50 rounded-lg">
            <h4 className="text-sm font-medium text-amber-700 mb-2">Selected Products:</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              {selectedItems.map(item => (
                <li key={item.productId} className="flex justify-between">
                  <span>{item.price} x{item.quantity}</span>
                  <span>₺{(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-2 pt-2 border-t border-amber-200">
              <div className="flex justify-between font-semibold text-amber-800">
                <span>Total:</span>
                <span>₺{selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-xs text-gray-400 mt-2">No products selected.</div>
        )}
        {errors.items && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <span className="mr-1">⚠️</span>
            {errors.items.message}
          </p>
        )}
      </div>

      {/* Note Field */}
      <div>
        <label className="block text-sm font-medium text-amber-700 mb-2">
          Note
        </label>
        <textarea
          {...register('note')}
          placeholder="Optional note for the order"
          className={`
            w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200
            ${errors.note
              ? 'border-red-500 bg-red-50'
              : 'border-amber-300 hover:border-amber-400 focus:bg-white'
            }
          `}
          rows={3}
        />
        {errors.note && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <span className="mr-1">⚠️</span>
            {errors.note.message}
          </p>
        )}
      </div>

      {/* Status Field */}
      <div>
        <label className="block text-sm font-medium text-amber-700 mb-2">
          Status
        </label>
        <select
          {...register('status')}
          className={`
            w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200
            ${errors.status
              ? 'border-red-500 bg-red-50'
              : 'border-amber-300 hover:border-amber-400 focus:bg-white'
            }
          `}
        >
          <option value="pending">Pending</option>
          <option value="preparing">Preparing</option>
          <option value="served">Served</option>
          <option value="paid">Paid</option>
        </select>
        {errors.status && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <span className="mr-1">⚠️</span>
            {errors.status.message}
          </p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-3 pt-4">
        <button
          type="button"
          onClick={closeModal}
          className="flex-1 px-4 py-3 border border-amber-300 text-amber-700 rounded-lg hover:bg-amber-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className={`
            flex-1 px-4 py-3 rounded-lg font-medium text-white transition-all duration-200
            ${isLoading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-amber-600 hover:bg-amber-700 active:bg-amber-800'
            }
          `}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              {order ? 'Updating...' : 'Creating...'}
            </div>
          ) : (
            order ? 'Update Order' : 'Create Order'
          )}
        </button>
      </div>
    </form>
  );
}
