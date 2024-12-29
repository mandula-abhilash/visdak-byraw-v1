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

const KanbanColumn = ({ title, tasks, taskProps }) => (
  <div className="flex-1">
    <h3 className="font-medium text-sm mb-3">{title}</h3>
    <div className="space-y-2">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} {...taskProps} />
      ))}
      {tasks.length === 0 && (
        <div className="text-sm text-muted-foreground text-center py-4 border rounded-lg">
          No tasks
        </div>
      )}
    </div>
  </div>
);

const groupTasksByStatus = (tasks) => {
  const groups = {
    pending: tasks.filter((task) => task.status === "pending"),
    "in progress": tasks.filter((task) => task.status === "in progress"),
    completed: tasks.filter((task) => task.status === "completed"),
    overdue: tasks.filter((task) => task.status === "overdue"),
  };

  return Object.entries(groups).map(([status, tasks]) => ({
    title: `${status.charAt(0).toUpperCase() + status.slice(1)} (${
      tasks.length
    })`,
    tasks,
  }));
};

const groupTasksByPriority = (tasks) => {
  const groups = {
    high: tasks.filter((task) => task.priority === "high"),
    medium: tasks.filter((task) => task.priority === "medium"),
    low: tasks.filter((task) => task.priority === "low" || !task.priority),
  };

  return Object.entries(groups).map(([priority, tasks]) => ({
    title: `${priority.charAt(0).toUpperCase() + priority.slice(1)} Priority (${
      tasks.length
    })`,
    tasks,
  }));
};

const groupTasksByDueDate = (tasks) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const nextWeek = new Date(today);
  nextWeek.setDate(nextWeek.getDate() + 7);

  const groups = {
    overdue: tasks.filter((task) => {
      const dueDate = new Date(task.due_date);
      return dueDate < today;
    }),
    today: tasks.filter((task) => {
      const dueDate = new Date(task.due_date);
      return dueDate >= today && dueDate < tomorrow;
    }),
    tomorrow: tasks.filter((task) => {
      const dueDate = new Date(task.due_date);
      return dueDate >= tomorrow && dueDate < nextWeek;
    }),
    later: tasks.filter((task) => {
      const dueDate = new Date(task.due_date);
      return dueDate >= nextWeek;
    }),
  };

  return Object.entries(groups).map(([timeframe, tasks]) => ({
    title: `${timeframe.charAt(0).toUpperCase() + timeframe.slice(1)} (${
      tasks.length
    })`,
    tasks,
  }));
};

export const TaskList = ({
  tasks = [],
  isLoading,
  view,
  groupBy = "status",
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

  if (view === "kanban") {
    const taskProps = {
      showDueDate,
      showPriority,
      showCompletedDate,
      showOverdueDuration,
    };

    let groupedTasks;
    switch (groupBy) {
      case "priority":
        groupedTasks = groupTasksByPriority(tasks);
        break;
      case "dueDate":
        groupedTasks = groupTasksByDueDate(tasks);
        break;
      case "status":
      default:
        groupedTasks = groupTasksByStatus(tasks);
        break;
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {groupedTasks.map(({ title, tasks }) => (
          <KanbanColumn
            key={title}
            title={title}
            tasks={tasks}
            taskProps={taskProps}
          />
        ))}
      </div>
    );
  }

  // List view
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
};
