"use client";

import { NotesWidget } from "@/components/widgets";

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

export const NotesWidgetVariants = () => {
  const widgets = [
    {
      title: "All Notes",
      view: "list",
      showCount: true,
      showLabels: true,
      showDates: true,
      width: "2/3",
    },
    {
      title: "Quick Notes",
      view: "grid",
      showCount: true,
      showLabels: false,
      showDates: false,
      width: "2/3",
    },
    {
      title: "Pinned Notes",
      view: "list",
      showCount: true,
      showLabels: true,
      showDates: true,
      filter: "pinned",
      width: "2/3",
    },
    {
      title: "Recent Notes",
      view: "grid",
      showCount: true,
      showLabels: true,
      showDates: true,
      limit: 6,
      width: "2/3",
    },
  ];

  return (
    <div className="flex flex-wrap -mx-3">
      {widgets.map((widget, index) => (
        <div key={index} className={`${getWidgetWidth(widget.width)} mb-6`}>
          <div className="h-full">
            <NotesWidget {...widget} />
          </div>
        </div>
      ))}
    </div>
  );
};
