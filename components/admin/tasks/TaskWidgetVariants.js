"use client";

import { TaskWidget } from "@/components/widgets";

export const TaskWidgetVariants = () => {
  const widgets = [
    {
      title: "Upcoming Tasks",
      dateRange: ["today", "next 7 days"],
      sort: "asc",
      limit: 5,
      statusFilter: ["pending"],
      showDueDate: true,
      width: "1/2",
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
      width: "2/3",
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
    <div className="flex flex-wrap -mx-3 gap-y-6">
      {widgets.map((widget, index) => (
        <TaskWidget key={index} {...widget} />
      ))}
    </div>
  );
};
