import type { API_RESPONSE, PRODUCT } from "../types";
import requestApi from "../utils/api";
import handleApiError from "../utils/apiErrorHandler";
import type { CreateProductFormValues } from "../validations/productSchema";

// Create Product (already exists)
export const createProduct = async (
  productData: CreateProductFormValues
): Promise<API_RESPONSE<PRODUCT>> => {
  try {
    const response = await requestApi.post('/products', productData);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Update Product
export const updateProduct = async (
  id: string,
  productData: CreateProductFormValues
): Promise<API_RESPONSE<PRODUCT>> => {
  try {
    const response = await requestApi.put(`/products/${id}`, productData);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Delete Product
export const deleteProduct = async (
  id: string
): Promise<API_RESPONSE<PRODUCT>> => {
  try {
    const response = await requestApi.delete(`/products/${id}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Get All Products (for current admin)
export const getProducts = async (): Promise<API_RESPONSE<PRODUCT[]>> => {
  try {
    const response = await requestApi.get('/products');
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Get Product By ID
export const getProductById = async (
  id: string
): Promise<API_RESPONSE<PRODUCT>> => {
  try {
    const response = await requestApi.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
