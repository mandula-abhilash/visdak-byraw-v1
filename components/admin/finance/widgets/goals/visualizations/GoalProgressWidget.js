"use client";

import { Card } from "@/components/ui/card";
import { GoalsHeader } from "../GoalsHeader";
import {
  BarChart,
  Bar,
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

export const GoalProgressWidget = ({
  title = "Goal Progress",
  description = "Compare progress across goals",
}) => {
  const progressData = [
    { name: "Emergency Fund", current: 450000, target: 600000 },
    { name: "House", current: 1200000, target: 2000000 },
    { name: "Vacation", current: 180000, target: 200000 },
    { name: "Investment", current: 3500000, target: 5000000 },
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
          <BarChart data={progressData} barSize={20}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 12 }}
              className="text-muted-foreground"
            />
            <YAxis
              tick={{ fontSize: 12 }}
              className="text-muted-foreground"
              tickFormatter={formatCurrency}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="current" fill="hsl(var(--primary))" name="Current" />
            <Bar dataKey="target" fill="hsl(var(--chart-2))" name="Target" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
