import { z } from "zod";

// Custom transformer to handle Decimal as string
const decimalString = z
	.string()
	.refine(
		(value) => {
			return !Number.isNaN(Number(value));
		},
		{
			message: "Invalid decimal string",
		},
	)
	.transform((value) => {
		const b = value.toString();
		const a = Number(b);
		console.log(a);

		return value.toString();
	});

export const productSchema = z.object({
	name: z
		.string()
		.min(3, {
			message: "Name must contain at least 3 character(s)",
		})
		.max(50, {
			message: "Name must contain at most 50 character(s)",
		}),
	description: z
		.string()
		.max(500, {
			message: "Description must contain at most 500 character(s)",
		})
		.optional(),
	categoryId: z.string().min(1),
	price: decimalString
		.refine((value) => Number(value) > 0, {
			message: "Price must be greater than or equal to $1",
		})
		.refine((value) => Number(value) < 100000, {
			message: "Price must be lower than or equal to $100,000",
		}),
	images: z.array(z.any()).min(1, "Image must be included"),
	stock: z.coerce.number().min(1, "numberField is required"),
});

export type productPayload = z.infer<typeof productSchema>;

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

export type paramsPayload = z.infer<typeof productQuerySchema>;
