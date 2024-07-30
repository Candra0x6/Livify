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
      <Grid
        columns={2}
        rows={1}
        className="w-full place-content-start my-10 mt-36"
      >
        <Flex direction="column">
          <SectionHeader
            title="All Wishlist"
            description="About 201 Product Wishlisted"
          />
        </Flex>
        <Flex className="w-full" justify="flex-end" align="center" gap={30}>
          <form className="max-w-sm flex items-center h-full py-2 w-[180px] gap-x-2">
            <Select>
              <SelectTrigger className="bg-white rounded-xl shadow-sh-card">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent className="bg-white rounded-xl shadow-sh-card">
                <SelectItem value="light">Best Match</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </form>
          <form className="max-w-sm flex items-center h-full py-2 w-[180px] gap-x-2">
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
        </Flex>
      </Grid>
      <Flex className="gap-x-10">
        <Flex direction="column" className="max-w-[20%] w-[20%] gap-y-10">
          <Accordion type="single" className="space-y-5" collapsible>
            <AccordionItem
              value="category"
              className="bg-white shadow-sh-card rounded-xl px-4"
            >
              <AccordionTrigger className="text-lg font-medium">
                Category
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-2">
                  <Label className="flex items-center gap-2 font-normal">
                    <Checkbox />
                    Clothing
                  </Label>
                  <Label className="flex items-center gap-2 font-normal">
                    <Checkbox />
                    Accessories
                  </Label>
                  <Label className="flex items-center gap-2 font-normal">
                    <Checkbox />
                    Electronics
                  </Label>
                  <Label className="flex items-center gap-2 font-normal">
                    <Checkbox />
                    Home & Garden
                  </Label>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              value="price"
              className="bg-white shadow-sh-card rounded-xl px-4"
            >
              <AccordionTrigger className="text-lg font-medium">
                Price
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <span>$0</span>
                    <span>$100</span>
                  </div>
                  <Slider min={0} max={100} step={10} defaultValue={[0, 100]} />
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              value="rating"
              className="bg-white shadow-sh-card rounded-xl px-4"
            >
              <AccordionTrigger className="text-lg font-medium">
                Rating
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-2">
                  <Label className="flex items-center gap-2 font-normal">
                    <Checkbox />4 stars and above
                  </Label>
                  <Label className="flex items-center gap-2 font-normal">
                    <Checkbox />3 stars and above
                  </Label>
                  <Label className="flex items-center gap-2 font-normal">
                    <Checkbox />2 stars and above
                  </Label>
                  <Label className="flex items-center gap-2 font-normal">
                    <Checkbox />1 star and above
                  </Label>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Flex>
        <Grid
          columns={selectValue === "grid-view" ? 4 : 1}
          gap={15}
          className="grid-flow-row w-[80%]"
        >
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
