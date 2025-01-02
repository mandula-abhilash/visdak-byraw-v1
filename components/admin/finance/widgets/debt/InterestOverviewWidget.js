"use client";

import { Card } from "@/components/ui/card";
import { DebtHeader } from "./DebtHeader";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formatCurrency } from "../../utils/formatters";
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

export const InterestOverviewWidget = ({
  title = "Interest Overview",
  description = "Track interest payments over time",
}) => {
  const interestData = [
    { month: "Jan", interest: 15000, principal: 35000 },
    { month: "Feb", interest: 14500, principal: 35500 },
    { month: "Mar", interest: 14000, principal: 36000 },
    { month: "Apr", interest: 13500, principal: 36500 },
    { month: "May", interest: 13000, principal: 37000 },
    { month: "Jun", interest: 12500, principal: 37500 },
  ];

  return (
    <Card className="h-full flex flex-col shadow-lg">
      <DebtHeader title={title} description={description} />
      <div
        className="flex-1 p-4"
        style={{
          minHeight: WIDGET_STYLES.MIN_HEIGHT,
          maxHeight: WIDGET_STYLES.MAX_HEIGHT,
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={interestData}>
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
            <Line
              type="monotone"
              dataKey="interest"
              stroke="hsl(var(--destructive))"
              strokeWidth={2}
              dot={{ fill: "hsl(var(--destructive))" }}
              name="Interest"
            />
            <Line
              type="monotone"
              dataKey="principal"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={{ fill: "hsl(var(--primary))" }}
              name="Principal"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
