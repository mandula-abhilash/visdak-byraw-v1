"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { generatePregnancyData } from "./mockData";
import { WIDGET_STYLES } from "@/lib/constants/widget-styles";

export const DueDateCountdown = ({ title, description }) => {
  const data = generatePregnancyData();
  const dueDate = new Date(data.due_date);
  const today = new Date();
  const totalDays = 280; // 40 weeks
  const daysLeft = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
  const progress = ((totalDays - daysLeft) / totalDays) * 100;

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
          {/* Countdown Display */}
          <div className="text-center space-y-4">
            <Badge
              variant="outline"
              className="px-2 bg-primary/10 text-primary border-primary/20"
            >
              {daysLeft} days to go!
            </Badge>
            <div className="text-4xl font-bold">👶</div>
            <p className="text-lg">Due on {dueDate.toLocaleDateString()}</p>
          </div>

          {/* Progress */}
          <div className="space-y-2">
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Conception</span>
              <span>Due Date</span>
            </div>
          </div>

          {/* Milestones */}
          <div className="space-y-3">
            <h4 className="font-medium">Key Milestones</h4>
            <div className="space-y-2">
              {[
                { week: 12, label: "First Trimester Complete" },
                { week: 20, label: "Halfway Point" },
                { week: 24, label: "Viability Milestone" },
                { week: 28, label: "Third Trimester Begins" },
                { week: 37, label: "Full Term" },
              ].map((milestone) => (
                <div
                  key={milestone.week}
                  className={`flex items-center justify-between p-2 rounded-lg border ${
                    data.current_week >= milestone.week
                      ? "bg-primary/5 border-primary/20"
                      : "hover:bg-accent/50"
                  } transition-colors`}
                >
                  <span className="text-sm">Week {milestone.week}</span>
                  <span
                    className={`text-sm ${
                      data.current_week >= milestone.week
                        ? "text-primary font-medium"
                        : "text-muted-foreground"
                    }`}
                  >
                    {milestone.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
