"use client";

import { ActivityWidget } from "@/components/widgets";

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

export const ActivityWidgetVariants = () => {
  const widgets = [
    {
      title: "Recent Activity",
      view: "timeline",
      showFilters: true,
      showSearch: true,
      width: "full",
    },
    {
      title: "System Updates",
      view: "updates",
      showFilters: false,
      showSearch: false,
      width: "1/2",
    },
  ];

  return (
    <div className="flex flex-wrap -mx-3">
      {widgets.map((widget, index) => (
        <div key={index} className={`${getWidgetWidth(widget.width)} mb-6`}>
          <div className="h-full">
            <ActivityWidget {...widget} />
          </div>
        </div>
      ))}
    </div>
  );
};
