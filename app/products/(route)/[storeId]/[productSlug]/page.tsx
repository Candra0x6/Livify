"use client";
import { ProductCard } from "@/components/cards/ProductCard";
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
import { FaStar } from "react-icons/fa6";
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
        <div className="bg-white rounded-lg shadow-sh-card mt-32 w-full">
          <Grid columns={2} className="p-10 " columnGap={30}>
            <Flex direction="column" gap={20}>
              <div className="">
                <img
                  src={data?.images[0]}
                  alt="porudct"
                  className="w-full h-full aspect-square bg-[#F6F7FB] rounded-lg"
                />
              </div>
              <Grid columns={3} rows={1} className="" rowGap={30}>
                {data?.images &&
                  data?.images.length > 0 &&
                  data?.images.map(
                    (item: string, i: React.Key | null | undefined) => (
                      <img
                        src={item as string}
                        key={i}
                        alt="porudct"
                        className="w-full h-full aspect-square bg-[#F6F7FB]  object-cover rounded-lg"
                      />
                    )
                  )}
              </Grid>
            </Flex>
            <Flex direction="column" className="space-y-6 max-h-[500px]">
              <Flex direction="column">
                <Heading className="text-primarytext text-[40px]">
                  {data?.name}
                </Heading>
                <span className="text-textSecondary">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Alias vel assumenda, quibusdam rerum mollitia nobis suscipit
                  ipsa, temporibus ipsum pariatur iste aliquam, officiis dolore
                  aspernatur. Et, temporibus, voluptatibus fuga praesentium
                </span>
                <Text className="font-semibold mt-3 text-[1.7rem] text-primary">
                  ${data.price as unknown as ReactNode}
                </Text>
                <div className="flex text-yellow-400 items-center ">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <span className="text-foreground underline ml-5">
                    2122 Reviews
                  </span>
                </div>
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

              <Flex gap={20} className="pt-5">
                <Button
                  onClick={() => handleOrder(data)}
                  className=" px-14 flex items-center gap-x-1 "
                >
                  <Text className="text-white text-md  ">Buy</Text>
                  <MdOutlineShoppingBag className="text-white text-2xl" />
                </Button>
                <Button className=" px-8 flex items-center gap-x-1">
                  <Text className="text-white text-md  ">Add to Cart</Text>
                  <Image
                    src={CartIcon}
                    alt="cart-icon"
                    className="w-7 aspect-square"
                  />
                </Button>
              </Flex>
            </Flex>
          </Grid>
        </div>
        <Flex direction="column" className="mt-20">
          <Heading className="text-primarytext mb-10">Related Products</Heading>
          <Grid columns={4} className="grid-flow-row gap-7" gap={10}>
            {Array.from({ length: 20 }).map((_, i) => (
              <ProductCard
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
