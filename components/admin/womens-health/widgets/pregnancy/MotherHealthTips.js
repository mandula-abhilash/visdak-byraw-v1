"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { generatePregnancyData } from "./mockData";
import { WIDGET_STYLES } from "@/lib/constants/widget-styles";

export const MotherHealthTips = ({ title, description }) => {
  const data = generatePregnancyData();
  const weeklyTips = data.weekly_tips[0];

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
          {/* Week Badge */}
          <div className="text-center">
            <Badge
              variant="outline"
              className="px-2 bg-primary/10 text-primary border-primary/20"
            >
              Week {weeklyTips.week}
            </Badge>
          </div>

          {/* Health Tips */}
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">Health Tips</h4>
              <div className="space-y-2">
                {weeklyTips.mother_tips.map((tip, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-2 rounded-lg border hover:bg-accent/50 transition-colors"
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span className="text-sm">{tip}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Nutrition Tips */}
            <div className="space-y-2">
              <h4 className="font-medium">Nutrition Tips</h4>
              <div className="space-y-2">
                {weeklyTips.nutrition_tips.map((tip, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-2 rounded-lg border hover:bg-accent/50 transition-colors"
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-chart-2" />
                    <span className="text-sm">{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
