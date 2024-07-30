"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Text } from "@/components/ui/text";
import { getSession } from "@/lib/auth/auth";
import { cn } from "@/lib/utils";
import type { Product } from "@prisma/client";
import { format } from "date-fns";
import { CalendarIcon, FilterIcon } from "lucide-react";
import { Key, useEffect, useState } from "react";
import { CgSearch } from "react-icons/cg";
import { CiSearch } from "react-icons/ci";
import { DeleteProductDialog } from "./component/delete-product";
import { EditProductDialog } from "./component/edit-product-dialog";
import { NewProductDialog } from "./component/new-product-dialog";

interface paginationType {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface productType {
  pagination: paginationType;
  products: Product[];
}
export default function Products() {
  const [products, setProducts] = useState<productType>();
  const [date, setDate] = useState<Date>();
  useEffect(() => {
    const product = async () => {
      const session = await getSession();
      const storeId = session?.storeId as string | undefined;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/store/${storeId}/products`,
        {
          method: "GET",
        }
      );
      const data = await res.json();
      setProducts(data);
    };

    const orders = async () => {
      const orderId = "clyvf9znn000brb0cc3832o4q";
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/order/${orderId}`,
        {
          method: "GET",
        }
      );
      const data = await res.json();
    };
    orders();
    product();
  }, []);
  return (
    <>
      {!products && (
        <div className="w-full mb-5 h-[20vh] rounded-md bg-white shadow-sh-card">
          <div className="flex justify-between w-full h-full p-10">
            <div className="">
              <h1 className="text-2xl font-semibold">
                Create your first product
              </h1>
              <span className="text-md text-textSecondary">
                Make first product for your store
              </span>
            </div>
            <div className="h-full flex items-center">
              <Button className="px-10">Create Product</Button>
            </div>
          </div>
        </div>
      )}
      <div className="flex w-full justify-between mb-5">
        <div className="flex gap-x-3">
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
        </div>
        <div className="flex gap-x-2">
          <div className="w-[230px] flex bg-white shadow-sh-card hover:bg-accent/80 items-center rounded-md h-10">
            <div className="p-4 flex items-center justify-between w-full ">
              <Button variant="ghost" className=" rounded-none text-white p-0">
                <CiSearch className="text-2xl text-foreground" />
              </Button>
              <Input
                placeholder="Search Prodcucts"
                className="bg-transparent ring-0 border-0 focus:ring-0 focus-visible:ring-0"
              />
            </div>
          </div>
          <NewProductDialog />
        </div>
      </div>
      <Table className="bg-white shadow-sh-card p-10 rounded-lg">
        <TableCaption>
          <div className="flex w-full justify-between pb-10">
            <div className="">
              <Text className=" text-sm">Showing 1-9 of 78</Text>
            </div>
            <div className="flex gap-x-2">
              <Button variant="secondary" size="sm">
                Previous
              </Button>
              <Button variant="secondary" size="sm">
                Next
              </Button>
            </div>
          </div>
        </TableCaption>
        <TableHeader>
          <TableRow className="text-[15px]">
            <TableHead className="w-28">Image</TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Avialable Color</TableHead>
            <TableHead className="w-24">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products?.products?.map((item) => (
            <TableRow key={item.id} className="border-y-[1px] border-accent">
              <TableCell>
                <div className="w-14 aspect-square">
                  <img
                    alt="chair"
                    className="h-full aspect-square w-full object-contain "
                    src={item.images[0] as string}
                  />
                </div>
              </TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.categoryId}</TableCell>
              <TableCell>{item.price.toString()}</TableCell>
              <TableCell>{item.stock}</TableCell>
              <TableCell>
                <div className="flex gap-x-2">
                  <div className="aspect-square w-5 bg-red rounded-full" />
                  <div className="aspect-square w-5 bg-red rounded-full" />
                  <div className="aspect-square w-5 bg-red rounded-full" />
                </div>
              </TableCell>
              <TableCell>
                <div className="flex gap-x-2">
                  <EditProductDialog Id={item.id} />
                  <DeleteProductDialog Id={item.id} />
                </div>
              </TableCell>
            </TableRow>
          )) || (
            <h1 className="absolute w-full text-center text-2xl mt-2">
              Products are Empty
            </h1>
          )}
        </TableBody>
      </Table>
    </>
  );
}
