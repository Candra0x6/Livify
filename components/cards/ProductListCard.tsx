import type { FC } from "react";
import { FaStar } from "react-icons/fa6";
import { FiHeart } from "react-icons/fi";
import { LuShoppingCart } from "react-icons/lu";
import { PiMagnifyingGlass } from "react-icons/pi";
import { Button } from "../ui/button";
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
import Flex from "../ui/flex";
import { Heading } from "../ui/heading";
import type { ProductDetailsProps } from "./ProductCard";

const ProductListCard: FC<ProductDetailsProps> = ({
  name,
  image,
  color,
  price,
  description,
}) => {
  return (
    <div className="group/card border hover:shadow-2xl duration-300 transition-all w-full h-[20vh] group cursor-pointer relative overflow-hidden flex gap-x-10 bg-white hover:bg-accent shadow-sh-card rounded-xl p-4">
      <div className="relative bg-[#F6F7FB] w-[15rem] aspect-square">
        <img
          src={image}
          alt="l"
          className="w-full h-full aspect-square rounded-xl"
        />
      </div>
      <div className=" items-center space-y-2 w-full">
        <Flex justify="space-between" align="center">
          <div className="">
            <h1 className="text-2xl font-semibold">{name} </h1>
            <span>Chair</span>
          </div>

          <Flex gap={4}>
            {color.map((hex, i) => (
              <ObjectColors key={i} color={hex} className="" />
            ))}
          </Flex>
        </Flex>
        <div className="font-LatoRegular text-subtext2">{description}</div>
        <Flex className="gap-x-2">
          <div className="flex items-center gap-x-1">
            <FaStar size="20px" color="#f8ed24" />
            <span>4.5</span>
          </div>
        </Flex>
        <div className="w-full flex justify-between">
          <span className="text-primary font-bold text-xl">$36.21</span>
          <div className="flex gap-x-2">
            <Button size="icon" variant="secondary" className="rounded-full">
              <LuShoppingCart className="text-primarytext text-2xl" />
            </Button>
            <Button size="icon" variant="secondary" className="rounded-full h">
              <FiHeart className=" text-lg" />
            </Button>
            <Button size="icon" variant="secondary" className="rounded-full ">
              <PiMagnifyingGlass className="text-primarytext text-lg" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListCard;
