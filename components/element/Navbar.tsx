"use client";
import type { User } from "@prisma/client";
import {
  HeartIcon,
  LineChartIcon,
  ShoppingCartIcon,
  UserIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, type FC } from "react";
import { CgProfile } from "react-icons/cg";
import { CiSearch } from "react-icons/ci";
import { MdDashboard, MdSettings } from "react-icons/md";
import logo from "../../public/svg/logo.svg";
import AuthButton from "../AuthButton";
import DesktopNav from "../DesktopNavbar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
type navbarList = {
  name: string;
  href: string;
  current: boolean;
};

const navList: navbarList[] = [
  {
    name: "Home",
    href: "/",
    current: true,
  },
  {
    name: "About",
    href: "/about",
    current: false,
  },
  {
    name: "Products",
    href: "/products",
    current: false,
  },
  {
    name: "Blog",
    href: "/blog",
    current: false,
  },
  {
    name: "Contact",
    href: "/contact",
    current: false,
  },
];

export const Navbar: FC<{ user: User | undefined }> = (user) => {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);
  return (
    <header className="fixed top-0 z-50 w-full">
      <nav className=" flex items-center justify-center relative">
        {" "}
        <div
          className={` relative mx-auto grid grid-cols-3 place-content-center justify-items-center items-center border-b h-16 p-5 shadow-sh-card rounded-lg bg-white transition-all duration-700 ${
            scrolled ? " translate-y-3 w-[150vh]" : "w-full translate-x-0"
          }`}
        >
          <div className=" w-full ">
            <DesktopNav />
          </div>
          <div className="">
            <Image src={logo} alt="Livify." className="" />
          </div>
          <div className="flex space-x-5 w-full justify-end">
            <div className="w-[230px] flex bg-accent hover:bg-accent/80 items-center rounded-md h-10">
              <div className="p-4 flex items-center justify-between w-full">
                <Button
                  variant="ghost"
                  className=" rounded-none text-white p-0"
                >
                  <CiSearch className="text-2xl text-foreground" />
                </Button>
                <h1 className="text-sm">Quick search...</h1>
                <span className="text-foreground text-sm font-bold justify-self-end ml-4">
                  Ctrl K
                </span>
              </div>
            </div>
            <div className="space-x-2 items-center flex">
              <Button
                variant="ghost"
                className="rounded-full bg-accent hover:bg-accent/80 aspect-square w-10 p-0"
                onClick={() => router.push("/wishlist")}
              >
                <HeartIcon className="p-[2px]" />
              </Button>
              <Button
                variant="ghost"
                className="rounded-full bg-accent hover:bg-accent/80 aspect-square w-10 p-0"
                onClick={() => router.push("/cart")}
              >
                <ShoppingCartIcon className="p-[2px] flex" />
              </Button>
              <div className="">
                <AuthButton user={user.user} />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
