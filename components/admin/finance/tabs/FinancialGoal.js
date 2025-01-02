"use client";

import { FinancialGoalsWidget } from "../widgets/goals/FinancialGoalsWidget";
import { SavingsGoalsWidget } from "../widgets/goals/SavingsGoalsWidget";
import { InvestmentGoalsWidget } from "../widgets/goals/InvestmentGoalsWidget";
import { DebtGoalsWidget } from "../widgets/goals/DebtGoalsWidget";

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

export const FinancialGoal = () => {
  const widgets = [
    {
      component: FinancialGoalsWidget,
      title: "Overall Goals",
      description: "Track all your financial goals",
      width: "2/3",
    },
    {
      component: SavingsGoalsWidget,
      title: "Savings Goals",
      description: "Monitor your savings targets",
      width: "1/3",
    },
    {
      component: InvestmentGoalsWidget,
      title: "Investment Goals",
      description: "Track investment portfolio targets",
      width: "1/2",
    },
    {
      component: DebtGoalsWidget,
      title: "Debt Goals",
      description: "Monitor debt repayment progress",
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
