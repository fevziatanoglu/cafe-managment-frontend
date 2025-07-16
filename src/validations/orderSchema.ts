import { z } from 'zod';

export const createOrderSchema = z.object({
  tableId: z.string().min(1, "Table number is required").optional(),
  items: z.union([
    z.array(z.string().min(1, "Item name required")),
    z.string().min(1, "Items required")
  ]).optional(),
  note: z.string().optional(),
  status: z.enum(["pending", "preparing", "served", "paid"])
});

export type CreateOrderFormValues = z.infer<typeof createOrderSchema>;

export const updateOrderSchema = z.object({
  tableId: z.string().min(1, "Table number is required").optional(),
  items: z.union([
    z.array(z.string().min(1, "Item name required")),
    z.string().min(1, "Items required")
  ]).optional(),
  note: z.string().optional(),
  status: z.enum(["pending", "preparing", "served", "paid"]).optional()
});

export type UpdateOrderFormValues = z.infer<typeof updateOrderSchema>;
