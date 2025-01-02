"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { generateHealthData } from "./mockData";
import { WIDGET_STYLES } from "@/lib/constants/widget-styles";

export const StressTrackerWidget = ({ title, description }) => {
  const data = generateHealthData();
  const { stress } = data;

  const getStressLevelColor = (level) => {
    if (level <= 3) return "bg-primary/10 text-primary border-primary/20";
    if (level <= 6) return "bg-chart-5/10 text-chart-5 border-chart-5/20";
    return "bg-destructive/10 text-destructive border-destructive/20";
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
          {/* Current Stress Level */}
          <div className="text-center space-y-4">
            <Badge
              variant="outline"
              className={`px-2 ${getStressLevelColor(stress.current_level)}`}
            >
              Current Stress Level: {stress.current_level} / 10
            </Badge>
            <Progress value={stress.current_level * 10} className="h-2" />
          </div>

          {/* Stress Triggers */}
          <div className="space-y-3">
            <h4 className="font-medium">Current Triggers</h4>
            <div className="flex flex-wrap gap-2">
              {stress.triggers.map((trigger, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="px-2 capitalize"
                >
                  {trigger}
                </Badge>
              ))}
            </div>
          </div>

          {/* Coping Methods */}
          <div className="space-y-3">
            <h4 className="font-medium">Coping Methods</h4>
            <div className="flex flex-wrap gap-2">
              {stress.coping_methods.map((method, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="px-2 bg-primary/10 text-primary border-primary/20 capitalize"
                >
                  {method}
                </Badge>
              ))}
            </div>
          </div>

          {/* Stress Management Tips */}
          <div className="space-y-3">
            <h4 className="font-medium">Stress Management Tips</h4>
            <div className="space-y-2">
              {[
                {
                  tip: "Practice deep breathing exercises",
                  duration: "5-10 minutes",
                },
                {
                  tip: "Take regular breaks during work",
                  duration: "15 minutes every 2 hours",
                },
                {
                  tip: "Go for a short walk",
                  duration: "10-15 minutes",
                },
                {
                  tip: "Try progressive muscle relaxation",
                  duration: "10-15 minutes",
                },
                {
                  tip: "Listen to calming music",
                  duration: "15-20 minutes",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="p-3 rounded-lg border hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="text-sm font-medium">{item.tip}</div>
                      <div className="text-xs text-muted-foreground">
                        Recommended duration: {item.duration}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stress Level Guide */}
          <div className="space-y-3">
            <h4 className="font-medium">Stress Level Guide</h4>
            <div className="space-y-2">
              {[
                {
                  level: "Low (1-3)",
                  description: "Manageable, minimal impact on daily life",
                },
                {
                  level: "Moderate (4-6)",
                  description: "Noticeable impact, may need active management",
                },
                {
                  level: "High (7-10)",
                  description:
                    "Significant impact, requires immediate attention",
                },
              ].map((guide, index) => (
                <div
                  key={index}
                  className="p-3 rounded-lg border hover:bg-accent/50 transition-colors"
                >
                  <div className="font-medium">{guide.level}</div>
                  <div className="text-sm text-muted-foreground">
                    {guide.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
