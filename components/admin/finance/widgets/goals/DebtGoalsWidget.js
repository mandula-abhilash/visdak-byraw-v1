"use client";

import { Card } from "@/components/ui/card";
import { GoalsHeader } from "./GoalsHeader";
import { Progress } from "@/components/ui/progress";
import { formatCurrency } from "../../utils/formatters";
import { WIDGET_STYLES } from "@/lib/constants/widget-styles";

const DebtGoalCard = ({ goal }) => {
  const progress =
    ((goal.initial_amount - goal.current_amount) / goal.initial_amount) * 100;

  return (
    <div className="p-4 border rounded-lg space-y-3 hover:bg-accent/50 transition-colors">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">{goal.title}</h3>
        <span className="text-sm text-destructive">
          {formatCurrency(goal.current_amount)}
        </span>
      </div>
      <Progress value={progress} className="h-2" />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Initial: {formatCurrency(goal.initial_amount)}</span>
        <span>Paid: {Math.round(progress)}%</span>
      </div>
    </div>
  );
};

export const DebtGoalsWidget = ({ title, description }) => {
  const debtGoals = [
    {
      title: "Home Loan",
      current_amount: 4000000,
      initial_amount: 5000000,
    },
    {
      title: "Car Loan",
      current_amount: 300000,
      initial_amount: 800000,
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
          {debtGoals.map((goal, index) => (
            <DebtGoalCard key={index} goal={goal} />
          ))}
        </div>
      </div>
    </Card>
  );
};
