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
        <p className="text-sm font-medium">{label}</p>
        <div className="flex items-center gap-2 text-sm mt-1">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <span className="text-muted-foreground">Energy Level:</span>
          <span className="font-medium">{payload[0].value} / 10</span>
        </div>
      </div>
    );
  }
  return null;
};

export const EnergyLevelsWidget = ({ title, description }) => {
  const data = generateHealthData();
  const { energy_levels } = data;

  // Calculate average energy level
  const averageEnergy =
    energy_levels.reduce((sum, level) => sum + level.level, 0) /
    energy_levels.length;

  const getEnergyColor = (level) => {
    if (level >= 8) return "bg-primary/10 text-primary border-primary/20";
    if (level >= 6) return "bg-chart-2/10 text-chart-2 border-chart-2/20";
    if (level >= 4) return "bg-chart-5/10 text-chart-5 border-chart-5/20";
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
          {/* Current Energy Summary */}
          <div className="text-center space-y-2">
            <Badge
              variant="outline"
              className={`px-2 ${getEnergyColor(averageEnergy)}`}
            >
              Average Energy: {averageEnergy.toFixed(1)} / 10
            </Badge>
            <div className="text-4xl">⚡</div>
          </div>

          {/* Energy Chart */}
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={energy_levels}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="time"
                  tick={{ fontSize: 12 }}
                  className="text-muted-foreground"
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  domain={[0, 10]}
                  className="text-muted-foreground"
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="level"
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Energy Log */}
          <div className="space-y-3">
            <h4 className="font-medium">Daily Energy Log</h4>
            <div className="space-y-2">
              {energy_levels.map((entry, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent/50 transition-colors"
                >
                  <span className="text-sm font-medium">{entry.time}</span>
                  <Badge
                    variant="outline"
                    className={`px-2 ${getEnergyColor(entry.level)}`}
                  >
                    {entry.level} / 10
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Energy Management Tips */}
          <div className="space-y-3">
            <h4 className="font-medium">Energy Management Tips</h4>
            <div className="space-y-2">
              {[
                "Maintain a consistent sleep schedule",
                "Stay hydrated throughout the day",
                "Take regular breaks during activities",
                "Practice stress-reduction techniques",
                "Exercise moderately when energy is highest",
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
