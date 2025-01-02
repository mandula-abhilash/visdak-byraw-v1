"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "../../utils/formatters";
import { WIDGET_STYLES } from "@/lib/constants/widget-styles";

export const TaxPaymentWidget = ({ title = "Tax Payments", description }) => {
  const payments = [
    {
      id: 1,
      type: "Advance Tax",
      dueDate: "2024-06-15",
      amount: 50000,
      status: "paid",
      paidOn: "2024-06-10",
    },
    {
      id: 2,
      type: "Advance Tax",
      dueDate: "2024-09-15",
      amount: 75000,
      status: "upcoming",
    },
    {
      id: 3,
      type: "Advance Tax",
      dueDate: "2024-12-15",
      amount: 75000,
      status: "upcoming",
    },
    {
      id: 4,
      type: "Advance Tax",
      dueDate: "2025-03-15",
      amount: 50000,
      status: "upcoming",
    },
  ];

  const getStatusBadge = (status, dueDate) => {
    const isOverdue = status === "upcoming" && new Date(dueDate) < new Date();

    if (isOverdue) {
      return (
        <Badge
          variant="outline"
          className="bg-destructive/10 text-destructive border-destructive/20 px-2"
        >
          Overdue
        </Badge>
      );
    }

    switch (status) {
      case "paid":
        return (
          <Badge
            variant="outline"
            className="bg-primary/10 text-primary border-primary/20 px-2"
          >
            Paid
          </Badge>
        );
      case "upcoming":
        return (
          <Badge
            variant="outline"
            className="bg-chart-2/10 text-chart-2 border-chart-2/20 px-2"
          >
            Upcoming
          </Badge>
        );
      default:
        return null;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
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
        <div className="space-y-4">
          {payments.map((payment) => (
            <div
              key={payment.id}
              className="p-4 border rounded-lg hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="font-medium">{payment.type}</div>
                  <div className="text-sm text-muted-foreground">
                    Due: {formatDate(payment.dueDate)}
                  </div>
                  {payment.status === "paid" && payment.paidOn && (
                    <div className="text-sm text-muted-foreground">
                      Paid on: {formatDate(payment.paidOn)}
                    </div>
                  )}
                </div>
                <div className="text-right space-y-2">
                  <div className="font-semibold">
                    {formatCurrency(payment.amount)}
                  </div>
                  {getStatusBadge(payment.status, payment.dueDate)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
