"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { formatCurrency } from "../../utils/formatters";
import { calculateSavingsRate } from "./utils/calculations";
import { WIDGET_STYLES } from "@/lib/constants/widget-styles";

export const SavingsRateWidget = ({ title = "Savings Rate", description }) => {
  // Mock data - replace with real data
  const savingsData = {
    currentMonth: {
      income: 100000,
      savings: 35000,
      expenses: 65000,
    },
    history: [
      { month: "Jan", income: 100000, savings: 30000 },
      { month: "Feb", income: 100000, savings: 32000 },
      { month: "Mar", income: 100000, savings: 35000 },
    ],
  };

  const currentRate = calculateSavingsRate(
    savingsData.currentMonth.income,
    savingsData.currentMonth.savings
  );

  const getSavingsRateStatus = (rate) => {
    if (rate >= 30) return "excellent";
    if (rate >= 20) return "good";
    if (rate >= 10) return "fair";
    return "needs-improvement";
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "excellent":
        return "bg-primary/10 text-primary border-primary/20";
      case "good":
        return "bg-chart-2/10 text-chart-2 border-chart-2/20";
      case "fair":
        return "bg-chart-4/10 text-chart-4 border-chart-4/20";
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
          {/* Current Month Overview */}
          <div className="p-4 border rounded-lg space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Current Month</h4>
              <Badge
                variant="outline"
                className={`px-2 ${getStatusColor(
                  getSavingsRateStatus(currentRate)
                )}`}
              >
                {currentRate.toFixed(1)}% Savings Rate
              </Badge>
            </div>

            <Progress value={currentRate} className="h-2" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Income</div>
                <div className="font-medium">
                  {formatCurrency(savingsData.currentMonth.income)}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">
                  Savings
                </div>
                <div className="font-medium">
                  {formatCurrency(savingsData.currentMonth.savings)}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">
                  Expenses
                </div>
                <div className="font-medium">
                  {formatCurrency(savingsData.currentMonth.expenses)}
                </div>
              </div>
            </div>
          </div>

          {/* Historical Data */}
          <div className="space-y-2">
            <h4 className="font-medium">Previous Months</h4>
            <div className="space-y-2">
              {savingsData.history.map((month) => {
                const rate = calculateSavingsRate(month.income, month.savings);
                return (
                  <div
                    key={month.month}
                    className="p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="font-medium">{month.month}</div>
                        <div className="text-sm text-muted-foreground">
                          Saved {formatCurrency(month.savings)} of{" "}
                          {formatCurrency(month.income)}
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className={`px-2 ${getStatusColor(
                          getSavingsRateStatus(rate)
                        )}`}
                      >
                        {rate.toFixed(1)}%
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
