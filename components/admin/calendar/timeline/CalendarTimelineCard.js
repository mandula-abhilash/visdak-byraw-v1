"use client";

import { Card } from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { WIDGET_STYLES } from "@/lib/constants/widget-styles";

export const CalendarTimelineCard = ({
  title,
  children,
  description,
  data,
  view,
  onEventSelect,
  selectedEvent,
}) => {
  return (
    <Card className="h-full flex flex-col shadow-lg">
      <div className="p-4 flex-none border-b">
        <div className="flex items-center gap-2">
          <h3 className="font-medium">{title}</h3>
          {description && (
            <HoverCard>
              <HoverCardTrigger>
                <div className="w-4 h-4 rounded-full bg-muted flex items-center justify-center text-xs cursor-help">
                  ?
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-80 bg-popover border shadow-md">
                <p className="text-sm text-popover-foreground">{description}</p>
              </HoverCardContent>
            </HoverCard>
          )}
        </div>
      </div>
      <div
        className="flex-1 p-4 overflow-y-auto"
        style={{
          minHeight: WIDGET_STYLES.MIN_HEIGHT,
          maxHeight: WIDGET_STYLES.MAX_HEIGHT,
        }}
      >
        <div className="space-y-4">
          {data.map((event) => (
            <div
              key={event.id}
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                selectedEvent?.id === event.id
                  ? "bg-accent"
                  : "hover:bg-accent/50"
              }`}
              onClick={() => onEventSelect(event)}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <h4 className="font-medium">{event.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {new Date(event.start_time).toLocaleTimeString()} -{" "}
                    {new Date(event.end_time).toLocaleTimeString()}
                  </p>
                  {event.location && (
                    <p className="text-sm text-muted-foreground">
                      📍 {event.location}
                    </p>
                  )}
                </div>
                <div
                  className={`px-2 py-1 text-xs rounded-full ${
                    event.status === "upcoming"
                      ? "bg-primary/10 text-primary"
                      : event.status === "ongoing"
                      ? "bg-chart-2/10 text-chart-2"
                      : event.status === "completed"
                      ? "bg-chart-4/10 text-chart-4"
                      : "bg-destructive/10 text-destructive"
                  }`}
                >
                  {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                </div>
              </div>
              {event.description && (
                <p className="mt-2 text-sm text-muted-foreground">
                  {event.description}
                </p>
              )}
              {event.attendees && event.attendees.length > 0 && (
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    👥 {event.attendees.join(", ")}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
