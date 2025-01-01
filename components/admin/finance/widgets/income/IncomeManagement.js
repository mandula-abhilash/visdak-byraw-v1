"use client";

import { IncomeTracker } from "./IncomeTracker";
import { IncomeSourcesBreakdown } from "./IncomeSourcesBreakdown";
import { RecurringIncome } from "./RecurringIncome";
import { ProjectedIncome } from "./ProjectedIncome";

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

export const IncomeManagement = () => {
  const widgets = [
    {
      component: IncomeTracker,
      title: "Income Tracker",
      description: "Monthly income overview",
      width: "1/2",
    },
    {
      component: IncomeSourcesBreakdown,
      title: "Income Sources",
      description: "Distribution of income across sources",
      width: "1/2",
    },
    {
      component: RecurringIncome,
      title: "Recurring Income",
      description: "Regular income streams",
      width: "full",
    },
    {
      component: ProjectedIncome,
      title: "Projected Income",
      description: "Future income projections",
      width: "full",
    },
  ];

  return (
    <div className="flex flex-wrap -mx-3">
      {widgets.map((widget, index) => {
        const Widget = widget.component;
        const widthClass = getWidgetWidth(widget.width);
        return (
          <div key={index} className={widthClass}>
            <div className="h-full mb-6">
              <Widget title={widget.title} description={widget.description} />
            </div>
          </div>
        );
      })}
    </div>
  );
};
