"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
  groupBy = "status",
  showDueDate = true,
  showPriority = false,
  showStatusCount = false,
  showCompletedDate = false,
  showOverdueDuration = false,
  showKanbanToggle = false,
}) => {
  const [selectedView, setSelectedView] = useState("list");
  const [selectedGroupBy, setSelectedGroupBy] = useState(groupBy);
  const { tasks, isLoading, error } = useTaskWidget({
    dateRange,
    sort,
    limit,
    statusFilter,
    priorityFilter,
    groupBy: selectedGroupBy,
  });

  if (error) {
    return (
      <Card className="h-full">
        <CardContent className="pt-6">
          <div className="text-sm text-destructive">
            Error loading tasks: {error.message}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full flex flex-col shadow-lg">
      <CardHeader className="pb-3 flex-none border-b">
        <TaskWidgetHeader
          title={title}
          selectedView={selectedView}
          onViewChange={setSelectedView}
          selectedGroupBy={selectedGroupBy}
          onGroupByChange={setSelectedGroupBy}
          taskCount={tasks?.length || 0}
          showKanbanToggle={showKanbanToggle}
        />
      </CardHeader>
      <CardContent className="flex-1 p-4 min-h-[300px] max-h-[500px] overflow-y-auto">
        <div className="h-full">
          <TaskList
            tasks={tasks}
            isLoading={isLoading}
            view={selectedView}
            groupBy={selectedGroupBy}
            showDueDate={showDueDate}
            showPriority={showPriority}
            showStatusCount={showStatusCount}
            showCompletedDate={showCompletedDate}
            showOverdueDuration={showOverdueDuration}
          />
        </div>
      </CardContent>
    </Card>
  );
};
