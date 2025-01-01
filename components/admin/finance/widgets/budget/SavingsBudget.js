"use client";

import { Card } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import {
  generateSavingsBudgetData,
  formatCurrency,
} from "../../utils/mockData";
import { WIDGET_STYLES } from "@/lib/constants/widget-styles";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background/95 backdrop-blur-sm border rounded-lg shadow-lg p-4">
        <p className="font-medium mb-2">{label}</p>
        {payload.map((entry, index) => (
          <div
            key={index}
            className={`flex items-center gap-2 text-sm ${
              index > 0 ? "mt-1" : ""
            }`}
          >
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

export const SavingsBudget = ({ title, description }) => {
  const data = generateSavingsBudgetData();
  const goal = 500000; // Example savings goal

  return (
    <Card className="h-full flex flex-col shadow-lg">
      <div className="p-6 flex-none border-b">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">{title}</h3>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
      <div
        className="flex-1 p-4"
        style={{
          minHeight: WIDGET_STYLES.MIN_HEIGHT,
          maxHeight: WIDGET_STYLES.MAX_HEIGHT,
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12 }}
              className="text-muted-foreground"
            />
            <YAxis
              tick={{ fontSize: 12 }}
              className="text-muted-foreground"
              tickFormatter={(value) => formatCurrency(value)}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine
              y={goal}
              label={{
                value: "Goal",
                position: "right",
                className: "text-xs text-muted-foreground",
              }}
              stroke="hsl(var(--destructive))"
              strokeDasharray="3 3"
            />
            <Line
              type="monotone"
              dataKey="savings"
              name="Savings"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={{ fill: "hsl(var(--primary))" }}
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="projected"
              name="Projected"
              stroke="hsl(var(--chart-2))"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
