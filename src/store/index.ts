import { create } from "zustand";

import { createModalSlice } from "./slices/modalStore";
import { createAuthSlice } from "./slices/authStore";

import type { AuthStore } from "./slices/authStore";
import type { ModalStore } from "./slices/modalStore";
import { devtools } from "zustand/middleware";
import { createStaffSlice, type StaffStore } from "./slices/staffStore";
import { createOrderSlice, type OrderStore } from "./slices/orderStore";
import { createTableSlice, type TableStore } from "./slices/tableStore";
import { createProductSlice, type ProductStore } from "./slices/productStore";
import { createCafeSlice, type CafeStore } from "./slices/cafeStore";


export type Store = AuthStore & ModalStore & StaffStore & OrderStore & TableStore & ProductStore & CafeStore;

export const useStore = create<Store>()(
  devtools((set, get, api) => ({
    ...createAuthSlice(set, get, api),
    ...createModalSlice(set, get, api),
    ...createStaffSlice(set, get, api),
    ...createOrderSlice(set, get, api),
    ...createTableSlice(set, get, api),
    ...createProductSlice(set, get, api),
    ...createCafeSlice(set, get, api)
  }), { name: "AppStore" })
);
export default useStore;
