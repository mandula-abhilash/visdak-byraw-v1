"use client";

import { Card } from "@/components/ui/card";
import { DebtHeader } from "./DebtHeader";
import { Progress } from "@/components/ui/progress";
import { formatCurrency } from "../../utils/formatters";
import { WIDGET_STYLES } from "@/lib/constants/widget-styles";

const DebtSnowballCard = ({ debt }) => {
  const progress =
    ((debt.initial_amount - debt.current_amount) / debt.initial_amount) * 100;
  const monthlyPayment = debt.monthly_payment || 0;

  return (
    <div className="p-4 border rounded-lg space-y-3 hover:bg-accent/50 transition-colors">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-medium">{debt.name}</h3>
          <p className="text-sm text-muted-foreground">
            {formatCurrency(debt.current_amount)} remaining
          </p>
        </div>
        <div className="text-right">
          <div className="text-sm font-medium">
            {formatCurrency(monthlyPayment)}/mo
          </div>
          <div className="text-xs text-muted-foreground">
            {debt.interest_rate}% APR
          </div>
        </div>
      </div>
      <Progress value={progress} className="h-2" />
      <div className="text-xs text-muted-foreground">
        {Math.round(progress)}% paid off
      </div>
    </div>
  );
};

export const DebtSnowballWidget = ({
  title = "Debt Snowball",
  description = "Track your debt payoff progress",
}) => {
  const debts = [
    {
      name: "Credit Card",
      current_amount: 50000,
      initial_amount: 100000,
      monthly_payment: 15000,
      interest_rate: 18.99,
    },
    {
      name: "Personal Loan",
      current_amount: 200000,
      initial_amount: 300000,
      monthly_payment: 25000,
      interest_rate: 12.5,
    },
  ];

  return (
    <Card className="h-full flex flex-col shadow-lg">
      <DebtHeader title={title} description={description} />
      <div
        className="flex-1 p-4 overflow-y-auto"
        style={{
          minHeight: WIDGET_STYLES.MIN_HEIGHT,
          maxHeight: WIDGET_STYLES.MAX_HEIGHT,
        }}
      >
        <div className="space-y-4">
          {debts.map((debt, index) => (
            <DebtSnowballCard key={index} debt={debt} />
          ))}
        </div>
      </div>
    </Card>
  );
};
