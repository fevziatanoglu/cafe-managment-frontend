import type { PRODUCT } from "./Product";

export interface ORDER {
  _id: string;
  tableId: string;
  items: ORDER_ITEM[];
  status: ORDER_STATUS;
  total: number;
  createdBy: string;
  createdAt: string;
  adminId: string;
}

export type ORDER_STATUS = 'pending' | 'preparing' | 'served' | 'paid'; 

export type ORDER_ITEM = {
  product: PRODUCT;      
  quantity: number;
  price: number;        
};
