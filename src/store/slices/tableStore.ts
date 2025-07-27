import type { StateCreator } from "zustand";
import type { API_RESPONSE } from "../../types";
import type { TABLE, TABLE_WITH_ORDERS } from "../../types/Table";
import type { TableFormData } from "../../validations/tableSchema";
import {
  getTables,
  getTableById,
  createTable,
  updateTable,
  deleteTable,
  getTablesWithOrders,
} from "../../api/tablesService";

interface TableState {
  tables: TABLE[];
  tablesWithOrders?: TABLE_WITH_ORDERS[];
  selectedTable: TABLE | null;
  isTablesLoading: boolean;
}

interface TableActions {
  getTablesFetch: () => Promise<API_RESPONSE<TABLE[]>>;
  getTableByIdFetch: (id: string) => Promise<API_RESPONSE<TABLE>>;
  createTableFetch: (tableData: TableFormData) => Promise<API_RESPONSE<TABLE>>;
  updateTableFetch: (id: string, tableData: TableFormData) => Promise<API_RESPONSE<TABLE>>;
  deleteTableFetch: (id: string) => Promise<API_RESPONSE<TABLE>>;
  setSelectedTable: (table: TABLE | null) => void;
  getTablesWithOrders: () => Promise<API_RESPONSE<TABLE_WITH_ORDERS[]>>;
}

export type TableStore = TableState & TableActions;

export const createTableSlice: StateCreator<TableStore> = (set, get) => ({
  tables: [],
  tablesWithOrders: [],
  selectedTable: null,
  isTablesLoading: false,

  getTablesFetch: async () => {
    set({ isTablesLoading: true });
    const response = await getTables();
    if (response.success && response.data) {
      set({ tables: response.data });
    }
    set({ isTablesLoading: false });
    return response;
  },

  getTableByIdFetch: async (id: string) => {
    set({ isTablesLoading: true });
    const response = await getTableById(id);
    if (response.success && response.data) {
      set({ selectedTable: response.data });
    }
    set({ isTablesLoading: false });
    return response;
  },

  createTableFetch: async (tableData) => {
    const response = await createTable(tableData);
    if (response.success && response.data) {
      set({
        tables: [...get().tables, response.data],
        tablesWithOrders: [
          ...(get().tablesWithOrders || []),
          { ...response.data, orders: [] },
        ],
      });
    }
    return response;
  },

  updateTableFetch: async (id, tableData) => {
    const response = await updateTable(id, tableData);
    if (response.success && response.data) {
      set({
        tablesWithOrders: get().tablesWithOrders?.map((t) => 
          t._id === id ? { ...response.data!, orders: t.orders } : t
        ),
        selectedTable: response.data,
      });
    }
    return response;
  },

  deleteTableFetch: async (id) => {
    const response = await deleteTable(id);
    if (response.success) {
      set({
        tables: get().tables.filter((t) => t._id !== id),
        selectedTable: null,
      });
    }
    return response;
  },

  setSelectedTable: (table) => {
    set({ selectedTable: table });
  },

  getTablesWithOrders: async () => {
    set({ isTablesLoading: true });
    const response = await getTablesWithOrders();
    if (response.success && response.data) {
      set({ tablesWithOrders: response.data });
    }
    set({ isTablesLoading: false });
    return response;
  }
});
