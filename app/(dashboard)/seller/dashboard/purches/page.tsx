"use client";
import { MobileFilter } from "@/components/Filter";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Flex from "@/components/ui/flex";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, FilterIcon } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { CgNotes } from "react-icons/cg";
import { CiSearch } from "react-icons/ci";
import { FaStar } from "react-icons/fa6";
import { TbTransactionDollar } from "react-icons/tb";
import tes from "../../../../../public/images/desk.png";
import { Success } from "../store/orders/component/order-status-badge";
function page() {
  const [date, setDate] = useState();
  return (
    <>
      <div className="flex w-full justify-between mb-5">
        <div className=" gap-x-3 lg:flex hidden">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[200px] justify-start text-left font-normal bg-white border-0 shadow-sh-card rounded-md",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2 bg-white border-0 shadow-sh-card rounded-md"
              >
                <FilterIcon className="h-4 w-4" />
                <span>Stock</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="">
              <DropdownMenuItem>Lower</DropdownMenuItem>
              <DropdownMenuItem>Highest</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2 bg-white border-0 shadow-sh-card rounded-md"
              >
                <FilterIcon className="h-4 w-4" />
                <span>Price</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="">
              <DropdownMenuItem>Highest</DropdownMenuItem>
              <DropdownMenuItem>Lowest</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2 bg-white border-0 shadow-sh-card rounded-md"
              >
                <FilterIcon className="h-4 w-4" />
                <span>Status</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="">
              <DropdownMenuItem>Highest</DropdownMenuItem>
              <DropdownMenuItem>Lowest</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="px-2">
          <MobileFilter />
        </div>
        <div className="flex gap-x-2 w-full justify-end">
          <div className="lg:w-[230px] w-full flex bg-white shadow-sh-card  hover:bg-accent/80 items-center rounded-md h-10">
            <div className="p-4 flex items-center justify-between w-full">
              <Button variant="ghost" className=" rounded-none text-white p-0">
                <CiSearch className="text-2xl text-foreground" />
              </Button>
              <Input
                placeholder="Search Prodcucts"
                className="bg-transparent ring-0 border-0 focus:ring-0 focus-visible:ring-0"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-white rounded-lg shadow-sh-card">
        <div className="p-4">
          <div className="max-h-[20%] h-full w-full flex justify-between border-b-[1px] border-accent">
            <div className="flex items-start gap-2">
              <CgNotes className="text-2xl" />
              <div className="">
                <h1 className="font-semibold text-md">Transaction</h1>
                <span className="text-textSecondary text-sm">20 May 2024</span>
              </div>
            </div>
            <Success status="Completed" />
          </div>
          <div className="max-h-[60%] h-full w-full">
            <div className="group/card duration-300 transition-all sm:w-full sm:h-full h-[150px] group cursor-pointer relative overflow-hidden flex sm:gap-x-10 gap-x-5 rounded-xl sm:p-4 p-3">
              <div className="relative bg-[#F6F7FB] md:w-36 md:h-36 w-[7.8rem] h-[7.8rem]  aspect-square">
                <Image
                  fill
                  src={tes}
                  alt="l"
                  className="w-full h-full aspect-square rounded-xl"
                />
              </div>
              <div className=" space-y-2 md:space-y-7 w-full">
                <div className="sm:mb-5">
                  <Flex justify="space-between" align="center">
                    <div className="w-full">
                      <div className="flex w-full justify-between">
                        <h1 className="sm:text-2xl text-lg font-semibold">
                          Meja{" "}
                        </h1>
                      </div>
                      <span className="sm:text-base text-sm">Chair</span>
                    </div>
                  </Flex>
                  <Flex className="gap-x-2">
                    <div className="flex items-center gap-x-1">
                      <FaStar
                        color="#f8ed24"
                        className="sm:w-[20px] w-[15px]"
                      />
                      <span className="text-sm">4.5</span>
                    </div>
                  </Flex>
                </div>
                <div className="w-full md:flex justify-between ">
                  <span className="text-primary font-bold sm:text-xl text-md items-end flex">
                    $36.21
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="max-h-[20%] h-full">hs</div>
        </div>
      </div>
    </>
  );
}

export default page;
