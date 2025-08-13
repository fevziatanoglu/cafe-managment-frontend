import type { StateCreator } from "zustand";
import type { API_RESPONSE, CAFE } from "../../types";
import type { CreateCafeFormValues } from "../../validations/cafeSchema"; // <-- Import your schema type
import { getCafe, createCafe, updateCafe } from "../../api/cafeService";

interface CafeState {
  cafe: CAFE | null;
  iscafeloading: boolean;
}

interface CafeActions {
  getCafeFetch: () => Promise<API_RESPONSE<CAFE[]>>;
  createCafeFetch: (cafeData: CreateCafeFormValues | FormData) => Promise<API_RESPONSE<CAFE>>;
  updateCafeFetch: (id: string, cafeData: CreateCafeFormValues | FormData) => Promise<API_RESPONSE<CAFE>>;
  setCafe: (cafe: CAFE | null) => void;
}

export type CafeStore = CafeState & CafeActions;

export const createCafeSlice: StateCreator<CafeStore> = (set) => ({
  cafe: null,
  iscafeloading: false,

  getCafeFetch: async () => {
    set({ iscafeloading: true });
    const response = await getCafe();
    if (response.success && response.data && response.data.length > 0) {
      set({ cafe: response.data[0] });
    } else {
      set({ cafe: null });
    }
    set({ iscafeloading: false });
    return response;
  },

  createCafeFetch: async (cafeData) => {
    set({ iscafeloading: true });
    const response = await createCafe(cafeData);
    if (response.success && response.data) {
      set({ cafe: response.data });
    }
    set({ iscafeloading: false });
    return response;
  },

  updateCafeFetch: async (id, cafeData) => {
    const response = await updateCafe(id, cafeData);
    if (response.success && response.data) {
      set({ cafe: response.data });
    }
    return response;
  },

  setCafe: (cafe) => {
    set({ cafe });
  },
});
