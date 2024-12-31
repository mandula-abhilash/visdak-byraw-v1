"use client";

import { Calendar } from "@/components/ui/calendar";

export const CalendarView = ({
  events = [],
  isLoading,
  view,
  showWeekNumbers,
  showEventDetails,
  showTimeSlots,
  limit,
}) => {
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
    <Calendar
      mode="single"
      showWeekNumber={showWeekNumbers}
      className="rounded-md border"
    />
  );
};
