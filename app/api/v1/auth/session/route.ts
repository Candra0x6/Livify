import { decrypt } from "@/lib/auth/auth";
import prisma from "@/lib/db";
import { getUserCredentials } from "@/utils/auth/auth";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	try {
		const credentials = await getUserCredentials(request);
		const sessionToken = credentials?.sessionToken;
		if (credentials === null) {
			return NextResponse.json(
				{
					message: "Expire",
				},
				{
					status: 401,
				},
			);
		}
		if (!credentials) {
			return NextResponse.json(
				{
					message: "No session cookie found",
				},
				{ status: 401 },
			);
		}

		if (!sessionToken) {
			return NextResponse.json(
				{
					message: "Missing Session Token",
				},
				{ status: 401 },
			);
		}

		const session = await prisma.session.findUnique({
			where: { token: sessionToken },
		});

		if (!session || session.expires < new Date()) {
			return NextResponse.json(
				{
					message: "Expired Session",
				},
				{ status: 401 },
			);
		}

		return NextResponse.json({
			id: session.id,
			sessionToken: session.token,
			userId: session.userId,
			expires: session.expires,
			storeId: session.storeId,
		});
	} catch (error) {
		console.error("Internal Server Error:", error);
		return NextResponse.json(
			{
				message: "Internal Server Error",
			},
			{ status: 500 },
		);
	}
}
