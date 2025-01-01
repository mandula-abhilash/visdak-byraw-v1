"use client";

import { RecurringIncomeItem } from "./RecurringIncomeItem";

export const RecurringIncomeList = ({ items = [] }) => {
  if (!items.length) {
    return (
      <div className="text-center py-6 text-sm text-muted-foreground">
        No recurring income found
      </div>
    );
  }

  return (
    <div className="space-y-3 max-h-[300px] overflow-y-auto">
      {items.map((item) => (
        <RecurringIncomeItem key={item.id} item={item} />
      ))}
    </div>
  );
};
