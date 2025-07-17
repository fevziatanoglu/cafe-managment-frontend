export interface ORDER {
  _id: string;
  tableId: string;
  items: {
    productId: string;
    quantity: number;
  }[];
  status: ORDER_STATUS;
  total: number;
  createdBy: string;
  adminId: string;
}

export type ORDER_STATUS = 'pending' | 'preparing' | 'served' | 'paid'; 


