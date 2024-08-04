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
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState, type FC } from "react";

import logo from "../../public/svg/logo.svg";
import AuthButton from "../AuthButton";
import DesktopNav from "../DesktopNavbar";
import { MobileNav } from "../MobileNav";
import SearchModal from "../SearchMenu";
import { Button } from "../ui/button";

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
  const path = usePathname();
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
    <>
      {!path.includes("/seller/dashboard") && (
        <nav className="fixed top-0 z-50 w-full">
          <div
            className={`flex mx-auto items-center justify-center shadow-sh-card rounded-lg bg-white transition-all duration-700 ${
              scrolled
                ? "translate-y-3 2xl:w-[145vh] w-[95%]"
                : "w-full translate-x-0"
            }`}
          >
            <div className="container mx-auto">
              <div
                className={
                  "relative lg:grid lg:grid-cols-3 flex lg:place-content-center lg:justify-items-center items-center border-b h-16 lg:p-5"
                }
              >
                <div className="w-full lg:flex hidden">
                  <DesktopNav />
                </div>
                <div className="flex lg:hidden">
                  <MobileNav />
                </div>
                <div className="hidden lg:flex mr-2">
                  <Image src={logo} alt="Livify." className="" />
                </div>
                <div className="flex lg:space-x-5 space-x-2 w-full lg:justify-end">
                  <SearchModal />
                  <div className="lg:space-x-2 space-x-1 items-center flex">
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
            </div>
          </div>
        </nav>
      )}
    </>
  );
};
