"use client";

import { Card } from "@/components/ui/card";
import { GoalsHeader } from "./GoalsHeader";
import { Progress } from "@/components/ui/progress";
import { formatCurrency } from "../../utils/formatters";
import { WIDGET_STYLES } from "@/lib/constants/widget-styles";

const SavingsGoalCard = ({ goal }) => {
  const progress = (goal.current_amount / goal.target_amount) * 100;

  return (
    <div className="p-4 border rounded-lg space-y-3 hover:bg-accent/50 transition-colors">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">{goal.title}</h3>
        <span className="text-sm text-muted-foreground">
          {formatCurrency(goal.current_amount)}
        </span>
      </div>
      <Progress value={progress} className="h-2" />
      <div className="text-xs text-muted-foreground">
        {Math.round(progress)}% of {formatCurrency(goal.target_amount)}
      </div>
    </div>
  );
};

export const SavingsGoalsWidget = ({ title, description }) => {
  const savingsGoals = [
    {
      title: "Emergency Fund",
      current_amount: 450000,
      target_amount: 600000,
    },
    {
      title: "Vacation Fund",
      current_amount: 180000,
      target_amount: 200000,
    },
  ];

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
        <div className="space-y-4">
          {savingsGoals.map((goal, index) => (
            <SavingsGoalCard key={index} goal={goal} />
          ))}
        </div>
      </div>
    </Card>
  );
};
