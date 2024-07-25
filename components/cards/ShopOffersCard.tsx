import React, { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardImage,
  CardTitle,
} from "../ui/card";
import a from "../../public/svg/free-delivery.svg";

type ShopOffersProps = {
  image: string;
  title: string;
  description: string;
};

const ShopOffersCard: FC<ShopOffersProps> = ({ title, image, description }) => {
  return (
    <Card className="h-[80%] shadow-slate-200 relative cursor-pointer group overflow-hidden gap-10">
      <CardHeader className="h-1/2 p-10 flex flex-col bg-transparent">
        <CardImage
          src={a.src}
          className="w-full h-full mx-auto aspect-square"
        />
        <CardTitle className="text-[25px] text-primarytext text-center">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col h-1/2 gap-y-1 items-center">
        <CardDescription className="text-[17px] text-center text-primarytext">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default ShopOffersCard;
