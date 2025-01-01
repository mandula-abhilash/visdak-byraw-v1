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

export const ProjectedIncome = () => {
  const data = generateProjectedIncomeData();

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Projected Income</h3>
      <div className="h-[300px]">
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
