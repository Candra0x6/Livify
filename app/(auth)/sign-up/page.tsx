"use client";
import { SignUpForm } from "@/components/forms/SignUpForm";

export default function SignUpPage() {
  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="w-full max-w-lg rounded-2xl bg-white p-10 shadow-lg dark:bg-[#2c2c2e]">
        <div className="flex flex-col items-center w-full mb-7">
          <h1 className="font-bold text-center text-3xl">Create an Account</h1>
          <span className="text-subtext2 text-sm">
            Create account by fill field details in below
          </span>
        </div>
        <SignUpForm />
      </div>
    </div>
  );
}
