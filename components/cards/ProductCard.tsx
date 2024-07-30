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
    <div className="group/card shadow-lg border hover:shadow-2xl duration-300 transition-all rounded-2xl space-y-4 h-full p-4 bg-white hover:bg-meta">
      {/* Images and Actions */}
      <div className="aspect-square rounded-2xl bg-gray-100 relative w-full">
        <Button
          size="icon"
          variant="secondary"
          className="p-0 rounded-full aspect-square absolute m-2 right-0 w-10"
          onClick={() => addWishlist({ storeId, productId })}
        >
          <Heart className="p-[2px]" />
        </Button>
        <img
          // @ts-ignore
          src={image}
          fill
          sizes="200"
          // @ts-ignore
          alt={name}
          className="aspect-square object-fill rounded-2xl w-full h-full"
        />
      </div>
      <div className="space-y-3">
        <div className="flex justify-between">
          <h1 className="capitalize text-foreground font-medium text-xl">
            Lervlio Chair
          </h1>
          <div className="flex items-center gap-x-1">
            <FaStar size="20px" color="#f8ed24" />
            <span>4.5</span>
          </div>
        </div>

        <span>Chair</span>
        <div className="flex justify-between">
          <span className="text-primary font-bold text-xl">$36.21</span>
          <Button
            size="icon"
            variant="secondary"
            className="p-0 rounded-full aspect-square w-10"
            onClick={() => addCart({ storeId, productId, quantity: 1 })}
          >
            <ShoppingCart className="p-[2px]" />
          </Button>
        </div>
      </div>
    </div>
  );
};
