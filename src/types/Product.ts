export interface PRODUCT {
  _id: string;
  name: string;
  description?: string;
  price: number;
  category?: string;
  isActive: boolean;
  adminId: string;
  menuId: string;
  createdAt: string;
  updatedAt: string;
}
