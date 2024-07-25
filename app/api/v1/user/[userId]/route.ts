import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
	request: Request,
	{ params }: { params: { userId: string } },
) {
	try {
		const userId = params.userId;
		if (!userId) {
			return NextResponse.json({
				status: 400,
				message: "Invalid user",
			});
		}
		const user = await prisma.user.findUnique({
			where: { id: userId },
		});

		return NextResponse.json(
			{
				user: {
					id: user?.id,
					name: user?.name,
					email: user?.email,
					image: user?.image,
				},
			},
			{
				status: 201,
				statusText: "Successfully get user data",
			},
		);
	} catch (err) {
		return NextResponse.json(
			{
				message: "Something went wrong",
			},
			{
				status: 500,
				statusText: "internal server error",
			},
		);
	}
}
