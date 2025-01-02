"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { generateHealthData } from "./mockData";
import { WIDGET_STYLES } from "@/lib/constants/widget-styles";

export const ActivityTrackerWidget = ({ title, description }) => {
  const data = generateHealthData();
  const { activity } = data;

  const getIntensityColor = (intensity) => {
    switch (intensity) {
      case "high":
        return "bg-destructive/10 text-destructive border-destructive/20";
      case "moderate":
        return "bg-chart-5/10 text-chart-5 border-chart-5/20";
      default:
        return "bg-primary/10 text-primary border-primary/20";
    }
  };

  // Calculate step progress
  const stepProgress = (activity.steps / 10000) * 100; // Assuming 10k steps goal
  const activeMinutesProgress = (activity.active_minutes / 60) * 100; // Assuming 60 min goal

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
          {/* Daily Progress */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Steps</span>
                <span>{activity.steps} / 10,000</span>
              </div>
              <Progress value={stepProgress} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Active Minutes</span>
                <span>{activity.active_minutes} / 60</span>
              </div>
              <Progress value={activeMinutesProgress} className="h-2" />
            </div>
          </div>

          {/* Exercise Log */}
          <div className="space-y-3">
            <h4 className="font-medium">Today's Activities</h4>
            <div className="space-y-2">
              {activity.exercises.map((exercise, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="font-medium capitalize">
                        {exercise.type}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Duration: {exercise.duration} minutes
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={`px-2 capitalize ${getIntensityColor(
                        exercise.intensity
                      )}`}
                    >
                      {exercise.intensity}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Recommendations */}
          <div className="space-y-3">
            <h4 className="font-medium">Recommended Activities</h4>
            <div className="space-y-2">
              {[
                {
                  activity: "Walking",
                  duration: "30 minutes",
                  intensity: "moderate",
                },
                {
                  activity: "Yoga",
                  duration: "20 minutes",
                  intensity: "light",
                },
                {
                  activity: "Swimming",
                  duration: "30 minutes",
                  intensity: "moderate",
                },
                {
                  activity: "Stretching",
                  duration: "15 minutes",
                  intensity: "light",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent/50 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="text-sm font-medium">{item.activity}</div>
                    <div className="text-xs text-muted-foreground">
                      {item.duration}
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className={`px-2 capitalize ${getIntensityColor(
                      item.intensity
                    )}`}
                  >
                    {item.intensity}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Guidelines */}
          <div className="space-y-3">
            <h4 className="font-medium">Daily Goals</h4>
            <div className="space-y-2">
              <div className="p-3 rounded-lg border space-y-1">
                <div className="font-medium">Steps</div>
                <div className="text-sm text-muted-foreground">
                  Aim for 10,000 steps per day
                </div>
              </div>
              <div className="p-3 rounded-lg border space-y-1">
                <div className="font-medium">Active Minutes</div>
                <div className="text-sm text-muted-foreground">
                  Target 60 minutes of moderate activity
                </div>
              </div>
              <div className="p-3 rounded-lg border space-y-1">
                <div className="font-medium">Exercise Frequency</div>
                <div className="text-sm text-muted-foreground">
                  Aim for activity on most days of the week
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
