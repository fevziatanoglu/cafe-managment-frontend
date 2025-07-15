import { create } from "zustand";

import { createModalSlice } from "./slices/modalStore";
import { createAuthSlice } from "./slices/authStore";

import type { AuthStore } from "./slices/authStore";
import type { ModalStore } from "./slices/modalStore";


export type Store = AuthStore & ModalStore;

export const useStore = create<Store>((set, get, api) => ({
    ...createAuthSlice(set, get, api),
    ...createModalSlice(set, get, api)
}));
export default useStore;
