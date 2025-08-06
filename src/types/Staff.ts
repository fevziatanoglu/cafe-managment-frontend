export interface STAFF {
  _id: string;
  username: string;
  email: string;
  password: string; 
  role: 'waiter' | 'kitchen';
  adminId?: string;
  createdAt?: string;
  updatedAt?: string;
  image?: string; 
}
