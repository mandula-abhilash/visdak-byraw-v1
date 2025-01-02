"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { generatePregnancyData } from "./mockData";
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
          <span className="text-muted-foreground">Weight:</span>
          <span className="font-medium">{payload[0].value} kg</span>
        </div>
      </div>
    );
  }
  return null;
};

export const WeightTracker = ({ title, description }) => {
  const data = generatePregnancyData();
  const weightData = data.weight_tracking;

  const totalGain =
    weightData[weightData.length - 1].weight - weightData[0].weight;
  const weeklyGain = totalGain / (weightData.length - 1);

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
          {/* Summary Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Total Gain</div>
              <Badge
                variant="outline"
                className="px-2 bg-primary/10 text-primary border-primary/20"
              >
                {totalGain.toFixed(1)} kg
              </Badge>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Weekly Avg</div>
              <Badge
                variant="outline"
                className="px-2 bg-chart-2/10 text-chart-2 border-chart-2/20"
              >
                {weeklyGain.toFixed(1)} kg/week
              </Badge>
            </div>
          </div>

          {/* Weight Chart */}
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weightData}>
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
                  className="text-muted-foreground"
                  domain={["dataMin - 1", "dataMax + 1"]}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="weight"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--primary))" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Guidelines */}
          <div className="space-y-3">
            <h4 className="font-medium">Weight Gain Guidelines</h4>
            <div className="space-y-2">
              {[
                {
                  bmi: "Underweight (< 18.5)",
                  gain: "12.5-18 kg",
                },
                {
                  bmi: "Normal (18.5-24.9)",
                  gain: "11.5-16 kg",
                },
                {
                  bmi: "Overweight (25-29.9)",
                  gain: "7-11.5 kg",
                },
                {
                  bmi: "Obese (≥ 30)",
                  gain: "5-9 kg",
                },
              ].map((guideline, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 rounded-lg border hover:bg-accent/50 transition-colors"
                >
                  <span className="text-sm">{guideline.bmi}</span>
                  <span className="text-sm text-muted-foreground">
                    {guideline.gain}
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
