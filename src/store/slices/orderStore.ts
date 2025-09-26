import type { StateCreator } from "zustand";
import type { API_RESPONSE, ORDER } from "../../types";
import {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  createPaidOrder,
  getPaidOrders,
} from "../../api/orderService";
import type { CreateOrderFormValues, UpdateOrderFormValues } from "../../validations/orderSchema";

interface OrderState {
  orders: ORDER[];
  paidOrders: ORDER[];
  pendingOrders: ORDER[];
  selectedOrder: ORDER | null;
  isOrdersLoading: boolean;
}

interface OrderActions {
  getOrdersFetch: () => Promise<API_RESPONSE<ORDER[]>>;
  getOrderByIdFetch: (id: string) => Promise<API_RESPONSE<ORDER>>;
  getPaidOrdersFetch: () => Promise<API_RESPONSE<ORDER[]>>;
  createOrderFetch: (orderData: CreateOrderFormValues) => Promise<API_RESPONSE<ORDER>>;
  updateOrderFetch: (id: string, orderData: UpdateOrderFormValues) => Promise<API_RESPONSE<ORDER>>;
  deleteOrderFetch: (id: string) => Promise<API_RESPONSE<ORDER>>;
  setSelectedOrder: (order: ORDER | null) => void;
  createPaidOrderFetch: (orderData: { tableId: string; tableNumber: string; items: { productId: string; quantity: number }[] }) => Promise<API_RESPONSE<ORDER>>;
  // WebSocket actions
  addOrder: (order: ORDER) => void;
  updateOrder: (order: ORDER) => void;
  removeOrder: (orderId: string) => void;
}


export type OrderStore = OrderState & OrderActions;

export const createOrderSlice: StateCreator<OrderStore> = (set, get) => ({
  orders: [],
  paidOrders: [],
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
    set({ isOrdersLoading: false });
    return response;
  },

  updateOrderFetch: async (id, orderData) => {
    const response = await updateOrder(id, orderData);

    return response;
  },
  deleteOrderFetch: async (id) => {
    const response = await deleteOrder(id);
    return response;
  },

  setSelectedOrder: (order) => {
    set({ selectedOrder: order });
  },

  getPaidOrdersFetch: async () => {
    set({ isOrdersLoading: true });
    const response = await getPaidOrders();
    set({ isOrdersLoading: false });
    return response;
  },

  // Create paid order
  createPaidOrderFetch: async (orderData: { tableId: string; tableNumber: string; items: { productId: string; quantity: number }[] }) => {
    set({ isOrdersLoading: true });
    const response = await createPaidOrder(orderData);
    if (response.success && response.data) {
      const currentOrders = get().orders;
      set({ orders: [...currentOrders, response.data] });
    }
    set({ isOrdersLoading: false });
    return response;
  },

  // WebSocket actions for real-time updates
  addOrder: (order) => {
    set((state) => ({ orders: [...state.orders, order] }));
  },
  updateOrder: (order) => {
    set((state) => ({
      orders: state.orders.map((o) => (o._id === order._id ? order : o)),
    }));
  },
  removeOrder: (orderId) => {
    set((state) => ({
      orders: state.orders.filter((o) => o._id !== orderId),
    }));
  },
});
