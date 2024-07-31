"use client";

import { Description } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { FaArrowRightLong } from "react-icons/fa6";

type props = {
  title: string;
  description: string;
  navigate?: string | null;
  href?: string | null;
};
export default function SectionHeader({
  title,
  description,
  navigate,
}: props): ReactNode {
  const router = useRouter();
  return (
    <div className="flex justify-between items-end mb-5">
      <div className="">
        <h1 className="xl:text-[2.5rem] lg:text-[2.2rem] sm:text-[2rem] text-[1.5rem] font-bold">
          {title}
        </h1>
        <span className="text-textSecondary text-[0.8rem] sm:text-[1rem] lg:text-[1.2rem]">
          {description}
        </span>
      </div>
      {navigate === undefined ? (
        ""
      ) : (
        <div
          onClick={() => router.push("/products")}
          onKeyUp={() => router.push("/products")}
          className=" items-center h-full gap-x-2 text-textSecondary group md:flex hidden cursor-pointer"
        >
          <span className="">{navigate}</span>
          <FaArrowRightLong className="group-hover:translate-x-2 transition-all duration-300 ease-in-out " />
        </div>
      )}
    </div>
  );
}
