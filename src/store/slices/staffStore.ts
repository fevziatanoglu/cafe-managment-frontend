import type { StateCreator } from "zustand";

import type { USER } from "../../types/User";
import type { API_RESPONSE } from "../../types";

import { 
  getStaff, 
  getStaffById, 
  getStaffByUsername,
  createStaff, 
  updateStaff, 
  deleteStaff 
} from "../../services/staffService";
import type { CreateStaffFormValues, UpdateStaffFormValues } from "../../validations/staffScherma";

interface StaffState {
  staff: USER[];
  selectedStaff: USER | null;
}

interface StaffActions {
  // Get operations
  getStaffFetch: () => Promise<API_RESPONSE<USER[]>>;
  getStaffByIdFetch: (id: string) => Promise<API_RESPONSE<USER>>;
  getStaffByUsernameFetch: (username: string) => Promise<API_RESPONSE<USER>>;
  
  // CRUD operations
  createStaffFetch: (staffData: CreateStaffFormValues) => Promise<API_RESPONSE<USER>>;
  updateStaffFetch: (id: string, staffData: UpdateStaffFormValues) => Promise<API_RESPONSE<USER>>;
  deleteStaffFetch: (id: string) => Promise<API_RESPONSE<USER>>;
  
  // Utility actions
  setSelectedStaff: (staff: USER | null) => void;
}

export type StaffStore = StaffState & StaffActions;

export const createStaffSlice: StateCreator<StaffState & StaffActions> = (set, get) => ({
  // Initial state
  staff: [],
  selectedStaff: null,

  // Get all staff
  getStaffFetch: async () => {
    const response = await getStaff();
    
    if (response.success && response.data) {
      set({ staff: response.data });
    }
    return response;
  },

  // Get staff by ID
  getStaffByIdFetch: async (id: string) => {
    const response = await getStaffById(id);
    
    if (response.success && response.data) {
      set({ selectedStaff: response.data });
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
        staff.id === id ? response.data! : staff
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
      const filteredStaff = currentStaff.filter(staff => staff.id !== id);
      set({ 
        staff: filteredStaff, 
        selectedStaff: null
      });
    }
    return response;
  },

  // Utility actions
  setSelectedStaff: (staff: USER | null) => {
    set({ selectedStaff: staff });
  },
});
