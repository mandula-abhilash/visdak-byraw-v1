"use client";

import { Card } from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export const TaskChartCard = ({ title, children, description }) => {
  return (
    <Card className="p-4">
      <div className="flex items-center gap-2 mb-4">
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
      <div className="w-full aspect-[4/3]">{children}</div>
    </Card>
  );
};
