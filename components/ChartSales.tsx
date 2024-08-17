// ChartSales.tsx
"use client";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart";
import * as React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
} from "recharts";

export const description = "An interactive line chart";

const chartConfig: ChartConfig = {
  views: {
    label: "Total Sales",
  },
  PiScalesDuotone: {
    label: "sales",
    color: "hsl(var(--primary))",
  },
};

export function ChartSales({
  data,
}: {
  data: { date: string; sales: number }[];
}) {
  return (
    <div className="px-2 sm:p-6">
      <ChartContainer
        config={chartConfig}
        className="aspect-auto h-[250px] w-full"
      >
        <LineChart
          accessibilityLayer
          data={data}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            minTickGap={32}
            tickFormatter={(value) => {
              const date = new Date(value);
              return date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              });
            }}
          />
          <CartesianGrid vertical={false} />
          <Tooltip
            content={
              <ChartTooltipContent
                className="w-[150px]"
                nameKey="views"
                labelFormatter={(value) => {
                  return new Date(value).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  });
                }}
              />
            }
          />
          <Legend />
          <Line dataKey="sales" stroke={"var(--primary)"} />
        </LineChart>
      </ChartContainer>
    </div>
  );
}
