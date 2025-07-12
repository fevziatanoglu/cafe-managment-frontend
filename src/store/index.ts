import { create } from "zustand";
import { createAuthSlice, type AuthActions, type AuthState } from "./slices/authStore";

export type Store = AuthState & AuthActions;

export const useStore = create<Store>((set, get, api) => ({
    ...createAuthSlice(set, get, api),
}));
export default useStore;
