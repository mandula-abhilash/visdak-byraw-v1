"use client";

import { SpendingInsightsWidget } from "../widgets/analytics/SpendingInsightsWidget";
import { RecurringTransactionWidget } from "../widgets/analytics/RecurringTransactionWidget";
import { YearlyFinancialWidget } from "../widgets/analytics/YearlyFinancialWidget";

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

export const Analytics = () => {
  const widgets = [
    {
      component: SpendingInsightsWidget,
      title: "Spending Insights",
      description: "Unusual spending patterns and alerts",
      width: "1/2",
    },
    {
      component: RecurringTransactionWidget,
      title: "Recurring Transactions",
      description: "Analysis of recurring payment patterns",
      width: "1/2",
    },
    {
      component: YearlyFinancialWidget,
      title: "Yearly Financial Summary",
      description: "Year-over-year financial comparison",
      width: "full",
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
