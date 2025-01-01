"use client";

import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "../../../utils/mockData";
import { getFrequencyColor } from "./utils";

export const RecurringIncomeItem = ({ item }) => {
  const frequencyColor = getFrequencyColor(item.frequency);

  return (
    <div className="flex items-start justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
      <div className="space-y-1">
        <p className="font-medium">{item.name}</p>
        <div className="flex items-center gap-2 text-sm">
          <Badge
            variant="secondary"
            className={`${frequencyColor} px-2 py-0.5`}
          >
            {item.frequency}
          </Badge>
          <span className="text-muted-foreground">Next: {item.nextDate}</span>
        </div>
      </div>
      <p className="font-semibold text-primary">
        {formatCurrency(item.amount)}
      </p>
    </div>
  );
};
