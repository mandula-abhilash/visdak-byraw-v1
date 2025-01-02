"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { formatCurrency } from "../../utils/formatters";
import { WIDGET_STYLES } from "@/lib/constants/widget-styles";

const DEDUCTION_LIMITS = {
  "80C": 150000,
  "80D": 25000,
  "80CCD": 50000,
  "24b": 200000,
};

export const TaxSavingsWidget = ({ title = "Tax Savings", description }) => {
  const [deductions] = useState({
    "80C": {
      used: 120000,
      items: [
        { name: "PPF", amount: 50000 },
        { name: "ELSS", amount: 40000 },
        { name: "Life Insurance", amount: 30000 },
      ],
    },
    "80D": {
      used: 15000,
      items: [{ name: "Health Insurance", amount: 15000 }],
    },
    "80CCD": {
      used: 30000,
      items: [{ name: "NPS Contribution", amount: 30000 }],
    },
    "24b": {
      used: 150000,
      items: [{ name: "Home Loan Interest", amount: 150000 }],
    },
  });

  const getDeductionStatus = (section) => {
    const limit = DEDUCTION_LIMITS[section];
    const used = deductions[section].used;
    const remaining = Math.max(limit - used, 0);
    const percentage = (used / limit) * 100;

    return {
      used,
      remaining,
      percentage,
      status:
        percentage >= 90
          ? "complete"
          : percentage >= 50
          ? "progress"
          : "pending",
    };
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "complete":
        return "bg-primary/10 text-primary border-primary/20";
      case "progress":
        return "bg-chart-2/10 text-chart-2 border-chart-2/20";
      default:
        return "bg-destructive/10 text-destructive border-destructive/20";
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
        <div className="space-y-6">
          {Object.entries(deductions).map(([section, data]) => {
            const { used, remaining, percentage, status } =
              getDeductionStatus(section);

            return (
              <div
                key={section}
                className="p-4 border rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-medium">Section {section}</h4>
                    <p className="text-sm text-muted-foreground">
                      Limit: {formatCurrency(DEDUCTION_LIMITS[section])}
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className={`px-2 capitalize ${getStatusColor(status)}`}
                  >
                    {status}
                  </Badge>
                </div>

                <Progress value={percentage} className="h-2 mb-4" />

                <div className="space-y-2">
                  {data.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between text-sm items-center"
                    >
                      <span className="text-muted-foreground">{item.name}</span>
                      <span>{formatCurrency(item.amount)}</span>
                    </div>
                  ))}
                  {remaining > 0 && (
                    <div className="flex justify-between text-sm items-center text-destructive">
                      <span>Remaining Opportunity</span>
                      <span>{formatCurrency(remaining)}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};
