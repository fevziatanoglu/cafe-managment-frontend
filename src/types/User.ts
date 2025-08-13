export interface USER {
  _id: string;
  username: string;
  email: string;
  role: USER_ROLE;
  adminId?: string | null;
  refreshToken?: string;
}

export type USER_ROLE = 'admin' | 'waiter' | 'kitchen';
