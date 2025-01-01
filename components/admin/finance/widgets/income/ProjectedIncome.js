"use client";

import { Card } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  generateProjectedIncomeData,
  formatCurrency,
} from "../../utils/mockData";
import { WIDGET_STYLES } from "@/lib/constants/widget-styles";

export const ProjectedIncome = ({
  title = "Projected Income",
  description = "Projected vs actual income for the next 6 months",
}) => {
  const data = generateProjectedIncomeData();

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
          <BarChart
            data={data}
            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
          >
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
            <Tooltip
              formatter={(value) => [formatCurrency(value), "Amount"]}
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
              }}
            />
            <Bar
              dataKey="projected"
              fill="hsl(var(--primary))"
              name="Projected"
            />
            <Bar dataKey="actual" fill="hsl(var(--chart-2))" name="Actual" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
