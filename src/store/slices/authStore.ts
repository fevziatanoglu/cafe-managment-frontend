import type { StateCreator } from "zustand";

import type { USER } from "../../types/User";
import type { TOKEN_USER_DATA } from "../../types/TokenUser";
import type { API_RESPONSE } from "../../types";
import type { LoginFormValues, RegisterFormValues } from "../../validations/authSchema";

import { login, logout, refresh, register } from "../../api/authService";

interface AuthState {
  user: USER | null;
  token: string | null;
  isAuthenticated: boolean;
  error : string | null;
};

interface AuthActions {
  loginFetch: (credential: LoginFormValues) => Promise<API_RESPONSE<TOKEN_USER_DATA>>;
  registerFetch: (credential: RegisterFormValues) => Promise<API_RESPONSE<TOKEN_USER_DATA>>;
  refreshToken: () => Promise<API_RESPONSE<TOKEN_USER_DATA>>;
  logoutFetch: () => void;
};

export type AuthStore = AuthState & AuthActions;



export const createAuthSlice: StateCreator<AuthState & AuthActions> = (
  (set) => ({
    user: null,
    token: null,
    error: null,
    isAuthenticated: false,

    loginFetch: async (credential: LoginFormValues) => {
      const response = await login(credential)
      if (response.success) {
        set({ token: response.data?.token, user: response.data?.user, isAuthenticated: true })
      }
      return response

    },

    refreshToken: async () => {
      const response = await refresh();
      if (response.success && response.data) {
        set({ token: response.data.token, user: response.data.user, isAuthenticated: true });
      } else {
        set({ token: null, user: null, isAuthenticated: false });
      }
      return response
    },

    registerFetch: async (credential: RegisterFormValues) => {
      const response = await register(credential)
      if (response.success && response.data) {
        set({ token: response.data.token, user: response.data.user, isAuthenticated: true })
      }
      return response
    },

    logoutFetch: async () => {
      const response = await logout();
      if (response.success) {
        set({ token: null, isAuthenticated: false, user: null });
        window.location.href = "/login";
      } else {
        console.error("Logout failed")
      }
    },
  }))

