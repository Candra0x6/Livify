"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getSession } from "@/lib/auth/auth";
import { signOut } from "@/utils/auth/auth";
import { createClient } from "@/utils/supabase/client";
import type { User } from "@prisma/client";
import { UserIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { IconType } from "react-icons";
import { CgProfile } from "react-icons/cg";
import { IoLogInOutline } from "react-icons/io5";
import { TbLayoutDashboard } from "react-icons/tb";
import UserDefaultAvatarProfile from "../public/images/user-default-avatar.png";
import { Button } from "./ui/button";
import { Text } from "./ui/text";

export interface IconMenuListProps {
  name: string;
  href: string;
  icon: IconType;
}
const accountMenuList: IconMenuListProps[] = [
  {
    name: "Profile",
    href: "/profile",
    icon: CgProfile,
  },
  {
    name: "Dashboard",
    href: "/seller/dashboard",
    icon: TbLayoutDashboard,
  },
];

export default function AuthButton(user: { user: User | undefined }) {
  const router = useRouter();
  const signOutAction = async () => {
    try {
      const session = await getSession();

      await signOut(session?.userId as string);
    } catch (err) {
      console.error(err);
    } finally {
      router.push("/sign-in");
    }
  };
  return user ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="">
          <div className="rounded-full bg-accent aspect-square w-10 p-0 flex items-center justify-center">
            <UserIcon className="p-[2px]" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2 bg-white rounded-none">
        <DropdownMenuLabel className="text-lg">
          {user?.user?.name}
        </DropdownMenuLabel>
        <DropdownMenuLabel className="text-subtext2 -mt-3">
          {user?.user?.email}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className=" ">
          {accountMenuList.map((menu, i) => (
            <DropdownMenuItem
              onClick={() => router.push(menu.href)}
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              key={i}
              className="gap-x-2 flex items-center"
            >
              <menu.icon className="text-lg" />
              <span>{menu?.name}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={signOutAction}
          className="gap-x-2 flex items-center"
        >
          <IoLogInOutline className="text-xl" />
          <span>Sign Out</span>
        </DropdownMenuItem>{" "}
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <button
      type="button"
      onClick={signOutAction}
      className="flex gap-x-2 items-center"
    >
      <Text className="text-white font-JosefinSemibold text-md ">Login</Text>
    </button>
  );
}
