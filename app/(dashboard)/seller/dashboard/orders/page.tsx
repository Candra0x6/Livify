"use client";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
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
import type { ORDER_STATUS, Order } from "@prisma/client";
import { MinusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
function Orders() {
  const [orders, setOrders] = useState<Order[]>();
  useEffect(() => {
    const getOrders = async () => {
      const session = await getSession();
      const storeId = session?.storeId;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/store/${storeId}/orders`,
        {
          method: "GET",
        }
      );
      const data = await res.json();
      setOrders(data.store.orders);
    };
    getOrders();
  }, []);
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
  return (
    <Table>
      <TableCaption>
        <div className="flex w-full justify-between">
          <div className="">
            <Text className="font-Poppins text-sm">Showing 1-9 of 78</Text>
          </div>
          <div className="flex gap-x-2">
            <Button variant="outline" size="sm">
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </TableCaption>
      <TableHeader>
        <TableRow className="bg-gray-100 font-JosefinSemibold text-[15px] ">
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
            <TableRow className="border-b-2 border-gray-100">
              <TableCell>{item.product.id}</TableCell>
              <TableCell>{item.product.name}</TableCell>
              <TableCell>{item.order.orderAddress}</TableCell>
              <TableCell>{convertToDateOnly(item.ordersDate)}</TableCell>
              <TableCell>{item.product.categoryId}</TableCell>
              <TableCell>{item.price}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{item.order.totalPrice}</TableCell>
              <TableCell>
                <div className="py-1 px-4 bg-yellow-100 text-center text-yellow-600 text-xs">
                  {item.order.status}
                </div>
              </TableCell>
              <div className="flex">
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
                <Button onClick={async () => await cancleOrder(item.order.id)}>
                  <MinusCircle className="text-rose-500 text-2xl" />
                </Button>
              </div>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}

export default Orders;
