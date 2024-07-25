import { getSession } from "@/lib/auth/auth";
import { PrismaClient } from "@prisma/client";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
const supabase = createClient(
	// biome-ignore lint/style/noNonNullAssertion: <explanation>
	process.env.NEXT_PUBLIC_SUPABASE_URL!,
	// biome-ignore lint/style/noNonNullAssertion: <explanation>
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export async function POST(request: Request) {
	try {
		const session = await getSession();
		if (!session) {
			return NextResponse.json(
				{
					message: "Unauthorized",
				},
				{ status: 401 },
			);
		}

		const { searchParams } = new URL(request.url);
		const formData = await request.formData();

		const userId = searchParams.get("userId") as string | undefined;
		const name = formData.get("name") as string;
		const description = formData.get("description") as string;
		const image = formData.get("image") as File;
		if (!userId || !name || !image) {
			return NextResponse.json(
				{ message: "Missing required fields" },
				{ status: 400 },
			);
		}

		const checkUserStore = await prisma.store.findUnique({
			where: {
				userId: userId,
			},
		});

		if (checkUserStore) {
			return NextResponse.json({
				message: "You already have a store",
				status: 409,
			});
		}

		// Generate a unique filename
		const fileName = `${userId}-${Date.now()}-${image.name}`;

		// Upload the image
		const { data, error } = await supabase.storage
			.from("store-logo")
			.upload(fileName, image);

		if (error) {
			return NextResponse.json(
				{
					message: error.message,
				},
				{ status: 500 },
			);
		}

		// Get the public URL of the uploaded image
		const {
			data: { publicUrl },
		} = supabase.storage.from("store-logo").getPublicUrl(fileName);

		// Create the store with the image URL
		const createStore = await prisma.store.create({
			data: {
				userId: userId,
				name: name,
				image: publicUrl,
				description: description,
			},
		});

		await prisma.session.update({
			where: { id: session.id },
			data: {
				storeId: createStore.id,
			},
		});

		return NextResponse.json(
			{
				data: {
					success: true,
					messages: "Successfully Created Store",
					store: {
						createStore,
					},
				},
			},
			{
				status: 201,
				statusText: "OK",
			},
		);
	} catch (error) {
		return NextResponse.json(
			{
				message: "Unable to create new store",
				error: error,
			},
			{
				status: 500,
				statusText: "Internal Server Error",
			},
		);
	}
}
