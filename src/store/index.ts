import { create } from "zustand";

export type Store = AuthState & AuthActions;

export const useStore = create<Store>((set, get, api) => ({
    ...createAuthSlice(set, get, api),
}));
export default useStore;
