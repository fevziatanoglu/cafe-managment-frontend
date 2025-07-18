import { z } from "zod";

export const tableSchema = z.object({
  number: z.string().min(1, "Table number is required"),
  status: z.enum(["empty", "occupied", "reserved"]).refine((val) => val !== undefined, {
    message: "Status is required",
  }),
});

export type TableFormData = z.infer<typeof tableSchema>;
