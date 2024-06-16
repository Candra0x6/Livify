"use server";
import { createClient } from "@/app/utils/server";
import { SignUpForm } from "@/components/forms/SignUpForm";
import { headers } from "next/headers";

export default async function SignUpPage() {
  return (
    <div className="shadow-2xl shadow-slate-200 py-10">
      <SignUpForm />
    </div>
  );
}
