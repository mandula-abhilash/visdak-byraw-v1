"use client";

import { MonthlyBudget } from "../widgets/budget/MonthlyBudget";
import { CategoryBudgets } from "../widgets/budget/CategoryBudgets";
import { SavingsBudget } from "../widgets/budget/SavingsBudget";
import { BudgetDistribution } from "../widgets/budget/BudgetDistribution";

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

export const Budgeting = () => {
  const widgets = [
    {
      component: MonthlyBudget,
      title: "Monthly Budget",
      description: "Track spending against budgeted amounts",
      width: "2/3",
    },
    {
      component: CategoryBudgets,
      title: "Category Budgets",
      description: "Track budgets by category",
      width: "1/3",
    },
    {
      component: SavingsBudget,
      title: "Savings Goals",
      description: "Monitor savings progress",
      width: "1/2",
    },
    {
      component: BudgetDistribution,
      title: "Budget Distribution",
      description: "40-30-20 Rule Distribution",
      width: "1/2",
    },
  ];

  return (
    <div className="flex flex-wrap -mx-3">
      {widgets.map((widget, index) => {
        const Widget = widget.component;
        return (
          <div key={index} className={`${getWidgetWidth(widget.width)} mb-6`}>
            <div className="h-full">
              <Widget title={widget.title} description={widget.description} />
            </div>
          </div>
        );
      })}
    </div>
  );
};
