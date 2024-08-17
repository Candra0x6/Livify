import type { Category } from "@prisma/client";
import type { FC, ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export const CategorySkeletonCard: FC = (): ReactNode => {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <Card
          key={i}
          className="relative flex flex-col justify-between xl:w-[15rem] xl:h-[12rem] lg:w-full lg:h-[12rem] md:w-[10rem] md:h-[11rem] sm:w-[8rem] sm:h-[9rem] h-[7rem] text-center overflow-hidden rounded-lg shadow-lg group p-4"
        >
          <CardHeader className="w-full h-full">
            <Skeleton className="w-full h-full" />
          </CardHeader>
          <CardContent className="space-y-1.5 w-full">
            <Skeleton className="w-full h-4" />
          </CardContent>
        </Card>
      ))}
    </>
  );
};
