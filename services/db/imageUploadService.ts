// src/services/imageUploadService.ts
import { AppError } from "@/utils/api/apiErrors";
import type { SupabaseClient } from "@supabase/supabase-js";

export async function uploadImages(
	supabase: SupabaseClient,
	images: File[],
): Promise<string[]> {
	const uploadPromises = images.map((image, index) =>
		uploadImage(supabase, image, index, "product-images"),
	);
	return Promise.all(uploadPromises);
}

export async function uploadImage(
	supabase: SupabaseClient,
	file: Blob,
	index: number,
	bucket: "product-images" | "store-logo",
): Promise<string> {
	const buffer = await file.arrayBuffer();
	const fileName = `image-${Date.now()}-${index}`;

	const { data, error } = await supabase.storage
		.from(bucket)
		.upload(fileName, buffer, {
			contentType: file.type || "application/octet-stream",
		});

	if (error) {
		throw new AppError(500, `Failed to upload image${index}: ${error.message}`);
	}

	const {
		data: { publicUrl },
	} = supabase.storage.from(bucket).getPublicUrl(fileName);

	return publicUrl;
}
