"use client";
import SectionHeader from "@/components/SectionHeader";
import { ProductCard } from "@/components/cards/ProductCard";
import ProductListCard from "@/components/cards/ProductListCard";
import ContainerLayout from "@/components/layout/ContainerLayout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Flex from "@/components/ui/flex";
import Grid from "@/components/ui/grid";
import { Heading } from "@/components/ui/heading";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Text } from "@/components/ui/text";
import type { Product, Wishlist } from "@prisma/client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import GridIcon from "../../public/icons/grid-view.svg";
import ListIcon from "../../public/icons/list-view.svg";

import { FilterElement, MobileFilter } from "@/components/Filter";
import { getSession } from "@/lib/auth/auth";
import type { deleteWishlistBody } from "../api/v1/user/[userId]/wishlist/[wishlistId]/delete/route";

interface dataType extends Wishlist {
  product: Product;
}
export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<dataType[]>([]);
  const [selectValue, setSelectValue] = useState("grid-view");

  useEffect(() => {
    const getWishlist = async () => {
      const session = await getSession();
      const userId = session?.userId;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/user/${userId}/wishlist`,
        {
          method: "GET",
        }
      );
      const data = await res.json();
      setWishlist(data.wishlists);
    };
    getWishlist();
  }, []);

  const removeWishlist = async ({
    productId,
    wishlistId,
  }: deleteWishlistBody) => {
    const session = await getSession();
    const userId = session?.userId;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/user/${userId}/wishlist/${wishlistId}/delete`,
      {
        method: "DELETE",
        body: JSON.stringify({ productId, wishlistId }),
      }
    );
    const data = await res.json();
    console.log(data);
  };
  return (
    <ContainerLayout>
      <Grid className="w-full  place-content-start sm:my-10 sm:mt-32 mt-36 md:grid-cols-2 md:grid-rows-1 grid-rows-2 grid-cols-1">
        <Flex direction="column">
          <SectionHeader
            title="Explore All Products"
            description="About 201 Product"
          />
        </Flex>
        <div className="w-full md:gap-10 flex gap-x-2">
          <div className="md:hidden flex items-center">
            <MobileFilter />
          </div>
          <form className="max-w-sm flex items-center h-full py-2 md:w-[180px] w-full gap-x-2 ">
            <Select>
              <SelectTrigger className="bg-white rounded-xl shadow-sh-card">
                <SelectValue placeholder="List" />
              </SelectTrigger>
              <SelectContent className="bg-white rounded-xl shadow-sh-card">
                <SelectItem value="light">Esc</SelectItem>
                <SelectItem value="dark">Desc</SelectItem>
              </SelectContent>
            </Select>
          </form>
          <form className="max-w-sm flex items-center h-full py-2 md:w-[180px] w-full gap-x-2">
            <Select onValueChange={(value) => setSelectValue(value)}>
              <SelectTrigger className="bg-white rounded-xl shadow-sh-card">
                <SelectValue placeholder="View" />
              </SelectTrigger>
              <SelectContent className="bg-white rounded-xl shadow-sh-card">
                <SelectItem value="grid-view">
                  <Text className="text-sm flex gap-x-2">
                    Grid View
                    <Image src={GridIcon} alt="grid-view" className="w-4" />
                  </Text>
                </SelectItem>
                <SelectItem value="list-view">
                  <h1 className="text-sm flex gap-x-3 font-LatoRegular">
                    List View
                    <Image src={ListIcon} alt="grid-view" className="w-4" />
                  </h1>
                </SelectItem>
              </SelectContent>
            </Select>
          </form>
        </div>
      </Grid>
      <Flex className="gap-x-10">
        <Flex
          direction="column"
          className="md:max-w-[20%] md:w-[20%] md:flex-col md:flex hidden gap-y-10"
        >
          <FilterElement />
        </Flex>
        <Grid
          className={`grid-flow-row md:w-[80%] w-full ${
            selectValue === "grid-view"
              ? "xl:grid-cols-4 xl:gap-15 sm:grid-cols-3 md:gap-3 grid-cols-2 md:mt-0 xl:gap-6 gap-2"
              : "grid-cols-1 lg:gap-y-5 gap-y-2"
          }`}
        >
          {" "}
          {wishlist &&
            wishlist.length > 0 &&
            wishlist.map((item, index) => {
              const Comp =
                selectValue === "grid-view" ? ProductCard : ProductListCard;
              return (
                <Comp
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  key={index}
                  name={item.product.name}
                  image={item.product.images[0]}
                  price={item.product.price as unknown as number}
                  color={[""]}
                  description={item.product.description as string}
                  productId={item.product.id}
                  slug={item.product.slug}
                  storeId={item.storeId}
                />
              );
            })}
        </Grid>
      </Flex>
    </ContainerLayout>
  );
}
