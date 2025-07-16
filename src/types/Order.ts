export interface ORDER {
  id: string;
  tableId: string;
  items: {
    productId: string;
    quantity: number;
  }[];
  status: 'pending' | 'preparing' | 'served' | 'paid';
  total: number;
  createdBy: string;
  adminId: string;
}


