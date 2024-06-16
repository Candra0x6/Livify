import { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
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
import { ProductDetailsProps } from "./ProductGridCard";

const ProductListCard: FC<ProductDetailsProps> = ({
  name,
  image,
  color,
  price,
  description,
}) => {
  return (
    <Card className="w-full h-[20vh] shadow-none group cursor-pointer relative overflow-hidden flex gap-x-10">
      <CardHeader className="w-[27%] relative bg-[#F6F7FB]">
        <CardImage src={image} className="w-full h-full p-20" />
      </CardHeader>
      <CardContent className=" p-0 justify-between items-center space-y-2">
        <Flex justify="space-between" align="center">
          <CardTitle className="text-2xl text-primarytext font-JosefinBold">
            {name}{" "}
          </CardTitle>
          <Flex gap={4}>
            {color.map((hex, i) => (
              <ObjectColors key={i} color={hex} className="" />
            ))}
          </Flex>
        </Flex>
        <Flex className="gap-x-2">
          <CardPrice className="text-primarytext p-0 text-sm font-JosefinSemibold">
            ${price}
          </CardPrice>
        </Flex>
        <CardDescription className="font-LatoRegular text-subtext2">
          {description}
        </CardDescription>
        <div className="w-full flex">
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
      </CardContent>
    </Card>
  );
};

export default ProductListCard;
