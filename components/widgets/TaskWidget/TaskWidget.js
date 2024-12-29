"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TaskList } from "./TaskList";
import { TaskWidgetHeader } from "./TaskWidgetHeader";
import { useTaskWidget } from "./useTaskWidget";

export const TaskWidget = ({
  title = "Tasks",
  dateRange = ["today", "next 7 days"],
  sort = "asc",
  limit = 5,
  statusFilter = ["pending"],
  priorityFilter = null,
  groupBy = null,
  showDueDate = true,
  showPriority = false,
  showStatusCount = false,
  showCompletedDate = false,
  showOverdueDuration = false,
}) => {
  const [selectedView, setSelectedView] = useState("list");
  const { tasks, isLoading, error } = useTaskWidget({
    dateRange,
    sort,
    limit,
    statusFilter,
    priorityFilter,
    groupBy,
  });

  if (error) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-sm text-destructive">
            Error loading tasks: {error.message}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <TaskWidgetHeader
          title={title}
          selectedView={selectedView}
          onViewChange={setSelectedView}
          taskCount={tasks?.length || 0}
        />
      </CardHeader>
      <CardContent>
        <TaskList
          tasks={tasks}
          isLoading={isLoading}
          view={selectedView}
          showDueDate={showDueDate}
          showPriority={showPriority}
          showStatusCount={showStatusCount}
          showCompletedDate={showCompletedDate}
          showOverdueDuration={showOverdueDuration}
        />
      </CardContent>
    </Card>
  );
};
