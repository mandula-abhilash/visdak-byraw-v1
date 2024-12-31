"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

export const CalendarView = ({
  events = [],
  isLoading,
  showWeekNumbers,
  showEventDetails,
  showTimeSlots,
  limit,
}) => {
  const [date, setDate] = useState(new Date());
  const [month, setMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatFullDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

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
        return "bg-primary/20 text-primary";
      case "ongoing":
        return "bg-chart-2/20 text-chart-2";
      case "completed":
        return "bg-chart-4/20 text-chart-4";
      case "cancelled":
        return "bg-destructive/20 text-destructive";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : [];

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-[1fr_1fr] gap-4 h-full min-h-[600px] lg:min-h-0">
      <div className="w-full h-[400px] lg:h-full">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          month={month}
          onMonthChange={setMonth}
          showWeekNumber={showWeekNumbers}
          className="rounded-md border h-full w-full"
          classNames={{
            months: "w-full h-full flex flex-col",
            month: "w-full h-full",
            caption: "flex justify-center pt-1 relative items-center mb-4",
            caption_label: "text-sm font-medium",
            nav: "space-x-1 flex items-center",
            nav_button:
              "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
            nav_button_previous: "absolute left-1",
            nav_button_next: "absolute right-1",
            table: "w-full border-collapse h-[calc(100%-3rem)]",
            head_row: "flex w-full",
            head_cell:
              "text-center p-2 rounded-md font-normal text-[0.8rem] text-muted-foreground flex-1",
            row: "flex w-full mt-2",
            cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 flex-1 m-0.5",
            day: "h-9 w-9 p-0 mx-auto font-normal aria-selected:opacity-100 hover:bg-accent hover:rounded-full focus:bg-accent focus:rounded-full",
            day_today:
              "bg-accent text-accent-foreground rounded-full font-bold",
            day_selected:
              "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded-full",
            day_outside: "opacity-50",
            day_disabled: "opacity-50",
            day_range_middle:
              "aria-selected:bg-accent aria-selected:text-accent-foreground",
            day_hidden: "invisible",
          }}
          modifiers={{
            hasEvents: (date) => getEventsForDate(date).length > 0,
          }}
          modifiersStyles={{
            hasEvents: {
              backgroundColor: "hsl(var(--primary))",
              color: "hsl(var(--primary-foreground))",
              borderRadius: "100%",
            },
          }}
        />
      </div>
      <div className="rounded-md border p-4 h-[300px] lg:h-full overflow-y-auto">
        {selectedDate ? (
          <>
            <time
              dateTime={selectedDate.toISOString()}
              className="text-sm font-medium"
            >
              {formatFullDate(selectedDate)}
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
                            {formatTime(event.start_time)} -{" "}
                            {formatTime(event.end_time)}
                          </span>
                        </div>
                      </div>
                      <span
                        className={cn(
                          "px-3 py-1 text-xs rounded-full whitespace-nowrap",
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
          </>
        ) : (
          <p className="text-sm text-muted-foreground">
            Select a date to view events
          </p>
        )}
      </div>
    </div>
  );
};
