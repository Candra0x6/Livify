import { getSession } from "@/lib/auth/auth";
import prisma from "@/lib/db";
import { supabase } from "@/lib/supabase";
import { errorHandler } from "@/middleware";
import { uploadImages } from "@/services/db/imageUploadService";
import { extractEditProduct, updateProduct } from "@/services/db/productService";
import { AppError } from "@/utils/api/apiErrors";
import { ApiResponse } from "@/utils/api/apiResponse";
import type { NextRequest } from "next/server";

export async function PATCH(
	request: NextRequest,
	{ params }: { params: { productId: string } },
) {
	try {
		const session = await getSession();
		const productId = params.productId;
		if (!session?.userId) {
			throw new AppError(401, "Unauthorized");
		}

		const formData = await request.formData();
		const productData = await extractEditProduct(formData);
		const uploadedImages = await uploadImages(supabase, productData.newImages);
		const allImages = [...productData.existingImages, ...uploadedImages];
		const product = await updateProduct(prisma, {
			name: productData.name,
			description: productData.description,
			price: productData.price,
			productId: productId,
			categoryId: productData.categoryId,
			images: allImages,
			stock: productData.stock
		});

		return ApiResponse.success(
			{ message: "Store successfully updated", product },
			201,
		);
	} catch (error) {
		return errorHandler(error);
	}
}