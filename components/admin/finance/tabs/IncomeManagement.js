"use client";

import { IncomeTracker } from "../widgets/income/IncomeTracker";
import { IncomeSourcesBreakdown } from "../widgets/income/IncomeSourcesBreakdown";
import { RecurringIncome } from "../widgets/income/RecurringIncome";
import { ProjectedIncome } from "../widgets/income/ProjectedIncome";

export const IncomeManagement = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <IncomeTracker />
      <IncomeSourcesBreakdown />
      <RecurringIncome />
      <ProjectedIncome />
    </div>
  );
};
