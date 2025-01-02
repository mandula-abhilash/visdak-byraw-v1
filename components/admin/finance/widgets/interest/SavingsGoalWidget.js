"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { projectSavingsGoal } from "./utils/calculations";
import { formatCurrency } from "../../utils/formatters";
import { WIDGET_STYLES } from "@/lib/constants/widget-styles";

export const SavingsGoalWidget = ({ title = "Savings Goal", description }) => {
  const [values, setValues] = useState({
    goal: "",
    currentSavings: "",
    monthlyContribution: "",
    interestRate: "",
  });
  const [projection, setProjection] = useState(null);

  const handleCalculate = () => {
    const months = projectSavingsGoal(
      parseFloat(values.goal),
      parseFloat(values.currentSavings),
      parseFloat(values.monthlyContribution),
      parseFloat(values.interestRate)
    );

    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    setProjection({
      months,
      years,
      remainingMonths,
      progressPercentage:
        (parseFloat(values.currentSavings) / parseFloat(values.goal)) * 100,
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
              <label className="text-sm font-medium">Savings Goal</label>
              <Input
                type="number"
                value={values.goal}
                onChange={(e) => setValues({ ...values, goal: e.target.value })}
                placeholder="Enter target amount"
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
              <label className="text-sm font-medium">
                Monthly Contribution
              </label>
              <Input
                type="number"
                value={values.monthlyContribution}
                onChange={(e) =>
                  setValues({ ...values, monthlyContribution: e.target.value })
                }
                placeholder="Enter monthly savings"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Interest Rate (%)</label>
              <Input
                type="number"
                value={values.interestRate}
                onChange={(e) =>
                  setValues({ ...values, interestRate: e.target.value })
                }
                placeholder="Enter annual interest rate"
              />
            </div>
          </div>

          <Button onClick={handleCalculate} className="w-full">
            Calculate Timeline
          </Button>

          {projection && (
            <div className="space-y-4 p-4 bg-accent/50 rounded-lg">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress to Goal</span>
                  <span className="font-medium">
                    {projection.progressPercentage.toFixed(1)}%
                  </span>
                </div>
                <Progress
                  value={projection.progressPercentage}
                  className="h-2"
                />
              </div>

              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">
                  Time to Reach Goal
                </div>
                <Badge
                  variant="outline"
                  className="px-2 bg-primary/10 text-primary border-primary/20"
                >
                  {projection.years} years{" "}
                  {projection.remainingMonths > 0
                    ? `${projection.remainingMonths} months`
                    : ""}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    Current Amount
                  </div>
                  <div className="font-medium">
                    {formatCurrency(values.currentSavings)}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    Target Amount
                  </div>
                  <div className="font-medium">
                    {formatCurrency(values.goal)}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
