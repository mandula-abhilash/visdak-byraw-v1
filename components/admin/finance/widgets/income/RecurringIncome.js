"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  generateRecurringIncomeData,
  formatCurrency,
} from "../../utils/mockData";
import { WIDGET_STYLES } from "@/lib/constants/widget-styles";

export const RecurringIncome = ({
  title = "Recurring Income",
  description = "Regular income streams and schedules",
}) => {
  const data = generateRecurringIncomeData();

  const getFrequencyColor = (frequency) => {
    switch (frequency.toLowerCase()) {
      case "monthly":
        return "bg-primary/10 text-primary border-primary/20";
      case "weekly":
        return "bg-chart-2/10 text-chart-2 border-chart-2/20";
      case "quarterly":
        return "bg-chart-3/10 text-chart-3 border-chart-3/20";
      case "bi-weekly":
        return "bg-chart-4/10 text-chart-4 border-chart-4/20";
      default:
        return "bg-muted text-muted-foreground border-muted";
    }
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
        {data.length === 0 ? (
          <div className="text-center py-6 text-sm text-muted-foreground">
            No recurring income found
          </div>
        ) : (
          <div className="space-y-3">
            {data.map((item) => (
              <div
                key={item.id}
                className="flex items-start justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                <div className="space-y-1">
                  <p className="font-medium">{item.name}</p>
                  <div className="flex items-center gap-2 text-sm">
                    <Badge
                      variant="secondary"
                      className={`${getFrequencyColor(
                        item.frequency
                      )} px-2 py-0.5`}
                    >
                      {item.frequency}
                    </Badge>
                    <span className="text-muted-foreground">
                      Next: {item.nextDate}
                    </span>
                  </div>
                </div>
                <p className="font-semibold text-primary">
                  {formatCurrency(item.amount)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};
