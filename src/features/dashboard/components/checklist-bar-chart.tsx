"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ChecklistBarChartProps {
  data: { name: string; total: number }[];
}

export function ChecklistBarChart({ data }: ChecklistBarChartProps) {
  return (
    <Card className="flex flex-1 flex-col">
      <CardHeader>
        <CardTitle className="font-medium text-muted-foreground text-sm">
          Checklist - A fazer
        </CardTitle>
        <CardDescription>Itens por tipo</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-end pb-6">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data} barSize={40}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              className="stroke-border"
            />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              className="fill-muted-foreground"
            />
            <YAxis
              allowDecimals={false}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12 }}
              className="fill-muted-foreground"
            />
            <Tooltip
              cursor={{ className: "fill-muted/40" }}
              contentStyle={{
                borderRadius: "0.5rem",
                fontSize: "0.75rem",
              }}
            />
            <Bar
              dataKey="total"
              radius={[4, 4, 0, 0]}
              className="fill-primary"
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
