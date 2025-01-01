"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  generateRecurringIncomeData,
  formatCurrency,
} from "../../utils/mockData";

export const RecurringIncome = () => {
  const data = generateRecurringIncomeData();

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Recurring Income</h3>
      <div className="space-y-4 max-h-[300px] overflow-y-auto">
        {data.map((item) => (
          <div
            key={item.id}
            className="flex items-start justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
          >
            <div className="space-y-1">
              <p className="font-medium">{item.name}</p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Badge variant="secondary">{item.frequency}</Badge>
                <span>Next: {item.nextDate}</span>
              </div>
            </div>
            <p className="font-semibold text-primary">
              {formatCurrency(item.amount)}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
};
