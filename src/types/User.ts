export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  adminId?: string | null;
  refreshToken?: string;
}

export type UserRole = 'admin' | 'waiter' | 'kitchen';
