"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { generatePeriodData } from "./mockData";
import { WIDGET_STYLES } from "@/lib/constants/widget-styles";

export const CycleTracker = ({ title, description }) => {
  const data = generatePeriodData();
  const { current_cycle } = data;

  const cycleProgress =
    (current_cycle.cycle_day / current_cycle.cycle_length) * 100;
  const periodProgress = Math.min(
    (current_cycle.cycle_day / current_cycle.period_length) * 100,
    100
  );

  const getPhaseColor = (phase) => {
    switch (phase) {
      case "menstrual":
        return "bg-primary/10 text-primary border-primary/20";
      case "follicular":
        return "bg-chart-2/10 text-chart-2 border-chart-2/20";
      case "ovulation":
        return "bg-chart-3/10 text-chart-3 border-chart-3/20";
      case "luteal":
        return "bg-chart-4/10 text-chart-4 border-chart-4/20";
      default:
        return "bg-muted text-muted-foreground";
    }
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
          {/* Current Phase */}
          <div className="text-center space-y-2">
            <Badge
              variant="outline"
              className={`px-2 capitalize ${getPhaseColor(
                current_cycle.phase
              )}`}
            >
              {current_cycle.phase} Phase
            </Badge>
            <p className="text-lg font-medium">
              Day {current_cycle.cycle_day} of {current_cycle.cycle_length}
            </p>
          </div>

          {/* Cycle Progress */}
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Cycle Progress</span>
                <span>{Math.round(cycleProgress)}%</span>
              </div>
              <Progress value={cycleProgress} className="h-2" />
            </div>

            {current_cycle.phase === "menstrual" && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Period Progress</span>
                  <span>{Math.round(periodProgress)}%</span>
                </div>
                <Progress value={periodProgress} className="h-2" />
              </div>
            )}
          </div>

          {/* Key Dates */}
          <div className="space-y-3">
            <h4 className="font-medium">Key Dates</h4>
            <div className="grid gap-3">
              <div className="flex justify-between items-center p-2 rounded-lg border hover:bg-accent/50 transition-colors">
                <span className="text-sm">Period Started</span>
                <span className="text-sm">
                  {new Date(current_cycle.start_date).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between items-center p-2 rounded-lg border hover:bg-accent/50 transition-colors">
                <span className="text-sm">Expected End</span>
                <span className="text-sm">
                  {new Date(
                    current_cycle.predicted_end_date
                  ).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between items-center p-2 rounded-lg border hover:bg-accent/50 transition-colors">
                <span className="text-sm">Next Period</span>
                <span className="text-sm">
                  {new Date(
                    new Date(current_cycle.start_date).setDate(
                      new Date(current_cycle.start_date).getDate() +
                        current_cycle.cycle_length
                    )
                  ).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
