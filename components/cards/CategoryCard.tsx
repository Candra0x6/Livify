import type { Category } from "@prisma/client";
import Link from "next/link";
import type { FC, ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export const CategoryCard: FC<{ data: Category }> = ({ data }): ReactNode => {
  return (
    <Link href={`/products?categoryId=${data.id}`}>
      <Card className="relative flex flex-col justify-between xl:w-[15rem] xl:h-[12rem] lg:w-full lg:h-[12rem] md:w-[10rem] md:h-[11rem] sm:w-[8rem] sm:h-[9rem] h-[7rem] text-center overflow-hidden rounded-lg shadow-lg border hover:shadow-2xl transition-all duration-300 group p-4 bg-white hover:bg-meta ">
        <CardHeader>
          <img
            src={data.image as string | undefined}
            alt="category"
            className="md:w-20 sm:w-[4.5rem] w-[3rem]"
          />
        </CardHeader>
        <CardContent className="space-y-1.5">
          <CardTitle className="capitalize text-primary font-semibold xl:text-2xl lg:text-xl md:text-lg sm:text-[12px] text-[60%] w-full">
            {data.name}
          </CardTitle>
        </CardContent>
      </Card>
    </Link>
  );
};
