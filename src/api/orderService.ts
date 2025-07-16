import type { API_RESPONSE } from '../types';
import type { ORDER } from '../types/Order';
import requestApi from '../utils/api';
import handleApiError from '../utils/apiErrorHandler';
import type { CreateOrderFormValues, UpdateOrderFormValues } from '../validations/orderSchema';

// Get all ORDERs
export const getOrders = async (): Promise<API_RESPONSE<ORDER[]>> => {
  try {
    const response = await requestApi.get('/orders');
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Get order by ID
export const getOrderById = async (id: string): Promise<API_RESPONSE<ORDER>> => {
  try {
    const response = await requestApi.get(`/orders/${id}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Create new order
export const createOrder = async (orderData: CreateOrderFormValues): Promise<API_RESPONSE<ORDER>> => {
  try {
    const response = await requestApi.post('/orders', orderData);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Update order
export const updateOrder = async (id: string, orderData: UpdateOrderFormValues): Promise<API_RESPONSE<ORDER>> => {
  try {
    const response = await requestApi.put(`/orders/${id}`, orderData);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Delete order
export const deleteOrder = async (id: string): Promise<API_RESPONSE<ORDER>> => {
  try {
    const response = await requestApi.delete(`/orders/${id}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
