"use client";

import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const SocialTimelineItem = ({ log, isFirst, isLast }) => {
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
          log.type === "work" && "border-primary",
          log.type === "learning" && "border-chart-2",
          log.type === "health" && "border-chart-3",
          log.type === "reflection" && "border-chart-4",
          log.type === "personal" && "border-chart-5"
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
          <span className="text-lg">{log.mood}</span>
        </div>

        <Card className="p-4 transition-all duration-200 group-hover:shadow-md group-hover:-translate-y-0.5">
          <div className="space-y-2">
            <p className="text-sm">{log.content}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1">
              {log.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Additional Notes */}
            {log.notes && (
              <div className="mt-3 text-sm text-muted-foreground border-l-2 border-muted pl-3">
                {log.notes}
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};
