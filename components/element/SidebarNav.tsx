"use client";

import Image from "next/image";
import {
  usePathname,
  useRouter,
  useSelectedLayoutSegment,
} from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BiBox } from "react-icons/bi";
import { LuClipboardList } from "react-icons/lu";
import { MdOutlineStorefront } from "react-icons/md";
import { TbLayoutDashboard } from "react-icons/tb";
import logo from "../../public/svg/logo.svg";

interface IconMenuListProps {
  name: string;
  href: string;
  icon: React.ElementType;
}

interface SidebarNavigation extends IconMenuListProps {
  segment: string | null;
  id: number;
}

const DashboardMenuList: SidebarNavigation[] = [
  {
    id: 0,
    name: "Dashboard",
    href: "/seller/dashboard/store",
    icon: TbLayoutDashboard,
    segment: null,
  },
  {
    id: 1,
    name: "Products",
    href: "/seller/dashboard/store/products",
    icon: BiBox,
    segment: "products",
  },
  {
    id: 2,
    name: "Order Lists",
    href: "/seller/dashboard/store/orders",
    icon: LuClipboardList,
    segment: "orders",
  },
  {
    id: 3,
    name: "Store",
    href: "/seller/dashboard/store/profile",
    icon: MdOutlineStorefront,
    segment: "store",
  },
];
const DashboardPurcesList = [
  {
    id: 0,
    name: "Orders",
    href: "/customer/dashboard/orders",
    icon: LuClipboardList,
    segment: "purches",
  },
];
const SidebarNav: React.FC = () => {
  const router = useRouter();
  const segment = useSelectedLayoutSegment();
  const path = usePathname();
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateIndicator = () => {
      if (navRef.current) {
        const activeItem = navRef.current.querySelector(
          `[data-segment="${segment ?? ""}"]`
        ) as HTMLElement;

        if (activeItem) {
          setIndicatorStyle({
            top: `${activeItem.offsetTop}px`,
          });
        } else {
          // Jika tidak ada item aktif, atur indikator ke item pertama
          const firstItem = navRef.current.querySelector(
            ":scope > div:not([data-segment])"
          ) as HTMLElement;

          if (firstItem) {
            setIndicatorStyle({
              top: `${firstItem.offsetTop}px`,
            });
          }
        }
      }
    };

    updateIndicator();
    // Tunggu sebentar untuk memastikan DOM telah dirender sepenuhnya
    const timer = setTimeout(updateIndicator, 0);

    return () => clearTimeout(timer);
  }, [segment]);

  return (
    <div className="w-full h-full pt-3 bg-white shadow-sh-card rounded-lg relative md:flex md:flex-col hidden">
      <div className="hidden md:flex mx-auto w-[80%]">
        <Image src={logo} alt="Livify." className="w-full" />
      </div>
      <div className="grid grid-rows-4 w-full relative" ref={navRef}>
        {(path.includes("/seller/dashboard/store")
          ? DashboardMenuList
          : DashboardPurcesList
        ).map((menu) => (
          <div
            key={menu.id}
            className="px-3 py-1 w-full h-full flex relative items-center"
            data-segment={menu.segment}
          >
            <div
              onClick={() => router.push(menu.href)}
              onKeyUp={() => router.push(menu.href)}
              className={`flex space-x-3 p-3 hover:bg-primary font-medium cursor-pointer w-full hover:text-primary-foreground rounded-lg z-10 ${
                segment === menu.segment ? " text-primary-foreground" : ""
              }`}
            >
              <menu.icon className="text-2xl" />
              <h1 className="text-md hover:bg-primary hover:text-white w-full">
                {menu.name}
              </h1>
            </div>
          </div>
        ))}
        <div
          className="absolute w-full h-14 flex left-0 px-3 py-1 z-0 transition-all duration-500"
          style={indicatorStyle}
        >
          <div className="rounded-lg bg-primary w-full h-full transition-all duration-500" />
        </div>
        <div
          className="absolute left-0 w-1 h-14 rounded-r-full bg-primary transition-all duration-500"
          style={indicatorStyle}
        />
      </div>
    </div>
  );
};

export default SidebarNav;
