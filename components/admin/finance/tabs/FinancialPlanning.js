"use client";

import { RetirementPlannerWidget } from "../widgets/planning/RetirementPlannerWidget";
import { EducationFundWidget } from "../widgets/planning/EducationFundWidget";
import { HomeLoanWidget } from "../widgets/planning/HomeLoanWidget";

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

export const FinancialPlanning = () => {
  const widgets = [
    {
      component: RetirementPlannerWidget,
      title: "Retirement Planner",
      description: "Plan your retirement savings",
      width: "2/3",
    },
    {
      component: EducationFundWidget,
      title: "Education Fund",
      description: "Plan for education expenses",
      width: "1/2",
    },
    {
      component: HomeLoanWidget,
      title: "Home Loan Affordability",
      description: "Calculate home loan eligibility",
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
