"use client";

import { useState } from "react";
import { CalendarTimelineCard } from "./timeline/CalendarTimelineCard";
import { getTimelineData } from "./timeline/TimelineUtils";

const widthClasses = {
  "1/4": "w-full md:w-1/4",
  "1/3": "w-full md:w-1/3",
  "1/2": "w-full md:w-1/2",
  "2/3": "w-full md:w-2/3",
  "3/4": "w-full md:w-3/4",
  full: "w-full",
};

const getTimelineWidth = (width) => {
  return widthClasses[width] || widthClasses["full"];
};

export const CalendarWidgetTimeline = ({ timelines = [] }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Get timeline data
  const timelineData = getTimelineData();

  // Default timelines configuration if none provided
  const defaultTimelines = [
    {
      title: "Daily Schedule",
      description: "Timeline view of today's events",
      data: timelineData.daily,
      width: "1/2",
      view: "day",
    },
    {
      title: "Weekly Overview",
      description: "Events scheduled for this week",
      data: timelineData.weekly,
      width: "1/2",
      view: "week",
    },
    {
      title: "Monthly Timeline",
      description: "Event distribution across the month",
      data: timelineData.monthly,
      width: "full",
      view: "month",
    },
  ];

  const timelinesToRender = timelines.length > 0 ? timelines : defaultTimelines;

  return (
    <div className="flex flex-wrap -mx-3">
      {timelinesToRender.map((timeline, index) => (
        <div
          key={index}
          className={`${getTimelineWidth(timeline.width)} px-3 mb-6`}
        >
          <CalendarTimelineCard
            title={timeline.title}
            description={timeline.description}
            data={timeline.data}
            view={timeline.view}
            onEventSelect={setSelectedEvent}
            selectedEvent={selectedEvent}
          />
        </div>
      ))}
    </div>
  );
};
