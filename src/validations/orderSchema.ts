import { z } from 'zod';

export const orderItemSchema = z.object({
  productId: z.string().min(1, "Product is required"),
  productName: z.string().min(1, "Product name is required"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  price: z.number().min(0, "Price is required"),
});

export const createOrderSchema = z.object({
  tableId: z.string().min(1, "Table number is required"),
  tableName: z.string().optional(),
  items: z.array(orderItemSchema).min(1, "At least one product required"),
  note: z.string().optional(),
  status: z.enum(["pending", "preparing", "served", "paid"]).optional(),
});

export type CreateOrderFormValues = z.infer<typeof createOrderSchema>;

export const updateOrderSchema = z.object({
  tableId: z.string().min(1, "Table number is required").optional(),
  tableName: z.string().optional(),
  items: z.array(orderItemSchema).optional(),
  note: z.string().optional(),
  status: z.enum(["pending", "preparing", "served", "paid"]).optional(),
});

export type UpdateOrderFormValues = z.infer<typeof updateOrderSchema>;
