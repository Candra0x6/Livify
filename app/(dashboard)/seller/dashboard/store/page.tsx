// Dashboard.tsx
"use client";

import { ChartSales } from "@/components/ChartSales";
import SectionHeader from "@/components/SectionHeader";
import { DashboardDetailCard } from "@/components/cards/DashboardDetailCard";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getSession } from "@/lib/auth/auth";
import { fetchStoreOrders } from "@/services/api/orderApi";
import { fetchStoreProducts } from "@/services/api/productsApi";
import * as React from "react";
import { useEffect, useState } from "react";
import TOrderIcon from "../../../../../public/icons/TOrderIcon.svg";
import TPendingIcon from "../../../../../public/icons/TPendingIcon.svg";
import TSalesIcon from "../../../../../public/icons/TSalesIcon.svg";
import TUSerIcon from "../../../../../public/icons/TUserIcon.svg";
import OrderDashboardSkeletonCard from "@/components/skeletons/OrderDashboardSkeletonCard";

export interface MetricDataType {
  id: number;
  title: string;
  Icon: string;
  alt: string;
  value: number | undefined;
}

export default function Dashboard() {
  const [metricData, setMetricData] = useState<MetricDataType[]>([]);
  const [chartData, setChartData] = useState([
    {
      date: new Date().toISOString().slice(0, 10),
      sales: 0,
    },
  ]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const session = await getSession();
        const storeId = session?.storeId as string;
        const pendingPromise = await fetchStoreOrders({
          storeId,
          status: "PENDING",
        });
        const salesPromise = await fetchStoreOrders({
          storeId,
          status: "COMPLETED",
        });
        const orderPromise = await fetchStoreOrders({ storeId });
        const productsPromise = await fetchStoreProducts(storeId);

        const [totalPending, totalSales, totalOrders, totalProducts] =
          await Promise.all([
            pendingPromise,
            salesPromise,
            orderPromise,
            productsPromise,
          ]);
        setChartData((prevData) => [
          ...prevData,
          {
            date: new Date().toISOString().slice(0, 10),
            sales: totalSales?.store?.total as number,
          },
        ]);

        setMetricData([
          {
            id: 0,
            title: "Total Product",
            Icon: TUSerIcon,
            alt: "total-user-icon",
            value: totalProducts?.pagination?.total,
          },
          {
            id: 1,
            title: "Total Order",
            Icon: TOrderIcon,
            alt: "total-order-icon",
            value: totalOrders?.store?.total,
          },
          {
            id: 2,
            title: "Total Sales",
            Icon: TSalesIcon,
            alt: "total-sales-icon",
            value: totalSales?.store?.total,
          },
          {
            id: 3,
            title: "Total Pending",
            Icon: TPendingIcon,
            alt: "total-pending-icon",
            value: totalPending?.store?.total,
          },
        ]);
      } catch (err) {
        setLoading(true);
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="">
      <SectionHeader title="Dashboard" description="Show up your store stats" />
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full xl:gap-x-10 md:gap-5 xl:gap-y-0 gap-y-5 mt-2">
        {loading ? (
          <OrderDashboardSkeletonCard />
        ) : (
          metricData.map((item, i) => (
            <DashboardDetailCard
              key={item.id}
              id={item.id}
              Icon={item.Icon}
              alt={item.alt}
              title={item.title}
              value={item.value}
            />
          ))
        )}
      </div>
      {/* Pending <div className="mt-10">
        <Card className="bg-white p-4 rounded-lg space-y-5 w-full">
          <CardHeader className="flex items-center justify-between w-full">
            <CardTitle className="font-medium text-2xl">Sales Detail</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="text-4xl font-bold text-center">SOON</div>
          </CardContent>
        </Card>
      </div> */}
    </div>
  );
}
