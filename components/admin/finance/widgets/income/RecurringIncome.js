"use client";

import { Card } from "@/components/ui/card";
import { RecurringIncomeList } from "./recurring/RecurringIncomeList";
import { generateRecurringIncomeData } from "../../utils/mockData";

export const RecurringIncome = ({
  title = "Recurring Income",
  description = "Regular income streams and schedules",
}) => {
  const data = generateRecurringIncomeData();

  return (
    <Card className="p-6">
      <div className="flex flex-col space-y-4">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        <RecurringIncomeList items={data} />
      </div>
    </Card>
  );
};
