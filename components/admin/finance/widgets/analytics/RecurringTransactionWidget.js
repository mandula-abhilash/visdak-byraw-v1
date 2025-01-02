"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

export const RecurringTransactionWidget = ({
  title = "Recurring Transactions",
  description = "Analysis of recurring payment patterns",
}) => {
  // Mock data - replace with real data
  const recurringData = [
    {
      month: "Jan",
      subscriptions: 5000,
      utilities: 8000,
      loans: 15000,
    },
    {
      month: "Feb",
      subscriptions: 5200,
      utilities: 7800,
      loans: 15000,
    },
    {
      month: "Mar",
      subscriptions: 5500,
      utilities: 8200,
      loans: 15000,
    },
    {
      month: "Apr",
      subscriptions: 5800,
      utilities: 8500,
      loans: 15000,
    },
    {
      month: "May",
      subscriptions: 6000,
      utilities: 8300,
      loans: 15000,
    },
    {
      month: "Jun",
      subscriptions: 6200,
      utilities: 8600,
      loans: 15000,
    },
  ];

  const summary = {
    totalRecurring: 29800,
    categories: [
      { name: "Subscriptions", amount: 6200, change: "+24%" },
      { name: "Utilities", amount: 8600, change: "+7.5%" },
      { name: "Loans", amount: 15000, change: "0%" },
    ],
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
          {/* Summary Section */}
          <div className="p-4 border rounded-lg">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Monthly Recurring Total</h4>
                <Badge
                  variant="outline"
                  className="px-2 bg-primary/10 text-primary border-primary/20"
                >
                  {formatCurrency(summary.totalRecurring)}
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {summary.categories.map((category, index) => (
                  <div key={index} className="space-y-1">
                    <div className="text-sm text-muted-foreground">
                      {category.name}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">
                        {formatCurrency(category.amount)}
                      </span>
                      <Badge
                        variant="outline"
                        className={`text-xs px-2 ${
                          category.change.startsWith("+")
                            ? "bg-destructive/10 text-destructive border-destructive/20"
                            : "bg-primary/10 text-primary border-primary/20"
                        }`}
                      >
                        {category.change}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Trend Chart */}
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={recurringData}>
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
                  dataKey="subscriptions"
                  name="Subscriptions"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--primary))" }}
                />
                <Line
                  type="monotone"
                  dataKey="utilities"
                  name="Utilities"
                  stroke="hsl(var(--chart-2))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--chart-2))" }}
                />
                <Line
                  type="monotone"
                  dataKey="loans"
                  name="Loans"
                  stroke="hsl(var(--chart-3))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--chart-3))" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </Card>
  );
};
