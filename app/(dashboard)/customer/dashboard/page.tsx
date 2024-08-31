"use client";
import OrderCard from "@/components/cards/OrderCard";
import OrderHistorySkeletonCard from "@/components/skeletons/OrderHistorySkeletonCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getSession } from "@/lib/auth/auth";
import {
  fetchCustomerOrdersSearch,
  fetchUserOrders,
} from "@/services/api/orderApi";
import type { UserOrdersDetails } from "@/types/api/response/UserResponse";
import type { ORDER_STATUS } from "@prisma/client";
import React, { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
export default function CustomerOrderPage() {
  const [status, setStatus] = useState<ORDER_STATUS | undefined>();
  const [order, setOrder] = useState<UserOrdersDetails>();
  const [keyword, setKeyword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const searchRef = useRef<HTMLInputElement>(null);

  const handleSearch = () => {
    if (searchRef.current) {
      setKeyword(searchRef.current.value);
    }
  };
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (searchRef.current) {
        setKeyword(searchRef.current.value);
      }
    }
  };
  useEffect(() => {
    const getOrder = async (status?: ORDER_STATUS | undefined) => {
      try {
        setLoading(true);
        const session = await getSession();
        const data = await fetchCustomerOrdersSearch({
          userId: session?.userId as string,
          query: keyword as string,
          status,
        });
        setOrder(data);
      } catch (err) {
        setLoading(true);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getOrder(status);
  }, [status, keyword]);
  return (
    <>
      <div className="flex w-full justify-between mb-5">
        <div className=" gap-x-3 flex">
          <Select onValueChange={(value: ORDER_STATUS) => setStatus(value)}>
            <SelectTrigger className="bg-white rounded-xl shadow-sh-card w-28">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent
              className="bg-white rounded-xl shadow-sh-card"
              position="popper"
            >
              <SelectItem value="COMPLETED">Complated</SelectItem>
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="PROCESSING">Processing</SelectItem>
              <SelectItem value="REJECTED">Rejected</SelectItem>
              <SelectItem value="CANCELLED">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="px-2">{/* <MobileFilter /> */}</div>
        <div className="flex gap-x-2 w-full justify-end">
          <div className="lg:w-[230px] w-full flex bg-white shadow-sh-card  hover:bg-accent/80 items-center rounded-md h-10">
            <div className="p-4 flex items-center justify-between w-full">
              <Button variant="ghost" className=" rounded-none text-white p-0">
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
      <div className="grid grid-flow-row gap-y-5">
        {loading ? (
          <OrderHistorySkeletonCard />
        ) : (
          order?.orders &&
          order.orders.length > 0 &&
          order?.orders.map((item) => <OrderCard key={item.id} data={item} />)
        )}
      </div>
    </>
  );
}
