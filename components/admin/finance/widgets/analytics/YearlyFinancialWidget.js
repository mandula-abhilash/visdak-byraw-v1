"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

export const YearlyFinancialWidget = ({
  title = "Yearly Financial Summary",
  description = "Year-over-year financial comparison",
}) => {
  // Mock data - replace with real data
  const yearlyData = [
    {
      month: "Jan",
      income: 150000,
      expenses: 100000,
      savings: 50000,
    },
    {
      month: "Feb",
      income: 160000,
      expenses: 95000,
      savings: 65000,
    },
    {
      month: "Mar",
      income: 155000,
      expenses: 98000,
      savings: 57000,
    },
    {
      month: "Apr",
      income: 165000,
      expenses: 102000,
      savings: 63000,
    },
    {
      month: "May",
      income: 170000,
      expenses: 105000,
      savings: 65000,
    },
    {
      month: "Jun",
      income: 175000,
      expenses: 108000,
      savings: 67000,
    },
  ];

  const summary = {
    totalIncome: yearlyData.reduce((sum, month) => sum + month.income, 0),
    totalExpenses: yearlyData.reduce((sum, month) => sum + month.expenses, 0),
    totalSavings: yearlyData.reduce((sum, month) => sum + month.savings, 0),
    yearOverYear: {
      income: "+16.7%",
      expenses: "+8.0%",
      savings: "+34.0%",
    },
  };

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
        className="flex-1 p-4 overflow-y-auto"
        style={{
          minHeight: WIDGET_STYLES.MIN_HEIGHT,
          maxHeight: WIDGET_STYLES.MAX_HEIGHT,
        }}
      >
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg space-y-2">
              <div className="text-sm text-muted-foreground">Total Income</div>
              <div className="flex items-center justify-between">
                <span className="font-medium">
                  {formatCurrency(summary.totalIncome)}
                </span>
                <Badge
                  variant="outline"
                  className="px-2 bg-primary/10 text-primary border-primary/20"
                >
                  {summary.yearOverYear.income}
                </Badge>
              </div>
            </div>
            <div className="p-4 border rounded-lg space-y-2">
              <div className="text-sm text-muted-foreground">
                Total Expenses
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">
                  {formatCurrency(summary.totalExpenses)}
                </span>
                <Badge
                  variant="outline"
                  className="px-2 bg-destructive/10 text-destructive border-destructive/20"
                >
                  {summary.yearOverYear.expenses}
                </Badge>
              </div>
            </div>
            <div className="p-4 border rounded-lg space-y-2">
              <div className="text-sm text-muted-foreground">Total Savings</div>
              <div className="flex items-center justify-between">
                <span className="font-medium">
                  {formatCurrency(summary.totalSavings)}
                </span>
                <Badge
                  variant="outline"
                  className="px-2 bg-chart-2/10 text-chart-2 border-chart-2/20"
                >
                  {summary.yearOverYear.savings}
                </Badge>
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={yearlyData}>
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
                  dataKey="savings"
                  name="Savings"
                  fill="hsl(var(--chart-2))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </Card>
  );
};
