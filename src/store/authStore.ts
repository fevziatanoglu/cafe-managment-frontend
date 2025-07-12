import { create } from "zustand";

export type UserRole = 'admin' | 'waiter' | 'kitchen';

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  adminId?: string | null;
  refreshToken?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  login: (user, token) =>
    set({ user, token, isAuthenticated: true }),
  logout: () =>
    set({ user: null, token: null, isAuthenticated: false }),
}));
