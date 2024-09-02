"use client";
import { useAuth } from "@/app/AuthProvide";
import { MobileNav } from "@/components/MobileNav";
import SearchModal from "@/components/SearchMenu";
import SidebarNav from "@/components/element/SidebarNav";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchCategory } from "@/services/api/productsApi";
import type { Category } from "@prisma/client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardLayout({ children }: React.PropsWithChildren) {
  const router = useRouter();
  const path = usePathname();
  const { user } = useAuth();
  const [category, setCategory] = useState<Category[]>([]);
  const handleValueChange = (value: string) => {
    switch (value) {
      case "store":
        router.push("/seller/dashboard/store");
        break;
      case "purches":
        router.push("/seller/dashboard/purches");
        break;
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (!user || user.role !== "BUYER") {
      router.push("/");
      return;
    }

    const getCategory = async () => {
      const categoryData = await fetchCategory();
      setCategory(categoryData.categories);
    };
    getCategory();
  }, []);
  return (
    <>
      <div className="w-full min-h-screen h-full flex">
        <aside className="md:max-w-[20%] z-0 w-full md:flex hidden">
          <SidebarNav />
        </aside>
        <div className="flex flex-col w-full z-10">
          <nav className="w-full flex items-center justify-between bg-white shadow-nav p-6">
            <MobileNav category={category} />
            <div className="flex gap-x-5">
              <div className=" flex justify-end ">
                <SearchModal />
              </div>
              <Select onValueChange={handleValueChange}>
                <SelectTrigger
                  id="framework"
                  className="lg:w-[150px] w-full flex bg-accent hover:bg-accent/80 items-center rounded-md h-10 ml-2 cursor-pointer"
                >
                  <SelectValue
                    placeholder={
                      path.includes("/seller/dashboard/store")
                        ? "Store"
                        : "Purches"
                    }
                  />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="store">Store</SelectItem>
                  <SelectItem value="purches">Purches</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </nav>
          <main className="p-10 w-full ">{children}</main>
        </div>
      </div>
    </>
  );
}
