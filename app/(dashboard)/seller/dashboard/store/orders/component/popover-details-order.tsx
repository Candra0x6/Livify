"use client";
import { AddProductForm } from "@/components/forms/AddProductForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useOrderAction } from "@/hooks/useOrderAction";
import type { Category, Order, OrderItem, Product } from "@prisma/client";
import { data } from "autoprefixer";
import Image from "next/image";
import { type ReactNode, useEffect, useMemo, useState } from "react";
import { IoAdd } from "react-icons/io5";
import tes from "../../../../../../public/images/sofa-chair.png";
import { ProductListSkeletonCard } from "@/components/skeletons/ProductListSkeletonCard";
import { formatPrice } from "@/lib/utils";

interface productWCategory extends Product {
  Category: Category;
}
interface orderItemsType extends OrderItem {
  product: productWCategory;
}
export interface orderType extends Order {
  orderItems: orderItemsType[];
}
interface props {
  data: orderType | undefined;
  children: ReactNode;
  isLoading: boolean;
}

export const PopoverOrder = ({ data, children, isLoading }: props) => {
  const { confirmOrder, rejectOrder } = useOrderAction();
  const totalItems = useMemo(() => {
    return data?.orderItems?.reduce((acc, item) => acc + item.quantity, 0) || 0;
  }, [data?.orderItems]);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-[100vh] duration-300 transition-all ">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Confirm Customer Order ?
          </DialogTitle>
          <DialogDescription>Confirm Customer Order</DialogDescription>
        </DialogHeader>
        {
          <>
            {isLoading ? (
              <ProductListSkeletonCard />
            ) : (
              data &&
              data?.orderItems?.length > 0 &&
              data?.orderItems?.map((item, id) => (
                <div
                  key={item.id}
                  className="group/card duration-300 transition-all w-full group cursor-pointer relative overflow-hidden flex gap-x-10 -xl p-4"
                >
                  <div className="relative w-[10rem] aspect-square">
                    <img
                      // @ts-ignore
                      src={item?.product?.images[0]}
                      alt="l"
                      className="w-full h-full aspect-square rounded-xl"
                    />
                  </div>
                  <div className=" space-y-2 w-full">
                    <div className="mb-5">
                      <div className="flex">
                        <div className="w-full">
                          <div className="flex w-full justify-between">
                            <h1 className="text-xl font-semibold">
                              {item?.product?.name}
                            </h1>
                          </div>
                          <span>{item?.product.Category.name}</span>
                        </div>
                      </div>
                    </div>
                    <div className="w-full flex justify-between ">
                      <span className="text-primary font-bold text-xl  items-end flex">
                        {/*@ts-ignore*/}
                        {formatPrice(parseFloat(item.product.price))}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
            <Table>
              <TableHeader>
                <TableRow className="font-bold text-[16px] font-heading text-foreground ">
                  <TableHead>Payment Details</TableHead>
                  <TableHead>Customer Address</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="border-y-[1px] border-foreground/50">
                  <TableCell className="grid grid-cols-2 ">
                    <div className="font-medium text-md">
                      <h1>Total Items</h1>
                    </div>
                    <div className="">
                      <p>{totalItems}</p>
                    </div>
                  </TableCell>
                  <TableCell>{data?.orderAddress}</TableCell>
                </TableRow>
                <TableRow className="">
                  <TableCell className="grid grid-cols-2">
                    <h1 className="font-medium text-md">Total</h1>
                    <p>${data?.totalPrice as unknown as number}</p>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <div className="flex w-full justify-end gap-x-2">
              <Button
                variant="destructive"
                size="default"
                className="px-20"
                onClick={() => rejectOrder(data?.id as string)}
              >
                Reject
              </Button>
              <Button
                variant="default"
                className="px-20"
                onClick={() => confirmOrder(data?.id as string)}
              >
                Confirm
              </Button>
            </div>
          </>
        }
      </DialogContent>
    </Dialog>
  );
};
