import { getSession } from "@/lib/auth/auth";
import prisma from "@/lib/db";
import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(
	request: NextRequest,
	{ params }: { params: { userId: string } },
) {
	try {
		const userId = params.userId;

		if (!userId) {
			return new Response("Unauthorized account", { status: 401 });
		}
		const response = await prisma.store.findUnique({
			where: { userId },
		});

		if (!response) {
			return NextResponse.json({
				store: {
					quantity: false,
					storeId: null,
				},
			});
		}
		return NextResponse.json({
			store: {
				quantity: true,
				storeId: response.id,
			},
		});
	} catch (error) {
		if (error instanceof z.ZodError) {
			return new Response("Invalid request data passed", { status: 422 });
		}

		console.log(error);

		return new Response("Could not update store, please try again later.", {
			status: 500,
		});
	}
}
