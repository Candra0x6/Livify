"use server";
import { createClient } from "@/app/utils/server";
import { formData } from "@/components/forms/SignUpForm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function signUp(formData: formData) {
  const supabase = createClient();
  const origin = headers().get("origin");

  const { email, password, username } = formData;
  const { error } = await supabase.auth.signUp({
    email: email,
    password: password,

    options: {
      data: {
        username: username,
      },
      emailRedirectTo: `${origin}/callback`,
    },
  });

  if (error) {
    redirect("/sign-up?message=" + error.message);
  }
  redirect("/sign-up?message=Check email to continue sign in process");
}
