"use client";

import { CalendarWidget } from "@/components/widgets";

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

export const CalendarWidgetVariants = () => {
  const widgets = [
    {
      title: "Monthly Calendar",
      view: "month",
      width: "2/3",
      showEventCount: true,
      showWeekNumbers: false,
    },
    {
      title: "Weekly Schedule",
      view: "week",
      width: "full",
      showEventDetails: true,
      showTimeSlots: true,
    },
    {
      title: "Mini Calendar",
      view: "mini",
      width: "1/3",
      showEventCount: true,
    },
  ];

  return (
    <div className="flex flex-wrap -mx-3">
      {widgets.map((widget, index) => (
        <div key={index} className={`${getWidgetWidth(widget.width)} mb-6`}>
          <div className="h-full">
            <CalendarWidget {...widget} />
          </div>
        </div>
      ))}
    </div>
  );
};
