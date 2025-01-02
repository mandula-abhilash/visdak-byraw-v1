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
import { formatCurrency } from "../../utils/formatters";
import { generateBillPayments, generateSubscriptions } from "./utils/mockData";
import { formatDate, getDaysUntil } from "./utils/dateUtils";
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

export const PaymentTimelineWidget = ({
  title = "Payment Timeline",
  description = "Upcoming payments over next 30 days",
}) => {
  const bills = generateBillPayments();
  const subscriptions = generateSubscriptions();

  // Generate timeline data for next 30 days
  const timelineData = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < 30; i++) {
    const currentDate = new Date(today);
    currentDate.setDate(today.getDate() + i);

    // Filter payments for current date
    const dayBills = bills.filter((bill) => getDaysUntil(bill.dueDate) === i);
    const daySubscriptions = subscriptions.filter(
      (sub) => getDaysUntil(sub.renewalDate) === i
    );

    if (dayBills.length > 0 || daySubscriptions.length > 0) {
      const billsAmount = dayBills.reduce((sum, bill) => sum + bill.amount, 0);
      const subscriptionsAmount = daySubscriptions.reduce(
        (sum, sub) => sum + sub.amount,
        0
      );

      timelineData.push({
        date: formatDate(currentDate),
        bills: billsAmount,
        subscriptions: subscriptionsAmount,
      });
    }
  }

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
          <BarChart data={timelineData} barGap={0}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="date"
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
              dataKey="bills"
              name="Bills"
              stackId="a"
              fill="hsl(var(--primary))"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="subscriptions"
              name="Subscriptions"
              stackId="a"
              fill="hsl(var(--chart-2))"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
