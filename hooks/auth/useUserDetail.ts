import type { User } from "@prisma/client";

export async function getUserDetail(userId: string): Promise<{ user: User } | null> {
	try {
		const response = await fetch(
			`http://localhost:3000/api/v1/user/${userId}`,
			{
				method: "GET",
			},
		);
		const userData: { user: User } = await response.json();
		return userData;
	} catch (error) {
		console.error("Error fetching session:", error);
		return null;
	}
}
