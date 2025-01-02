"use client";

import { TaxEstimatorWidget } from "../widgets/tax/TaxEstimatorWidget";
import { TaxSavingsWidget } from "../widgets/tax/TaxSavingsWidget";
import { TaxPaymentWidget } from "../widgets/tax/TaxPaymentWidget";
import { TaxTrendsWidget } from "../widgets/tax/TaxTrendsWidget";

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

export const TaxManagement = () => {
  const widgets = [
    {
      component: TaxEstimatorWidget,
      title: "Tax Estimator",
      description: "Calculate your tax liability",
      width: "1/2",
    },
    {
      component: TaxSavingsWidget,
      title: "Tax Savings",
      description: "Track your tax-saving investments",
      width: "1/2",
    },
    {
      component: TaxPaymentWidget,
      title: "Tax Payments",
      description: "Track advance tax payments and deadlines",
      width: "1/2",
    },
    {
      component: TaxTrendsWidget,
      title: "Tax Trends",
      description: "Historical tax analysis",
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
