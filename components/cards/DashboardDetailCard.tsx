import type { MetricDataType } from "@/app/(dashboard)/seller/dashboard/page";
import { ArrowUpIcon } from "lucide-react";
import Image from "next/image";
import React, { type FC } from "react";
import { MdOutlineShowChart } from "react-icons/md";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

// biome-ignore lint/complexity/noBannedTypes: <explanation>
type props = {};
export const DashboardDetailCard: FC<MetricDataType> = ({
  title,
  Icon,
  alt,
  value,
  id,
}) => {
  return (
    <Card className="bg-white p-4 rounded-lg w-full space-y-5">
      <CardHeader className="flex items-center justify-between w-full">
        <CardTitle className="font-medium text-2xl">{title}</CardTitle>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Image src={Icon} alt={alt} />
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="text-4xl font-bold">{value}</div>
      </CardContent>
      <CardFooter className="text-green-500 space-x-2">
        <MdOutlineShowChart />
        <span>8%</span>
        <span className="text-foreground">Up from yesterday</span>
      </CardFooter>
    </Card>
  );
};
