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

export const IncomeExpenseOverview = ({ title, description }) => {
  // Mock data - replace with real data
  const data = [
    { month: "Jan", income: 850000, expenses: 650000 },
    { month: "Feb", income: 920000, expenses: 680000 },
    { month: "Mar", income: 880000, expenses: 700000 },
    { month: "Apr", income: 950000, expenses: 720000 },
    { month: "May", income: 1000000, expenses: 750000 },
    { month: "Jun", income: 980000, expenses: 800000 },
  ];

  const totalIncome = data.reduce((sum, item) => sum + item.income, 0);
  const totalExpenses = data.reduce((sum, item) => sum + item.expenses, 0);
  const netBalance = totalIncome - totalExpenses;

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
        <div className="flex flex-wrap gap-4">
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Total Income</div>
            <Badge
              variant="outline"
              className="bg-primary/10 text-primary border-primary/20 px-2"
            >
              {formatCurrency(totalIncome)}
            </Badge>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Total Expenses</div>
            <Badge
              variant="outline"
              className="bg-destructive/10 text-destructive border-destructive/20 px-2"
            >
              {formatCurrency(totalExpenses)}
            </Badge>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Net Balance</div>
            <Badge
              variant="outline"
              className={`px-2 ${
                netBalance >= 0
                  ? "bg-primary/10 text-primary border-primary/20"
                  : "bg-destructive/10 text-destructive border-destructive/20"
              }`}
            >
              {formatCurrency(netBalance)}
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
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
