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
  Legend,
} from "recharts";
import { formatCurrency } from "../../utils/formatters";
import { Badge } from "@/components/ui/badge";
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

export const MonthlyComparison = ({ title, description }) => {
  // Mock data - replace with real data
  const data = [
    {
      month: "Jan",
      income: 850000,
      expenses: 650000,
      balance: 200000,
    },
    {
      month: "Feb",
      income: 920000,
      expenses: 680000,
      balance: 240000,
    },
    {
      month: "Mar",
      income: 880000,
      expenses: 700000,
      balance: 180000,
    },
  ];

  const latestMonth = data[data.length - 1];
  const previousMonth = data[data.length - 2];
  const balanceChange = latestMonth.balance - previousMonth.balance;
  const balanceChangePercentage = (balanceChange / previousMonth.balance) * 100;

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
      <div className="p-4 border-b bg-muted/50">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 space-y-1">
            <div className="text-sm text-muted-foreground">Latest Balance</div>
            <Badge
              variant="outline"
              className={`px-2 ${
                latestMonth.balance >= 0
                  ? "bg-primary/10 text-primary border-primary/20"
                  : "bg-destructive/10 text-destructive border-destructive/20"
              }`}
            >
              {formatCurrency(latestMonth.balance)}
            </Badge>
          </div>
          <div className="flex-1 space-y-1">
            <div className="text-sm text-muted-foreground">Monthly Change</div>
            <Badge
              variant="outline"
              className={`px-2 ${
                balanceChange >= 0
                  ? "bg-primary/10 text-primary border-primary/20"
                  : "bg-destructive/10 text-destructive border-destructive/20"
              }`}
            >
              {balanceChange >= 0 ? "+" : ""}
              {balanceChangePercentage.toFixed(1)}%
            </Badge>
          </div>
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
          <BarChart data={data}>
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
            <Legend />
            <Bar
              dataKey="income"
              name="Income"
              fill="hsl(var(--primary))"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="expenses"
              name="Expenses"
              fill="hsl(var(--destructive))"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="balance"
              name="Net Balance"
              fill="hsl(var(--chart-2))"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
