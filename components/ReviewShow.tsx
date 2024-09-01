import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Marquee from "@/components/magicui/marquee";
import { cn } from "@/lib/utils";
import type { StaticImageData } from "next/image";
import Image from "next/image";
import Furniture1 from "../public/images/furniture1.jpg";
import Furniture2 from "../public/images/furniture2.jpg";
import Furniture3 from "../public/images/furniture3.jpg";
import Furniture4 from "../public/images/furniture4.jpg";
import Furniture5 from "../public/images/furniture5.jpg";
import Furniture6 from "../public/images/furniture6.jpg";

const reviews = [
  {
    name: "furniture1",
    img: Furniture1,
  },
  {
    name: "furniture2",
    img: Furniture2,
  },
  {
    name: "furniture3",
    img: Furniture3,
  },
  {
    name: "furniture4",
    img: Furniture4,
  },
  {
    name: "furniture5",
    img: Furniture5,
  },
  {
    name: "furniture6",
    img: Furniture6,
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({ img, name }: { img: StaticImageData; name: string }) => {
  return (
    <figure
      className={cn(
        "relative xl:h-[19rem] lg:h-[17rem] md:h-[15rem] sm:h-[20rem] h-[15.5rem] w-full cursor-pointer overflow-hidden rounded-xl border",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center w-full h-full shadow-sh-card p-2">
        <Image className="w-full h-full rounded-xl " alt={name} src={img} />
      </div>
    </figure>
  );
};

export function MarqueeVertical() {
  return (
    <div className="relative flex h-[90vh] w-full flex-row justify-center overflow-hidden bg-background rounded-lg  ">
      <Marquee pauseOnHover vertical className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.name} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover vertical className="[--duration:20s] ">
        {secondRow.map((review) => (
          <ReviewCard key={review.name} {...review} />
        ))}
      </Marquee>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-background dark:from-background" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background dark:from-background" />
    </div>
  );
}
