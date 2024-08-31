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
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Text } from "@/components/ui/text";
import { getSession } from "@/lib/auth/auth";
import { cn, formatDate, formatPrice } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, FilterIcon, MinusCircle } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";

import TableOrderSkeleton from "@/components/skeletons/TableOrderSkeleton";
import type { OrderItemWithOrder } from "@/interfaces/models/Order";
import {
  fetchOrderById,
  fetchOrdersBySearch,
  fetchStoreOrders,
} from "@/services/api/orderApi";
import {
  Pending,
  Processing,
  Rejected,
  Success,
  statusBadge,
} from "./component/order-status-badge";
import {
  PopoverOrder,
  type orderType,
} from "./component/popover-details-order";
function Orders() {
  const [orders, setOrders] = useState<OrderItemWithOrder[] | undefined>([]);
  const [date, setDate] = useState<Date>();
  const [selectedItemId, setSelectedItemId] = useState<string>();
  const [orderItem, setOrderItem] = useState<
    { order: orderType } | undefined
  >();
  const [tableLoading, setTableLoading] = useState<boolean>(true);
  const [popLoading, setPopLoading] = useState<boolean>(true);

  const [keyword, setKeyword] = useState<string>();
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
    const getOrder = async () => {
      try {
        setTableLoading(true);
        const session = await getSession();
        const storeId = session?.storeId as string;

        const data = await fetchOrdersBySearch(storeId, {
          query: keyword as string,
        });
        setOrders(data?.store?.orders);
      } catch {
        setTableLoading(true);
        throw new Error("Something went wrong");
      } finally {
        setTableLoading(false);
      }
    };
    getOrder();
  }, [keyword]);
  useEffect(() => {
    const getOrderById = async () => {
      try {
        setPopLoading(true);
        const data = await fetchOrderById(selectedItemId as string);
        setOrderItem(data);
      } catch (err) {
        setPopLoading(true);
        console.error(err);
      } finally {
        setPopLoading(false);
      }
    };

    getOrderById();
  }, [selectedItemId]);

  return (
    <div className=" relative">
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
        <div className="flex gap-x-2 w-full justify-end">
          <div className="lg:w-[230px] w-full flex bg-white shadow-sh-card  hover:bg-accent/80 items-center rounded-md h-10">
            <div className="p-4 flex items-center justify-between w-full">
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
                placeholder="Search Prodcucts"
                className="bg-transparent ring-0 border-0 focus:ring-0 focus-visible:ring-0"
              />
            </div>
          </div>
        </div>
      </div>
      <Table className="bg-white shadow-sh-card p-10 rounded-lg relative">
        <TableHeader>
          <TableRow className=" text-[15px] ">
            <TableHead className="w-[4%]">Id</TableHead>
            <TableHead className="w-[15%]">Name</TableHead>
            <TableHead className="w-[15%]">Address</TableHead>
            <TableHead className="w-[11%]">Date</TableHead>
            <TableHead className="w-[11%]">Category</TableHead>
            <TableHead className="w-[11%]">Price</TableHead>
            <TableHead className="w-[11%]">Quantity</TableHead>
            <TableHead className="w-[11%]">Total Price</TableHead>
            <TableHead className="w-[11%]">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableLoading ? (
            <TableOrderSkeleton />
          ) : orders ? (
            orders &&
            orders.length > 0 &&
            orders.map((item) => (
              <PopoverOrder
                key={item.id}
                isLoading={popLoading}
                data={orderItem?.order}
              >
                <TableRow
                  key={item.id}
                  className="border-y-[1px] border-accent hover:bg-accent cursor-pointer rounded-md"
                  onClick={() => setSelectedItemId(item.orderId)}
                >
                  <TableCell>{item.product.id}</TableCell>
                  <TableCell>{item.product.name}</TableCell>
                  <TableCell>{item.order.orderAddress}</TableCell>
                  <TableCell>{formatDate(item.ordersDate)}</TableCell>
                  <TableCell>{item.product.Category.name}</TableCell>
                  {/* @ts-ignore */}
                  <TableCell>{formatPrice(item.price)}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  {/* @ts-ignore */}
                  <TableCell>{formatPrice(item.order.totalPrice)}</TableCell>
                  <TableCell>{statusBadge(item.order.status)}</TableCell>
                </TableRow>
              </PopoverOrder>
            ))
          ) : (
            <TableRow className="border-y-[1px] border-accent w-full">
              <TableCell className="" />
              <TableCell className="" />
              <TableCell className="" />
              <TableCell className="" />
              <TableCell className="font-semibold text-xl w-[20%]">
                No Order Found
              </TableCell>
              <TableCell className="" />
              <TableCell className="" />
              <TableCell className="" />
              <TableCell className="" />
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex w-full justify-between mt-10">
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
    </div>
  );
}

export default Orders;
