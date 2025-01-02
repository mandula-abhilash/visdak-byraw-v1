"use client";

import { Card } from "@/components/ui/card";
import { InvestmentHeader } from "./InvestmentHeader";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formatCurrency } from "../../utils/formatters";
import { generateNetWorthData } from "./utils/mockData";
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

export const NetWorthWidget = ({
  title = "Net Worth",
  description = "Track your total net worth",
}) => {
  const data = generateNetWorthData();

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
        {/* Updated grid layout for better small screen support */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          <div className="p-3 border rounded-lg">
            <div className="text-sm text-muted-foreground mb-1">
              Total Assets
            </div>
            <div className="text-base sm:text-lg font-semibold text-primary truncate">
              {formatCurrency(data.total_assets)}
            </div>
          </div>
          <div className="p-3 border rounded-lg">
            <div className="text-sm text-muted-foreground mb-1">
              Total Liabilities
            </div>
            <div className="text-base sm:text-lg font-semibold text-destructive truncate">
              {formatCurrency(data.total_liabilities)}
            </div>
          </div>
          <div className="p-3 border rounded-lg">
            <div className="text-sm text-muted-foreground mb-1">Net Worth</div>
            <div className="text-base sm:text-lg font-semibold truncate">
              {formatCurrency(data.net_worth)}
            </div>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={data.history}>
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
              dataKey="assets"
              stackId="1"
              stroke="hsl(var(--primary))"
              fill="hsl(var(--primary)/0.1)"
              name="Assets"
            />
            <Area
              type="monotone"
              dataKey="liabilities"
              stackId="2"
              stroke="hsl(var(--destructive))"
              fill="hsl(var(--destructive)/0.1)"
              name="Liabilities"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
