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
import type { User } from "@prisma/client";
import { UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import type { IconType } from "react-icons";
import { CgProfile } from "react-icons/cg";
import { IoLogInOutline } from "react-icons/io5";
import { TbLayoutDashboard } from "react-icons/tb";
import { Button } from "./ui/button";

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
    href: "/seller/dashboard/store",
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
  return user.user ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-accent hover:bg-accent/80 aspect-square w-10 p-0"
        >
          <UserIcon className="p-[2px]" />
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
    <Button
      type="button"
      variant="default"
      onClick={signOutAction}
      className="flex gap-x-2 items-center"
    >
      Login
    </Button>
  );
}
