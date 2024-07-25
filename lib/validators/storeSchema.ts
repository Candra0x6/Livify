import { z } from "zod";

export const storeSchema = z.object({
	name: z.string().min(3, {
		message: "*Store name must be at least 3 characters long",
	}),
	description: z.string().optional(),
	image: z.any(),
});

export type storePayload = z.infer<typeof storeSchema>;
