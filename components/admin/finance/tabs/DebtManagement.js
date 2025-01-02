"use client";

import { DebtOverviewWidget } from "../widgets/debt/DebtOverviewWidget";
import { DebtSnowballWidget } from "../widgets/debt/DebtSnowballWidget";
import { InterestOverviewWidget } from "../widgets/debt/InterestOverviewWidget";
import { LoanCalculatorWidget } from "../widgets/debt/LoanCalculatorWidget";
import { LoanComparisonWidget } from "../widgets/debt/LoanComparisonWidget";

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

export const DebtManagement = () => {
  const widgets = [
    {
      component: DebtOverviewWidget,
      title: "Debt Overview",
      description: "Track all your debts and loans",
      width: "2/3",
    },
    {
      component: DebtSnowballWidget,
      title: "Debt Snowball",
      description: "Track your debt payoff progress",
      width: "1/3",
    },
    {
      component: InterestOverviewWidget,
      title: "Interest Overview",
      description: "Track interest payments over time",
      width: "1/2",
    },
    {
      component: LoanCalculatorWidget,
      title: "Loan Calculator",
      description: "Calculate loan payments and interest",
      width: "1/2",
    },
    {
      component: LoanComparisonWidget,
      title: "Loan Comparison (Work in progress)",
      description: "Compare different loan options",
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
