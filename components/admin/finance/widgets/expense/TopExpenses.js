"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { generateTopExpenses, formatCurrency } from "../../utils/mockData";

export const TopExpenses = ({ title, description }) => {
  const expenses = generateTopExpenses();

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
                    className="bg-destructive/10 text-destructive"
                  >
                    {expense.category}
                  </Badge>
                  <span className="text-muted-foreground">{expense.date}</span>
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
