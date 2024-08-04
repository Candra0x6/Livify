import SectionHeader from "@/components/SectionHeader";
import { DashboardDetailCard } from "@/components/cards/DashboardDetailCard";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { User } from "lucide-react";
import Image from "next/image";
import TOrderIcon from "../../../../../public/icons/TOrderIcon.svg";
import TPendingIcon from "../../../../../public/icons/TPendingIcon.svg";
import TSalesIcon from "../../../../../public/icons/TSalesIcon.svg";
import TUSerIcon from "../../../../../public/icons/TUserIcon.svg";

const MetricCardData: MetricDataType[] = [
  {
    id: 0,
    title: "Total User",
    Icon: TUSerIcon,
    alt: "total-user-icon",
    value: 20,
  },
  {
    id: 1,
    title: "Total Order",
    Icon: TOrderIcon,
    alt: "total-order-icon",
    value: 20,
  },
  {
    id: 2,
    title: "Total Sales",
    Icon: TSalesIcon,
    alt: "total-sales-icon",
    value: 20,
  },
  {
    id: 3,
    title: "Total Pending",
    Icon: TPendingIcon,
    alt: "total-pending-icon",
    value: 20,
  },
];

export interface MetricDataType {
  id: number;
  title: string;
  Icon: string; // Assuming the Icon is a functional component
  alt: string;
  value: number;
}
export default async function Dashboard() {
  return (
    <div className="">
      <SectionHeader title="Dashboard" description="Show up your store stats" />
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full xl:gap-x-10 md:gap-5 xl:gap-y-0 gap-y-5 mt-2">
        {MetricCardData.map((item, i) => (
          <DashboardDetailCard
            key={item.id}
            id={item.id}
            Icon={item.Icon}
            alt={item.alt}
            title={item.title}
            value={item.value}
          />
        ))}
      </div>
      <div className="mt-10">
        <Card className="bg-white p-4 rounded-lg space-y-5 w-full">
          <CardHeader className="flex items-center justify-between w-full">
            <CardTitle className="font-medium text-2xl">Sales Detail</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="text-4xl font-bold">chart</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
