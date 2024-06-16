"use client";

import { Text } from "./ui/text";
import Image from "next/image";
import UserIcon from "../public/icons/user.svg";
import { redirect, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import UserDefaultAvatarProfile from "../public/images/user-default-avatar.png";
import { CgProfile } from "react-icons/cg";
import { SlSettings } from "react-icons/sl";
import { TbLayoutDashboard } from "react-icons/tb";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { IoLogInOutline } from "react-icons/io5";

export default function AuthButton({ user }: { user: User | null }) {
  const router = useRouter();
  const supabase = createClient();
  const signOutAction = async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      throw err;
    } finally {
      redirect("/sign-in");
    }
  };
  return user ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="aspect-square rounded-full w-7 overflow-hidden bg-black">
          <Image
            src={UserDefaultAvatarProfile}
            alt="user-default-avatar-profile "
            className="w-full h-full"
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2 bg-white rounded-none">
        <DropdownMenuLabel className="text-lg">
          {user.user_metadata.username}
        </DropdownMenuLabel>
        <DropdownMenuLabel className="text-subtext2 -mt-3">
          {user.email}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className=" ">
          <DropdownMenuItem className="gap-x-2 flex items-center">
            <CgProfile className="text-lg" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-x-2 flex items-center">
            <HiOutlineClipboardDocumentList className="text-lg" />
            <span>Orders</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-x-2 flex items-center">
            <TbLayoutDashboard className="text-lg" />
            <span>Dashboard</span>
          </DropdownMenuItem>
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
      onClick={() => router.push("/sign-in")}
      className="flex gap-x-2 items-center"
    >
      <Text className="text-white font-JosefinSemibold text-md ">Login</Text>
      <Image src={UserIcon} alt="heart-icon" className="w-4" />
    </button>
  );
}
