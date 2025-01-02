"use client";

import { Card } from "@/components/ui/card";
import { InvestmentHeader } from "./InvestmentHeader";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formatCurrency } from "../../utils/formatters";
import { generateSectorData } from "./utils/mockData";
import { WIDGET_STYLES } from "@/lib/constants/widget-styles";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background/95 backdrop-blur-sm border rounded-lg shadow-lg p-4">
        <p className="font-medium mb-2">{label}</p>
        <div className="flex items-center gap-2 text-sm">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: payload[0].color }}
          />
          <span className="text-muted-foreground">Value:</span>
          <span className="font-medium">
            {formatCurrency(payload[0].value)}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm mt-1">
          <span className="text-muted-foreground">Change:</span>
          <span
            className={`font-medium ${
              payload[0].payload.change >= 0
                ? "text-primary"
                : "text-destructive"
            }`}
          >
            {payload[0].payload.change >= 0 ? "+" : ""}
            {payload[0].payload.change}%
          </span>
        </div>
      </div>
    );
  }
  return null;
};

export const SectorPerformanceWidget = ({
  title = "Sector Performance",
  description = "Performance by sector",
}) => {
  const data = generateSectorData();

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
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="sector"
              tick={{ fontSize: 12 }}
              className="text-muted-foreground"
            />
            <YAxis
              tick={{ fontSize: 12 }}
              className="text-muted-foreground"
              tickFormatter={formatCurrency}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="value"
              fill="hsl(var(--primary))"
              radius={[4, 4, 0, 0]}
              className="hover:brightness-110 transition-all duration-200"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
