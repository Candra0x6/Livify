"use client";
import type { cartBody } from "@/app/api/v1/cart/new/route";
import type { addWIshlistBody } from "@/app/api/v1/user/[userId]/wishlist/new/route";
import { getSession } from "@/lib/auth/auth";
import { addWishlistPayload } from "@/services/wishlistService";
import { useRouter } from "next/navigation";
import React, { type FC } from "react";
import { FiHeart } from "react-icons/fi";
import { LuShoppingCart } from "react-icons/lu";
import { PiMagnifyingGlass } from "react-icons/pi";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardImage,
  CardPrice,
  CardTitle,
  ObjectColors,
} from "../ui/card";
import Flex from "../ui/flex";
import { Heading } from "../ui/heading";
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

const ProductGridCard: FC<ProductDetailsProps> = ({
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
    const result = res.json();
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
    <Card
      onClick={() =>
        router.push(`/products/${storeId}/${slug}?productId=${productId}`)
      }
      className="w-full h-full shadow-none group cursor-pointer relative overflow-hidden gap-y-3 flex flex-col"
    >
      <CardHeader className="  relative bg-[#F6F7FB] group-hover:bg-[#e4e5e9] transition-all duration-300">
        <CardImage src={image} className="p-12 min-w-full" />
        <div className="absolute p-2 w-full flex flex-col left-0 bottom-0 transition-all duration-300 ease-in-out -translate-x-[30vh] group-hover:translate-x-0">
          <Button
            size="icon"
            onClick={() => addCart({ storeId, productId, quantity: 1 })}
            className="rounded-full hover:bg-bgshade"
          >
            <LuShoppingCart className="text-primarytext text-lg" />
          </Button>
          <Button
            onClick={() => addWishlist({ storeId, productId })}
            size="icon"
            className="rounded-full hover:bg-bgshade"
          >
            <FiHeart className="text-primarytext text-lg" />
          </Button>
          <Button size="icon" className="rounded-full hover:bg-bgshade">
            <PiMagnifyingGlass className="text-primarytext text-lg" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col w-full p-0 items-center">
        <CardTitle className="text-xl text-primarytext font-JosefinSemibold">
          {name}{" "}
        </CardTitle>
        <Flex gap={5}>
          {color.map((hex, i) => (
            <ObjectColors key={i} color={hex} />
          ))}
        </Flex>
      </CardContent>
      <CardFooter>
        <CardPrice className="text-primarytext font-JosefinSemibold text-sm ">
          ${price}
        </CardPrice>
      </CardFooter>
    </Card>
  );
};

export default ProductGridCard;
