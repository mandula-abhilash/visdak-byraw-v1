"use client";

import { Calendar } from "@/components/ui/calendar";
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

  return (
    <div className="flex flex-col h-full">
      <Calendar
        mode="single"
        selected={currentDate}
        onSelect={onDateChange}
        className="rounded-md border"
        classNames={{
          months: "flex flex-col",
          month: "space-y-4",
          caption: "flex justify-center pt-1 relative items-center",
          caption_label: "text-sm font-medium",
          nav: "space-x-1 flex items-center",
          nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
          nav_button_previous: "absolute left-1",
          nav_button_next: "absolute right-1",
          table: "w-full border-collapse",
          head_row: "flex",
          head_cell:
            "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
          row: "flex w-full mt-2",
          cell: "text-center text-sm relative p-0 focus-within:relative focus-within:z-20",
          day: cn(
            "h-8 w-8 p-0 font-normal",
            "hover:bg-accent hover:text-accent-foreground rounded-full",
            "focus:bg-accent focus:text-accent-foreground focus:rounded-full"
          ),
          day_today: "bg-accent text-accent-foreground rounded-full",
          day_selected: "bg-primary text-primary-foreground rounded-full",
          day_outside: "opacity-50",
          day_disabled: "opacity-50",
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

      {selectedDateEvents.length > 0 && (
        <div className="mt-4 space-y-2">
          <h3 className="text-sm font-medium">
            Events ({selectedDateEvents.length})
          </h3>
          <div className="space-y-1">
            {selectedDateEvents.map((event) => (
              <div
                key={event.id}
                className={cn(
                  "text-xs p-2 rounded-md",
                  event.status === "upcoming"
                    ? "bg-primary/10 text-primary"
                    : event.status === "ongoing"
                    ? "bg-chart-2/10 text-chart-2"
                    : event.status === "completed"
                    ? "bg-chart-4/10 text-chart-4"
                    : "bg-destructive/10 text-destructive"
                )}
              >
                <div className="font-medium">{event.title}</div>
                <div className="text-muted-foreground mt-1">
                  {new Date(event.start_time).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
