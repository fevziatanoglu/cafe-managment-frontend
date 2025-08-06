import type { API_RESPONSE, STAFF } from '../types';
import requestApi from '../utils/api';
import handleApiError from '../utils/apiErrorHandler';
import type { CreateStaffFormValues, UpdateStaffFormValues } from '../validations/staffScherma';

// Get all staff (workers)
export const getStaff = async (): Promise<API_RESPONSE<STAFF[]>> => {
  try {
    const response = await requestApi.get('/staff');
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Get staff by ID
export const getStaffById = async (id: string): Promise<API_RESPONSE<STAFF>> => {
  try {
    const response = await requestApi.get(`/staff/${id}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Get staff by username
export const getStaffByUsername = async (username: string): Promise<API_RESPONSE<STAFF>> => {
  try {
    const response = await requestApi.get(`/staff/username/${username}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Create new staff member
export const createStaff = async (staffData: CreateStaffFormValues | FormData): Promise<API_RESPONSE<STAFF>> => {
  try {
    const response = await requestApi.post('/staff', staffData);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Update staff member
export const updateStaff = async (id: string, staffData: UpdateStaffFormValues | FormData): Promise<API_RESPONSE<STAFF>> => {
  try {
    const response = await requestApi.put(`/staff/${id}`, staffData);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Delete staff member
export const deleteStaff = async (id: string): Promise<API_RESPONSE<STAFF>> => {
  try {
    const response = await requestApi.delete(`/staff/${id}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
