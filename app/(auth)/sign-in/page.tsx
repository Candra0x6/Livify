import { createClient } from "@/app/utils/server";
import { SignInForm } from "@/components/forms/SignInForm";
import { headers } from "next/headers";

export default async function SignInPage() {
  return (
    <div className="shadow-2xl shadow-slate-200 py-10">
      <SignInForm />
    </div>
  );
}
