"use client";

import * as Dialog from "@radix-ui/react-dialog";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { AppWindowMac } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BiWindows } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";
import { IoLogoWindows } from "react-icons/io5";
import { MdOutlineDesktopWindows } from "react-icons/md";
import { PiWindowsLogo, PiWindowsLogoFill } from "react-icons/pi";
import { TbLocationSearch } from "react-icons/tb";
import { Button } from "./ui/button";
import {
  fetchProductsBySearch,
  ProductsResponse,
} from "@/services/api/productsApi";
import slugify from "@/hooks/slugify";

export default function SearchModal() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [data, setData] = useState<{
    data: [{ category: string; products: ProductsResponse[] }];
  }>();
  const [keyword, setKeyword] = useState<string>("");
  const searchRef = useRef<HTMLInputElement>(null);

  const handleSearch = () => {
    if (searchRef.current) {
      setKeyword(searchRef.current.value);
    }
  };
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "/" && !isOpen) {
        event.preventDefault();
        setIsOpen(true);
      }
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setIsOpen((open) => !open);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    const getProductsSearch = async () => {
      try {
        const data = await fetchProductsBySearch({
          query: keyword as string,
        });
        setData(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    let timeoutId: NodeJS.Timeout;

    if (keyword && keyword.trim() !== "") {
      timeoutId = setTimeout(() => {
        getProductsSearch();
      }, 500);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [keyword]);

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <div className="flex lg:w-auto w-full">
        <Dialog.Trigger asChild>
          <div className="lg:w-[230px] w-full flex bg-accent hover:bg-accent/80 items-center rounded-md h-10 ml-2 cursor-pointer">
            <div className="p-4 flex items-center lg:justify-between w-full">
              <Button variant="ghost" className="rounded-none text-white p-0">
                <CiSearch className="text-2xl text-foreground" />
              </Button>
              <div className="w-full flex justify-between items-center">
                <h1 className="lg:text-sm text-xs ml-2"> Search</h1>
                <span className="text-foreground/70 text-sm font-black lg:flex hidden">
                  Ctrl K
                </span>
              </div>
            </div>
          </div>
        </Dialog.Trigger>
      </div>
      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50" />
        <Dialog.Content className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] fixed left-[50%] top-[50%] z-50 grid max-h-[85vh] w-[90vw] max-w-lg translate-x-[-50%] translate-y-[-50%] overflow-hidden border bg-white shadow-lg duration-200 sm:rounded-lg">
          <VisuallyHidden.Root>
            <Dialog.Title>Search</Dialog.Title>
            <Dialog.Description>
              Start typing to search the documentation
            </Dialog.Description>
          </VisuallyHidden.Root>
          <form className="border-b border-slate-200">
            <div className="flex items-center">
              <VisuallyHidden.Root>
                <label htmlFor="search-modal">Search</label>
              </VisuallyHidden.Root>
              <CiSearch className="ml-4 h-5 w-5 shrink-0 text-slate-500" />

              <input
                ref={searchRef}
                onChange={handleSearch}
                id="search-modal"
                className="[&::-webkit-search-decoration]:none [&::-webkit-search-results-button]:none [&::-webkit-search-results-decoration]:none [&::-webkit-search-cancel-button]:hidden w-full appearance-none border-0 bg-white py-3 pl-2 pr-4 text-sm placeholder-slate-400 text-black focus:outline-none"
                type="search"
                placeholder="Search"
              />
            </div>
          </form>
          <ScrollArea.Root className="max-h-[calc(85vh-44px)]">
            <ScrollArea.Viewport className="h-full w-full">
              <div className="space-y-4 px-2 py-4">
                {data &&
                  data.data.length > 0 &&
                  data.data &&
                  data.data.map((item, i) => (
                    <div key={i}>
                      <div className="mb-2 px-2 text-xs font-semibold uppercase text-gray-400">
                        {item.products.length > 0 && item.category}
                      </div>
                      <ul>
                        <li>
                          {item.products &&
                            item.products.length > 0 &&
                            item.products.map((product) => (
                              <Link
                                key={product.id}
                                className="flex items-center rounded-lg px-2 py-1 text-sm leading-6 text-slate-700 outline-none focus-within:bg-slate-100 hover:bg-slate-100"
                                href={`/products/${slugify(product.Store.name)}/${product.slug}?productId=${product.id}`}
                              >
                                <TbLocationSearch className="mr-3 h-4 w-4 shrink-0 fill-slate-400 text-slate-400" />

                                <span>{product.name}</span>
                              </Link>
                            ))}
                        </li>
                      </ul>
                    </div>
                  ))}
              </div>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar
              className="flex h-full w-2 touch-none select-none border-l border-l-transparent p-[1px] transition-colors"
              orientation="vertical"
            >
              <ScrollArea.Thumb className="relative flex-1 rounded-full bg-slate-300" />
            </ScrollArea.Scrollbar>
            <ScrollArea.Scrollbar
              className="flex h-2.5 touch-none select-none flex-col border-t border-t-transparent p-[1px] transition-colors"
              orientation="horizontal"
            >
              <ScrollArea.Thumb className="relative flex-1 rounded-full bg-slate-300" />
            </ScrollArea.Scrollbar>
            <ScrollArea.Corner className="bg-blackA5" />
          </ScrollArea.Root>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
