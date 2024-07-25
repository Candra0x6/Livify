import { z } from "zod";

export const ordersQuerySchema = z.object({
  limit: z
    .string()
    .optional()
    .transform((val) => (val ? Number.parseInt(val, 10) : 10)),
  page: z
    .string()
    .optional()
    .transform((val) => (val ? Number.parseInt(val, 10) : 1)),
  categoryId: z.string().optional(),
  sortBy: z
    .enum(["name", "price", "createdAt"])
    .optional()
    .default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).optional().default("desc"),
  status: z.enum(["PROCESSING", "PENDING", "REJECTED", "CANCELLED", "COMPLETED"])
});

export type orderQueryPayload = z.infer<typeof ordersQuerySchema>;
