import { createClient } from "@/app/utils/server";
import { SignInForm } from "@/components/forms/SignInForm";
import { cookies, headers } from "next/headers";

export default async function SignInPage() {
	const cookie = cookies().get("session")?.value;
	return (
		<div className="shadow-2xl shadow-slate-200 py-10">
			<SignInForm cookie={cookie} />
		</div>
	);
}
