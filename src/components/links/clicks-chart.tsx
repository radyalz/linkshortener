"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";

const chartConfig = {
  clicks: {
    label: "Clicks",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

type ClicksChartProps = {
  data: {
    day: string;
    clicks: number;
  }[];
};

export function ClicksChart({ data }: ClicksChartProps) {
  return (
    <ChartContainer config={chartConfig} className="h-[260px] w-full">
      <BarChart
        accessibilityLayer
        data={data}
        margin={{
          top: 8,
          right: 8,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid vertical={false} />

        <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} interval={0} minTickGap={0} />

        <YAxis allowDecimals={false} tickLine={false} axisLine={false} />

        <ChartTooltip content={<ChartTooltipContent />} />

        <Bar dataKey="clicks" fill="var(--color-clicks)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
