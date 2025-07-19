import type { API_RESPONSE } from '../types';
import type { TABLE, TABLE_WITH_ORDERS } from '../types/Table';
import requestApi from '../utils/api';
import handleApiError from '../utils/apiErrorHandler';
import type { TableFormData } from '../validations/tableSchema';

// Get all tables
export const getTables = async (): Promise<API_RESPONSE<TABLE[]>> => {
  try {
    const response = await requestApi.get('/tables');
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Get table by ID
export const getTableById = async (id: string): Promise<API_RESPONSE<TABLE>> => {
  try {
    const response = await requestApi.get(`/tables/${id}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Create new table
export const createTable = async (tableData: TableFormData): Promise<API_RESPONSE<TABLE>> => {
  try {
    const response = await requestApi.post('/tables', tableData);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Update table
export const updateTable = async (id: string, tableData: TableFormData): Promise<API_RESPONSE<TABLE>> => {
  try {
    const response = await requestApi.put(`/tables/${id}`, tableData);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Delete table
export const deleteTable = async (id: string): Promise<API_RESPONSE<TABLE>> => {
  try {
    const response = await requestApi.delete(`/tables/${id}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getTablesWithOrders = async (): Promise<API_RESPONSE<TABLE_WITH_ORDERS[]>> => {
  try {
    const response = await requestApi.get('/tables/with-orders');
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
}
