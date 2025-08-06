import type { StateCreator } from "zustand";

import type { STAFF } from "../../types/Staff";
import type { API_RESPONSE } from "../../types";

import {
  getStaff,
  getStaffById,
  getStaffByUsername,
  createStaff,
  updateStaff,
  deleteStaff
} from "../../api/staffService";
import type { CreateStaffFormValues, UpdateStaffFormValues } from "../../validations/staffScherma";

interface StaffState {
  staff: STAFF[];
  selectedStaff: STAFF | null;
  isStaffLoading: boolean;
  staffError: string | null;
}

interface StaffActions {
  // Get operations
  getStaffFetch: () => Promise<API_RESPONSE<STAFF[]>>;
  getStaffByIdFetch: (id: string) => Promise<API_RESPONSE<STAFF>>;
  getStaffByUsernameFetch: (username: string) => Promise<API_RESPONSE<STAFF>>;

  // CRUD operations
  createStaffFetch: (staffData: CreateStaffFormValues) => Promise<API_RESPONSE<STAFF>>;
  updateStaffFetch: (id: string, staffData: UpdateStaffFormValues) => Promise<API_RESPONSE<STAFF>>;
  deleteStaffFetch: (id: string) => Promise<API_RESPONSE<STAFF>>;

  // Utility actions
  setSelectedStaff: (staff: STAFF | null) => void;
}

export type StaffStore = StaffState & StaffActions;

export const createStaffSlice: StateCreator<StaffState & StaffActions> = (set, get) => ({
  // Initial state
  staff: [],
  selectedStaff: null,
  isStaffLoading: false,
  staffError: null,

  // Get all staff
  getStaffFetch: async () => {
    set({ isStaffLoading: true, staffError: null });
    const response = await getStaff();

    if (response.success && response.data) {
      set({
        staff: response.data,
        isStaffLoading: false
      });
    } else {
      set({
        staffError: response.message || 'Failed to fetch staff',
        isStaffLoading: false
      });
    }
    return response;
  },

  // Get staff by ID
  getStaffByIdFetch: async (id: string) => {
    set({ isStaffLoading: true, staffError: null });
    const response = await getStaffById(id);

    if (response.success && response.data) {
      set({
        isStaffLoading: false
      });
    } else {
      set({
        staffError: response.message || 'Failed to fetch staff member',
        isStaffLoading: false
      });
    }
    return response;
  },

  // Get staff by username
  getStaffByUsernameFetch: async (username: string) => {
    const response = await getStaffByUsername(username);

    if (response.success && response.data) {
      set({ selectedStaff: response.data });
    }
    return response;
  },

  // Create new staff
  createStaffFetch: async (staffData: CreateStaffFormValues) => {
    const response = await createStaff(staffData);

    if (response.success && response.data) {
      const currentStaff = get().staff;
      set({
        staff: [...currentStaff, response.data]
      });
    }
    return response;
  },

  // Update staff
  updateStaffFetch: async (id: string, staffData: UpdateStaffFormValues) => {
    const response = await updateStaff(id, staffData);

    if (response.success && response.data) {
      const currentStaff = get().staff;
      const updatedStaff = currentStaff.map(staff =>
        staff._id === id ? response.data! : staff
      );
      set({
        staff: updatedStaff,
        selectedStaff: response.data
      });
    }
    return response;
  },

  // Delete staff
  deleteStaffFetch: async (id: string) => {
    const response = await deleteStaff(id);

    if (response.success) {
      const currentStaff = get().staff;
      const filteredStaff = currentStaff.filter(staff => staff._id !== id);
      set({
        staff: filteredStaff,
        selectedStaff: null
      });
    }
    return response;
  },

  // Utility actions
  setSelectedStaff: (staff: STAFF | null) => {
    set({ selectedStaff: staff });
  },
});
