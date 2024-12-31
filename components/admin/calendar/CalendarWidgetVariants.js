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
      width: "1/3",
      showEventCount: true,
      showWeekNumbers: false,
    },
    {
      title: "Weekly Schedule",
      view: "week",
      width: "1/3",
      showEventDetails: true,
      showTimeSlots: true,
    },
    {
      title: "Daily Agenda",
      view: "day",
      width: "1/2",
      showEventDetails: true,
      showTimeSlots: true,
    },
    {
      title: "Upcoming Events",
      view: "list",
      width: "1/2",
      limit: 5,
      showEventDetails: true,
    },
    {
      title: "Mini Calendar",
      view: "mini",
      width: "1/3",
      showEventCount: true,
    },
    {
      title: "Team Schedule",
      view: "team",
      width: "2/3",
      showEventDetails: true,
      showTimeSlots: true,
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
