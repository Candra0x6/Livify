"use client";
import React, { FC } from "react";
import { Button } from "../ui/button";
import { CiSearch } from "react-icons/ci";

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
const Navbar: FC = () => {
  return (
    <nav className="w-full container mx-auto flex justify-between items-center border-b h-16 py-12">
      <div className="font-JosefinBold text-[30px]">
        <h1>Livify.</h1>
      </div>
      <div className="flex items-center">
        <ul className="flex gap-x-5">
          {navList.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className={
                  item.current
                    ? "font-bold text-pink"
                    : "text-black hover:underline"
                }
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex gap-x-10">
        <div className="h-full w-[230px] flex items-center">
          <input
            type="text"
            className="py-1 border-l-2 border-t-2 border-b-2 w-full bg-transparent text-lg text-gray-900 focus:outline-none"
          />
          <Button className="bg-pink rounded-none text-white">
            <CiSearch color="#ffffff" className="text-2xl" />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
