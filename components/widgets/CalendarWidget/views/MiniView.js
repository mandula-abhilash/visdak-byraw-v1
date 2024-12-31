"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const MiniView = ({
  events = [],
  currentDate = new Date(),
  onDateChange,
}) => {
  const getEventsForDate = (date) => {
    if (!date) return [];
    return events.filter((event) => {
      const eventDate = new Date(event.start_time);
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      );
    });
  };

  const selectedDateEvents = currentDate ? getEventsForDate(currentDate) : [];

  const goToPreviousDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 1);
    onDateChange(newDate);
  };

  const goToNextDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 1);
    onDateChange(newDate);
  };

  const goToToday = () => {
    onDateChange(new Date());
  };

  const formatDay = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
    });
  };

  const formatMonth = (date) => {
    return date.toLocaleDateString("en-US", {
      month: "long",
    });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Navigation */}
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={goToToday}
          className="text-xs"
        >
          Today
        </Button>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={goToPreviousDay}
            className="h-8 w-8"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={goToNextDay}
            className="h-8 w-8"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Large Date Display */}
      <div className="text-center mb-8 border-2 w-40 mx-auto rounded-md px-2 py-4 shadow-lg">
        <div className="text-4xl font-bold mb-2">{currentDate.getDate()}</div>
        <div className="text-xl font-medium mb-1">{formatDay(currentDate)}</div>
        <div className="text-sm text-muted-foreground">
          {formatMonth(currentDate)}
        </div>
      </div>

      {/* Events List */}
      <div className="flex-1 overflow-auto">
        <h3 className="font-medium mb-4">Today's Events</h3>
        {selectedDateEvents.length > 0 ? (
          <div className="space-y-2">
            {selectedDateEvents.map((event) => (
              <div
                key={event.id}
                className={cn(
                  "p-3 rounded-lg border",
                  event.status === "upcoming"
                    ? "bg-primary/10 text-primary border-primary/20"
                    : event.status === "ongoing"
                    ? "bg-chart-2/10 text-chart-2 border-chart-2/20"
                    : event.status === "completed"
                    ? "bg-chart-4/10 text-chart-4 border-chart-4/20"
                    : "bg-destructive/10 text-destructive border-destructive/20"
                )}
              >
                <div className="font-medium">{event.title}</div>
                <div className="text-sm mt-1">
                  {new Date(event.start_time).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                  {event.location && (
                    <div className="mt-1 text-sm">📍 {event.location}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-sm text-muted-foreground">
            No events scheduled for today
          </div>
        )}
      </div>
    </div>
  );
};
