import { SignInForm } from "@/components/forms/SignInForm";
import { cookies, headers } from "next/headers";

export default async function SignInPage() {
  const cookie = cookies().get("session")?.value;
  console.log("cookie", document.cookie);
  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="w-full max-w-lg rounded-2xl bg-white p-10 shadow-lg dark:bg-[#2c2c2e]">
        <div className="flex flex-col items-center w-full mb-7">
          <h1 className="font-bold text-center text-3xl">Login Account</h1>
          <span className="text-subtext2 text-sm">
            Login account by fill field details in below
          </span>
        </div>
        <SignInForm cookie={cookie} />
      </div>
    </div>
  );
}
