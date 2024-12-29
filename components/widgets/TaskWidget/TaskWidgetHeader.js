"use client";

import { LayoutList, LayoutKanban } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";

export const TaskWidgetHeader = ({
  title,
  selectedView,
  onViewChange,
  taskCount,
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <CardTitle className="text-base font-medium">
          {title}
          {taskCount > 0 && (
            <span className="ml-2 text-sm text-muted-foreground">
              ({taskCount})
            </span>
          )}
        </CardTitle>
      </div>
      <div className="flex items-center gap-1">
        <Button
          variant={selectedView === "list" ? "secondary" : "ghost"}
          size="icon"
          className="h-8 w-8"
          onClick={() => onViewChange("list")}
        >
          <LayoutList className="h-4 w-4" />
          <span className="sr-only">List view</span>
        </Button>
        <Button
          variant={selectedView === "kanban" ? "secondary" : "ghost"}
          size="icon"
          className="h-8 w-8"
          onClick={() => onViewChange("kanban")}
        >
          <LayoutKanban className="h-4 w-4" />
          <span className="sr-only">Kanban view</span>
        </Button>
      </div>
    </div>
  );
};
