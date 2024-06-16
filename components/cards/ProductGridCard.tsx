import React, { FC } from "react";
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
import { Heading } from "../ui/heading";
import Flex from "../ui/flex";
import { LuShoppingCart } from "react-icons/lu";
import { FiHeart } from "react-icons/fi";
import { PiMagnifyingGlass } from "react-icons/pi";
import { Button } from "../ui/button";
export type ProductDetailsProps = {
  name: string;
  color: string[];
  price: number;
  image: string;
  description?: string;
};

const ProductGridCard: FC<ProductDetailsProps> = ({
  name,
  color,
  price,
  image,
}) => {
  return (
    <Card className="w-full h-full shadow-none group cursor-pointer relative overflow-hidden gap-y-3 flex flex-col">
      <CardHeader className="  relative bg-[#F6F7FB] group-hover:bg-[#e4e5e9] transition-all duration-300">
        <CardImage src={image} className="p-12" />
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
