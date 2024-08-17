import prisma from "@/lib/db";
import { categorySchema } from "@/lib/validators/categorySchema";
import { errorHandler } from "@/middleware";
import { CategoryService } from "@/services/db/categoryService";
import { AppError } from "@/utils/api/apiErrors";
import { ApiResponse } from "@/utils/api/apiResponse";
import type { Category } from "@prisma/client";
import type * as server from "next/server";

export async function GET(request: server.NextRequest) {
	try {
		const categoryService = new CategoryService(prisma);
		const categories = await categoryService.getAllCategories();

		if (categories.length === 0) {
			throw new AppError(404, "No categories found");
		}

		// Validate categories against the schema
		const validatedCategories = categories.map((category) =>
			categorySchema.parse(category),
		);

		return ApiResponse.success<{ categories: Category[] }>(
			{ categories: validatedCategories },
			200,
		);
	} catch (error) {
		return errorHandler(error);
	}
}
