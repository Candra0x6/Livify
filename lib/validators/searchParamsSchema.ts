import { z } from "zod";

export const searchQuerySchema = z.object({
	query: z.string(),
	limit: z
		.string()
		.optional()
		.transform((val) => (val ? Number.parseInt(val, 10) : 10)),
	page: z
		.string()
		.optional()
		.transform((val) => (val ? Number.parseInt(val, 10) : 1)),
	sortOrder: z.enum(["asc", "desc"]).optional().default("desc"),
});

export const productQuerySchema = z.object({
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
});

export type searchQueryPayload = z.infer<typeof searchQuerySchema>;
export type productQueryPayload = z.infer<typeof productQuerySchema>;
