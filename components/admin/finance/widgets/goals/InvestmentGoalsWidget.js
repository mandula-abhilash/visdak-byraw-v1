"use client";

import { Card } from "@/components/ui/card";
import { GoalsHeader } from "./GoalsHeader";
import { Progress } from "@/components/ui/progress";
import { formatCurrency } from "../../utils/formatters";
import { WIDGET_STYLES } from "@/lib/constants/widget-styles";

const InvestmentGoalCard = ({ goal }) => {
  const progress = (goal.current_amount / goal.target_amount) * 100;
  const returns = goal.current_amount - goal.invested_amount;
  const returnsPercentage = (returns / goal.invested_amount) * 100;

  return (
    <div className="p-4 border rounded-lg space-y-3 hover:bg-accent/50 transition-colors">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">{goal.title}</h3>
        <span
          className={`text-sm ${
            returns >= 0 ? "text-primary" : "text-destructive"
          }`}
        >
          {returnsPercentage >= 0 ? "+" : ""}
          {Math.round(returnsPercentage)}%
        </span>
      </div>
      <Progress value={progress} className="h-2" />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Current: {formatCurrency(goal.current_amount)}</span>
        <span>Target: {formatCurrency(goal.target_amount)}</span>
      </div>
    </div>
  );
};

export const InvestmentGoalsWidget = ({ title, description }) => {
  const investmentGoals = [
    {
      title: "Retirement Fund",
      current_amount: 3500000,
      invested_amount: 3000000,
      target_amount: 5000000,
    },
    {
      title: "Stock Portfolio",
      current_amount: 950000,
      invested_amount: 1000000,
      target_amount: 1500000,
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
          {investmentGoals.map((goal, index) => (
            <InvestmentGoalCard key={index} goal={goal} />
          ))}
        </div>
      </div>
    </Card>
  );
};
