import {
  Success,
  statusBadge,
} from "@/app/(dashboard)/seller/dashboard/store/orders/component/order-status-badge";
import { formatDate, formatPrice } from "@/lib/utils";
import type { OrderResponse } from "@/services/api/orderApi";
import type { ProductCat } from "@/services/api/productsApi";
import type { Order, OrderItem, Product } from "@prisma/client";
import Image from "next/image";
import React from "react";
import { CgNotes } from "react-icons/cg";
import { FaStar } from "react-icons/fa6";
import Flex from "../ui/flex";

interface ProductOrder extends OrderItem {
  product: ProductCat;
}
interface props extends Order {
  orderItems: ProductOrder[];
}

function OrderCard({ data }: { data: props }) {
  return (
    <div className="w-full bg-white rounded-lg shadow-sh-card">
      <div className="p-4">
        <div className="max-h-[20%] h-full w-full flex justify-between border-b-[1px] border-accent">
          <div className="flex items-start gap-2 ">
            <CgNotes className="text-[2rem]" />
            <div className="">
              <h1 className="font-semibold text-md">Transaction</h1>
              <span className="text-textSecondary text-sm">
                {formatDate(data?.createdAt)}
              </span>
            </div>
          </div>
          <div className="">{statusBadge(data?.status)}</div>
        </div>
        <div className="max-h-[60%] h-full w-full">
          {data &&
            data.orderItems.length > 0 &&
            data.orderItems.map((item) => (
              <div
                key={item.id}
                className="group/card duration-300 transition-all sm:w-full sm:h-full h-[150px] group cursor-pointer relative overflow-hidden flex sm:gap-x-10 gap-x-5 rounded-xl sm:p-4 p-3"
              >
                <div className="relative bg-[#F6F7FB] md:w-36 md:h-36 w-[7.8rem] h-[7.8rem]  aspect-square">
                  <Image
                    fill
                    // @ts-ignore
                    src={item.product.images[0]}
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
                            {item.product.name}
                          </h1>
                        </div>
                        <span className="sm:text-base text-sm">
                          {item.product.Category.name}
                        </span>
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
                      {/* @ts-ignore */}
                      {formatPrice(Number.parseFloat(item.product.price))}
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="max-h-[20%] h-full">
          {/* @ts-ignore */}
          {formatPrice(Number.parseFloat(data?.totalPrice))}
        </div>
      </div>
    </div>
  );
}

export default OrderCard;
