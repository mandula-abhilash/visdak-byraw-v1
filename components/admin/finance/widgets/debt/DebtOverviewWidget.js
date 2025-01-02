"use client";

import { Card } from "@/components/ui/card";
import { DebtHeader } from "./DebtHeader";
import { DebtList } from "./DebtList";
import { useDebts } from "./hooks/useDebts";
import { WIDGET_STYLES } from "@/lib/constants/widget-styles";

export const DebtOverviewWidget = ({
  title = "Debt Overview",
  description = "Track all your debts and loans",
}) => {
  const { debts, isLoading, error } = useDebts();

  if (error) {
    return (
      <Card className="h-full">
        <div className="p-6 text-sm text-destructive">
          Error loading debts: {error.message}
        </div>
      </Card>
    );
  }

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
        <DebtList debts={debts} isLoading={isLoading} />
      </div>
    </Card>
  );
};
