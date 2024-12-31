"use client";

import { useState } from "react";
import { MonthlyView } from "./views/MonthlyView";
import { WeeklyView } from "./views/WeeklyView";

export const CalendarView = ({
  events = [],
  isLoading,
  showWeekNumbers,
  showEventDetails,
  showTimeSlots,
  limit,
  view = "month",
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
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

  if (view === "week") {
    return (
      <WeeklyView
        events={events}
        currentDate={currentDate}
        onDateChange={setCurrentDate}
      />
    );
  }

  return (
    <MonthlyView
      events={events}
      selectedDate={selectedDate}
      setSelectedDate={setSelectedDate}
      month={currentDate}
      setMonth={setCurrentDate}
      showWeekNumbers={showWeekNumbers}
      formatTime={formatTime}
      formatFullDate={formatFullDate}
    />
  );
};
