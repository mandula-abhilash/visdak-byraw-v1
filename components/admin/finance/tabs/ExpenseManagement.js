"use client";

import { ExpenseTracker } from "../widgets/expense/ExpenseTracker";
import { CategoryBreakdown } from "../widgets/expense/CategoryBreakdown";
import { RecurringExpenses } from "../widgets/expense/RecurringExpenses";
import { ExpenseTrends } from "../widgets/expense/ExpenseTrends";
import { TopExpenses } from "../widgets/expense/TopExpenses";
import { SpendingAlerts } from "../widgets/expense/SpendingAlerts";

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

export const ExpenseManagement = () => {
  const widgets = [
    {
      component: ExpenseTracker,
      title: "Expense Tracker",
      description: "Monitor daily, monthly, and yearly expenses",
      width: "2/3",
    },
    {
      component: CategoryBreakdown,
      title: "Category Breakdown",
      description: "Expenses by category",
      width: "1/3",
    },
    {
      component: RecurringExpenses,
      title: "Recurring Expenses",
      description: "Regular monthly payments and subscriptions",
      width: "1/2",
    },
    {
      component: TopExpenses,
      title: "Top Expenses",
      description: "Highest expenses this period",
      width: "1/2",
    },
    {
      component: ExpenseTrends,
      title: "Expense Trends",
      description: "Spending patterns over time",
      width: "2/3",
    },
    {
      component: SpendingAlerts,
      title: "Spending Alerts",
      description: "Budget alerts and notifications",
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
              <Widget title={widget.title} description={widget.description} />
            </div>
          </div>
        );
      })}
    </div>
  );
};
