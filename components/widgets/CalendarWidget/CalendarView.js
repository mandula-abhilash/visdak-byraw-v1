"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

export const CalendarView = ({
  events = [],
  isLoading,
  view,
  showWeekNumbers,
  showEventDetails,
  showTimeSlots,
  limit,
}) => {
  const [date, setDate] = useState(new Date());
  const [month, setMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

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

  if (!events.length) {
    return (
      <div className="py-6 text-center text-sm text-muted-foreground">
        No events found
      </div>
    );
  }

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

  const getEventStatusColor = (status) => {
    switch (status) {
      case "upcoming":
        return "bg-primary text-primary-foreground";
      case "ongoing":
        return "bg-chart-2 text-white";
      case "completed":
        return "bg-chart-4 text-white";
      case "cancelled":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  if (view === "list") {
    const limitedEvents = limit ? events.slice(0, limit) : events;
    return (
      <div className="space-y-2">
        {limitedEvents.map((event) => (
          <div
            key={event.id}
            className="flex items-start gap-3 rounded-lg border p-3 hover:bg-accent/50 transition-colors"
          >
            <div className="flex-1">
              <div className="flex items-center justify-between gap-2 mb-1">
                <p className="text-sm font-medium">{event.title}</p>
                <span
                  className={cn(
                    "px-2 py-0.5 text-xs rounded-full",
                    getEventStatusColor(event.status)
                  )}
                >
                  {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                </span>
              </div>
              <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                <span>
                  {new Date(event.start_time).toLocaleTimeString()} -{" "}
                  {new Date(event.end_time).toLocaleTimeString()}
                </span>
                {showEventDetails && event.location && (
                  <span>📍 {event.location}</span>
                )}
                {showEventDetails && event.description && (
                  <p className="mt-1">{event.description}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-4">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        month={month}
        onMonthChange={setMonth}
        showWeekNumber={showWeekNumbers}
        className="rounded-md border"
        components={{
          Day: ({ date: dayDate, ...props }) => {
            if (!dayDate) return null;

            const dayEvents = getEventsForDate(dayDate);
            const hasEventsToday = dayEvents.length > 0;
            const isSelected =
              selectedDate &&
              dayDate.toDateString() === selectedDate.toDateString();
            const isToday =
              new Date().toDateString() === dayDate.toDateString();

            return (
              <div
                {...props}
                onClick={(e) => {
                  props.onClick?.(e);
                  setSelectedDate(dayDate);
                }}
                className={cn(
                  props.className,
                  "relative h-8 w-8 p-0 font-normal cursor-pointer",
                  hasEventsToday &&
                    "bg-primary rounded-full text-primary-foreground font-medium",
                  isSelected && "ring-2 ring-primary",
                  isToday && !hasEventsToday && "bg-accent"
                )}
              >
                <time
                  dateTime={dayDate.toISOString()}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  {dayDate.getDate()}
                </time>
              </div>
            );
          },
        }}
      />
      {selectedDate && (
        <div className="rounded-md border p-4">
          <time
            dateTime={selectedDate.toISOString()}
            className="text-sm font-medium"
          >
            {selectedDate.toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </time>
          {selectedDateEvents.length > 0 ? (
            <div className="mt-3 space-y-2">
              {selectedDateEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex flex-col gap-2 rounded-lg border p-3 hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <p className="text-sm font-medium">{event.title}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                        <span>
                          {new Date(event.start_time).toLocaleTimeString()} -{" "}
                          {new Date(event.end_time).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                    <span
                      className={cn(
                        "px-2 py-0.5 text-xs rounded-full whitespace-nowrap",
                        getEventStatusColor(event.status)
                      )}
                    >
                      {event.status.charAt(0).toUpperCase() +
                        event.status.slice(1)}
                    </span>
                  </div>
                  {(event.location || event.description) && (
                    <div className="text-xs text-muted-foreground space-y-1">
                      {event.location && <p>📍 {event.location}</p>}
                      {event.description && <p>{event.description}</p>}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-2 text-sm text-muted-foreground">
              No events scheduled
            </p>
          )}
        </div>
      )}
    </div>
  );
};
