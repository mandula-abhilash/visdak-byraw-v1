"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const SplitMiniView = ({
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
      year: "numeric",
    });
  };

  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  return (
    <div className="grid grid-cols-[1fr_1.5fr] gap-6 h-full">
      {/* Left Side - Date Display */}
      <div className="flex flex-col">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={goToToday}
            className={cn(
              "text-xs font-medium",
              isToday(currentDate) &&
                "bg-primary text-primary-foreground hover:bg-primary/90"
            )}
          >
            Today
          </Button>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={goToPreviousDay}
              className="h-8 w-8 hover:bg-accent"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={goToNextDay}
              className="h-8 w-8 hover:bg-accent"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Large Date Display */}
        <div className="relative flex-1">
          <div className="absolute inset-0 bg-accent/50 rounded-lg blur-xl"></div>
          <div className="relative bg-card border-2 rounded-lg px-8 py-12 shadow-lg h-full flex flex-col justify-center">
            <div className="text-9xl font-bold tracking-tight mb-4">
              {currentDate.getDate()}
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-medium text-primary">
                {formatDay(currentDate)}
              </div>
              <div className="text-lg text-muted-foreground">
                {formatMonth(currentDate)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Events List */}
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-medium">Today's Events</h3>
          <span className="text-sm text-muted-foreground">
            {selectedDateEvents.length}{" "}
            {selectedDateEvents.length === 1 ? "event" : "events"}
          </span>
        </div>

        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          {selectedDateEvents.length > 0 ? (
            <div className="space-y-3">
              {selectedDateEvents.map((event) => (
                <div
                  key={event.id}
                  className={cn(
                    "p-4 rounded-lg border transition-all hover:scale-[1.02]",
                    event.status === "upcoming"
                      ? "bg-primary/5 hover:bg-primary/10 text-primary border-primary/10"
                      : event.status === "ongoing"
                      ? "bg-chart-2/5 hover:bg-chart-2/10 text-chart-2 border-chart-2/10"
                      : event.status === "completed"
                      ? "bg-chart-4/5 hover:bg-chart-4/10 text-chart-4 border-chart-4/10"
                      : "bg-destructive/5 hover:bg-destructive/10 text-destructive border-destructive/10"
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-1">
                      <div className="font-medium">{event.title}</div>
                      <div className="text-sm opacity-90">
                        {new Date(event.start_time).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                      {event.location && (
                        <div className="text-sm opacity-90 flex items-center gap-1">
                          <span className="text-base">📍</span> {event.location}
                        </div>
                      )}
                      {event.description && (
                        <div className="text-sm opacity-90 mt-2">
                          {event.description}
                        </div>
                      )}
                    </div>
                    <span
                      className={cn(
                        "px-2 py-1 text-xs rounded-full whitespace-nowrap",
                        event.status === "upcoming"
                          ? "bg-primary/10"
                          : event.status === "ongoing"
                          ? "bg-chart-2/10"
                          : event.status === "completed"
                          ? "bg-chart-4/10"
                          : "bg-destructive/10"
                      )}
                    >
                      {event.status.charAt(0).toUpperCase() +
                        event.status.slice(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-4xl mb-3">🌟</div>
              <p className="text-sm text-muted-foreground">
                No events scheduled for today
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
