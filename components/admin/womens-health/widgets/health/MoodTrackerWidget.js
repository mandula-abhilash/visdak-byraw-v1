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
          <span className="text-muted-foreground">Mood Score:</span>
          <span className="font-medium">{payload[0].value} / 10</span>
        </div>
      </div>
    );
  }
  return null;
};

export const MoodTrackerWidget = ({ title, description }) => {
  const data = generateHealthData();
  const { moods } = data;

  const getMoodEmoji = (mood) => {
    switch (mood) {
      case "happy":
        return "😊";
      case "calm":
        return "😌";
      case "stressed":
        return "😰";
      case "anxious":
        return "😟";
      case "sad":
        return "😢";
      default:
        return "😐";
    }
  };

  const getMoodColor = (score) => {
    if (score >= 8) return "bg-primary/10 text-primary border-primary/20";
    if (score >= 6) return "bg-chart-2/10 text-chart-2 border-chart-2/20";
    if (score >= 4) return "bg-chart-5/10 text-chart-5 border-chart-5/20";
    return "bg-destructive/10 text-destructive border-destructive/20";
  };

  // Calculate average mood score
  const averageMood =
    moods.reduce((sum, mood) => sum + mood.score, 0) / moods.length;

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
          {/* Current Mood Summary */}
          <div className="text-center space-y-2">
            <Badge
              variant="outline"
              className={`px-2 ${getMoodColor(averageMood)}`}
            >
              Average Mood: {averageMood.toFixed(1)} / 10
            </Badge>
            <div className="text-4xl">
              {getMoodEmoji(moods[moods.length - 1].mood)}
            </div>
          </div>

          {/* Mood Chart */}
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={moods}>
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
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--primary))" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Mood Log */}
          <div className="space-y-3">
            <h4 className="font-medium">Recent Moods</h4>
            <div className="space-y-2">
              {moods.map((mood, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">
                          {getMoodEmoji(mood.mood)}
                        </span>
                        <span className="font-medium capitalize">
                          {mood.mood}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(mood.date).toLocaleDateString()}
                      </div>
                      {mood.notes && (
                        <div className="text-sm text-muted-foreground">
                          {mood.notes}
                        </div>
                      )}
                    </div>
                    <Badge
                      variant="outline"
                      className={`px-2 ${getMoodColor(mood.score)}`}
                    >
                      {mood.score} / 10
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mood Management Tips */}
          <div className="space-y-3">
            <h4 className="font-medium">Mood Management Tips</h4>
            <div className="space-y-2">
              {[
                "Practice deep breathing exercises",
                "Take regular breaks during the day",
                "Stay hydrated and maintain a balanced diet",
                "Get regular exercise",
                "Maintain a consistent sleep schedule",
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
