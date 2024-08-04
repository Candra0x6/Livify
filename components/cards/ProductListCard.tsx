import type { FC } from "react";
import { FaStar } from "react-icons/fa6";
import { FiHeart } from "react-icons/fi";
import { LuShoppingCart } from "react-icons/lu";
import { PiMagnifyingGlass } from "react-icons/pi";
import { Button } from "../ui/button";
import { ObjectColors } from "../ui/card";
import Flex from "../ui/flex";
import type { ProductDetailsProps } from "./ProductCard";

const ProductListCard: FC<ProductDetailsProps> = ({
  name,
  image,
  color,
  price,
  description,
}) => {
  return (
    <div className="group/card border duration-300 transition-all sm:w-full sm:h-full h-[150px] group cursor-pointer relative overflow-hidden flex sm:gap-x-10 gap-x-5 bg-white shadow-sh-card rounded-xl sm:p-4 p-3">
      <div className="relative bg-[#F6F7FB] md:w-36 md:h-36 w-[7.8rem] h-[7.8rem]  aspect-square">
        <img
          fill
          src={image}
          alt="l"
          className="w-full h-full aspect-square rounded-xl"
        />
      </div>
      <div className=" sm:space-y-2 space-y-7 w-full">
        <div className="sm:mb-5">
          <Flex justify="space-between" align="center">
            <div className="w-full">
              <div className="flex w-full justify-between">
                <h1 className="sm:text-2xl text-lg font-semibold">{name} </h1>
              </div>
              <span className="sm:text-base text-sm">Chair</span>
            </div>
          </Flex>
          <Flex className="gap-x-2">
            <div className="flex items-center gap-x-1">
              <FaStar color="#f8ed24" className="sm:w-[20px] w-[15px]" />
              <span className="text-sm">4.5</span>
            </div>
          </Flex>
        </div>
        <div className="w-full flex justify-between ">
          <span className="text-primary font-bold sm:text-xl text-md items-end flex">
            $36.21
          </span>
          <div className="flex gap-x-2 items-center">
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full lg:w-10 lg:h-10  w-7 h-7"
            >
              <LuShoppingCart className="text-primarytext lg:text-2xl" />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full lg:w-10 lg:h-10 w-7 h-7"
            >
              <FiHeart className=" lg:text-lg" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListCard;
