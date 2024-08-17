"use client";
import { CreateStoreForm } from "@/components/forms/CreateStoreForm";
import { Heading } from "@/components/ui/heading";
import encrypt from "@/hooks/generateToken";
import { useSearchParams } from "next/navigation";

export default function CreateStore() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  return (
    <div className="bg-white shadow-slate-200 shadow-2xl p-10 rounded-md mt-36">
      <div className="mb-10">
        <Heading className="font-JosefinSemibold">Create Store</Heading>
        <span className="font-Poppins font-medium text-subtext3">
          Create store for your
        </span>
      </div>
      <CreateStoreForm />
    </div>
  );
}
