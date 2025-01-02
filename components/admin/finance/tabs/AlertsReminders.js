"use client";

import { BillPaymentWidget } from "../widgets/alerts/BillPaymentWidget";
import { SubscriptionWidget } from "../widgets/alerts/SubscriptionWidget";
import { LowBalanceWidget } from "../widgets/alerts/LowBalanceWidget";
import { IntelligentRemindersWidget } from "../widgets/alerts/IntelligentRemindersWidget";
import { PaymentDistributionWidget } from "../widgets/alerts/PaymentDistributionWidget";
import { PaymentTimelineWidget } from "../widgets/alerts/PaymentTimelineWidget";
import { PaymentTrendsWidget } from "../widgets/alerts/PaymentTrendsWidget";

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

export const AlertsReminders = () => {
  const widgets = [
    {
      component: BillPaymentWidget,
      title: "Bill Payments",
      description: "Track upcoming bill payments",
      width: "1/2",
    },
    {
      component: SubscriptionWidget,
      title: "Subscription Renewals",
      description: "Monitor subscription renewals",
      width: "1/2",
    },
    {
      component: LowBalanceWidget,
      title: "Low Balance Alerts",
      description: "Monitor account balances",
      width: "1/2",
    },
    {
      component: IntelligentRemindersWidget,
      title: "Intelligent Reminders",
      description: "Smart payment insights",
      width: "1/2",
    },
    {
      component: PaymentDistributionWidget,
      title: "Payment Distribution",
      description: "Distribution by category",
      width: "1/3",
    },
    {
      component: PaymentTimelineWidget,
      title: "Payment Timeline",
      description: "Upcoming payment schedule",
      width: "1/3",
    },
    {
      component: PaymentTrendsWidget,
      title: "Payment Trends",
      description: "Historical payment analysis",
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
