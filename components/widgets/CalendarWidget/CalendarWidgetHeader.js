"use client";

import { Calendar, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";

export const CalendarWidgetHeader = ({
  title,
  selectedView,
  onViewChange,
  eventCount,
  showEventCount,
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <CardTitle className="text-base font-medium">
          {title}
          {showEventCount && eventCount > 0 && (
            <span className="ml-2 text-sm text-muted-foreground">
              ({eventCount})
            </span>
          )}
        </CardTitle>
      </div>
      <div className="flex items-center gap-2">
        <div className="bg-muted rounded-md p-1 flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            className={`h-7 w-7 ${
              selectedView === "month"
                ? "bg-background shadow-sm"
                : "hover:bg-background/50"
            }`}
            onClick={() => onViewChange("month")}
          >
            <Calendar className="h-4 w-4" />
            <span className="sr-only">Calendar view</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={`h-7 w-7 ${
              selectedView === "list"
                ? "bg-background shadow-sm"
                : "hover:bg-background/50"
            }`}
            onClick={() => onViewChange("list")}
          >
            <List className="h-4 w-4" />
            <span className="sr-only">List view</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
