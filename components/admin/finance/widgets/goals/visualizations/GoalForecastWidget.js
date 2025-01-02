"use client";

import { Card } from "@/components/ui/card";
import { GoalsHeader } from "../GoalsHeader";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formatCurrency } from "../../../utils/formatters";
import { WIDGET_STYLES } from "@/lib/constants/widget-styles";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background/95 backdrop-blur-sm border rounded-lg shadow-lg p-4">
        <p className="font-medium mb-2">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-muted-foreground">{entry.name}:</span>
            <span className="font-medium">{formatCurrency(entry.value)}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export const GoalForecastWidget = ({
  title = "Goal Forecast",
  description = "Projected goal completion timeline",
}) => {
  const forecastData = [
    { month: "Jan", optimistic: 100000, expected: 95000, pessimistic: 90000 },
    { month: "Feb", optimistic: 210000, expected: 200000, pessimistic: 185000 },
    { month: "Mar", optimistic: 330000, expected: 310000, pessimistic: 290000 },
    { month: "Apr", optimistic: 460000, expected: 430000, pessimistic: 400000 },
    { month: "May", optimistic: 600000, expected: 560000, pessimistic: 520000 },
    { month: "Jun", optimistic: 750000, expected: 700000, pessimistic: 650000 },
  ];

  return (
    <Card className="h-full flex flex-col shadow-lg">
      <GoalsHeader title={title} description={description} />
      <div
        className="flex-1 p-4"
        style={{
          minHeight: WIDGET_STYLES.MIN_HEIGHT,
          maxHeight: WIDGET_STYLES.MAX_HEIGHT,
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={forecastData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12 }}
              className="text-muted-foreground"
            />
            <YAxis
              tick={{ fontSize: 12 }}
              className="text-muted-foreground"
              tickFormatter={formatCurrency}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="optimistic"
              stackId="1"
              stroke="hsl(var(--primary))"
              fill="hsl(var(--primary)/0.1)"
              name="Optimistic"
            />
            <Area
              type="monotone"
              dataKey="expected"
              stackId="2"
              stroke="hsl(var(--chart-2))"
              fill="hsl(var(--chart-2)/0.1)"
              name="Expected"
            />
            <Area
              type="monotone"
              dataKey="pessimistic"
              stackId="3"
              stroke="hsl(var(--chart-3))"
              fill="hsl(var(--chart-3)/0.1)"
              name="Pessimistic"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
