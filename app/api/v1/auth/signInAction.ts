"use server";
import { createClient } from "@/app/utils/server";
import { signInData } from "@/components/forms/SignInForm";
import { error } from "console";
import { redirect } from "next/navigation";

export default async function signIn(formData: signInData) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password,
  });

  if (error) {
    return redirect("sign-in?message=" + error.message);
  }
  redirect("/");
}
