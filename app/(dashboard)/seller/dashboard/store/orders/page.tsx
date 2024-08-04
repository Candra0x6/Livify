"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Heading } from "@/components/ui/heading";
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
import type { ORDER_STATUS, Order } from "@prisma/client";
import { format } from "date-fns";
import { CalendarIcon, FilterIcon, MinusCircle } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";

import {
  Pending,
  Processing,
  Rejected,
  Success,
} from "./component/order-status-badge";
import { PopoverOrder } from "./component/popover-details-order";
function Orders() {
  const [orders, setOrders] = useState<Order[]>();
  const [date, setDate] = useState<Date>();
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [orderItem, setOrderItem] = useState<{ order: Order }>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const getOrders = useCallback(async () => {
    const session = await getSession();
    const storeId = session?.storeId;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/store/${storeId}/orders`,
      {
        method: "GET",
      }
    );
    const data = await res.json();
    setOrders(data?.store?.orders);
  }, []);
  const getOrderDetails = useCallback(async () => {
    if (!selectedItemId) {
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/order/${selectedItemId}`
      );
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setOrderItem(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [selectedItemId]);
  useEffect(() => {
    getOrders();
  }, [getOrders]);
  useEffect(() => {
    getOrderDetails();
  }, [getOrderDetails]);
  function convertToDateOnly(dateString: Date) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-based
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const confirmStatus = async (
    orderId: string,
    action: "confirm" | "reject"
  ) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/order/${orderId}/status`,
      {
        method: "PUT",
        body: JSON.stringify(action),
      }
    );
    const data = await res.json();
    console.log(data);
  };

  const cancleOrder = async (orderId: string) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/order/${orderId}/cancle`,
      {
        method: "PUT",
      }
    );
    const data = await res.json();
  };
  const statusBadge = (status: string) => {
    console.log(status);
    const statusComponents: { [key: string]: JSX.Element } = {
      PROCESSING: <Processing status="Processing" />,
      PENDING: <Pending status="Pending" />,
      CANCELLED: <Rejected status="Cancelled" />,
      COMPLETED: <Success status="Completed" />,
      REJECTED: <Rejected status="Rejected" />,
    };

    return statusComponents[status] || null;
  };

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
      <Table className="bg-white shadow-sh-card p-10 rounded-lg">
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
          {orders &&
            orders.length > 0 &&
            orders.map((item) => (
              // biome-ignore lint/correctness/useJsxKeyInIterable: <explanation>
              <PopoverOrder isLoading={isLoading} data={orderItem?.order}>
                <TableRow
                  className="border-y-[1px] border-accent hover:bg-accent cursor-pointer rounded-md"
                  onClick={() => setSelectedItemId(item.orderId)}
                >
                  <TableCell>{item.product.id}</TableCell>
                  <TableCell>{item.product.name}</TableCell>
                  <TableCell>{item.order.orderAddress}</TableCell>
                  <TableCell>{convertToDateOnly(item.ordersDate)}</TableCell>
                  <TableCell>{item.product.categoryId}</TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.order.totalPrice}</TableCell>
                  <TableCell>{statusBadge(item.order.status)}</TableCell>
                  {/* <div className="flex">
                  <Button
                    onClick={async () =>
                      await confirmStatus(item.order.id, "confirm")
                    }
                  >
                    <FaCheck className="text-green-500 text-2xl" />
                  </Button>
                  <Button
                    onClick={async () =>
                      await confirmStatus(item.order.id, "reject")
                    }
                  >
                    <IoClose className="text-rose-500 text-2xl" />
                  </Button>
                  <Button
                    onClick={async () => await cancleOrder(item.order.id)}
                  >
                    <MinusCircle className="text-rose-500 text-2xl" />
                  </Button>
                </div> */}
                </TableRow>
              </PopoverOrder>
            ))}
        </TableBody>
      </Table>
      <div className="flex w-full justify-between py-10">
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

export default Orders;
