/** @type {import('next').NextConfig} */
const nextConfig = {
	basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
	reactStrictMode: true,
	images: {
		domains: ["vqeowfcbngeyipwzpkul.supabase.co"],
	},
	experimental: {
		fontLoaders: [
			{ loader: "@next/font/google", options: { subsets: ["latin"] } },
		],
	},
};

module.exports = nextConfig;
