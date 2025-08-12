export interface PRODUCT {
  _id: string;
  name: string;
  description?: string;
  image?: string;
  price: number;
  category?: PRODUCT_CATEGORY;
  isActive: boolean;
  adminId: string;
  createdAt: string;
  updatedAt: string;
}

export type PRODUCT_CATEGORY = 'hot drink' | 'cold drink' | 'dessert' | 'food';
