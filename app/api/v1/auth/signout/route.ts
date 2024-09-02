
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	try {

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
