import OrderCard from "@/components/cards/OrderCard";
import { Button } from "@/components/ui/button";
import { fetchOrderById } from "@/services/api/orderApi";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import carGif from "../../../public/gif/truck.gif";

interface PaymentPageProps {
  searchParams: {
    orderId?: string;
  };
}
async function Payment({ searchParams }: PaymentPageProps) {
  const { orderId } = searchParams;
  const order = await fetchOrderById(orderId as string);
  return (
    <div className="mt-20 container mx-auto">
      <div className="flex flex-col items-center bg-white w-full rounded-lg shadow-sh-card">
        <div className="p-20 flex flex-col items-center">
          <Image src={carGif} alt="car" className="w-[30%]" />
          <h1 className="font-semibold text-5xl mb-5">
            Order Placed Successfully! 🎉
          </h1>
          <p className="text-lg text-center">
            Thank you for your purchase! Your order has been successfully placed
            and is now in our system. Our team is excited to start processing
            your order right away. Before we proceed, our seller will carefully
            review your order to ensure everything is in perfect order. Once the
            review is complete and all details are confirmed, the seller will
            promptly accept your order and begin preparing it for shipment.{" "}
          </p>
        </div>
        <OrderCard data={order?.order} />
      </div>
      <div className="grid grid-cols-2 gap-5 mt-10">
        <Link href="/" className="w-full">
          <Button className="w-full">Back to Home</Button>
        </Link>
        <Link href={"/seller/dashboard/purches"} className="w-full">
          <Button className="w-full">Go to Order</Button>
        </Link>
      </div>
    </div>
  );
}

export default Payment;
