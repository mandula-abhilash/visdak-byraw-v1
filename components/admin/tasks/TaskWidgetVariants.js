"use client";

import { TaskWidget } from "@/components/widgets";

export const TaskWidgetVariants = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upcoming Tasks Overview */}
        <TaskWidget
          title="Upcoming Tasks"
          dateRange={["today", "next 7 days"]}
          sort="asc"
          limit={5}
          statusFilter={["pending"]}
          showDueDate={true}
        />

        {/* Overdue Tasks Overview */}
        <TaskWidget
          title="Overdue Tasks"
          dateRange={["past"]}
          sort="asc"
          limit={5}
          statusFilter={["overdue"]}
          showDueDate={true}
          showOverdueDuration={true}
        />

        {/* Completed Tasks Overview */}
        <TaskWidget
          title="Recently Completed"
          dateRange={["last 7 days"]}
          sort="desc"
          limit={5}
          statusFilter={["completed"]}
          showCompletedDate={true}
        />

        {/* High Priority Tasks */}
        <TaskWidget
          title="High Priority"
          priorityFilter="high"
          sort="asc"
          limit={5}
          statusFilter={["pending", "in progress"]}
          showPriority={true}
          showDueDate={true}
        />

        {/* Tasks Due Today */}
        <TaskWidget
          title="Due Today"
          dateRange={["today"]}
          sort="asc"
          limit={5}
          statusFilter={["pending"]}
          showDueDate={true}
          showPriority={true}
        />

        {/* Oldest Pending Tasks */}
        <TaskWidget
          title="Oldest Pending"
          dateRange={["past"]}
          sort="asc"
          limit={5}
          statusFilter={["pending"]}
          showDueDate={true}
          showOverdueDuration={true}
        />
      </div>
    </div>
  );
};
