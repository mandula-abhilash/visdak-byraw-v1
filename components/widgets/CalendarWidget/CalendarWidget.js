"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CalendarView } from "./CalendarView";
import { CalendarWidgetHeader } from "./CalendarWidgetHeader";
import { useCalendarWidget } from "./useCalendarWidget";
import { WIDGET_STYLES } from "@/lib/constants/widget-styles";

export const CalendarWidget = ({
  title = "Calendar",
  view = "month",
  showEventCount = false,
  showWeekNumbers = false,
  showEventDetails = false,
  showTimeSlots = false,
  limit = null,
}) => {
  const [selectedView, setSelectedView] = useState(view);
  const { events, isLoading, error } = useCalendarWidget();

  if (error) {
    return (
      <Card className="h-full">
        <CardContent className="pt-6">
          <div className="text-sm text-destructive">
            Error loading events: {error.message}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full flex flex-col shadow-lg">
      <CardHeader className="pb-3 flex-none border-b">
        <CalendarWidgetHeader
          title={title}
          selectedView={selectedView}
          onViewChange={setSelectedView}
          eventCount={events?.length || 0}
          showEventCount={showEventCount}
        />
      </CardHeader>
      <CardContent
        className="flex-1 p-4 overflow-y-auto"
        style={{
          minHeight: WIDGET_STYLES.MIN_HEIGHT,
          maxHeight: WIDGET_STYLES.MAX_HEIGHT,
        }}
      >
        <div className="h-full">
          <CalendarView
            events={events}
            isLoading={isLoading}
            view={selectedView}
            showWeekNumbers={showWeekNumbers}
            showEventDetails={showEventDetails}
            showTimeSlots={showTimeSlots}
            limit={limit}
          />
        </div>
      </CardContent>
    </Card>
  );
};
