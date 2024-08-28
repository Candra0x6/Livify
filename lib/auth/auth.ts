"use server";

import type { RefreshSession, Session } from "@prisma/client";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function createSession(userId: string) {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/session/new`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ userId: userId }),
		},
	);
	if (response.ok) {
		console.error("Fail creating session");
	} else {
		return response.json();
	}
}

interface sessionReturn extends Session {
	message?: string;
}
export async function getSession(): Promise<sessionReturn | null> {
	try {
		const sessionCookies = cookies().get("session")?.value;
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/session`,
			{
				method: "GET",
				headers: {
					Cookie: `session=${sessionCookies}`,
				},
			},
		);
		const sessionData: sessionReturn = await response.json();
		return sessionData as sessionReturn;
	} catch (error) {
		console.error("Error fetching session:", error);
		return null;
	}
}

export async function getRefresh(): Promise<RefreshSession | null> {
	try {
		const refreshCookies = cookies().get("refresh")?.value;
		if (!refreshCookies) {
			return null;
		}
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/session/refresh`,
			{
				method: "GET",
				headers: {
					Cookie: `refresh=${refreshCookies}`,
				},
			},
		);
		const refreshData: RefreshSession = await response.json();
		return refreshData;
	} catch (error) {
		console.error("Error fetching session:", error);
		return null;
	}
}

export async function refreshSession() {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/session/refresh`,
			{
				method: "POST",
			},
		);
		if (response.ok) {
			const res = NextResponse.next();
			console.log(res);
		}
		return response;
	} catch (error) {
		console.error("Error refreshing session:", error);
		return null;
	}
}

interface JWTPayload {
	[key: string]: unknown;
}

export async function encrypt(
	payload: JWTPayload,
	type: "session" | "refresh",
): Promise<string> {
	try {
		const expires: string = type === "session" ? "24h" : "7d";
		if (!process.env.JWT_SECRET) {
			throw new Error("JWT_SECRET is not defined");
		}
		const secret = new TextEncoder().encode(process.env.JWT_SECRET);
		return await new SignJWT(payload)
			.setProtectedHeader({ alg: "HS256" })
			.setIssuedAt()
			.setExpirationTime(expires)
			.sign(secret);
	} catch (error) {
		console.error("Error encrypting JWT:", error);
		throw error;
	}
}

export async function decrypt(input: string): Promise<JWTPayload> {
	try {
		if (!process.env.JWT_SECRET) {
			throw new Error("JWT_SECRET is not defined");
		}
		const secret = new TextEncoder().encode(process.env.JWT_SECRET);
		const { payload } = await jwtVerify(input, secret, {
			algorithms: ["HS256"],
		});
		return payload as JWTPayload;
	} catch (error) {
		console.error("Error decrypting JWT:", error);
		throw error;
	}
}

interface validatePassword {
	value: string;
	password: string;
}

export async function compare({
	value,
	password,
}: validatePassword): Promise<boolean> {
	try {
		if (value && password && value === password) {
			return true;
		}
		return false;
	} catch (error) {
		console.error;
	}
	return false;
}
