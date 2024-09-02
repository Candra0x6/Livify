import generateToken from "@/hooks/generateToken";
import { encrypt } from "@/lib/auth/auth";
import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	try {
		const { userId } = await request.json();
		console.log(userId)
		if (!userId || typeof userId !== "string") {
			return NextResponse.json(
				{ message: "Valid User ID is required" },
				{ status: 400 },
			);
		}

		const expireSession = new Date(Date.now() + 24 * 60 * 60 * 1000);
		const expireRefresh = new Date(Date.now() + 24 * 60 * 60 * 1000 * 7);
		const sessionToken = generateToken(userId);
		const refreshToken = generateToken(`${userId}a`);

		const store = await prisma.store.findUnique({
			where: { userId: userId }
		})


		const createSession = await prisma.session.create({
			data: {
				token: sessionToken,
				expires: expireSession,
				userId: userId,
				storeId: store?.id || null
			},
		});

		const createRefreshSession = await prisma.refreshSession.create({
			data: {
				identifier: "Refresh Token",
				token: refreshToken,
				expires: expireRefresh,
				sessionToken: createSession.token,
			},
		});

		const sessionCookies = {
			sessionToken: createSession.token,
			expires: createSession.expires,
		};
		const refreshCookie = {
			refreshToken: createRefreshSession.token,
			expires: createRefreshSession.expires,
			sessionToken: createSession.token,
		};

		const [encryptedSession, encryptedRefresh] = await Promise.all([
			encrypt(sessionCookies, "session"),
			encrypt(refreshCookie, "refresh"),
		]);

		const response = NextResponse.json(
			{
				success: true,
				sessionId: createSession.id,
				sessionToken: createSession.token,
				refreshToken: createRefreshSession.token,
			},
			{ status: 200, statusText: "Success Create Session and Refresh Token" },
		);
		const setCookie = (response: any, name: any, value: any, additionalOptions = {}) => {
			const isProduction = process.env.NODE_ENV === "production";
			const cookieOptions: {
				httpOnly: boolean;
				secure: boolean;
				sameSite: string;
				maxAge: number;
				path: string;
				domain?: string
			} = {
				httpOnly: false,
				secure: isProduction,
				sameSite: isProduction ? "strict" : "lax",
				maxAge: 24 * 60 * 60, // 24 jam dalam detik
				path: "/",
				...additionalOptions, // Memungkinkan override opsi default
			};

			if (isProduction && process.env.COOKIE_DOMAIN) {
				cookieOptions.domain = process.env.COOKIE_DOMAIN;
			}

			response.cookies.set(name, value, cookieOptions);
		};

		// Penggunaan
		setCookie(response, "session", encryptedSession);
		setCookie(response, "refresh", encryptedRefresh, { maxAge: 24 * 60 * 60 * 7 });

		return response;
	} catch (error) {
		console.error("Error creating session:", error);
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			return NextResponse.json(
				{ message: "Database error", code: error.code },
				{ status: 400 },
			);
		}
		return NextResponse.json(
			{ message: "Unable to create session" },
			{ status: 500 },
		);
	}
}
