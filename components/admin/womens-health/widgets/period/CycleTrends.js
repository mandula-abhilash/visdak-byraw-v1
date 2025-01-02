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
import { generatePeriodData } from "./mockData";
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
          <span className="text-muted-foreground">Cycle Length:</span>
          <span className="font-medium">{payload[0].value} days</span>
        </div>
        <div className="flex items-center gap-2 text-sm mt-1">
          <div className="w-3 h-3 rounded-full bg-chart-2" />
          <span className="text-muted-foreground">Period Length:</span>
          <span className="font-medium">{payload[1].value} days</span>
        </div>
      </div>
    );
  }
  return null;
};

export const CycleTrends = ({ title, description }) => {
  const data = generatePeriodData();
  const { cycle_history } = data;

  // Calculate averages
  const avgCycleLength =
    cycle_history.reduce((sum, cycle) => sum + cycle.cycle_length, 0) /
    cycle_history.length;
  const avgPeriodLength =
    cycle_history.reduce((sum, cycle) => sum + cycle.period_length, 0) /
    cycle_history.length;

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
          {/* Averages */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">
                Avg Cycle Length
              </div>
              <Badge
                variant="outline"
                className="px-2 bg-primary/10 text-primary border-primary/20"
              >
                {avgCycleLength.toFixed(1)} days
              </Badge>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">
                Avg Period Length
              </div>
              <Badge
                variant="outline"
                className="px-2 bg-chart-2/10 text-chart-2 border-chart-2/20"
              >
                {avgPeriodLength.toFixed(1)} days
              </Badge>
            </div>
          </div>

          {/* Trends Chart */}
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cycle_history} barGap={0}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="start_date"
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
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="cycle_length"
                  name="Cycle Length"
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="period_length"
                  name="Period Length"
                  fill="hsl(var(--chart-2))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Cycle Details */}
          <div className="space-y-3">
            <h4 className="font-medium">Recent Cycles</h4>
            <div className="space-y-2">
              {cycle_history.map((cycle, index) => (
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
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
