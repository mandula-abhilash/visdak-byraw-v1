"use client";

import { TaskWidget } from "@/components/widgets";

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

export const TaskWidgetVariants = () => {
  const widgets = [
    {
      title: "Upcoming Tasks",
      dateRange: ["today", "next 7 days"],
      sort: "asc",
      limit: 5,
      statusFilter: ["pending"],
      showDueDate: true,
      width: "full",
    },
    {
      title: "Overdue Tasks",
      dateRange: ["past"],
      sort: "asc",
      limit: 5,
      statusFilter: ["overdue"],
      showDueDate: true,
      showOverdueDuration: true,
      width: "1/2",
    },
    {
      title: "Recently Completed",
      dateRange: ["last 7 days"],
      sort: "desc",
      limit: 5,
      statusFilter: ["completed"],
      showCompletedDate: true,
      width: "1/2",
    },
    {
      title: "High Priority",
      priorityFilter: "high",
      sort: "asc",
      limit: 5,
      statusFilter: ["pending", "in progress"],
      showPriority: true,
      showDueDate: true,
      width: "1/3",
    },
    {
      title: "Due Today",
      dateRange: ["today"],
      sort: "asc",
      limit: 5,
      statusFilter: ["pending"],
      showDueDate: true,
      showPriority: true,
      width: "1/3",
    },
    {
      title: "Oldest Pending",
      dateRange: ["past"],
      sort: "asc",
      limit: 5,
      statusFilter: ["pending"],
      showDueDate: true,
      showOverdueDuration: true,
      width: "full",
    },
  ];

  return (
    <div className="flex flex-wrap -mx-3 space-y-4">
      {widgets.map((widget, index) => (
        <div key={index} className={getWidgetWidth(widget.width)}>
          <TaskWidget {...widget} />
        </div>
      ))}
    </div>
  );
};
