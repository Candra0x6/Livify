import { compare, getRefresh, getSession } from "@/lib/auth/auth";
import prisma from "@/lib/db";
import { Base64 } from "js-base64";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	try {
		const { email, password } = await request.json();
		const session = await getSession();
		const refresh = await getRefresh();
		if (!email || !password) {
			return NextResponse.json(
				{ message: "Email and password are required" },
				{ status: 400 },
			);
		}
		const encodePassword = Base64.encode(password);
		const user = await prisma.user.findUnique({
			where: {
				email,
			},
		});
		if (!user) {
			return NextResponse.json(
				{
					message: "Invalid Email or Password ",
				},
				{
					status: 401,
				},
			);
		}

		const verifyPassword = compare({
			value: user?.password as string,
			password: encodePassword,
		});
		if (!verifyPassword) {
			return NextResponse.json(
				{
					message: "Invalid Email or Password ",
				},
				{
					status: 401,
				},
			);
		}
		if (session?.message && refresh?.sessionToken && refresh.token) {
			await prisma.session.delete({
				where: { token: refresh?.sessionToken },
			});
			await prisma.refreshSession.delete({
				where: { token: refresh?.token },
			});
		}

		return NextResponse.json(
			{
				user,
				success: true,
				statusText: "Login Successfullly",
			},
			{
				status: 200,
				statusText: "Logined",
			},
		);
	} catch (error) {
		return NextResponse.json(
			{
				success: false,
				statusText: "Unable to Login Something Wrong",
			},
			{
				status: 500,
				statusText: "Internal Server Eror",
			},
		);
	}
}
