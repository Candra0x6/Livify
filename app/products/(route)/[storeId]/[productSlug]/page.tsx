import ProductGridCard from "@/components/cards/ProductGridCard";
import ContainerLayout from "@/components/layout/ContainerLayout";
import DetailsMenu from "@/components/menus/DetailsMenu";
import { Button } from "@/components/ui/button";
import Flex from "@/components/ui/flex";
import Grid from "@/components/ui/grid";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import React from "react";
import { MdOutlineShoppingBag } from "react-icons/md";
import CartIcon from "../../../../../public/icons/cart.svg";
import Image from "next/image";
export default function ProductDetails() {
  const colorList = ["#DE9034", "#EC42A2", "#8568FF"];

  return (
    <ContainerLayout>
      <Grid columns={2} className="mt-20" columnGap={30}>
        <Flex gap={30}>
          <Grid rows={3} columns={1} className="w-[22%]" rowGap={30}>
            <img
              src="https://pngimg.com/uploads/chair/chair_PNG6862.png"
              alt="porudct"
              className="w-full h-full aspect-square bg-[#F6F7FB] p-10"
            />
            <img
              src="https://pngimg.com/uploads/chair/chair_PNG6862.png"
              alt="porudct"
              className="w-full h-full aspect-square bg-[#F6F7FB] p-10"
            />
            <img
              src="https://pngimg.com/uploads/chair/chair_PNG6862.png"
              alt="porudct"
              className="w-full h-full aspect-square bg-[#F6F7FB] p-10"
            />
          </Grid>
          <div className=" flex-1">
            <img
              src="https://pngimg.com/uploads/chair/chair_PNG6862.png"
              alt="porudct"
              className="w-full h-full aspect-square bg-[#F6F7FB] p-20"
            />
          </div>
        </Flex>
        <Flex direction="column" className="space-y-6">
          <Flex direction="column">
            <Heading className="text-primarytext text-[40px]">
              Eames Chair Defalutie
            </Heading>
            <Text className="font-JosefinRegular text-2xl text-primarytext">
              $32.00
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
            <Button className="bg-pink px-14 flex items-center gap-x-1 ">
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
            />
          ))}
        </Grid>
      </Flex>
    </ContainerLayout>
  );
}
