import { create } from "zustand";

import { createModalSlice } from "./slices/modalStore";
import { createAuthSlice } from "./slices/authStore";

import type { AuthStore } from "./slices/authStore";
import type { ModalStore } from "./slices/modalStore";
import { devtools } from "zustand/middleware";


export type Store = AuthStore & ModalStore;

export const useStore = create<Store>()(
  devtools((set, get, api) => ({
    ...createAuthSlice(set, get, api),
    ...createModalSlice(set, get, api),
  }),{name: "AppStore"})
);
export default useStore;
