"use client";

import { Description } from "@radix-ui/react-dialog";
import type { ReactNode } from "react";
import { FaArrowRightLong } from "react-icons/fa6";

type props = {
  title: string;
  description: string;
  navigate?: string | null;
};
export default function SectionHeader({
  title,
  description,
  navigate,
}: props): ReactNode {
  console.log(navigate);
  return (
    <div className="flex justify-between items-end mb-5">
      <div className="">
        <h1 className="text-[2.5rem] font-bold">{title}</h1>
        <span className="text-[#A5A3A3]">{description}</span>
      </div>
      {navigate === undefined ? (
        ""
      ) : (
        <div className="flex items-center h-full gap-x-2 text-textSecondary group hover:translate-x-2 transition-all duration-300 ease-in-out">
          <span className="">{navigate}</span>
          <FaArrowRightLong className="" />
        </div>
      )}
    </div>
  );
}
