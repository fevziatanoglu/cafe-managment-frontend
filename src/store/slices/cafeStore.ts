import type { StateCreator } from "zustand";
import type { API_RESPONSE, CAFE, PRODUCT } from "../../types";
import type { CreateCafeFormValues } from "../../validations/cafeSchema"; // <-- Import your schema type
import { getCafe, createCafe, updateCafe } from "../../api/cafeService";
import { getProductsBySlug } from "../../api/productService";

interface CafeState {
  cafe: CAFE | null;
  isCafeLoading: boolean;
  cafeName : string | null;
  cafeImage : string | null;
  menu : PRODUCT[];
}

interface CafeActions {
  getCafeFetch: () => Promise<API_RESPONSE<CAFE[]>>;
  createCafeFetch: (cafeData: CreateCafeFormValues | FormData) => Promise<API_RESPONSE<CAFE>>;
  updateCafeFetch: (id: string, cafeData: CreateCafeFormValues | FormData) => Promise<API_RESPONSE<CAFE>>;
  getPublicMenuFetch: (slug: string, category?: string) => Promise<API_RESPONSE<{products: PRODUCT[] , cafe : {name: string, image: string}}>>;
  setCafe: (cafe: CAFE | null) => void;
}

export type CafeStore = CafeState & CafeActions;

export const createCafeSlice: StateCreator<CafeStore> = (set) => ({
  cafe: null,
  cafeName: null,
  cafeImage: null,
  isCafeLoading: false,
  menu: [],

  getCafeFetch: async () => {
    set({ isCafeLoading: true });
    const response = await getCafe();
    if (response.success && response.data && response.data.length > 0) {
      set({ cafe: response.data[0] });
    } else {
      set({ cafe: null });
    }
    set({ isCafeLoading: false });
    return response;
  },

  createCafeFetch: async (cafeData) => {
    set({ isCafeLoading: true });
    const response = await createCafe(cafeData);
    if (response.success && response.data) {
      set({ cafe: response.data });
    }
    set({ isCafeLoading: false });
    return response;
  },

  updateCafeFetch: async (id, cafeData) => {
    const response = await updateCafe(id, cafeData);
    if (response.success && response.data) {
      set({ cafe: response.data });
    }
    return response;
  },

   // Fetch products by cafe slug and optional category
  getPublicMenuFetch: async (slug, category) => {
    set({ isCafeLoading: true });
    const cat = category || 'hot drink';
    const response = await getProductsBySlug(slug, cat);
    if (response.success && response.data) {
      set({ menu: response.data.products , cafeName: response.data.cafe.name, cafeImage: response.data.cafe.image });
    } 
    set({ isCafeLoading: false });
    return response;
  },

  setCafe: (cafe) => {
    set({ cafe });
  },
});
