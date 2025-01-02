"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { generatePeriodData } from "./mockData";
import { WIDGET_STYLES } from "@/lib/constants/widget-styles";

export const OvulationPredictor = ({ title, description }) => {
  const data = generatePeriodData();
  const { fertility_window } = data;

  const daysUntilOvulation = Math.ceil(
    (new Date(fertility_window.ovulation_date) - new Date()) /
      (1000 * 60 * 60 * 24)
  );

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
          {/* Ovulation Status */}
          <div className="text-center space-y-2">
            <Badge
              variant="outline"
              className="px-2 bg-chart-3/10 text-chart-3 border-chart-3/20"
            >
              {daysUntilOvulation > 0
                ? `Ovulation in ${daysUntilOvulation} days`
                : daysUntilOvulation === 0
                ? "Ovulation Day"
                : "Ovulation Passed"}
            </Badge>
            <div className="text-4xl font-bold">🥚</div>
          </div>

          {/* Fertility Window */}
          <div className="space-y-3">
            <h4 className="font-medium">Fertility Window</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 rounded-lg border hover:bg-accent/50 transition-colors">
                <span className="text-sm">Start Date</span>
                <span className="text-sm">
                  {new Date(fertility_window.start_date).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between items-center p-2 rounded-lg border hover:bg-accent/50 transition-colors">
                <span className="text-sm">Ovulation Day</span>
                <span className="text-sm">
                  {new Date(
                    fertility_window.ovulation_date
                  ).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between items-center p-2 rounded-lg border hover:bg-accent/50 transition-colors">
                <span className="text-sm">End Date</span>
                <span className="text-sm">
                  {new Date(fertility_window.end_date).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="space-y-3">
            <h4 className="font-medium">Fertility Tips</h4>
            <div className="space-y-2">
              {[
                "Track cervical mucus changes",
                "Monitor basal body temperature",
                "Note any ovulation symptoms",
                "Stay hydrated and maintain a healthy diet",
              ].map((tip, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-2 rounded-lg border hover:bg-accent/50 transition-colors"
                >
                  <div className="h-1.5 w-1.5 rounded-full bg-chart-3" />
                  <span className="text-sm">{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
