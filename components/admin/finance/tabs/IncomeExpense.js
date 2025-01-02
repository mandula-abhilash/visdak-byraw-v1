"use client";

import { IncomeExpenseOverview } from "../widgets/income-expense/IncomeExpenseOverview";
import { CashFlowTrends } from "../widgets/income-expense/CashFlowTrends";
import { ExpenseIncomeRatio } from "../widgets/income-expense/ExpenseIncomeRatio";
import { CategoryBreakdown } from "../widgets/income-expense/CategoryBreakdown";
import { SurplusDeficitIndicator } from "../widgets/income-expense/SurplusDeficitIndicator";
import { SavingsPotential } from "../widgets/income-expense/SavingsPotential";
import { MonthlyComparison } from "../widgets/income-expense/MonthlyComparison";

const widthClasses = {
  "1/4": "w-full md:w-1/4 px-3",
  "1/3": "w-full md:w-1/3 px-3",
  "1/2": "w-full md:w-1/2 px-3",
  "2/3": "w-full md:w-2/3 px-3",
  "3/4": "w-full md:w-3/4 px-3",
  full: "w-full px-3",
};

const getWidgetWidth = (width) => {
  return widthClasses[width] || widthClasses["full"];
};

export const IncomeExpense = () => {
  const widgets = [
    {
      component: IncomeExpenseOverview,
      title: "Income vs Expense Overview",
      description: "Compare total income and expenses",
      width: "2/3",
    },
    {
      component: ExpenseIncomeRatio,
      title: "Expense to Income Ratio",
      description: "Spending ratio analysis",
      width: "1/3",
    },
    {
      component: CashFlowTrends,
      title: "Cash Flow Trends",
      description: "Track cash flow over time",
      width: "full",
    },
    {
      component: CategoryBreakdown,
      title: "Income Categories",
      description: "Income sources breakdown",
      type: "income",
      width: "1/2",
    },
    {
      component: CategoryBreakdown,
      title: "Expense Categories",
      description: "Expense distribution",
      type: "expense",
      width: "1/2",
    },
    {
      component: SurplusDeficitIndicator,
      title: "Surplus/Deficit Analysis",
      description: "Financial health indicators",
      width: "1/3",
    },
    {
      component: SavingsPotential,
      title: "Savings Simulator",
      description: "Simulate potential savings",
      width: "1/3",
    },
    {
      component: MonthlyComparison,
      title: "Monthly Comparison",
      description: "Month-over-month analysis",
      width: "1/3",
    },
  ];

  return (
    <div className="flex flex-wrap -mx-3">
      {widgets.map((widget, index) => {
        const Widget = widget.component;
        return (
          <div key={index} className={`${getWidgetWidth(widget.width)} mb-6`}>
            <div className="h-full">
              <Widget
                title={widget.title}
                description={widget.description}
                type={widget.type}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
