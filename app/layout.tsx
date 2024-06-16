import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { createClient } from "./utils/server";
import HeaderNav from "@/components/layout/HeaderWrap";
import Footer from "@/components/element/Footer";

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
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground ">
        <HeaderNav user={user} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
