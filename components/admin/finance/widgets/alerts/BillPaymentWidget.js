"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "../../utils/formatters";
import { generateBillPayments } from "./utils/mockData";
import { WIDGET_STYLES } from "@/lib/constants/widget-styles";

export const BillPaymentWidget = ({ title = "Bill Payments", description }) => {
  const bills = generateBillPayments();

  const getStatusColor = (status, dueDate) => {
    if (status === "overdue") {
      return "bg-destructive/10 text-destructive border-destructive/20";
    }
    const daysUntilDue = Math.ceil(
      (new Date(dueDate) - new Date()) / (1000 * 60 * 60 * 24)
    );
    if (daysUntilDue <= 3) {
      return "bg-chart-5/10 text-chart-5 border-chart-5/20";
    }
    return "bg-primary/10 text-primary border-primary/20";
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
          {bills.map((bill) => (
            <div
              key={bill.id}
              className="p-4 border rounded-lg hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="font-medium">{bill.title}</div>
                  <div className="text-sm text-muted-foreground">
                    Due: {new Date(bill.dueDate).toLocaleDateString()}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Reminder set: {bill.reminderSet}
                  </div>
                </div>
                <div className="text-right space-y-2">
                  <div className="font-semibold">
                    {formatCurrency(bill.amount)}
                  </div>
                  <Badge
                    variant="outline"
                    className={`px-2 ${getStatusColor(
                      bill.status,
                      bill.dueDate
                    )}`}
                  >
                    {bill.status === "overdue"
                      ? "Overdue"
                      : `Due in ${Math.ceil(
                          (new Date(bill.dueDate) - new Date()) /
                            (1000 * 60 * 60 * 24)
                        )} days`}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
