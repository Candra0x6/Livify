import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Footer from "@/components/element/Footer";
import { Navbar } from "@/components/element/Navbar";
import { getUserDetail } from "@/hooks/auth/useUserDetail";
import RefreshHandler, { type sessionEror } from "@/hooks/refreshHandler";
import { getRefresh, getSession, refreshSession } from "@/lib/auth/auth";
import { cn } from "@/lib/utils";
import { getUserCredentials } from "@/utils/auth/auth";
import type { RefreshSession, Session, User } from "@prisma/client";
import { Nunito_Sans, Poppins } from "next/font/google";
const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
  weight: ["400", "500", "600", "700", "800", "900"], // Add the weights you need
});

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
  weight: ["200", "300", "400", "600", "700", "800", "900"], // Add the weights you need
});
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
  let user: { user: User } | null = null;
  if (session?.userId) {
    const res = await getUserDetail(session.userId);
    user = res;
  }
  console.log(user);
  return (
    <html lang="en" className={`${poppins.variable} ${nunitoSans.variable}`}>
      <body className="relative bg-background">
        <RefreshHandler
          initialSession={session as sessionEror}
          refreshToken={refresh as RefreshSession}
        />
        <header className="w-full bg-black">
          <Navbar user={user?.user} />
        </header>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
