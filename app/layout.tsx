import "./globals.css";
import Footer from "@/components/element/Footer";
import { Navbar } from "@/components/element/Navbar";
import { getUserDetail } from "@/hooks/auth/useUserDetail";
import RefreshHandler, { type sessionEror } from "@/hooks/refreshHandler";
import { useCookie } from "@/hooks/useCookie";
import { getRefresh, getSession } from "@/lib/auth/auth";
import type { UserDetails } from "@/types/api/response/UserResponse";
import type { RefreshSession, User } from "@prisma/client";
import { Nunito_Sans, Poppins } from "next/font/google";
import { cookies } from "next/headers";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./AuthProvide";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
  weight: ["200", "300", "400", "600", "700", "800", "900"],
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
  const sessionCookies = cookies().get("session")?.value;
  const refreshCookies = cookies().get("refresh")?.value;
  const { getCookie } = useCookie();
  console.log(getCookie);
  console.log(sessionCookies);
  console.log(refreshCookies);
  const session = await getSession();
  const refresh = await getRefresh();
  let user: UserDetails | undefined;
  if (session?.userId) {
    const res = await getUserDetail(session.userId);
    user = res;
  }
  console.log(session);
  return (
    <html lang="en" className={`${poppins.variable} ${nunitoSans.variable}`}>
      <body className="relative bg-background">
        <AuthProvider session={session} user={user?.data as User | null}>
          {(sessionCookies || refreshCookies) && (
            <RefreshHandler
              cookie={sessionCookies as string}
              initialSession={session as sessionEror}
              refreshToken={refresh as RefreshSession}
            />
          )}

          <header className="w-full bg-black">
            <Navbar user={user?.data} />
          </header>
          <main className="">
            <Toaster />
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
