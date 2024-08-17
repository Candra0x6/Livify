import { getSession } from "@/lib/auth/auth";
import prisma from "@/lib/db";
import { productQuerySchema } from "@/lib/validators/productSchema";
import { errorHandler } from "@/middleware";
import { getAllProducts, getStoreProducts } from "@/services/db/productService";
import { AppError } from "@/utils/api/apiErrors";
import { ApiResponse } from "@/utils/api/apiResponse";
import type { NextRequest } from "next/server";
import { z } from "zod";

export async function GET(
	request: NextRequest,
	{ params }: { params: { storeId: string } },
) {
	try {
		const storeId = params.storeId;
		if (!storeId) {
			throw new AppError(401, "Invalid or Missing Store Id");
		}
		const url = new URL(request.url);

		const { limit, page, categoryId, sortBy, sortOrder } =
			productQuerySchema.parse({
				limit: url.searchParams.get("limit") || "10",
				page: url.searchParams.get("page") || "1",
				categoryId: url.searchParams.get("categoryId") || undefined,
				sortBy: url.searchParams.get("sortBy") || "createdAt",
				sortOrder: url.searchParams.get("sortOrder") || "desc",
			});

		const { products, total } = await getStoreProducts(prisma, storeId, {
			page,
			limit,
			sortBy,
			sortOrder,
			categoryId,
		});

		if (products.length === 0) {
			throw new AppError(404, "No products found");
		}

		return ApiResponse.success(
			{
				products,
				pagination: {
					page,
					limit,
					total,
					totalPages: Math.ceil(total / limit),
				},
			},
			200,
		);
	} catch (error) {
		if (error instanceof z.ZodError) {
			return ApiResponse.error(`Invalid query parameters ${error}`, 400);
		}
		return errorHandler(error);
	}
}
