import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Footer from "@/components/element/Footer";
import HeaderNav from "@/components/layout/HeaderWrap";
import { getUserDetail } from "@/hooks/auth/useUserDetail";
import RefreshHandler, { type sessionEror } from "@/hooks/refreshHandler";
import { getRefresh, getSession, refreshSession } from "@/lib/auth/auth";
import { getUserCredentials } from "@/utils/auth/auth";
import type { RefreshSession, Session } from "@prisma/client";
import { cookies } from "next/headers";

const defaultUrl = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}`
	: "http://localhost:3000";

export const metadata = {
	metadataBase: new URL(defaultUrl),
	title: "Next.js Kit",
	description: "The fastest way to build apps with Next.js and Supabase",
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await getSession();
	const refresh = await getRefresh();
	console.log(refresh);
	let user = null;
	if (session?.userId) {
		user = await getUserDetail(session.userId);
	}
	return (
		<html lang="en" className={GeistSans.className}>
			<body className="bg-background text-foreground ">
				<RefreshHandler
					initialSession={session as sessionEror}
					refreshToken={refresh as RefreshSession}
				/>
				<HeaderNav user={user} />
				{children}
				<Footer />
			</body>
		</html>
	);
}
