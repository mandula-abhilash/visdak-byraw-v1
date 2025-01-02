"use client";

import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "../../utils/formatters";

const DebtCard = ({ debt }) => {
  return (
    <div className="p-4 border rounded-lg space-y-3 hover:bg-accent/50 transition-colors">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-medium">{debt.name}</h3>
          <p className="text-sm text-muted-foreground">{debt.type}</p>
        </div>
        <Badge
          variant="outline"
          className="bg-destructive/10 text-destructive border-destructive/20 px-2"
        >
          {debt.interest_rate}% APR
        </Badge>
      </div>

      <div className="flex justify-between text-sm">
        <div>
          <div className="text-muted-foreground">Balance</div>
          <div className="font-medium">{formatCurrency(debt.balance)}</div>
        </div>
        <div className="text-right">
          <div className="text-muted-foreground">Monthly Payment</div>
          <div className="font-medium">
            {formatCurrency(debt.monthly_payment)}
          </div>
        </div>
      </div>

      <div className="text-xs text-muted-foreground">
        Next payment due: {debt.next_payment_date}
      </div>
    </div>
  );
};

export const DebtList = ({ debts = [], isLoading }) => {
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

  if (!debts.length) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-6">
        <p className="text-muted-foreground mb-2">No debts tracked yet</p>
        <p className="text-sm text-muted-foreground">
          Click the + button to add your first debt
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {debts.map((debt) => (
        <DebtCard key={debt.id} debt={debt} />
      ))}
    </div>
  );
};
