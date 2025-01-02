"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { generateHealthData } from "./mockData";
import { WIDGET_STYLES } from "@/lib/constants/widget-styles";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background/95 backdrop-blur-sm border rounded-lg shadow-lg p-4">
        <p className="text-sm font-medium">
          {new Date(label).toLocaleDateString()}
        </p>
        <div className="flex items-center gap-2 text-sm mt-1">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <span className="text-muted-foreground">Sleep Duration:</span>
          <span className="font-medium">{payload[0].value} hours</span>
        </div>
      </div>
    );
  }
  return null;
};

export const SleepTrackerWidget = ({ title, description }) => {
  const data = generateHealthData();
  const { sleep } = data;

  const getSleepQualityColor = (quality) => {
    switch (quality) {
      case "excellent":
        return "bg-primary/10 text-primary border-primary/20";
      case "good":
        return "bg-chart-2/10 text-chart-2 border-chart-2/20";
      case "fair":
        return "bg-chart-5/10 text-chart-5 border-chart-5/20";
      default:
        return "bg-destructive/10 text-destructive border-destructive/20";
    }
  };

  const getHoursColor = (hours) => {
    if (hours >= 8) return "bg-primary/10 text-primary border-primary/20";
    if (hours >= 7) return "bg-chart-2/10 text-chart-2 border-chart-2/20";
    if (hours >= 6) return "bg-chart-5/10 text-chart-5 border-chart-5/20";
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
          {/* Sleep Summary */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Average Sleep</div>
              <Badge
                variant="outline"
                className={`px-2 ${getHoursColor(sleep.average_hours)}`}
              >
                {sleep.average_hours} hours
              </Badge>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Quality Score</div>
              <Badge
                variant="outline"
                className={`px-2 ${getHoursColor(sleep.quality_score)}`}
              >
                {sleep.quality_score} / 10
              </Badge>
            </div>
          </div>

          {/* Sleep Chart */}
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sleep.recent}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12 }}
                  tickFormatter={(date) =>
                    new Date(date).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                    })
                  }
                  className="text-muted-foreground"
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  domain={[0, 10]}
                  className="text-muted-foreground"
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="hours"
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Sleep Log */}
          <div className="space-y-3">
            <h4 className="font-medium">Recent Sleep Log</h4>
            <div className="space-y-2">
              {sleep.recent.map((entry, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="text-sm">
                        {new Date(entry.date).toLocaleDateString()}
                      </div>
                      {entry.notes && (
                        <div className="text-sm text-muted-foreground">
                          {entry.notes}
                        </div>
                      )}
                    </div>
                    <div className="space-y-2 text-right">
                      <Badge
                        variant="outline"
                        className={`px-2 ${getHoursColor(entry.hours)}`}
                      >
                        {entry.hours} hours
                      </Badge>
                      <Badge
                        variant="outline"
                        className={`px-2 block ${getSleepQualityColor(
                          entry.quality
                        )}`}
                      >
                        {entry.quality}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sleep Tips */}
          <div className="space-y-3">
            <h4 className="font-medium">Sleep Improvement Tips</h4>
            <div className="space-y-2">
              {[
                "Maintain a consistent sleep schedule",
                "Create a relaxing bedtime routine",
                "Keep your bedroom cool and dark",
                "Avoid screens before bedtime",
                "Limit caffeine after noon",
              ].map((tip, index) => (
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
        </div>
      </div>
    </Card>
  );
};
