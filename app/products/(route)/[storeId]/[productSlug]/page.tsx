"use client";
import ProductGridCard from "@/components/cards/ProductGridCard";
import DetailsMenu from "@/components/menus/DetailsMenu";
import { Button } from "@/components/ui/button";
import Flex from "@/components/ui/flex";
import Grid from "@/components/ui/grid";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import type { Product } from "@prisma/client";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import type React from "react";
import { type ReactNode, useEffect, useState } from "react";
import { MdOutlineShoppingBag } from "react-icons/md";
import CartIcon from "../../../../../public/icons/cart.svg";

export interface productBody {
  productId: string;
  price: number;
  quantity: number;
  storeId: string;
}

export async function createOrder(
  orderItems: productBody[],
  orderAddress: string
) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/order/new`,
    {
      method: "POST",
      body: JSON.stringify({ orderItems, orderAddress }),
    }
  );

  const data = res.json();
  return data;
}

export default function ProductDetails() {
  const colorList = ["#DE9034", "#EC42A2", "#8568FF"];

  const params = useSearchParams();
  const productId = params.get("productId");
  const [data, setData] = useState<Product>();
  console.log(data);
  // orderAddress & status & categoryId & price & quantity & productId &
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const getProductDetails = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/product/${productId}`,
        {
          method: "GET",
        }
      );
      const datas = await res.json();
      setData(datas.product);
    };

    getProductDetails();
  }, []);

  const handleOrder = async () => {
    try {
      const prodcut = [data];
      const productBodies: productBody[] = prodcut?.map((item) => ({
        productId: item.id,
        price: item.price as unknown as number,
        quantity: 1,
        storeId: item.storeId,
      }));

      await createOrder(productBodies, "SOLO");

      alert("Order placed successfully!");
    } catch (error) {
      console.error("Checkout failed:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    data && (
      <div className="container mx-auto">
        <Grid columns={2} className="mt-20" columnGap={30}>
          <Flex gap={20}>
            <Grid rows={3} columns={1} className="w-[22%]" rowGap={30}>
              {data?.images &&
                data?.images.length > 0 &&
                data?.images.map(
                  (item: string, i: React.Key | null | undefined) => (
                    <img
                      src={item as string}
                      key={i}
                      alt="porudct"
                      className="w-full h-full aspect-square bg-[#F6F7FB]  object-cover"
                    />
                  )
                )}
            </Grid>
            <div className=" flex-1">
              <img
                src={data?.images[0]}
                alt="porudct"
                className="w-full h-full aspect-square bg-[#F6F7FB] "
              />
            </div>
          </Flex>
          <Flex direction="column" className="space-y-6">
            <Flex direction="column">
              <Heading className="text-primarytext text-[40px]">
                {data?.name}
              </Heading>
              <Text className="font-JosefinRegular text-2xl text-primarytext">
                ${data.price as unknown as ReactNode}
              </Text>
            </Flex>
            <Flex direction="column">
              <Text className="font-JosefinRegular text-xl text-primarytext">
                Choose Color
              </Text>
              <Flex gap={10}>
                <div className="bg-red aspect-square w-7 rounded-full" />
                <div className="bg-orange-600 aspect-square w-7 rounded-full" />
                <div className="bg-lime-600 aspect-square w-7 rounded-full" />
              </Flex>
            </Flex>
            <div className="">
              <DetailsMenu />
            </div>
            <Flex gap={20} className="pt-5">
              <Button className="bg-pink px-8 flex items-center gap-x-1">
                <Text className="text-white font-JosefinSemibold text-md  ">
                  Add to Cart
                </Text>
                <Image
                  src={CartIcon}
                  alt="cart-icon"
                  className="w-7 aspect-square"
                />
              </Button>
              <Button
                onClick={() => handleOrder(data)}
                className="bg-pink px-14 flex items-center gap-x-1 "
              >
                <Text className="text-white font-JosefinSemibold text-md  ">
                  Buy
                </Text>
                <MdOutlineShoppingBag className="text-white text-2xl" />
              </Button>
            </Flex>
          </Flex>
        </Grid>
        <Flex className="mt-20">
          <DetailsMenu />
        </Flex>
        <Flex direction="column" className="mt-20">
          <Heading className="text-primarytext mb-10">Related Products</Heading>
          <Grid columns={6} className="grid-flow-row" gap={15}>
            {Array.from({ length: 20 }).map((_, i) => (
              <ProductGridCard
                key={i}
                name="Vitae Supandes"
                image="https://pngimg.com/uploads/chair/chair_PNG6862.png"
                price={30.212}
                color={colorList}
                description="Lorem ipsum dolor sit amet, consectetur adip non proident et non proident et et et et et et et et et et et et et et et et"
                productId={""}
                slug={""}
                storeId={""}
              />
            ))}
          </Grid>
        </Flex>
      </div>
    )
  );
}
