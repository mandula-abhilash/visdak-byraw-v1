"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { formatCurrency } from "../../utils/formatters";
import { WIDGET_STYLES } from "@/lib/constants/widget-styles";

export const SavingsPotential = ({ title, description }) => {
  // Mock initial data - replace with real data
  const [monthlyIncome] = useState(1000000);
  const [currentExpenses] = useState(750000);

  // State for adjustable parameters
  const [discretionarySpending, setDiscretionarySpending] = useState(100);
  const [additionalIncome, setAdditionalIncome] = useState(0);
  const [expenseReduction, setExpenseReduction] = useState(0);

  // Calculate potential savings
  const calculatePotentialSavings = () => {
    const reducedExpenses = currentExpenses * (1 - expenseReduction / 100);
    const increasedIncome = monthlyIncome * (1 + additionalIncome / 100);
    const discretionaryAdjustment =
      currentExpenses * 0.3 * (discretionarySpending / 100); // Assuming 30% of expenses are discretionary

    return increasedIncome - reducedExpenses - discretionaryAdjustment;
  };

  const potentialSavings = calculatePotentialSavings();
  const currentSavings = monthlyIncome - currentExpenses;
  const savingsIncrease = potentialSavings - currentSavings;

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
        className="flex-1 p-4 overflow-auto"
        style={{
          minHeight: WIDGET_STYLES.MIN_HEIGHT,
          maxHeight: WIDGET_STYLES.MAX_HEIGHT,
        }}
      >
        <div className="space-y-6">
          {/* Discretionary Spending Adjustment */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                Discretionary Spending
              </span>
              <span className="font-medium">{discretionarySpending}%</span>
            </div>
            <Slider
              value={[discretionarySpending]}
              onValueChange={([value]) => setDiscretionarySpending(value)}
              min={0}
              max={100}
              step={5}
            />
          </div>

          {/* Additional Income Potential */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Additional Income</span>
              <span className="font-medium">+{additionalIncome}%</span>
            </div>
            <Slider
              value={[additionalIncome]}
              onValueChange={([value]) => setAdditionalIncome(value)}
              min={0}
              max={50}
              step={5}
            />
          </div>

          {/* Expense Reduction */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Expense Reduction</span>
              <span className="font-medium">-{expenseReduction}%</span>
            </div>
            <Slider
              value={[expenseReduction]}
              onValueChange={([value]) => setExpenseReduction(value)}
              min={0}
              max={30}
              step={5}
            />
          </div>

          {/* Results */}
          <div className="space-y-4 p-4 bg-accent/50 rounded-lg">
            <div>
              <div className="text-sm text-muted-foreground">
                Current Monthly Savings
              </div>
              <div className="text-lg font-semibold">
                {formatCurrency(currentSavings)}
              </div>
            </div>

            <div>
              <div className="text-sm text-muted-foreground">
                Potential Monthly Savings
              </div>
              <div className="text-lg font-semibold text-primary">
                {formatCurrency(potentialSavings)}
              </div>
            </div>

            <div className="pt-2 border-t">
              <div className="text-sm text-muted-foreground">
                Potential Increase
              </div>
              <div className="text-lg font-semibold text-primary">
                +{formatCurrency(savingsIncrease)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
