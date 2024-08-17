import type { queryPayload } from "@/lib/validators/productSchema";
import { fetchCategory } from "@/services/api/productsApi";
import type { Category } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import type React from "react";
import { type FC, useEffect, useState } from "react";
import { IoFilter } from "react-icons/io5";
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

type props = {
  query: queryPayload;
  setQuery: React.Dispatch<React.SetStateAction<queryPayload>>;
};
export const MobileFilter: FC<props> = ({ query, setQuery }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-white shadow-sh-card"
        >
          <IoFilter className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-3/4 bg-background p-6"
        title="Navbar Menu"
      >
        <aside className="flex flex-col gap-4">
          <SheetHeader>
            <SheetTitle>Filter Menu</SheetTitle>
            <SheetDescription />
          </SheetHeader>

          <div className="text-sm">
            <FilterElement query={query} setQuery={setQuery} />
          </div>
        </aside>
      </SheetContent>
    </Sheet>
  );
};

export const FilterElement: FC<props> = ({ query, setQuery }) => {
  const searchParam = useSearchParams();
  const router = useRouter();
  const params = new URLSearchParams(searchParam);
  const [category, setCategory] = useState<{ categories: Category[] }>();
  useEffect(() => {
    const getCategory = async () => {
      const data = await fetchCategory();
      setCategory(data);
    };
    getCategory();
  }, []);
  return (
    <Accordion type="single" className="space-y-5 w-full" collapsible>
      <AccordionItem
        value="category"
        className="bg-white shadow-sh-card rounded-xl px-4"
      >
        <AccordionTrigger className="text-lg font-medium">
          Category
        </AccordionTrigger>
        <AccordionContent>
          <div className="grid grid-flow-row gap-2">
            {category &&
              category.categories.length > 0 &&
              category.categories.map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  onClick={() => {
                    params.set(
                      "categoryId",
                      item.id === query.categoryId ? "" : item.id
                    );
                    router.push(`?${params.toString()}`);
                    setQuery({
                      ...query,
                      categoryId: item.id === query.categoryId ? "" : item.id,
                    });
                  }}
                  value="createdAt"
                  className={`flex justify-start ${
                    query.categoryId === item.id && "bg-accent"
                  }`}
                >
                  <h1>{item.name}</h1>
                </Button>
              ))}
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem
        value="sortBy"
        className="bg-white shadow-sh-card rounded-xl px-4"
      >
        <AccordionTrigger className="text-lg font-medium">
          SoryBy
        </AccordionTrigger>
        <AccordionContent>
          <div className="grid gap-y-1">
            <Button
              variant="ghost"
              onClick={() => {
                params.set("sortBy", "createdAt");
                router.push(`?${params.toString()}`);
                setQuery({ ...query, sortBy: "createdAt" });
              }}
              value="createdAt"
              className={`flex justify-start ${
                query.sortBy === "createdAt" && "bg-accent"
              }`}
            >
              <h1>createdAt</h1>
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                params.set("sortBy", "name");
                router.push(`?${params.toString()}`);
                setQuery({ ...query, sortBy: "name" });
              }}
              value="name"
              className={`flex justify-start ${
                query.sortBy === "name" && "bg-accent"
              }`}
            >
              <h1>Name</h1>
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                params.set("sortBy", "price");
                router.push(`?${params.toString()}`);
                setQuery({ ...query, sortBy: "price" });
              }}
              value="price"
              className={`flex justify-start ${
                query.sortBy === "price" && "bg-accent"
              }`}
            >
              <h1>Price</h1>
            </Button>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
