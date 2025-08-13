import { z } from "zod";

export const createCafeSchema = z.object({
  name: z.string().min(2, "Cafe name is required"),
  address: z.string().optional(),
  owner: z.string().min(1, "Owner ID is required"),
  image: z.string().optional(),
});

export type CreateCafeFormValues = z.infer<typeof createCafeSchema>;
