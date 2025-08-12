import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().optional(),
  price: z.number().min(1, "Price must be a positive number"),
  category: z.enum(['hot drink', 'cold drink', 'dessert', 'food']).optional(),
  image: z.union([z.instanceof(File), z.string()]).optional()
});

export type CreateProductFormValues = z.infer<typeof createProductSchema>;
