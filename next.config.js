/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ["vqeowfcbngeyipwzpkul.supabase.co"],
	},
	experimental: {
		fontLoaders: [
			{ loader: "@next/font/google", options: { subsets: ["latin"] } },
		],
	},
	publicRuntimeConfig: {
		baseURL:
			process.env.NEXT_PUBLIC_BASE_URL || `https://${process.env.VERCEL_URL}`,
	},
};

module.exports = nextConfig;
