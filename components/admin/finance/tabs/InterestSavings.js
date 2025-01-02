"use client";

import { InterestCalculatorWidget } from "../widgets/interest/InterestCalculatorWidget";
import { CompoundGrowthWidget } from "../widgets/interest/CompoundGrowthWidget";
import { SavingsRateWidget } from "../widgets/interest/SavingsRateWidget";
import { SavingsGoalWidget } from "../widgets/interest/SavingsGoalWidget";

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

export const InterestSavings = () => {
  const widgets = [
    {
      component: InterestCalculatorWidget,
      title: "Interest Calculator",
      description: "Calculate interest on savings and deposits",
      width: "1/2",
    },
    {
      component: CompoundGrowthWidget,
      title: "Compound Growth",
      description: "Visualize compound interest growth",
      width: "1/2",
    },
    {
      component: SavingsRateWidget,
      title: "Savings Rate",
      description: "Track your savings percentage",
      width: "1/2",
    },
    {
      component: SavingsGoalWidget,
      title: "Savings Goal",
      description: "Plan and track savings goals",
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
