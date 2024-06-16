"use client";
import React from "react";
import ContainerLayout from "@/components/layout/ContainerLayout";
import Grid from "@/components/ui/grid";
import Flex from "@/components/ui/flex";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import GridIcon from "../../public/icons/grid-view.svg";
import ListIcon from "../../public/icons/list-view.svg";
import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import ProductGridCard from "@/components/cards/ProductGridCard";
import { Checkbox } from "@/components/ui/checkbox";
import ProductListCard from "@/components/cards/ProductListCard";

export default function Product() {
  const [selectValue, setSelectValue] = React.useState("grid-view");

  const colorList = ["#DE9034", "#EC42A2", "#8568FF"];
  return (
    <ContainerLayout>
      <Grid columns={2} rows={1} className="w-full place-content-start my-10">
        <Flex direction="column">
          <Heading className="text-primarytext" size="lg">
            Explore All Poducts
          </Heading>
          <Text className="font-LatoRegular text-subtext2 text-sm">
            About 201 products
          </Text>
        </Flex>
        <Flex className="w-full" justify="flex-end" align="center" gap={30}>
          <form className="max-w-sm flex items-center h-full py-2 w-[180px] gap-x-2">
            <label
              htmlFor="sort"
              className=" text-md font-JosefinRegular text-primarytext"
            >
              Sort
            </label>
            <Select>
              <SelectTrigger className="">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Best Match</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </form>
          <form className="max-w-sm flex items-center h-full py-2 w-[180px] gap-x-2">
            <label
              htmlFor="sort"
              className=" text-md font-JosefinRegular text-primarytext"
            >
              View
            </label>
            <Select onValueChange={(value) => setSelectValue(value)}>
              <SelectTrigger className="">
                <SelectValue placeholder="Card View" />
              </SelectTrigger>
              <SelectContent>
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
      <Flex className="">
        <Flex direction="column" className="max-w-[20%] w-[20%] gap-y-10">
          <Flex direction="column" className="space-y-2">
            <Heading className="text-primarytext mb-5 underline underline-offset-8 text-[22px]">
              Product Brand
            </Heading>
            <Flex gap={10} align="center">
              <Checkbox id="terms1" className="text-white bg-subtext2" />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="terms1"
                  className="text-sm font-LatoRegular text-subtext2 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Accept terms and conditions
                </label>
              </div>
            </Flex>
            <Flex gap={10} align="center">
              <Checkbox id="terms1" className="text-white bg-subtext2" />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="terms1"
                  className="text-sm font-LatoRegular text-subtext2 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Accept terms and conditions
                </label>
              </div>
            </Flex>
          </Flex>
          <Flex direction="column" className="space-y-2">
            <Heading className="text-primarytext mb-5 underline underline-offset-8 text-[22px]">
              Discount Over
            </Heading>
            <Flex gap={10} align="center">
              <Checkbox id="terms1" className="text-white bg-subtext2" />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="terms1"
                  className="text-sm font-LatoRegular text-subtext2 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Accept terms and conditions
                </label>
              </div>
            </Flex>
            <Flex gap={10} align="center">
              <Checkbox id="terms1" className="text-white bg-subtext2" />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="terms1"
                  className="text-sm font-LatoRegular text-subtext2 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Accept terms and conditions
                </label>
              </div>
            </Flex>
          </Flex>
          <Flex direction="column" className="space-y-2">
            <Heading className="text-primarytext mb-5 underline underline-offset-8 text-[22px]">
              Rating Item
            </Heading>
            <Flex gap={10} align="center">
              <Checkbox id="terms1" className="text-white bg-subtext2" />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="terms1"
                  className="text-sm font-LatoRegular text-subtext2 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Accept terms and conditions
                </label>
              </div>
            </Flex>
            <Flex gap={10} align="center">
              <Checkbox id="terms1" className="text-white bg-subtext2" />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="terms1"
                  className="text-sm font-LatoRegular text-subtext2 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Accept terms and conditions
                </label>
              </div>
            </Flex>
          </Flex>
          <Flex direction="column" className="space-y-2">
            <Heading className="text-primarytext mb-5 underline underline-offset-8 text-[22px]">
              Category
            </Heading>
            <Flex gap={10} align="center">
              <Checkbox id="terms1" className="text-white bg-subtext2" />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="terms1"
                  className="text-sm font-LatoRegular text-subtext2 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Accept terms and conditions
                </label>
              </div>
            </Flex>
            <Flex gap={10} align="center">
              <Checkbox id="terms1" className="text-white bg-subtext2" />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="terms1"
                  className="text-sm font-LatoRegular text-subtext2 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Accept terms and conditions
                </label>
              </div>
            </Flex>
          </Flex>
        </Flex>
        <Grid
          columns={selectValue === "grid-view" ? 5 : 1}
          gap={15}
          className="grid-flow-row w-[80%]"
        >
          {Array.from({ length: 12 }).map((_, index) => {
            const Comp =
              selectValue === "grid-view" ? ProductGridCard : ProductListCard;
            return (
              <Comp
                key={index}
                name="Vitae Supandes"
                image="https://pngimg.com/uploads/chair/chair_PNG6862.png"
                price={30.212}
                color={colorList}
                description="Lorem ipsum dolor sit amet, consectetur adip non proident et non proident et et et et et et et et et et et et et et et et"
              />
            );
          })}
        </Grid>
      </Flex>
    </ContainerLayout>
  );
}
