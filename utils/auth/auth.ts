import type { signInData } from "@/components/forms/SignInForm";
import type { formData } from "@/components/forms/SignUpForm";
import { decrypt } from "@/lib/auth/auth";
import type { NextRequest } from "next/server";

export type UserCredentials = {
	sessionToken: string;
	expires: string;
};

export async function signUp(data: formData) {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		},
	);
	return response;
}

export async function signOut(userId: string) {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signout`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(userId),
		},
	);
	return response;
}

export async function getUserCredentials(
	req: NextRequest,
): Promise<UserCredentials | null> {
	try {
		const cookie = req.cookies.get("session")?.value;
		if (!cookie) return null;

		const credentials = (await decrypt(cookie)) as UserCredentials;
		return credentials as UserCredentials;
	} catch (error) {
		if (error instanceof Error) {
			// Token sudah expire
			switch (error.name) {
				case "JWTExpired":
					console.log("JWT token expired");
					break;
				case "JWSInvalid":
					console.log("Invalid JWT format");
					break;
				default:
					console.error("Error verifying JWT:", error.message);
			}
		} else {
			console.error("Unknown error occurred:", error);
		}
		return null;
	}
}
export async function signIn(data: signInData) {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signin`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		},
	);
	return response;
}
