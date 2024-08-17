"use client";
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
import { getSession } from "@/lib/auth/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({ children }: React.PropsWithChildren) {
  const router = useRouter();

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
    const storeValidation = async () => {
      const session = await getSession();
      !session?.storeId && router.push("/seller/dashboard/store/profile");
    };
    storeValidation();
  }, []);
  return (
    <>
      <div className="w-full min-h-screen flex">
        <aside className="md:max-w-[20%] z-0 w-full md:flex hidden">
          <SidebarNav />
        </aside>
        <div className="flex flex-col w-full h-fit z-10">
          <nav className="w-full flex items-center justify-between bg-white shadow-nav p-6">
            <MobileNav />
            <div className="flex gap-x-5">
              <div className=" flex justify-end ">
                <SearchModal />
              </div>
              <Select onValueChange={handleValueChange}>
                <SelectTrigger
                  id="framework"
                  className="lg:w-[150px] w-full flex bg-accent hover:bg-accent/80 items-center rounded-md h-10 ml-2 cursor-pointer"
                >
                  <SelectValue placeholder="Store" />
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
