import { getSession } from "@/lib/auth/auth";
import prisma from "@/lib/db";
import { supabase } from "@/lib/supabase";
import {
	type productPayload,
	productSchema,
} from "@/lib/validators/productSchema";
import { errorHandler } from "@/middleware";
import { uploadImages } from "@/services/db/imageUploadService";
import { createProduct, extractNewProduct } from "@/services/db/productService";
import { AppError } from "@/utils/api/apiErrors";
import { ApiResponse } from "@/utils/api/apiResponse";
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
	try {
		const session = await getSession();
		if (!session?.userId || !session?.storeId) {
			throw new AppError(401, "Unauthorized");
		}

		const formData = await request.formData();
		const productData = await extractNewProduct(formData);

		const validatedData = productSchema.parse(productData);

		const uploadedImageUrls = await uploadImages(
			supabase,
			validatedData.images,
		);

		const product = await createProduct(prisma, {
			name: validatedData.name,
			description: validatedData.description,
			categoryId: validatedData.categoryId,
			price: validatedData.price,
			images: uploadedImageUrls,
			storeId: session.storeId,
			stock: validatedData.stock
		});

		return ApiResponse.success(
			{ message: "Product created successfully", product },
			201,
		);
	} catch (error) {
		return errorHandler(error);
	}
}
