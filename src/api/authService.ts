import type { API_RESPONSE, TOKEN_USER_DATA } from "../types";
import requestApi from "../utils/api";
import handleApiError from "../utils/apiErrorHandler";
import type { LoginFormValues, RegisterFormValues } from "../validations/authSchema";


export const login = async (data: LoginFormValues): Promise<API_RESPONSE<TOKEN_USER_DATA>> => {
    try {
        const response = await requestApi.post<API_RESPONSE<TOKEN_USER_DATA>>('auth/login', data);
        return response.data
    } catch (e: unknown) {
        return handleApiError(e)
    }
}

export const register = async (data: RegisterFormValues): Promise<API_RESPONSE<TOKEN_USER_DATA>> => {
    try {
        const response = await requestApi.post<API_RESPONSE<TOKEN_USER_DATA>>('auth/register', data);
        return response.data
    } catch (e: unknown) {
        return handleApiError(e)
    }
};

export const refresh = async (): Promise<API_RESPONSE<TOKEN_USER_DATA>> => {
    try {
        const response = await requestApi.post('auth/refresh-token');
        return response.data

    } catch (e: unknown) {
        return handleApiError(e)
    }
};

export const logout = async (): Promise<API_RESPONSE<null>> => {
    try {
        const response = await requestApi.post('auth/logout');
        return response.data
    } catch (e: unknown) {
        return handleApiError(e)
    }
}
