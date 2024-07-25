"use client";

import type { RefreshSession, Session } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export interface sessionEror extends Session {
	message?: string;
}
interface propsType {
	initialSession: sessionEror;
	refreshToken: RefreshSession;
}
export default function RefreshHandler({
	initialSession,
	refreshToken,
}: propsType) {
	const [session, setSession] = useState(initialSession);
	const router = useRouter();
	useEffect(() => {
		if (session.message === "Expire") {
			const refreshSession = async () => {
				try {
					const response = await fetch(
						`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/session/refresh`,
						{
							method: "PATCH",
							headers: {
								"Content-Type": "application/json",
							},
							body: JSON.stringify(refreshToken),
						},
					);

					if (response.ok) {
						const newSession = await response.json();
						setSession(newSession);
						router.refresh(); // Memicu re-render komponen server
					} else {
						router.push("/sign-in");
					}
				} catch (error) {
					console.error("Failed to refresh session:", error);
				}
			};

			refreshSession();
		}
	}, [session, refreshToken, router]);

	return null; // Komponen ini tidak me-render apapun
}
