"use client";

import { CheckCircle2, Circle, Clock, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const TaskItem = ({
  task,
  showDueDate,
  showPriority,
  showCompletedDate,
  showOverdueDuration,
}) => {
  const getStatusIcon = () => {
    switch (task.status) {
      case "completed":
        return <CheckCircle2 className="h-4 w-4 text-primary" />;
      case "pending":
        return <Circle className="h-4 w-4 text-muted-foreground" />;
      case "overdue":
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getPriorityClass = () => {
    switch (task.priority) {
      case "high":
        return "text-destructive";
      case "medium":
        return "text-primary";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <div className="flex items-start gap-3 rounded-lg border p-3 hover:bg-accent/50 transition-colors">
      <div className="pt-0.5">{getStatusIcon()}</div>
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium leading-none">{task.title}</p>
        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
          {showDueDate && task.due_date && (
            <span>Due: {new Date(task.due_date).toLocaleDateString()}</span>
          )}
          {showPriority && task.priority && (
            <span className={cn("capitalize", getPriorityClass())}>
              {task.priority}
            </span>
          )}
          {showCompletedDate && task.completed_on && (
            <span>
              Completed: {new Date(task.completed_on).toLocaleDateString()}
            </span>
          )}
          {showOverdueDuration && task.overdue_days && (
            <span className="text-destructive">
              {task.overdue_days} days overdue
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export const TaskList = ({
  tasks = [],
  isLoading,
  view,
  showDueDate,
  showPriority,
  showStatusCount,
  showCompletedDate,
  showOverdueDuration,
}) => {
  if (isLoading) {
    return (
      <div className="space-y-2">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="h-[60px] rounded-lg bg-accent/50 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (!tasks.length) {
    return (
      <div className="py-6 text-center text-sm text-muted-foreground">
        No tasks found
      </div>
    );
  }

  if (view === "list") {
    return (
      <div className="space-y-2">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            showDueDate={showDueDate}
            showPriority={showPriority}
            showCompletedDate={showCompletedDate}
            showOverdueDuration={showOverdueDuration}
          />
        ))}
      </div>
    );
  }

  // Kanban view would go here
  return null;
};
