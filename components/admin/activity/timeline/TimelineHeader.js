"use client";

export const TimelineHeader = ({ date }) => {
  const isToday =
    new Date(date).toLocaleDateString() === new Date().toLocaleDateString();

  return (
    <div className="sticky top-0 z-10 -ml-8 pl-8 -mr-4 pr-4 pb-4 pt-2 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="font-medium">
        {isToday
          ? "Today"
          : new Date(date).toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
      </div>
    </div>
  );
};
