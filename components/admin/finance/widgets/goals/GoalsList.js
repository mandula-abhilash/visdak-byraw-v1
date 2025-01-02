"use client";

import { Progress } from "@/components/ui/progress";
import { formatCurrency } from "../../utils/formatters";

const GoalCard = ({ goal }) => {
  const progress = (goal.current_amount / goal.target_amount) * 100;
  const remaining = goal.target_amount - goal.current_amount;

  return (
    <div className="p-4 border rounded-lg space-y-3 hover:bg-accent/50 transition-colors">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-medium">{goal.title}</h3>
          <p className="text-sm text-muted-foreground">{goal.description}</p>
        </div>
        <span className={`px-2 py-1 text-xs rounded-full ${goal.status_class}`}>
          {goal.status}
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>{formatCurrency(goal.current_amount)}</span>
          <span>{formatCurrency(goal.target_amount)}</span>
        </div>
        <Progress value={progress} className="h-2" />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{Math.round(progress)}% Complete</span>
          <span>{formatCurrency(remaining)} remaining</span>
        </div>
      </div>

      {goal.target_date && (
        <div className="text-xs text-muted-foreground">
          Target Date: {new Date(goal.target_date).toLocaleDateString()}
        </div>
      )}
    </div>
  );
};

export const GoalsList = ({ goals = [], isLoading }) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="h-[120px] rounded-lg bg-accent/50 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (!goals.length) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-6">
        <p className="text-muted-foreground mb-2">No financial goals yet</p>
        <p className="text-sm text-muted-foreground">
          Click the + button to add your first goal
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {goals.map((goal) => (
        <GoalCard key={goal.id} goal={goal} />
      ))}
    </div>
  );
};
