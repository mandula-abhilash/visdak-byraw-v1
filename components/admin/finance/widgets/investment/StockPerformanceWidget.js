"use client";

import { Card } from "@/components/ui/card";
import { InvestmentHeader } from "./InvestmentHeader";
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

export const StockPerformanceWidget = ({
  title = "Stock Performance",
  description = "Monitor individual stocks",
}) => {
  const performanceData = [
    { date: "Mon", AAPL: 175.84, GOOGL: 141.8 },
    { date: "Tue", AAPL: 176.2, GOOGL: 142.5 },
    { date: "Wed", AAPL: 177.15, GOOGL: 143.2 },
    { date: "Thu", AAPL: 176.9, GOOGL: 142.8 },
    { date: "Fri", AAPL: 178.25, GOOGL: 144.1 },
  ];

  return (
    <Card className="h-full flex flex-col shadow-lg">
      <InvestmentHeader title={title} description={description} />
      <div
        className="flex-1 p-4"
        style={{
          minHeight: WIDGET_STYLES.MIN_HEIGHT,
          maxHeight: WIDGET_STYLES.MAX_HEIGHT,
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12 }}
              className="text-muted-foreground"
            />
            <YAxis tick={{ fontSize: 12 }} className="text-muted-foreground" />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="AAPL"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={{ fill: "hsl(var(--primary))" }}
              name="AAPL"
            />
            <Line
              type="monotone"
              dataKey="GOOGL"
              stroke="hsl(var(--chart-2))"
              strokeWidth={2}
              dot={{ fill: "hsl(var(--chart-2))" }}
              name="GOOGL"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
