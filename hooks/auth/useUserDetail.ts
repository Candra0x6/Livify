import type { UserDetails } from "@/types/api/response/UserResponse";
import type { User } from "@prisma/client";

export async function getUserDetail(userId: string): Promise<UserDetails | undefined> {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/user/${userId}`,
			{
				method: "GET",
			},
		);
		const userData = await response.json();
		return userData;
	} catch (error) {
		console.error("Error fetching session:", error);
		return
	}
}
