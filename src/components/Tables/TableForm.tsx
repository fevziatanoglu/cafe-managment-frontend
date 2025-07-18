import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { TABLE } from '../../types/Table';
import ErrorBox from '../Auth/ErrorBox';
import useStore from '../../store';
import { tableSchema, type TableFormData } from '../../validations/tableSchema';




export default function TableForm({ table }: { table?: TABLE }) {
    const { createTableFetch, updateTableFetch, closeModal } = useStore();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm<TableFormData>({
        resolver: zodResolver(tableSchema),
        defaultValues: {
            number: table?.number || '',
            status: table?.status || 'empty',
        },
    });

    useEffect(() => {
        if (table) {
            setValue('number', table.number);
            setValue('status', table.status);
        }
    }, [table, setValue]);

    const onSubmit = async (data: TableFormData) => {
        setIsLoading(true);
        if (table) {
            await updateTableFetch(table._id, data);
        } else {
            await createTableFetch(data);
        }
        closeModal();
        setError(null);
    }


    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">
                            {table ? 'Edit Table' : 'Add New Table'}
                        </h2>
                        <button
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Error Display */}
                    {error && <ErrorBox message={error} />}

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Table Number Field */}
                        <div>
                            <label className="block text-sm font-medium text-amber-700 mb-2">
                                Table Number *
                            </label>
                            <input
                                {...register('number')}
                                type="text"
                                placeholder="Enter table number (e.g., 1, A1, VIP-1)"
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200
                                    ${errors.number
                                        ? 'border-red-500 bg-red-50'
                                        : 'border-amber-300 hover:border-amber-400 focus:bg-white'
                                    }
                                `}
                            />
                            {errors.number && (
                                <p className="mt-1 text-sm text-red-600 flex items-center">
                                    <span className="mr-1">⚠️</span>
                                    {errors.number.message}
                                </p>
                            )}
                        </div>

                        {/* Status Field */}
                        <div>
                            <label className="block text-sm font-medium text-amber-700 mb-2">
                                Table Status *
                            </label>
                            <select
                                {...register('status')}
                                className={` w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200
                                    ${errors.status
                                        ? 'border-red-500 bg-red-50'
                                        : 'border-amber-300 hover:border-amber-400 focus:bg-white'
                                    }
                                `}
                            >
                                <option value="empty">🟢 Empty - Available for new customers</option>
                                <option value="occupied">🔴 Occupied - Currently in use</option>
                                <option value="reserved">🔵 Reserved - Booked for future use</option>
                            </select>
                            {errors.status && (
                                <p className="mt-1 text-sm text-red-600 flex items-center">
                                    <span className="mr-1">⚠️</span>
                                    {errors.status.message}
                                </p>
                            )}
                        </div>

                        {/* Status Info */}
                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                            <h4 className="text-sm font-medium text-amber-800 mb-2">Status Guide:</h4>
                            <ul className="text-xs text-amber-700 space-y-1">
                                <li>• <strong>Empty:</strong> Table is clean and ready for new customers</li>
                                <li>• <strong>Occupied:</strong> Customers are currently dining at this table</li>
                                <li>• <strong>Reserved:</strong> Table is booked for a specific time/customer</li>
                            </ul>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-3 pt-4">
                            <button
                                onClick={() => closeModal()}
                                type="button"
                                disabled={isLoading}
                                className="flex-1 px-4 py-3 border border-amber-300 text-amber-700 rounded-lg hover:bg-amber-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                                        : 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 active:from-amber-800 active:to-orange-800'
                                    }
                                `}
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                        {table ? 'Updating...' : 'Creating...'}
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center space-x-2">
                                        <span>{table ? '✏️ Update Table' : '➕ Create Table'}</span>
                                    </div>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
