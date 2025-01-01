"use client";

import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

export const TimelineItem = ({ log, isFirst, isLast }) => {
  const Icon = log.icon;

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <div className="relative pl-8 pb-8 last:pb-0">
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-[11px] top-2 bottom-0 w-px bg-border" />
      )}

      {/* Timeline node */}
      <div
        className={cn(
          "absolute left-0 p-1.5 rounded-full bg-background border-2",
          log.type === "task" && "border-primary",
          log.type === "payment" && "border-chart-2",
          log.type === "system" && "border-chart-3",
          log.type === "calendar" && "border-chart-4",
          log.type === "document" && "border-chart-5",
          log.type === "message" && "border-primary"
        )}
      >
        <Icon className={cn("h-3 w-3", log.iconColor)} />
      </div>

      {/* Content */}
      <div className="group">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-medium">
            {formatTime(log.timestamp)}
          </span>
          <span className="px-2 py-0.5 text-xs rounded-full bg-secondary">
            {log.category}
          </span>
        </div>

        <Card className="p-4 transition-all duration-200 group-hover:shadow-md group-hover:-translate-y-0.5">
          <div className="space-y-1">
            <div className="text-sm font-medium">{log.target}</div>
            <div className="text-sm text-muted-foreground">{log.details}</div>
          </div>
        </Card>
      </div>
    </div>
  );
};
