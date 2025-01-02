"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { generatePeriodData } from "./mockData";
import { WIDGET_STYLES } from "@/lib/constants/widget-styles";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background/95 backdrop-blur-sm border rounded-lg shadow-lg p-4">
        <p className="text-sm font-medium">
          {new Date(label).toLocaleDateString(undefined, {
            month: "long",
            year: "numeric",
          })}
        </p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 text-sm mt-1">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-muted-foreground">{entry.name}:</span>
            <span className="font-medium">{entry.value} days</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export const CycleTrends = ({ title, description }) => {
  const data = generatePeriodData();
  // Sort cycle history from oldest to newest for proper trend display
  const sortedHistory = [...data.cycle_history].sort(
    (a, b) => new Date(a.start_date) - new Date(b.start_date)
  );

  // Calculate statistics
  const stats = {
    avgCycleLength:
      sortedHistory.reduce((sum, cycle) => sum + cycle.cycle_length, 0) /
      sortedHistory.length,
    avgPeriodLength:
      sortedHistory.reduce((sum, cycle) => sum + cycle.period_length, 0) /
      sortedHistory.length,
    shortestCycle: Math.min(...sortedHistory.map((c) => c.cycle_length)),
    longestCycle: Math.max(...sortedHistory.map((c) => c.cycle_length)),
    regularityScore: Math.round(
      (1 -
        Math.abs(
          Math.max(...sortedHistory.map((c) => c.cycle_length)) -
            Math.min(...sortedHistory.map((c) => c.cycle_length))
        ) /
          30) *
        100
    ),
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
          {/* Statistics Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Avg Cycle</div>
              <Badge
                variant="outline"
                className="px-2 bg-primary/10 text-primary border-primary/20"
              >
                {stats.avgCycleLength.toFixed(1)} days
              </Badge>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Avg Period</div>
              <Badge
                variant="outline"
                className="px-2 bg-chart-2/10 text-chart-2 border-chart-2/20"
              >
                {stats.avgPeriodLength.toFixed(1)} days
              </Badge>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Cycle Range</div>
              <Badge
                variant="outline"
                className="px-2 bg-chart-3/10 text-chart-3 border-chart-3/20"
              >
                {stats.shortestCycle}-{stats.longestCycle} days
              </Badge>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Regularity</div>
              <Badge
                variant="outline"
                className="px-2 bg-chart-4/10 text-chart-4 border-chart-4/20"
              >
                {stats.regularityScore}% regular
              </Badge>
            </div>
          </div>

          {/* Trends Chart */}
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sortedHistory}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="start_date"
                  tick={{ fontSize: 12 }}
                  tickFormatter={(date) =>
                    new Date(date).toLocaleDateString(undefined, {
                      month: "short",
                      year: "numeric",
                    })
                  }
                  className="text-muted-foreground"
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  className="text-muted-foreground"
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="cycle_length"
                  name="Cycle Length"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary)/0.2)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="period_length"
                  name="Period Length"
                  stroke="hsl(var(--chart-2))"
                  fill="hsl(var(--chart-2)/0.2)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Cycle Details */}
          <div className="space-y-3">
            <h4 className="font-medium">Recent Cycles</h4>
            <div className="space-y-2">
              {[...data.cycle_history]
                .sort((a, b) => new Date(b.start_date) - new Date(a.start_date))
                .map((cycle, index) => (
                  <div
                    key={index}
                    className="p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <div className="text-sm">
                          {new Date(cycle.start_date).toLocaleDateString()} -{" "}
                          {new Date(cycle.end_date).toLocaleDateString()}
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {cycle.symptoms.map((symptom, idx) => (
                            <Badge
                              key={idx}
                              variant="secondary"
                              className="px-2 capitalize"
                            >
                              {symptom}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="text-right space-y-1">
                        <div className="text-sm font-medium">
                          {cycle.cycle_length} days
                        </div>
                        <Badge
                          variant="outline"
                          className={`px-2 capitalize ${
                            cycle.flow_intensity === "heavy"
                              ? "bg-destructive/10 text-destructive border-destructive/20"
                              : cycle.flow_intensity === "medium"
                              ? "bg-chart-5/10 text-chart-5 border-chart-5/20"
                              : "bg-primary/10 text-primary border-primary/20"
                          }`}
                        >
                          {cycle.flow_intensity}
                        </Badge>
                      </div>
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
