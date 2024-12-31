"use client";

import { CardTitle } from "@/components/ui/card";

export const CalendarWidgetHeader = ({ title, eventCount, showEventCount }) => {
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
    </div>
  );
};
