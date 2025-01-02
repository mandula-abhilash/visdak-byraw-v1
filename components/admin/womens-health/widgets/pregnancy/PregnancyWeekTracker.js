"use client";

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { generatePregnancyData } from "./mockData";
import { WIDGET_STYLES } from "@/lib/constants/widget-styles";

export const PregnancyWeekTracker = ({ title, description }) => {
  const data = generatePregnancyData();
  const totalWeeks = 40;
  const progress = (data.current_week / totalWeeks) * 100;

  const getWeekStatus = (week) => {
    if (week < data.current_week) return "completed";
    if (week === data.current_week) return "current";
    return "upcoming";
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-primary/10 text-primary border-primary/20";
      case "current":
        return "bg-chart-2/10 text-chart-2 border-chart-2/20";
      default:
        return "bg-muted text-muted-foreground border-muted";
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
          {/* Current Week Status */}
          <div className="text-center space-y-2">
            <Badge
              variant="outline"
              className="px-2 bg-primary/10 text-primary border-primary/20"
            >
              Week {data.current_week}
            </Badge>
            <h4 className="text-lg font-medium">
              {Math.floor((totalWeeks - data.current_week) / 4)} months,{" "}
              {((totalWeeks - data.current_week) % 4) * 7} days to go
            </h4>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Week 1</span>
              <span>Week {totalWeeks}</span>
            </div>
          </div>

          {/* Trimester Overview */}
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map((trimester) => {
              const trimesterProgress =
                data.current_week <= trimester * 13
                  ? Math.min(
                      ((data.current_week - (trimester - 1) * 13) / 13) * 100,
                      100
                    )
                  : 100;
              return (
                <div key={trimester} className="space-y-2">
                  <div className="text-sm font-medium text-center">
                    Trimester {trimester}
                  </div>
                  <Progress
                    value={Math.max(0, trimesterProgress)}
                    className="h-1.5"
                  />
                </div>
              );
            })}
          </div>

          {/* Week Grid */}
          <div className="grid grid-cols-8 gap-2">
            {Array.from({ length: totalWeeks }, (_, i) => i + 1).map((week) => {
              const status = getWeekStatus(week);
              return (
                <Badge
                  key={week}
                  variant="outline"
                  className={`px-2 text-center ${getStatusColor(status)}`}
                >
                  {week}
                </Badge>
              );
            })}
          </div>

          {/* Key Dates */}
          <div className="space-y-3 pt-4 border-t">
            <h4 className="font-medium">Key Dates</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">
                  Conception Date
                </div>
                <div className="font-medium">
                  {new Date(data.conception_date).toLocaleDateString()}
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Due Date</div>
                <div className="font-medium">
                  {new Date(data.due_date).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
