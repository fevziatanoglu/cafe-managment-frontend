import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useEffect } from 'react';
import useStore from '../../store';
import ErrorBox from '../Auth/ErrorBox';
import { createOrderSchema, type CreateOrderFormValues } from '../../validations/orderSchema';
import type { ORDER } from '../../types/Order';
import { OrderProductSelectionSection } from './OrderProductSelectionSection';

export default function OrderForm({ order }: { order?: ORDER }) {
  const { createOrderFetch, updateOrderFetch, closeModal, tables, products } = useStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // State for product selection section
  const [productSelectionOpen, setProductSelectionOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<
    { productId: string; name: string; price: number; quantity: number }[]
  >(
    order?.items?.map(i => ({
      productId: i.productId,
      name: products.find(p => p._id === i.productId)?.name || '',
      price: i.price,
      quantity: i.quantity,
    })) || []
  );

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<CreateOrderFormValues>({
    resolver: zodResolver(createOrderSchema),
    defaultValues: {
      tableId: order?.tableId || '',
      items: order?.items || [],
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
      setSelectedItems(
        order.items?.map(i => ({
          productId: i.productId,
          name: products.find(p => p._id === i.productId)?.name || '',
          price: i.price,
          quantity: i.quantity,
        })) || []
      );
    }
  }, [order, setValue, products]);

  // Handle quantity change for a product
  const handleQuantityChange = (productId: string, delta: number) => {
    setSelectedItems(items => {
      const idx = items.findIndex(i => i.productId === productId);
      if (idx === -1 && delta > 0) {
        const product = products.find(p => p._id === productId);
        if (!product) return items;
        return [...items, { productId, name: product.name, price: product.price, quantity: 1 }];
      }
      if (idx !== -1) {
        const newQty = items[idx].quantity + delta;
        if (newQty <= 0) return items.filter((_, i) => i !== idx);
        return items.map((item, i) =>
          i === idx ? { ...item, quantity: newQty } : item
        );
      }
      return items;
    });
  };

  // On OK, update form items
  const handleOk = () => {
    setValue('items', selectedItems.map(i => ({
      productId: i.productId,
      quantity: i.quantity,
      price: i.price,
    })));
    setProductSelectionOpen(false);
  };

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

  if (productSelectionOpen) {
    return (
      <OrderProductSelectionSection
        products={products}
        selectedItems={selectedItems}
        onQuantityChange={handleQuantityChange}
        onOk={handleOk}
      />
    );
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

      {/* Product Selection Section */}
      <div>
        <label className="block text-sm font-medium text-amber-700 mb-2">
          Products
        </label>
        <button
          type="button"
          className="mb-2 px-3 py-1 bg-amber-100 text-amber-700 rounded"
          onClick={() => setProductSelectionOpen(v => !v)}
        >
          {productSelectionOpen ? "Hide Product Selection" : "Select Products"}
        </button>
        {productSelectionOpen && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-amber-50 p-4 rounded-lg mb-2">
            {products.map(product => {
              const selected = selectedItems.find(i => i.productId === product._id);
              return (
                <div key={product._id} className="flex items-center justify-between bg-white rounded-lg p-3 shadow">
                  <div>
                    <div className="font-semibold">{product.name}</div>
                    <div className="text-xs text-gray-500">₺{product.price}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="px-2 py-1 bg-amber-200 rounded text-amber-700"
                      onClick={() => handleQuantityChange(product._id, -1)}
                      disabled={!selected}
                    >-</button>
                    <span className="w-6 text-center">{selected?.quantity || 0}</span>
                    <button
                      type="button"
                      className="px-2 py-1 bg-amber-200 rounded text-amber-700"
                      onClick={() => handleQuantityChange(product._id, 1)}
                    >+</button>
                  </div>
                </div>
              );
            })}
            <div className="col-span-full flex justify-end mt-2">
              <button
                type="button"
                className="px-4 py-2 bg-amber-600 text-white rounded-lg"
                onClick={handleOk}
              >
                OK
              </button>
            </div>
          </div>
        )}

        {/* Selected Products Summary */}
        {selectedItems.length > 0 ? (
          <ul className="text-sm text-gray-700 space-y-1">
            {selectedItems.map(item => (
              <li key={item.productId}>
                {item.name} x{item.quantity} (₺{item.price * item.quantity})
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-xs text-gray-400">No products selected.</div>
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
