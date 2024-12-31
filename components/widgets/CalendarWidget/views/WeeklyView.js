"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const WeeklyView = ({
  events = [],
  currentDate = new Date(),
  onDateChange,
}) => {
  const [weekDays, setWeekDays] = useState([]);
  const timeSlots = Array.from({ length: 24 }, (_, i) => i);
  const scrollContainerRef = useRef(null);

  // Get week days based on current date
  useEffect(() => {
    const days = [];
    const start = new Date(currentDate);
    start.setDate(start.getDate() - start.getDay()); // Start from Sunday

    for (let i = 0; i < 7; i++) {
      const day = new Date(start);
      day.setDate(start.getDate() + i);
      days.push(day);
    }
    setWeekDays(days);
  }, [currentDate]);

  const formatTime = (hour) => {
    return `${hour.toString().padStart(2, "0")}:00`;
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
    });
  };

  const formatMonthYear = (date) => {
    const start = weekDays[0];
    const end = weekDays[6];

    if (start?.getMonth() === end?.getMonth()) {
      return date.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      });
    }

    return `${start?.toLocaleDateString("en-US", {
      month: "short",
    })} - ${end?.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    })}`;
  };

  const scrollToPreviousWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 7);
    onDateChange(newDate);
  };

  const scrollToNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 7);
    onDateChange(newDate);
  };

  const goToToday = () => {
    onDateChange(new Date());
  };

  const getEventsForSlot = (day, hour) => {
    return events.filter((event) => {
      const eventDate = new Date(event.start_time);
      return (
        eventDate.getDate() === day.getDate() &&
        eventDate.getMonth() === day.getMonth() &&
        eventDate.getHours() === hour
      );
    });
  };

  const getEventStatusColor = (status) => {
    switch (status) {
      case "upcoming":
        return "bg-primary/20 text-primary border-primary/20";
      case "ongoing":
        return "bg-chart-2/20 text-chart-2 border-chart-2/20";
      case "completed":
        return "bg-chart-4/20 text-chart-4 border-chart-4/20";
      case "cancelled":
        return "bg-destructive/20 text-destructive border-destructive/20";
      default:
        return "bg-muted text-muted-foreground border-muted";
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* Header with Navigation */}
      <div className="flex items-center justify-between mb-4 px-2">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={goToToday}
            className="text-xs"
          >
            Today
          </Button>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={scrollToPreviousWeek}
              className="h-8 w-8"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={scrollToNextWeek}
              className="h-8 w-8"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <h2 className="text-lg font-semibold">
            {formatMonthYear(currentDate)}
          </h2>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="flex-1 overflow-auto" ref={scrollContainerRef}>
        <div className="min-w-[800px]">
          {/* Days Header */}
          <div className="grid grid-cols-[100px_repeat(7,1fr)] border-b sticky top-0 bg-background z-10">
            <div className="p-2 border-r text-sm font-medium">Time</div>
            {weekDays.map((day, i) => (
              <div
                key={i}
                className={cn(
                  "p-2 text-center text-sm font-medium border-r",
                  day.getDate() === new Date().getDate() &&
                    day.getMonth() === new Date().getMonth()
                    ? "bg-accent"
                    : ""
                )}
              >
                {formatDate(day)}
              </div>
            ))}
          </div>

          {/* Time Slots */}
          <div className="divide-y">
            {timeSlots.map((hour) => (
              <div key={hour} className="grid grid-cols-[100px_repeat(7,1fr)]">
                <div className="p-2 border-r text-sm text-muted-foreground">
                  {formatTime(hour)}
                </div>
                {weekDays.map((day, dayIndex) => {
                  const slotEvents = getEventsForSlot(day, hour);
                  return (
                    <div
                      key={dayIndex}
                      className="p-1 border-r min-h-[60px] relative group hover:bg-accent/50 transition-colors"
                    >
                      {slotEvents.map((event, eventIndex) => (
                        <div
                          key={eventIndex}
                          className={cn(
                            "text-xs p-1 mb-1 rounded border",
                            getEventStatusColor(event.status)
                          )}
                        >
                          <div className="font-medium">{event.title}</div>
                          {event.location && (
                            <div className="text-muted-foreground pt-1">
                              📍 {event.location}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
