import prisma from "@/lib/db";
import { errorHandler } from "@/middleware";
import { deleteProduct } from "@/services/productService";
import { deleteStore } from "@/services/storeService";
import { AppError } from "@/utils/api/apiErrors";
import { ApiResponse } from "@/utils/api/apiResponse";
import type { NextRequest } from "next/server";
import { z } from "zod";

export async function DELETE(
	request: NextRequest,
	{ params }: { params: { storeId: string } },
) {
	try {
		const storeId = params.storeId;

		if (!storeId) {
			throw new AppError(401, "Missing or Invalid Store Id");
		}
		const store = await deleteStore(prisma, storeId);

		if (!store) {
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
