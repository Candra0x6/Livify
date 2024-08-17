import prisma from "@/lib/db";
import { errorHandler } from "@/middleware";
import { deleteProduct } from "@/services/db/productService";
import { AppError } from "@/utils/api/apiErrors";
import { ApiResponse } from "@/utils/api/apiResponse";
import type { NextRequest } from "next/server";
import { z } from "zod";

export async function DELETE(
	request: NextRequest,
	{ params }: { params: { productId: string } },
) {
	try {
		const productId = params.productId;

		if (!productId) {
			throw new AppError(401, "Missing or Invalid Product Id");
		}
		const product = await deleteProduct(prisma, productId);

		if (!product) {
			throw new AppError(404, "No product found");
		}

		return ApiResponse.success(
			{
				data: {
					message: "Deleted Successfully",
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
