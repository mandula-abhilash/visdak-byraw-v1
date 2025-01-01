"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  generateRecurringExpenses,
  formatCurrency,
} from "../../utils/mockData";

export const RecurringExpenses = ({ title, description }) => {
  const expenses = generateRecurringExpenses();

  const getFrequencyColor = (frequency) => {
    switch (frequency.toLowerCase()) {
      case "monthly":
        return "bg-destructive/10 text-destructive border-destructive/20";
      case "weekly":
        return "bg-chart-2/10 text-chart-2 border-chart-2/20";
      case "quarterly":
        return "bg-chart-3/10 text-chart-3 border-chart-3/20";
      case "yearly":
        return "bg-chart-4/10 text-chart-4 border-chart-4/20";
      default:
        return "bg-muted text-muted-foreground border-muted";
    }
  };

  return (
    <Card className="flex flex-col shadow-lg">
      <div className="p-6 flex-none border-b">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">{title}</h3>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
      <div className="flex-1 p-4 min-h-[400px] overflow-auto">
        <div className="space-y-3">
          {expenses.map((expense) => (
            <div
              key={expense.id}
              className="flex items-start justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
            >
              <div className="space-y-1">
                <p className="font-medium">{expense.name}</p>
                <div className="flex items-center gap-2 text-sm">
                  <Badge
                    variant="secondary"
                    className={`${getFrequencyColor(expense.frequency)} px-2`}
                  >
                    {expense.frequency}
                  </Badge>
                  <span className="text-muted-foreground">
                    Next: {expense.nextDate}
                  </span>
                </div>
              </div>
              <p className="font-semibold text-destructive">
                {formatCurrency(expense.amount)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
