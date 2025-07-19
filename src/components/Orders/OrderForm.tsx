import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useEffect } from 'react';
import useStore from '../../store';
import ErrorBox from '../Auth/ErrorBox';
import { createOrderSchema, type CreateOrderFormValues } from '../../validations/orderSchema';
import type { ORDER } from '../../types/Order';

export default function OrderForm({ order }: { order?: ORDER }) {
  const { createOrderFetch, updateOrderFetch, closeModal, tables } = useStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<CreateOrderFormValues>({
    resolver: zodResolver(createOrderSchema),
    defaultValues: {
      tableId: order?.tableId || '',
      items: [],
      note: '',
      status: order?.status || 'pending',
    },
  });

  useEffect(() => {
    if (order) {
      setValue('tableId', order.tableId);
      setValue('items', []);
      setValue('status', order.status);
      setValue('note', '');
    }
  }, [order, setValue]);

  const onSubmit = async (data: CreateOrderFormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      let response;
      if (order) {
        response = await updateOrderFetch(order._id, {
          tableId: data.tableId,
          items: data.items,
          note: data.note,
          status: data.status,
        });
      } else {
        response = await createOrderFetch({
          tableId: data.tableId,
          items: data.items,
          note: data.note,
          status: data.status,
        });
      }
      if (response.success) {
        reset();
        closeModal();
      } else {
        setError(response.message || "Operation failed. Please try again.");
      }
    } catch (error) {
      console.log(error);
      setError('Network error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

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
          defaultValue={order?.tableId || ''}
        >
          <option value="" disabled>
            Select a table
          </option>
          {tables.map((table) => (
            <option key={table._id} value={table._id}>
              Table {table.number} ({table.status})
            </option>
          ))}
        </select>
        {errors.tableId && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <span className="mr-1">⚠️</span>
            {errors.tableId.message}
          </p>
        )}
      </div>

      {/* Items Field */}
      <div>
        <label className="block text-sm font-medium text-amber-700 mb-2">
          Items
        </label>
        <input
          {...register('items')}
          type="text"
          placeholder="Enter items (comma separated)"
          className={`
            w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200
            ${errors.items
              ? 'border-red-500 bg-red-50'
              : 'border-amber-300 hover:border-amber-400 focus:bg-white'
            }
          `}
        />
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
          placeholder="Optional note"
          className={`
            w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200
            ${errors.note
              ? 'border-red-500 bg-red-50'
              : 'border-amber-300 hover:border-amber-400 focus:bg-white'
            }
          `}
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
