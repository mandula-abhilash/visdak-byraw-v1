"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { generatePeriodData } from "./mockData";
import { WIDGET_STYLES } from "@/lib/constants/widget-styles";
import { cn } from "@/lib/utils";

export const PeriodCalendar = ({ title, description }) => {
  const data = generatePeriodData();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [month, setMonth] = useState(new Date());

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

    // Check historical periods
    for (const cycle of data.cycle_history) {
      if (dateStr >= cycle.start_date && dateStr <= cycle.end_date) {
        return "period";
      }
    }

    return null;
  };

  const getSelectedDateDetails = () => {
    if (!selectedDate) return null;

    // Check current cycle
    if (
      selectedDate >= new Date(data.current_cycle.start_date) &&
      selectedDate <= new Date(data.current_cycle.predicted_end_date)
    ) {
      return {
        type: "period",
        details: "Current period",
        phase: data.current_cycle.phase,
        cycleDay: data.current_cycle.cycle_day,
      };
    }

    // Check fertility window
    if (
      selectedDate >= new Date(data.fertility_window.start_date) &&
      selectedDate <= new Date(data.fertility_window.end_date)
    ) {
      return {
        type: "fertile",
        details: "Fertility window",
        isOvulation:
          selectedDate.toISOString() === data.fertility_window.ovulation_date,
      };
    }

    // Check historical data
    for (const cycle of data.cycle_history) {
      if (
        selectedDate >= new Date(cycle.start_date) &&
        selectedDate <= new Date(cycle.end_date)
      ) {
        return {
          type: "period",
          details: "Historical period",
          symptoms: cycle.symptoms,
          flowIntensity: cycle.flow_intensity,
        };
      }
    }

    return null;
  };

  const selectedDateDetails = getSelectedDateDetails();

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
        <div className="flex flex-col lg:grid lg:grid-cols-[1fr_1fr] gap-4 h-full min-h-[600px] lg:min-h-0 overflow-y-auto lg:overflow-y-hidden">
          {/* Calendar */}
          <div className="w-full h-[350px] lg:h-full">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              month={month}
              onMonthChange={setMonth}
              className="rounded-md border h-full w-full"
              classNames={{
                months: "w-full h-full flex flex-col",
                month: "w-full h-full",
                caption: "flex justify-center pt-1 relative items-center mb-4",
                caption_label: "text-sm font-medium",
                nav: "space-x-1 flex items-center",
                nav_button:
                  "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                nav_button_previous: "absolute left-1",
                nav_button_next: "absolute right-1",
                table: "w-full border-collapse h-[calc(100%-3rem)]",
                head_row: "flex w-full",
                head_cell:
                  "text-center p-2 rounded-md font-normal text-[0.7rem] lg:text-[0.8rem] text-muted-foreground flex-1",
                row: "flex w-full mt-2",
                cell: "relative p-0 text-center text-xs lg:text-sm focus-within:relative focus-within:z-20 flex-1 m-0.5",
                day: "h-7 w-7 lg:h-9 lg:w-9 p-0 mx-auto font-normal aria-selected:opacity-100 hover:bg-accent hover:rounded-full focus:bg-accent focus:rounded-full",
                day_today:
                  "bg-accent text-accent-foreground rounded-full font-bold",
                day_selected:
                  "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded-full",
                day_outside: "opacity-50",
                day_disabled: "opacity-50",
                day_range_middle:
                  "aria-selected:bg-accent aria-selected:text-accent-foreground",
                day_hidden: "invisible",
              }}
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

          {/* Details Panel */}
          <div className="rounded-md border p-4 lg:h-full lg:min-h-0 min-h-[300px] lg:overflow-y-auto">
            <div className="space-y-4">
              {selectedDate ? (
                <>
                  <time
                    dateTime={selectedDate.toISOString()}
                    className="text-sm font-medium"
                  >
                    {selectedDate.toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>

                  {selectedDateDetails ? (
                    <div className="space-y-4">
                      <Badge
                        variant="outline"
                        className={cn(
                          "px-2",
                          selectedDateDetails.type === "period"
                            ? "bg-primary/10 text-primary border-primary/20"
                            : selectedDateDetails.isOvulation
                            ? "bg-chart-3/10 text-chart-3 border-chart-3/20"
                            : "bg-chart-2/10 text-chart-2 border-chart-2/20"
                        )}
                      >
                        {selectedDateDetails.details}
                      </Badge>

                      {selectedDateDetails.phase && (
                        <div className="space-y-1">
                          <div className="text-sm font-medium">Phase</div>
                          <div className="text-sm capitalize">
                            {selectedDateDetails.phase}
                          </div>
                        </div>
                      )}

                      {selectedDateDetails.cycleDay && (
                        <div className="space-y-1">
                          <div className="text-sm font-medium">Cycle Day</div>
                          <div className="text-sm">
                            Day {selectedDateDetails.cycleDay}
                          </div>
                        </div>
                      )}

                      {selectedDateDetails.symptoms && (
                        <div className="space-y-2">
                          <div className="text-sm font-medium">Symptoms</div>
                          <div className="flex flex-wrap gap-1">
                            {selectedDateDetails.symptoms.map(
                              (symptom, index) => (
                                <Badge
                                  key={index}
                                  variant="secondary"
                                  className="px-2 capitalize"
                                >
                                  {symptom}
                                </Badge>
                              )
                            )}
                          </div>
                        </div>
                      )}

                      {selectedDateDetails.flowIntensity && (
                        <div className="space-y-1">
                          <div className="text-sm font-medium">
                            Flow Intensity
                          </div>
                          <div className="text-sm capitalize">
                            {selectedDateDetails.flowIntensity}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No period or fertility data for this date
                    </p>
                  )}
                </>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Select a date to view details
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
