import { getSession } from "@/lib/auth/auth";
import prisma from "@/lib/db";
import { supabase } from "@/lib/supabase";
import {
	type productPayload,
	productSchema,
} from "@/lib/validators/productSchema";
import { errorHandler } from "@/middleware";
import { uploadImages } from "@/services/db/imageUploadService";
import { createProduct } from "@/services/db/productService";
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
export async function extractNewProduct(
	formData: FormData,
): Promise<productPayload> {
	const name = formData.get("name") as string;
	const description = formData.get("description") as string | undefined;
	const categoryId = formData.get("categoryId") as string;
	const price = formData.get("price") as string;
	const stock = formData.get("stock") as unknown as number
	const images: Blob[] = [];

	formData.forEach((value, key) => {
		if (key.startsWith("image") && value instanceof Blob) {
			images.push(value);
		}
	});

	return { name, description, categoryId, price, images, stock };
}