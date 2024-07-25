import React, { FC } from "react";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
  CardFooter,
  CardImage,
  ObjectColors,
  CardPrice,
} from "../ui/card";
import { LuShoppingCart } from "react-icons/lu";
import { Button } from "../ui/button";
import { FiHeart } from "react-icons/fi";
import { PiMagnifyingGlassPlus } from "react-icons/pi";
import Flex from "../ui/flex";

type FeaturedProductCardProps = {
  title: string;
  image: string;
  price: number;
  code: string;
  color: string[];
};

const FeaturedProductCard: FC<FeaturedProductCardProps> = ({
  title,
  price,
  code,
  color,
  image,
}) => {
  return (
    <Card className="w-[29vh] h-[40vh] relative cursor-pointer group overflow-hidden">
      <CardHeader className="h-[65%] bg-[#F6F7FB] ">
        <CardImage src={image} className="p-12" />
        <div className="absolute top-0 left-0 p-2 w-full flex transition-all duration-300 ease-in-out -translate-y-[10vh] group-hover:translate-y-0">
          <Button size="icon" className="rounded-full hover:bg-bgshade">
            <LuShoppingCart className="text-primarytext text-lg" />
          </Button>
          <Button size="icon" className="rounded-full hover:bg-bgshade">
            <FiHeart className="text-primarytext text-lg" />
          </Button>
          <Button size="icon" className="rounded-full hover:bg-bgshade">
            <PiMagnifyingGlassPlus className="text-primarytext text-lg" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-1 items-center">
        <CardTitle className="text-[18px] text-pink ">{title}</CardTitle>
        <Flex direction="row" gap={10}>
          {color.map((code, i) => (
            <ObjectColors key={i} color={code} />
          ))}{" "}
        </Flex>
        <CardDescription className="text-[15px] text-primarytext">
          Code - {code}
        </CardDescription>
      </CardContent>
      <CardFooter>
        <CardPrice className="text-[15px] text-primarytext ">
          ${price}
        </CardPrice>
      </CardFooter>
    </Card>
  );
};

export default FeaturedProductCard;
