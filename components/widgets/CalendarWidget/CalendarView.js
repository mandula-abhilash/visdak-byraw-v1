"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

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

  // Helper function to check if a date has events
  const hasEvents = (date) => {
    if (!date) return false;
    return events.some((event) => {
      const eventDate = new Date(event.start_time);
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      );
    });
  };

  // Get events for a specific date
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

  if (view === "list") {
    const limitedEvents = limit ? events.slice(0, limit) : events;
    return (
      <div className="space-y-2">
        {limitedEvents.map((event) => (
          <div
            key={event.id}
            className="flex items-start gap-3 rounded-lg border p-3 hover:bg-accent/50 transition-colors"
          >
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">{event.title}</p>
              <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                <span>
                  {new Date(event.start_time).toLocaleDateString()}{" "}
                  {showTimeSlots &&
                    `${new Date(
                      event.start_time
                    ).toLocaleTimeString()} - ${new Date(
                      event.end_time
                    ).toLocaleTimeString()}`}
                </span>
                {showEventDetails && event.location && (
                  <span>📍 {event.location}</span>
                )}
              </div>
              {showEventDetails && event.description && (
                <p className="text-xs text-muted-foreground mt-1">
                  {event.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Month view (default)
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => {
            const newDate = new Date(date);
            newDate.setMonth(date.getMonth() - 1);
            setDate(newDate);
          }}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h2 className="font-semibold">
          {date.toLocaleString("default", { month: "long", year: "numeric" })}
        </h2>
        <Button
          variant="ghost"
          onClick={() => {
            const newDate = new Date(date);
            newDate.setMonth(date.getMonth() + 1);
            setDate(newDate);
          }}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        month={date}
        showWeekNumber={showWeekNumbers}
        className="rounded-md border"
        modifiers={{
          hasEvent: (date) => hasEvents(date),
        }}
        modifiersStyles={{
          hasEvent: {
            backgroundColor: "hsl(var(--primary) / 0.1)",
            color: "hsl(var(--primary))",
          },
        }}
        components={{
          Day: ({ date: dayDate, ...props }) => {
            if (!dayDate) return null;

            const dayEvents = getEventsForDate(dayDate);
            const hasEventsToday = hasEvents(dayDate);

            return (
              <HoverCard openDelay={200}>
                <HoverCardTrigger asChild>
                  <div
                    {...props}
                    className={cn(
                      "relative",
                      hasEventsToday &&
                        "bg-primary/10 text-primary hover:bg-primary/20 focus:bg-primary/20"
                    )}
                  >
                    <time dateTime={dayDate.toISOString()}>
                      {dayDate.getDate()}
                    </time>
                    {hasEventsToday && (
                      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
                    )}
                  </div>
                </HoverCardTrigger>
                {hasEventsToday && (
                  <HoverCardContent
                    align="start"
                    className="w-80 p-0"
                    side="right"
                  >
                    <div className="p-4 space-y-2">
                      <p className="text-sm font-medium">
                        {dayEvents.length} event{dayEvents.length !== 1 && "s"}
                      </p>
                      <div className="space-y-1">
                        {dayEvents.map((event) => (
                          <div key={event.id} className="text-sm">
                            <p className="font-medium">{event.title}</p>
                            <p className="text-muted-foreground">
                              {new Date(event.start_time).toLocaleTimeString()}{" "}
                              - {new Date(event.end_time).toLocaleTimeString()}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </HoverCardContent>
                )}
              </HoverCard>
            );
          },
        }}
      />
    </div>
  );
};
