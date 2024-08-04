"use client";
import type { cartBody } from "@/app/api/v1/cart/new/route";
import type { addWIshlistBody } from "@/app/api/v1/user/[userId]/wishlist/new/route";
import { getSession } from "@/lib/auth/auth";
import { addWishlistPayload } from "@/services/wishlistService";
import { Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { type FC } from "react";
import { FaStar } from "react-icons/fa6";

import { Button } from "../ui/button";

export type ProductDetailsProps = {
  name: string;
  color: string[];
  price: number;
  image: string;
  description?: string;
  productId: string;
  slug: string;
  storeId: string;
};

export const ProductCard: FC<ProductDetailsProps> = ({
  name,
  color,
  price,
  image,
  productId,
  slug,
  storeId,
}) => {
  const router = useRouter();

  const addCart = async (data: cartBody) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart/new`,
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const result = await res.json();
    console.log(result);
  };

  const addWishlist = async (data: addWIshlistBody) => {
    const session = await getSession();
    const userId = session?.userId;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/user/${userId}/wishlist/new`,
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const result = res.json();
    console.log(result);
  };
  return (
    <div className="group/card shadow-lg border hover:shadow-2xl duration-300 transition-all rounded-2xl space-y-4 h-full md:p-4 p-2 bg-white hover:bg-meta">
      {/* Images and Actions */}
      <div className="aspect-square rounded-2xl bg-gray-100 relative w-full">
        <Button
          size="icon"
          variant="secondary"
          className="p-0 rounded-full aspect-square absolute sm:m-2 m-1 right-0 md:w-10 md:h-10 w-8 h-8"
          onClick={() => addWishlist({ storeId, productId })}
        >
          <Heart className="md:p-[2px] md:w-10 w-4 p-0" />
        </Button>
        <img
          // @ts-ignore
          src={image}
          sizes="200"
          alt={name}
          className="aspect-square object-fill rounded-2xl w-full h-full"
        />
      </div>
      <div className="space-y-3">
        <div className="flex justify-between">
          <h1 className="capitalize text-foreground font-medium md:text-xl text-sm">
            {name}
          </h1>
          <div className="flex items-center gap-x-1">
            <FaStar color="#f8ed24" className="md:w-5 w-3" />
            <span className="md:text-base text-xs">4.5</span>
          </div>
        </div>

        <span className="md:text-base text-xs">Chair</span>
        <div className="flex justify-between">
          <span className="text-primary font-bold md:text-xl text-md">
            ${price}
          </span>
          <Button
            size="icon"
            variant="secondary"
            className="p-0 rounded-full aspect-square md:w-10 md:h-10 w-8 h-8"
            onClick={() => addCart({ storeId, productId, quantity: 1 })}
          >
            <ShoppingCart className="md:p-[2px] md:w-10 w-4 p-0 " />
          </Button>
        </div>
      </div>
    </div>
  );
};
