"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { formatCurrency } from "../../utils/formatters";
import { generateBillPayments, generateSubscriptions } from "./utils/mockData";
import { WIDGET_STYLES } from "@/lib/constants/widget-styles";

const COLORS = [
  "hsl(var(--primary))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background/95 backdrop-blur-sm border rounded-lg shadow-lg p-4">
        <p className="text-sm font-medium">{payload[0].name}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-sm text-muted-foreground">Amount:</span>
          <span className="text-sm font-medium">
            {formatCurrency(payload[0].value)}
          </span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-sm text-muted-foreground">Percentage:</span>
          <span className="text-sm font-medium">
            {((payload[0].value / payload[0].payload.total) * 100).toFixed(1)}%
          </span>
        </div>
      </div>
    );
  }
  return null;
};

export const PaymentDistributionWidget = ({
  title = "Payment Distribution",
  description = "Distribution of upcoming payments by category",
}) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const bills = generateBillPayments();
  const subscriptions = generateSubscriptions();

  // Combine all payments and calculate distribution by category
  const allPayments = [...bills, ...subscriptions];
  const total = allPayments.reduce((sum, payment) => sum + payment.amount, 0);

  const distribution = allPayments.reduce((acc, payment) => {
    const category = payment.category;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += payment.amount;
    return acc;
  }, {});

  const data = Object.entries(distribution).map(([category, amount]) => ({
    name: category,
    value: amount,
    total,
  }));

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
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              onMouseEnter={(_, index) => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {data.map((entry, index) => {
                const isActive = index === activeIndex;
                return (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    className="transition-all duration-300 ease-in-out"
                    style={{
                      transform: isActive ? "scale(1.1)" : "scale(1)",
                      filter: isActive ? "brightness(1.1)" : "none",
                      transformOrigin: "center",
                    }}
                  />
                );
              })}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              formatter={(value) => (
                <span className="text-sm text-muted-foreground">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
