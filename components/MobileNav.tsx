import { useAuth } from "@/app/AuthProvide";
import type { Category } from "@prisma/client";
import { MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { FC, ReactNode } from "react";
import logo from "../public/svg/logo.svg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

export const MobileNav: FC<{
  category: Category[];
}> = ({ category }): ReactNode => {
  const { user } = useAuth();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <MenuIcon className="h-6 w-6" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-3/4 bg-background p-6"
        title="Navbar Menu"
      >
        <nav className="flex flex-col gap-4">
          <SheetHeader>
            <SheetTitle>
              <div className="w-full">
                <Image src={logo} alt="Livify." className="w-60" />
              </div>
            </SheetTitle>
            <SheetDescription />
          </SheetHeader>

          <div className="text-sm">
            <Accordion
              type="multiple"
              defaultValue={["item-1", "item-2", "item-3"]}
              className="w-full"
            >
              <AccordionItem value="item-1" className="md:hidden">
                <AccordionTrigger>Dashboard</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-y-2 text-muted-foreground">
                    <Link
                      href={
                        user?.role === "SELLER"
                          ? "/seller/dashboard/store"
                          : "/customer/dashboard"
                      }
                    >
                      Dashboard
                    </Link>
                    <Link href="/seller/dashboard/products">Products</Link>
                    <Link href="/seller/dashboard/orders">Orders</Link>
                    <Link href="/seller/dashboard/store">Store</Link>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Main</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-y-2 text-muted-foreground">
                    <Link href="/">Home</Link>
                    <Link href="/products">Products</Link>
                    <Link href="/">Blog</Link>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Categories</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-y-2 text-muted-foreground">
                    {category?.map((item, i) => (
                      // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                      <Link key={i} href={`/products?categoryId=${item.id}`}>
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
};
