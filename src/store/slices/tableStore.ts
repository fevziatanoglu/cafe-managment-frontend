import type { StateCreator } from "zustand";
import type { API_RESPONSE } from "../../types";
import type { TABLE } from "../../types/Table";
import {
  getTables,
  getTableById,
  createTable,
  updateTable,
  deleteTable,
} from "../../api/tablesService";

interface TableState {
  tables: TABLE[];
  selectedTable: TABLE | null;
}

interface TableActions {
  getTablesFetch: () => Promise<API_RESPONSE<TABLE[]>>;
  getTableByIdFetch: (id: string) => Promise<API_RESPONSE<TABLE>>;
  createTableFetch: (tableData: Omit<TABLE, "_id" | "adminId">) => Promise<API_RESPONSE<TABLE>>;
  updateTableFetch: (id: string, tableData: Partial<TABLE>) => Promise<API_RESPONSE<TABLE>>;
  deleteTableFetch: (id: string) => Promise<API_RESPONSE<TABLE>>;
  setSelectedTable: (table: TABLE | null) => void;
}

export type TableStore = TableState & TableActions;

export const createTableSlice: StateCreator<TableStore> = (set, get) => ({
  tables: [],
  selectedTable: null,

  getTablesFetch: async () => {
    const response = await getTables();
    if (response.success && response.data) {
      set({ tables: response.data });
    }
    return response;
  },

  getTableByIdFetch: async (id: string) => {
    const response = await getTableById(id);
    if (response.success && response.data) {
      set({ selectedTable: response.data });
    }
    return response;
  },

  createTableFetch: async (tableData) => {
    const response = await createTable(tableData);
    if (response.success && response.data) {
      set({ tables: [...get().tables, response.data] });
    }
    return response;
  },

  updateTableFetch: async (id, tableData) => {
    const response = await updateTable(id, tableData);
    if (response.success && response.data) {
      set({
        tables: get().tables.map((t) => (t._id === id ? response.data! : t)),
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
});
