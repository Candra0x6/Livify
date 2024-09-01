import { cn } from "@/lib/utils";
import type { Category } from "@prisma/client";
import Link from "next/link";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";

const DesktopNav = ({ category }: { category: Category[] }) => {
  return (
    <div className="hidden lg:flex gap-x-8 items-center font-semibold ">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent">
              Menu
            </NavigationMenuTrigger>
            <NavigationMenuContent className="bg-white">
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <Link
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-primary text-accent p-6 no-underline outline-none focus:shadow-md"
                      href="/"
                    >
                      <div className="mb-2 mt-4 text-lg font-bold">Livify</div>
                      <p className="text-sm leading-tight text-white ">
                        An open source ecommerce skateshop built with everything
                        new in Next.js
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <ListItem href="/products" title="Products">
                  All the furniture products
                </ListItem>
                <ListItem href="/#categories" title="Categories">
                  See all furniture categories
                </ListItem>
                <ListItem
                  className="opacity-50"
                  href="#soon"
                  title="Blogs - Soon"
                >
                  Check blog about furniture
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent">
              Categories
            </NavigationMenuTrigger>
            <NavigationMenuContent className="bg-white">
              <ul className="grid w-[400px] gap-3 p-6 md:w-[500px] md:grid-cols-2">
                {category?.map((item, i) => (
                  <ListItem
                    // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                    key={i}
                    href={`/products?categoryId=${item.id}`}
                    title={item.name}
                  >
                    Explore the {item.name} category
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default DesktopNav;

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium text-black leading-none">
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
