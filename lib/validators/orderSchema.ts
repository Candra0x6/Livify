import { z } from "zod";

export const ordersQuerySchema = z.object({
  query: z.string().optional(),
  limit: z
    .string()
    .optional()
    .transform((val) => (val ? Number.parseInt(val, 10) : 10)),
  page: z
    .string()
    .optional()
    .transform((val) => (val ? Number.parseInt(val, 10) : 1)),
  categoryId: z.string().optional().nullable(),
  sortBy: z
    .enum(["name", "price", "createdAt"])
    .optional()
    .default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).optional().default("desc"),
  status: z
    .enum(["PROCESSING", "PENDING", "REJECTED", "CANCELLED", "COMPLETED"])
    .optional()
    .nullable(),
});

export type orderQueryPayload = z.infer<typeof ordersQuerySchema>;
