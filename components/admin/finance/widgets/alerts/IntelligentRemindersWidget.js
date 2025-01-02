"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { formatCurrency } from "../../utils/formatters";
import { generateBillPayments, generateSubscriptions } from "./utils/mockData";
import { WIDGET_STYLES } from "@/lib/constants/widget-styles";

export const IntelligentRemindersWidget = ({
  title = "Intelligent Reminders",
  description,
}) => {
  const currentSavings = 50000;
  const bills = generateBillPayments();
  const subscriptions = generateSubscriptions();

  // Combine and sort all upcoming payments
  const upcomingPayments = [
    ...bills.map((bill) => ({
      ...bill,
      date: bill.dueDate,
      type: "bill",
    })),
    ...subscriptions.map((sub) => ({
      ...sub,
      date: sub.renewalDate,
      type: "subscription",
    })),
  ].sort((a, b) => new Date(a.date) - new Date(b.date));

  // Calculate total upcoming payments
  const totalUpcoming = upcomingPayments.reduce(
    (sum, payment) => sum + payment.amount,
    0
  );

  // Calculate coverage percentage
  const coveragePercentage = (currentSavings / totalUpcoming) * 100;

  const getPaymentStatusColor = (amount) => {
    if (amount <= currentSavings * 0.2) {
      return "bg-primary/10 text-primary border-primary/20";
    }
    if (amount <= currentSavings * 0.5) {
      return "bg-chart-2/10 text-chart-2 border-chart-2/20";
    }
    return "bg-destructive/10 text-destructive border-destructive/20";
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
          {/* Overview Section */}
          <div className="p-4 border rounded-lg space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Payment Coverage</h4>
              <Badge
                variant="outline"
                className={`px-2 ${
                  coveragePercentage >= 100
                    ? "bg-primary/10 text-primary border-primary/20"
                    : coveragePercentage >= 50
                    ? "bg-chart-2/10 text-chart-2 border-chart-2/20"
                    : "bg-destructive/10 text-destructive border-destructive/20"
                }`}
              >
                {coveragePercentage.toFixed(0)}% Covered
              </Badge>
            </div>

            <Progress value={coveragePercentage} className="h-2" />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">
                  Current Savings
                </div>
                <div className="font-medium">
                  {formatCurrency(currentSavings)}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">
                  Upcoming Payments
                </div>
                <div className="font-medium">
                  {formatCurrency(totalUpcoming)}
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Payments */}
          <div className="space-y-4">
            <h4 className="font-medium">Next 30 Days</h4>
            {upcomingPayments.map((payment, index) => {
              const daysUntilDue = Math.ceil(
                (new Date(payment.date) - new Date()) / (1000 * 60 * 60 * 24)
              );
              if (daysUntilDue > 30) return null;

              return (
                <div
                  key={`${payment.type}-${payment.id}`}
                  className="p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="font-medium">{payment.title}</div>
                      <div className="text-sm text-muted-foreground">
                        Due in {daysUntilDue} days
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {payment.type === "bill" ? "Bill" : "Subscription"}
                      </Badge>
                    </div>
                    <div className="text-right space-y-2">
                      <div className="font-semibold">
                        {formatCurrency(payment.amount)}
                      </div>
                      <Badge
                        variant="outline"
                        className={`px-2 ${getPaymentStatusColor(
                          payment.amount
                        )}`}
                      >
                        {payment.amount <= currentSavings
                          ? "Manageable"
                          : "Action Needed"}
                      </Badge>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Card>
  );
};
