import type { API_RESPONSE, CAFE } from '../types';
import requestApi from '../utils/api';
import handleApiError from '../utils/apiErrorHandler';
import type { CreateCafeFormValues } from '../validations/cafeSchema';

// Get all cafes
export const getCafe = async (): Promise<API_RESPONSE<CAFE[]>> => {
  try {
    const response = await requestApi.get('/cafes');
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Create new cafe
export const createCafe = async (cafeData: CreateCafeFormValues | FormData): Promise<API_RESPONSE<CAFE>> => {
  try {
    const response = await requestApi.post('/cafes', cafeData);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Update cafe
export const updateCafe = async (id: string, cafeData: CreateCafeFormValues | FormData): Promise<API_RESPONSE<CAFE>> => {
  try {
    const response = await requestApi.put(`/cafes/${id}`, cafeData);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
