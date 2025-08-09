export interface ORDER {
  _id: string;
  tableId: string;
  tableName: string;
  waiterId: string;
  waiterName: string;
  items: ORDER_ITEM[];
  status: ORDER_STATUS;
  total: number;
  note?: string;
  createdBy: string;
  createdAt: string;
  adminId: string;
}

export type ORDER_STATUS = 'pending' | 'preparing' | 'served' | 'paid'; 

export type ORDER_ITEM = {
  productId: string;
  orderId: string;
  productName: string;      
  quantity: number;
  price: number;        
};
