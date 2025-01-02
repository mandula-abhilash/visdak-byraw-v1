"use client";

import { Card } from "@/components/ui/card";
import { GoalsList } from "./GoalsList";
import { GoalsHeader } from "./GoalsHeader";
import { useFinancialGoals } from "./hooks/useFinancialGoals";
import { WIDGET_STYLES } from "@/lib/constants/widget-styles";

export const FinancialGoalsWidget = ({
  title = "Financial Goals",
  description = "Track your savings and investment goals",
  width = "2/3",
}) => {
  const { goals, isLoading, error } = useFinancialGoals();

  if (error) {
    return (
      <Card className="h-full">
        <div className="p-6 text-sm text-destructive">
          Error loading goals: {error.message}
        </div>
      </Card>
    );
  }

  return (
    <Card className="h-full flex flex-col shadow-lg">
      <GoalsHeader title={title} description={description} />
      <div
        className="flex-1 p-4 overflow-y-auto"
        style={{
          minHeight: WIDGET_STYLES.MIN_HEIGHT,
          maxHeight: WIDGET_STYLES.MAX_HEIGHT,
        }}
      >
        <GoalsList goals={goals} isLoading={isLoading} />
      </div>
    </Card>
  );
};
