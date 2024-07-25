import React, { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardImage,
  CardPrice,
  CardTitle,
} from "../ui/card";
import { Heading } from "../ui/heading";
import Flex from "../ui/flex";
import { LuShoppingCart } from "react-icons/lu";
import { FiHeart } from "react-icons/fi";
import { PiMagnifyingGlass } from "react-icons/pi";
import { Button } from "../ui/button";
import Sale from "../../app/assets/sale.png";
import Image from "next/image";
type LatestProductProps = {
  title: string;
  image: string;
  price: number;
  promoPrice: number;
};

const LatestProductCard: FC<LatestProductProps> = ({
  title,
  image,
  price,
  promoPrice,
}) => {
  return (
    <Card className="w-full h-full shadow-none group cursor-pointer relative overflow-hidden">
      <CardHeader className="h-[90%] relative bg-[#F6F7FB]">
        <CardImage src={image} className="p-12" />
        <Image
          src={Sale}
          alt="sale"
          className="absolute top-0 left-0 transition-all duration-300 ease-in-out scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100"
        />
        <div className="absolute p-2 w-full flex flex-col left-0 bottom-0 transition-all duration-300 ease-in-out -translate-x-[30vh] group-hover:translate-x-0">
          <Button size="icon" className="rounded-full hover:bg-bgshade">
            <LuShoppingCart className="text-primarytext text-lg" />
          </Button>
          <Button size="icon" className="rounded-full hover:bg-bgshade">
            <FiHeart className="text-primarytext text-lg" />
          </Button>
          <Button size="icon" className="rounded-full hover:bg-bgshade">
            <PiMagnifyingGlass className="text-primarytext text-lg" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex w-full p-0 justify-between items-center">
        <CardTitle className="text-xl text-primarytext">{title} </CardTitle>
        <Flex className="gap-x-2">
          <CardPrice className="text-primarytext p-0">${price}</CardPrice>
          <CardPrice className="text-red line-through p-0">
            ${promoPrice}
          </CardPrice>
        </Flex>
      </CardContent>
    </Card>
  );
};

export default LatestProductCard;
