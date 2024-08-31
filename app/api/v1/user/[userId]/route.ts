import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
	request: Request,
	{ params }: { params: { userId: string } },
) {
	try {
		const userId = params.userId;
		request.json
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
				data: user
			},
			{
				status: 200,
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
