import { createClient } from "@/app/utils/server";
import { redirect } from "next/navigation";

export default async function signOut() {
  const supabase = createClient();
  try {
    await supabase.auth.signOut();
  } catch (err) {
    throw err;
  } finally {
    return redirect("/sign-in");
  }
}
