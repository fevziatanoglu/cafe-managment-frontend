import type { StateCreator } from "zustand";
import type { API_RESPONSE, PRODUCT } from "../../types";
import type { CreateProductFormValues } from "../../validations/productSchema";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  getProducts,
} from "../../api/productService";

interface ProductState {
  products: PRODUCT[];
  selectedProduct: PRODUCT | null;
  isProductsLoading: boolean;
}

interface ProductActions {
  createProductFetch: (data: CreateProductFormValues | FormData) => Promise<API_RESPONSE<PRODUCT>>;
  updateProductFetch: (id: string, data: CreateProductFormValues | FormData) => Promise<API_RESPONSE<PRODUCT>>;
  deleteProductFetch: (id: string) => Promise<API_RESPONSE<PRODUCT>>;
  getProductByIdFetch: (id: string) => Promise<API_RESPONSE<PRODUCT>>;
  getProductsFetch: () => Promise<API_RESPONSE<PRODUCT[]>>;
  setSelectedProduct: (product: PRODUCT | null) => void;
}

export type ProductStore = ProductState & ProductActions;

export const createProductSlice: StateCreator<ProductStore> = (set, get) => ({
  products: [],
  selectedProduct: null,
  isProductsLoading: false,

  createProductFetch: async (data) => {
    const response = await createProduct(data);
    if (response.success && response.data) {
      set({ products: [...get().products, response.data] });
    }
    return response;
  },

  updateProductFetch: async (id, data) => {
    const response = await updateProduct(id, data);
    if (response.success && response.data) {
      set({
        products: get().products.map((p) => (p._id === id ? response.data! : p)),
        selectedProduct: response.data,
      });
    }
    return response;
  },

  deleteProductFetch: async (id) => {
    const response = await deleteProduct(id);
    if (response.success) {
      set({
        products: get().products.filter((p) => p._id !== id),
        selectedProduct: null,
      });
    }
    return response;
  },

  getProductByIdFetch: async (id) => {
    const response = await getProductById(id);
    if (response.success && response.data) {
      set({ selectedProduct: response.data });
    }
    return response;
  },

  getProductsFetch: async () => {
    set({ isProductsLoading: true });
    const response = await getProducts();
    if (response.success && response.data) {
      set({ products: response.data });
    }
    set({ isProductsLoading: false });
    return response;
  },

  setSelectedProduct: (product) => set({ selectedProduct: product }),
});
