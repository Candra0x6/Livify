import generateToken from "@/hooks/generateToken";
import { decrypt, encrypt } from "@/lib/auth/auth";
import prisma from "@/lib/db";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

type SessionData = {
	sessionToken: string;
	expires: Date;
};

type RefreshData = {
	refreshToken: string;
	expires: Date;
};

export async function PATCH(request: NextRequest) {
	try {
		const { sessionToken, refreshToken } = await request.json();
		console.log(refreshToken);
		if (!sessionToken || !refreshToken) {
			return NextResponse.json({ message: "Missing tokens" }, { status: 400 });
		}
		const randomNum = Math.floor((Math.random() * 100))
		const newSessionToken = generateToken(sessionToken);
		const newRefreshToken = generateToken(`user ${randomNum}`);
		const newExpireSession = new Date(Date.now() + 24 * 60 * 60 * 1000);
		const newExpireRefresh = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

		// Update session
		const updatedSession = await prisma.session.update({
			where: { token: sessionToken },
			data: {
				token: newSessionToken,
				expires: newExpireSession,
			},
		});

		// Update refresh session
		const updatedRefreshSession = await prisma.refreshSession.update({
			where: { token: refreshToken },
			data: {
				token: newRefreshToken,
				expires: newExpireRefresh,
				sessionToken: newSessionToken,
			},
		});

		const sessionData: SessionData = {
			sessionToken: updatedSession.token,
			expires: updatedSession.expires,
		};

		const refreshData: RefreshData = {
			refreshToken: updatedRefreshSession.token,
			expires: updatedRefreshSession.expires,
		};

		const encryptedSession = await encrypt(sessionData, "session");
		const encryptedRefresh = await encrypt(refreshData, "refresh");

		const res = NextResponse.json(
			{
				success: true,
				sessionId: updatedSession.id,
				sessionToken: updatedSession.token,
				refreshToken: updatedRefreshSession.token,
			},
			{ status: 200 },
		);

		res.cookies.set("session", encryptedSession, {
			httpOnly: false,
			secure: false,
			sameSite: "strict",
			maxAge: 24 * 60 * 60,
			path: "/",
		});

		res.cookies.set("refresh", encryptedRefresh, {
			httpOnly: false,
			secure: false,
			sameSite: "strict",
			maxAge: 7 * 24 * 60 * 60,
			path: "/",
		});
		return res;
	} catch (error) {
		console.error("Error in session refresh:", error);
		return NextResponse.json(
			{ message: "Internal Server Error", error },
			{ status: 500 },
		);
	}
}

export async function GET(request: NextRequest) {
	try {
		const cookieStore = cookies();
		const refreshCookie = cookieStore.get("refresh");

		if (!refreshCookie) {
			return NextResponse.json(
				{ message: "No refresh cookie found" },
				{ status: 401 },
			);
		}

		const refreshData = (await decrypt(refreshCookie.value)) as RefreshData;

		if (!refreshData.refreshToken) {
			return NextResponse.json(
				{ message: "Invalid refresh token" },
				{ status: 401 },
			);
		}

		const refresh = await prisma.refreshSession.findUnique({
			where: { token: refreshData.refreshToken },
		});

		if (!refresh) {
			return NextResponse.json(
				{ message: "Refresh session not found" },
				{ status: 404 },
			);
		}

		return NextResponse.json({
			identifier: refresh.identifier,
			sessionToken: refresh.sessionToken,
			refreshToken: refresh.token,
			expires: refresh.expires,
		});
	} catch (error) {
		console.error("Error in GET request:", error);
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 },
		);
	}
}
