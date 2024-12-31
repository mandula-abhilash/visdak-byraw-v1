"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export const WeeklyView = ({ events = [], selectedDate = new Date() }) => {
  const [weekDays, setWeekDays] = useState([]);
  const timeSlots = Array.from({ length: 24 }, (_, i) => i);

  // Get week days based on selected date
  useEffect(() => {
    const days = [];
    const start = new Date(selectedDate);
    start.setDate(start.getDate() - start.getDay()); // Start from Sunday

    for (let i = 0; i < 7; i++) {
      const day = new Date(start);
      day.setDate(start.getDate() + i);
      days.push(day);
    }
    setWeekDays(days);
  }, [selectedDate]);

  const formatTime = (hour) => {
    return `${hour.toString().padStart(2, "0")}:00`;
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
    });
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
    <div className="w-full h-full overflow-auto">
      <div className="min-w-[800px]">
        {/* Header */}
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

        {/* Time slots */}
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
                          <div className="text-muted-foreground pt-2">
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
  );
};
