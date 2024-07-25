// src/services/categoryService.ts
import type { PrismaClient } from "@prisma/client";

export class CategoryService {
	constructor(private prisma: PrismaClient) {}

	async getAllCategories() {
		return this.prisma.category.findMany({
			select: {
				id: true,
				name: true,
				image: true,
				slug: true,
			},
		});
	}
}
