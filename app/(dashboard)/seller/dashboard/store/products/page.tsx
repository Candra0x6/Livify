"use client";
import TableProductSkeleton from "@/components/skeletons/TableProductSkeleton";
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
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Text } from "@/components/ui/text";
import type { ProductDetails } from "@/interfaces/models/Product";
import { getSession } from "@/lib/auth/auth";
import { cn, formatPrice } from "@/lib/utils";
import { fetchStoreProductsBySearch } from "@/services/api/productsApi";
import { format } from "date-fns";
import { CalendarIcon, FilterIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { DeleteProductDialog } from "./component/delete-product";
import { EditProductDialog } from "./component/edit-product-dialog";
import { NewProductDialog } from "./component/new-product-dialog";
export default function Products() {
  const [products, setProducts] = useState<ProductDetails[] | undefined>();
  const [date, setDate] = useState<Date>();
  const [keyword, setKeyword] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true);
  const searchRef = useRef<HTMLInputElement>(null);

  const handleSearch = () => {
    if (searchRef.current) {
      setKeyword(searchRef.current.value);
    }
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (searchRef.current) {
        setKeyword(searchRef.current.value);
      }
    }
  };
  useEffect(() => {
    const product = async () => {
      try {
        setLoading(true);
        const session = await getSession();
        const storeId = session?.storeId as string;
        const data = await fetchStoreProductsBySearch(storeId, {
          query: keyword as string,
        });
        setProducts(data?.store.products);
      } catch (err) {
        setLoading(true);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    product();
  }, [keyword]);
  return (
    <>
      {!products && (
        <div className="w-full mb-5 lg:h-[20vh] h-[14vh] rounded-md bg-white shadow-sh-card">
          <div className="flex justify-between w-full h-full lg:p-10 p-5">
            <div className="">
              <h1 className="lg:text-2xl md:text-lg text-md font-semibold">
                Create your first product
              </h1>
              <span className="md:text-md md:text-sm text-xs text-textSecondary">
                Make first product for your store
              </span>
            </div>
            <div className="h-full flex items-center">
              <Button className="lg:px-10 lg:text-md text-sm">
                Create Product
              </Button>
            </div>
          </div>
        </div>
      )}
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
        </div>
        <div className="flex gap-x-2 w-full justify-end">
          <div className="lg:w-[230px] w-full flex bg-white shadow-sh-card hover:bg-accent/80 items-center rounded-md h-10">
            <div className="p-4 flex items-center justify-between w-full ">
              <Button
                onClick={handleSearch}
                variant="ghost"
                className=" rounded-none text-white p-0"
              >
                <CiSearch className="text-2xl text-foreground" />
              </Button>
              <Input
                ref={searchRef}
                onKeyDown={handleKeyDown}
                type="text"
                placeholder="Search Prodcucts"
                className="bg-transparent ring-0 border-0 focus:ring-0 focus-visible:ring-0"
              />
            </div>
          </div>
          <NewProductDialog />
        </div>
      </div>
      <Table className="bg-white shadow-sh-card p-10 rounded-lg">
        <TableHeader>
          <TableRow className="text-[15px]">
            <TableHead className="w-28">Image</TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead className="w-24">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableProductSkeleton />
          ) : products ? (
            products.length > 0 &&
            products?.map((item) => (
              <TableRow key={item.id} className="border-y-[1px] border-accent">
                <TableCell>
                  <div className="w-14 aspect-square">
                    <img
                      alt="chair"
                      className="h-full aspect-square w-full object-contain "
                      // @ts-ignore
                      src={item.images[0] as string}
                    />
                  </div>
                </TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.Category.name}</TableCell>
                <TableCell>
                  {/* @ts-ignore */}

                  {formatPrice(Number.parseFloat(item.price))}
                </TableCell>
                <TableCell>{item.stock}</TableCell>

                <TableCell>
                  <div className="flex gap-x-2">
                    <EditProductDialog Id={item.id} />
                    <DeleteProductDialog Id={item.id} />
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow className="border-y-[1px] border-accent w-full">
              <TableCell className="" />
              <TableCell className="" />
              <TableCell className="" />
              <TableCell className="font-semibold text-xl">
                No Product Found
              </TableCell>
              <TableCell className="" />
              <TableCell className="" />
              <TableCell className="" />
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex w-full justify-between pb-10 mt-10">
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
    </>
  );
}
