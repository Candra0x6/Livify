import { z } from "zod";

export const categorySchema = z.object({
	id: z.string(),
	name: z.string(),
	image: z.string(),
	slug: z.string(),
});

export type categoryPayload = z.infer<typeof categorySchema>;
