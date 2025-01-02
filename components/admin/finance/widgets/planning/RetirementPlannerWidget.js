"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { calculateRetirementNeeds } from "./utils/calculations";
import { formatCurrency } from "../../utils/formatters";
import { WIDGET_STYLES } from "@/lib/constants/widget-styles";

export const RetirementPlannerWidget = ({
  title = "Retirement Planner",
  description,
}) => {
  const [values, setValues] = useState({
    currentAge: "",
    retirementAge: "",
    monthlyExpenses: "",
    inflation: "6",
    returnRate: "8",
    currentSavings: "",
  });
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const { totalNeeded, savingsGap, monthlyContributionNeeded } =
      calculateRetirementNeeds(
        parseFloat(values.currentAge),
        parseFloat(values.retirementAge),
        parseFloat(values.monthlyExpenses),
        parseFloat(values.inflation),
        parseFloat(values.returnRate),
        parseFloat(values.currentSavings)
      );

    setResult({
      totalNeeded,
      savingsGap,
      monthlyContributionNeeded,
      progressPercentage:
        (parseFloat(values.currentSavings) / totalNeeded) * 100,
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
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Current Age</label>
              <Input
                type="number"
                value={values.currentAge}
                onChange={(e) =>
                  setValues({ ...values, currentAge: e.target.value })
                }
                placeholder="Enter current age"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Retirement Age</label>
              <Input
                type="number"
                value={values.retirementAge}
                onChange={(e) =>
                  setValues({ ...values, retirementAge: e.target.value })
                }
                placeholder="Enter retirement age"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Monthly Expenses</label>
              <Input
                type="number"
                value={values.monthlyExpenses}
                onChange={(e) =>
                  setValues({ ...values, monthlyExpenses: e.target.value })
                }
                placeholder="Enter monthly expenses"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Current Savings</label>
              <Input
                type="number"
                value={values.currentSavings}
                onChange={(e) =>
                  setValues({ ...values, currentSavings: e.target.value })
                }
                placeholder="Enter current savings"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Inflation Rate (%)</label>
              <Input
                type="number"
                value={values.inflation}
                onChange={(e) =>
                  setValues({ ...values, inflation: e.target.value })
                }
                placeholder="Enter inflation rate"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Expected Return (%)</label>
              <Input
                type="number"
                value={values.returnRate}
                onChange={(e) =>
                  setValues({ ...values, returnRate: e.target.value })
                }
                placeholder="Enter expected return rate"
              />
            </div>
          </div>

          <Button onClick={handleCalculate} className="w-full">
            Calculate Retirement Plan
          </Button>

          {result && (
            <div className="space-y-4 p-4 bg-accent/50 rounded-lg">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress to Goal</span>
                  <span className="font-medium">
                    {result.progressPercentage.toFixed(1)}%
                  </span>
                </div>
                <Progress value={result.progressPercentage} className="h-2" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    Total Required
                  </div>
                  <Badge
                    variant="outline"
                    className="px-2 bg-primary/10 text-primary border-primary/20"
                  >
                    {formatCurrency(result.totalNeeded)}
                  </Badge>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    Current Gap
                  </div>
                  <Badge
                    variant="outline"
                    className="px-2 bg-destructive/10 text-destructive border-destructive/20"
                  >
                    {formatCurrency(result.savingsGap)}
                  </Badge>
                </div>
              </div>

              <div className="pt-2 border-t">
                <div className="text-sm text-muted-foreground mb-1">
                  Required Monthly Savings
                </div>
                <Badge
                  variant="outline"
                  className="px-2 bg-chart-2/10 text-chart-2 border-chart-2/20"
                >
                  {formatCurrency(result.monthlyContributionNeeded)}
                </Badge>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
