"use client";

import { LayoutList, SquareKanban } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const TaskWidgetHeader = ({
  title,
  selectedView,
  onViewChange,
  selectedGroupBy,
  onGroupByChange,
  taskCount,
  showKanbanToggle,
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
      <div className="flex items-center gap-2">
        {showKanbanToggle && selectedView === "kanban" && (
          <Select value={selectedGroupBy} onValueChange={onGroupByChange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Group by..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="status">Status</SelectItem>
              <SelectItem value="priority">Priority</SelectItem>
              <SelectItem value="dueDate">Due Date</SelectItem>
            </SelectContent>
          </Select>
        )}
        {showKanbanToggle && (
          <>
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
              <SquareKanban className="h-4 w-4" />
              <span className="sr-only">Kanban view</span>
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
