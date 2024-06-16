import React, { FC, ReactNode } from "react";
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

type TrendingProductCardProps = {
  children?: ReactNode;
};

type CodeProps = {
  children: ReactNode;
};

type TitleProps = {
  children: ReactNode;
};

type PriceProps = {
  children: ReactNode;
};

type ImageProps = {
  src: string;
};

type PromoPriceProps = {
  children: ReactNode;
};

const TrendingProductCard: FC<TrendingProductCardProps> & {
  Code: FC<CodeProps>;
  Title: FC<TitleProps>;
  Price: FC<PriceProps>;
  PromoPrice: FC<PromoPriceProps>;
  Image: FC<ImageProps>;
} = ({ children }) => {
  return (
    <Card className="w-full h-full relative cursor-pointer group overflow-hidden p-4 ">
      {children}
    </Card>
  );
};

const Code: FC<CodeProps> = ({ children }) => (
  <CardDescription className="text-[15px] text-primarytext">
    Code - {children}
  </CardDescription>
);

const Title: FC<TitleProps> = ({ children }) => (
  <CardTitle className="text-[22px] text-primarytext">{children}</CardTitle>
);

const Price: FC<PriceProps> = ({ children }) => (
  <CardPrice className="text-[15px] text-primarytext">${children}</CardPrice>
);

const PromoPrice: FC<PromoPriceProps> = ({ children }) => (
  <CardPrice className="text-[15px] text-red line-through p-0">
    ${children}
  </CardPrice>
);

const Image: FC<ImageProps> = ({ src }) => (
  <CardHeader className="h-[65%] bg-[#F7F7F7]">
    <CardImage src={src} className=" w-full h-full p-12 " />
    <div className="absolute top-3 left-3  p-2 w-full flex transition-all duration-300 ease-in-out -translate-y-[10vh] group-hover:translate-y-0">
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
);

TrendingProductCard.Code = Code;
TrendingProductCard.Title = Title;
TrendingProductCard.Price = Price;
TrendingProductCard.PromoPrice = PromoPrice;
TrendingProductCard.Image = Image;

export default TrendingProductCard;
