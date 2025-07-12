import type { StateCreator } from "zustand";
import type { USER } from "../../types/User";

export interface AuthState {
  user: USER | null;
  token: string | null;
  isAuthenticated: boolean;
};

export interface AuthActions {
  loginFetch: () => void;
  registerFetch: () => void;
  logoutFetch: () => void;
  refreshToken: () => void;
};



export const createAuthSlice: StateCreator<AuthState & AuthActions> = (
  () => ({
    user: null,
    token: null,
    isAuthenticated: false,

    loginFetch: async () => {

    },

    refreshToken: async () => {

    },

    registerFetch: async () => {

    },

    logoutFetch: async () => {

    }
  }))

