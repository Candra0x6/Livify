import { getRefresh, getSession } from "@/lib/auth/auth";
import prisma from "@/lib/db";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	try {
		// const userId = await request.json();
		// const session = await getSession();
		// const refresh = await getRefresh();
		// console.log(session)
		// console.log(refresh)
		// if (!userId || !session || !refresh) {
		// 	return NextResponse.json(
		// 		{ message: "Unauthorized: No active user id or session" },
		// 		{ status: 401 },
		// 	);
		// }

		// const user = await prisma.user.findUnique({
		// 	where: { id: userId },
		// });

		// if (!user) {
		// 	return NextResponse.json({ message: "User not found" }, { status: 404 });
		// }

		// await prisma.session.delete({
		// 	where: { id: session.id },
		// });

		// await prisma.refreshSession.delete({
		// 	where: { token: refresh.refreshToken },
		// });

		const response = NextResponse.json(
			{ success: true, message: "Sign out successful" },
			{ status: 200 },
		);

		response.cookies.delete("session");
		response.cookies.delete("refresh");

		return response;
	} catch (error) {
		console.error("Sign out error:", error);
		return NextResponse.json(
			{ success: false, message: "Internal server error", error },
			{ status: 500 },
		);
	}
}
