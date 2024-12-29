"use client";

import { TaskWidget } from "@/components/widgets";

export const TaskWidgetVariants = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap -mx-3">
        {/* First Row */}
        <TaskWidget
          title="Upcoming Tasks"
          dateRange={["today", "next 7 days"]}
          sort="asc"
          limit={5}
          statusFilter={["pending"]}
          showDueDate={true}
          width="1/2"
        />

        <TaskWidget
          title="Overdue Tasks"
          dateRange={["past"]}
          sort="asc"
          limit={5}
          statusFilter={["overdue"]}
          showDueDate={true}
          showOverdueDuration={true}
          width="1/2"
        />

        {/* Second Row */}
        <TaskWidget
          title="Recently Completed"
          dateRange={["last 7 days"]}
          sort="desc"
          limit={5}
          statusFilter={["completed"]}
          showCompletedDate={true}
          width="1/2"
        />

        <TaskWidget
          title="High Priority"
          priorityFilter="high"
          sort="asc"
          limit={5}
          statusFilter={["pending", "in progress"]}
          showPriority={true}
          showDueDate={true}
          width="1/2"
        />

        <TaskWidget
          title="Due Today"
          dateRange={["today"]}
          sort="asc"
          limit={5}
          statusFilter={["pending"]}
          showDueDate={true}
          showPriority={true}
          width="1/2"
        />

        {/* Full Width Widget */}
        <TaskWidget
          title="Oldest Pending"
          dateRange={["past"]}
          sort="asc"
          limit={5}
          statusFilter={["pending"]}
          showDueDate={true}
          showOverdueDuration={true}
          width="full"
        />
      </div>
    </div>
  );
};
