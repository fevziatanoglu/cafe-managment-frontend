export interface PRODUCT {
  _id: string;
  name: string;
  description?: string;
  image?: string;
  price: number;
  category?: string;
  isActive: boolean;
  adminId: string;
  createdAt: string;
  updatedAt: string;
}
