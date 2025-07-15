import type { API_RESPONSE } from '../types';
import type { TOKEN_USER_DATA } from '../types/TokenUser';
import requestApi from '../utils/api';
import handleApiError from '../utils/apiErrorHandler';
import {
  type LoginFormValues,
  type RegisterFormValues
} from '../validations/authSchema';

const API_URL = "/auth";

// Register user
export const register = async (credentials: RegisterFormValues): Promise<API_RESPONSE<TOKEN_USER_DATA>> => {
  try {
    const response = await requestApi.post(`${API_URL}/register`, credentials);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Login user
export const login = async (credentials: LoginFormValues): Promise<API_RESPONSE<TOKEN_USER_DATA>> => {
  try {
    const response = await requestApi.post(`${API_URL}/login`, credentials);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Refresh token
export const refreshToken = async (): Promise<API_RESPONSE<TOKEN_USER_DATA>> => {
  try {
    const response = await requestApi.get(`${API_URL}/refresh-token`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Logout user
export const logout = async (): Promise<API_RESPONSE> => {
  try {
    const response = await requestApi.post(`${API_URL}/logout`, {});
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
