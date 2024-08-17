import { getSession } from "@/lib/auth/auth";
import prisma from "@/lib/db";
import { supabase } from "@/lib/supabase";
import {
	type productPayload,
	productSchema,
} from "@/lib/validators/productSchema";
import { type storePayload, storeSchema } from "@/lib/validators/storeSchema";
import { errorHandler } from "@/middleware";
import { uploadImage } from "@/services/db/imageUploadService";
import { createProduct } from "@/services/db/productService";
import { updateStore } from "@/services/db/storeService";
import { AppError } from "@/utils/api/apiErrors";
import { ApiResponse } from "@/utils/api/apiResponse";
import type { NextRequest } from "next/server";

export async function PATCH(
	request: NextRequest,
	{ params }: { params: { storeId: string } },
) {
	try {
		const session = await getSession();
		const storeId = params.storeId;
		if (!session?.userId) {
			throw new AppError(401, "Unauthorized");
		}

		const formData = await request.formData();
		const storeData = await extractStoreData(formData);

		const validatedData = storeSchema.parse(storeData);
		let imageUrl: string | undefined;
		if (validatedData.image instanceof Blob) {
			const upload = await uploadImage(
				supabase,
				validatedData.image,
				0,
				"store-logo",
			);
			imageUrl = upload;
		}

		const product = await updateStore(prisma, {
			name: validatedData.name,
			description: validatedData.description,
			image: imageUrl || validatedData.image,
			storeId: storeId,
			userId: session.userId,
		});

		return ApiResponse.success(
			{ message: "Store successfully updated", product },
			201,
		);
	} catch (error) {
		return errorHandler(error);
	}
}

async function extractStoreData(formData: FormData): Promise<storePayload> {
	const name = formData.get("name") as string;
	const description = formData.get("description") as string | undefined;
	const image = formData.get("image") as string;
	return { name, description, image };
}
export const config = {
	api: {
		bodyParser: false,
	},
};
