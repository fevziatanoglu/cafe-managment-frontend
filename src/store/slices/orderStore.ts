import type { StateCreator } from "zustand";
import type { API_RESPONSE, ORDER } from "../../types";
import {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
} from "../../api/orderService";
import type { CreateOrderFormValues, UpdateOrderFormValues } from "../../validations/orderSchema";

interface OrderState {
  orders: ORDER[];
  pendingOrders: ORDER[];
  selectedOrder: ORDER | null;
  isOrdersLoading: boolean;
}

interface OrderActions {
  getOrdersFetch: () => Promise<API_RESPONSE<ORDER[]>>;
  getPendingOrdersFetch: () => Promise<API_RESPONSE<ORDER[]>>;
  getOrderByIdFetch: (id: string) => Promise<API_RESPONSE<ORDER>>;
  createOrderFetch: (orderData: CreateOrderFormValues) => Promise<API_RESPONSE<ORDER>>;
  updateOrderFetch: (id: string, orderData: UpdateOrderFormValues) => Promise<API_RESPONSE<ORDER>>;
  deleteOrderFetch: (id: string) => Promise<API_RESPONSE<ORDER>>;
  setSelectedOrder: (order: ORDER | null) => void;
}

export type OrderStore = OrderState & OrderActions;

export const createOrderSlice: StateCreator<OrderStore> = (set, get) => ({
  orders: [],
  pendingOrders: [],
  selectedOrder: null,
  isOrdersLoading: false,

  getOrdersFetch: async () => {
    set({ isOrdersLoading: true });
    const response = await getOrders();
    if (response.success && response.data) {
      set({ orders: response.data });
    }
    set({ isOrdersLoading: false });
    return response;
  },

  getOrderByIdFetch: async (id: string) => {
    set({ isOrdersLoading: true });
    const response = await getOrderById(id);
    if (response.success && response.data) {
      set({ selectedOrder: response.data });
    }
    set({ isOrdersLoading: false });
    return response;
  },

  createOrderFetch: async (orderData) => {
    set({ isOrdersLoading: true });
    const response = await createOrder(orderData);
    if (response.success && response.data) {
      const currentOrders = get().orders;
      set({ orders: [...currentOrders, response.data] });
    }
    set({ isOrdersLoading: false });
    return response;
  },

  getPendingOrdersFetch: async () => {
    set({ isOrdersLoading: true });
    const response = await getOrders();
    if (response.success && response.data) {
      const pendingOrders = response.data.filter(order => order.status === 'pending');
      set({ pendingOrders: pendingOrders });
    }
    set({ isOrdersLoading: false });
    return response;
  },

  updateOrderFetch: async (id, orderData) => {
    const response = await updateOrder(id, orderData);
    if (response.success && response.data) {
      const currentOrders = get().orders;
      const updatedOrders = currentOrders.map(order =>
        order._id === id ? response.data! : order
      );
      set({ orders: updatedOrders, selectedOrder: response.data });
    }
    return response;
  },
  deleteOrderFetch: async (id) => {
    const response = await deleteOrder(id);
    if (response.success) {
      const currentOrders = get().orders;
      const filteredOrders = currentOrders.filter(order => order._id !== id);
      set({ orders: filteredOrders, selectedOrder: null });
    }
    return response;
  },

  setSelectedOrder: (order) => {
    set({ selectedOrder: order });
  },
});
