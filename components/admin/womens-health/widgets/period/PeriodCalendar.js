"use client";

import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { generatePeriodData } from "./mockData";
import { WIDGET_STYLES } from "@/lib/constants/widget-styles";

export const PeriodCalendar = ({ title, description }) => {
  const data = generatePeriodData();
  const today = new Date();

  const getDayStatus = (date) => {
    const dateStr = date.toISOString();

    // Check if it's a period day
    if (
      dateStr >= data.current_cycle.start_date &&
      dateStr <= data.current_cycle.predicted_end_date
    ) {
      return "period";
    }

    // Check if it's in fertility window
    if (
      dateStr >= data.fertility_window.start_date &&
      dateStr <= data.fertility_window.end_date
    ) {
      return "fertile";
    }

    // Check if it's ovulation day
    if (dateStr === data.fertility_window.ovulation_date) {
      return "ovulation";
    }

    return null;
  };

  return (
    <Card className="h-full flex flex-col shadow-lg">
      <div className="p-6 flex-none border-b">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">{title}</h3>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
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
        <div className="space-y-6">
          {/* Legend */}
          <div className="flex flex-wrap gap-3 justify-center">
            <Badge
              variant="outline"
              className="px-2 bg-primary/10 text-primary border-primary/20"
            >
              Period
            </Badge>
            <Badge
              variant="outline"
              className="px-2 bg-chart-2/10 text-chart-2 border-chart-2/20"
            >
              Fertile Window
            </Badge>
            <Badge
              variant="outline"
              className="px-2 bg-chart-3/10 text-chart-3 border-chart-3/20"
            >
              Ovulation
            </Badge>
          </div>

          {/* Calendar */}
          <Calendar
            mode="single"
            selected={today}
            className="rounded-md border"
            modifiers={{
              period: (date) => getDayStatus(date) === "period",
              fertile: (date) => getDayStatus(date) === "fertile",
              ovulation: (date) => getDayStatus(date) === "ovulation",
            }}
            modifiersStyles={{
              period: {
                backgroundColor: "hsl(var(--primary))",
                color: "hsl(var(--primary-foreground))",
                borderRadius: "100%",
              },
              fertile: {
                backgroundColor: "hsl(var(--chart-2))",
                color: "hsl(var(--chart-2-foreground))",
                borderRadius: "100%",
              },
              ovulation: {
                backgroundColor: "hsl(var(--chart-3))",
                color: "hsl(var(--chart-3-foreground))",
                borderRadius: "100%",
              },
            }}
          />
        </div>
      </div>
    </Card>
  );
};
