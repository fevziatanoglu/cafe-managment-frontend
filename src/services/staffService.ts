import type { API_RESPONSE } from '../types';
import type { USER } from '../types/User';
import requestApi from '../utils/api';
import handleApiError from '../utils/apiErrorHandler';
import type { CreateStaffFormValues, UpdateStaffFormValues } from '../validations/staffScherma';

// Get all staff (workers)
export const getStaff = async (): Promise<API_RESPONSE<USER[]>> => {
  try {
    const response = await requestApi.get('/workers');
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Get staff by ID
export const getStaffById = async (id: string): Promise<API_RESPONSE<USER>> => {
  try {
    const response = await requestApi.get(`/workers/${id}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Get staff by username
export const getStaffByUsername = async (username: string): Promise<API_RESPONSE<USER>> => {
  try {
    const response = await requestApi.get(`/workers/username/${username}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Create new staff member
export const createStaff = async (staffData: CreateStaffFormValues): Promise<API_RESPONSE<USER>> => {
  try {
    const response = await requestApi.post('/workers', staffData);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Update staff member
export const updateStaff = async (id: string, staffData: UpdateStaffFormValues): Promise<API_RESPONSE<USER>> => {
  try {
    const response = await requestApi.put(`/workers/${id}`, staffData);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Delete staff member
export const deleteStaff = async (id: string): Promise<API_RESPONSE<USER>> => {
  try {
    const response = await requestApi.delete(`/workers/${id}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
