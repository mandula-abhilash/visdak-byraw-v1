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
import { formatCurrency } from "../../utils/formatters";
import { WIDGET_STYLES } from "@/lib/constants/widget-styles";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background/95 backdrop-blur-sm border rounded-lg shadow-lg p-4">
        <p className="font-medium mb-2">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-muted-foreground">{entry.name}:</span>
            <span className="font-medium">{formatCurrency(entry.value)}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export const SpendingInsightsWidget = ({
  title = "Spending Insights",
  description = "Unusual spending patterns and alerts",
}) => {
  // Mock data - replace with real data
  const spendingData = [
    {
      category: "Food",
      current: 15000,
      average: 12000,
      variance: 25,
    },
    {
      category: "Shopping",
      current: 25000,
      average: 18000,
      variance: 38.9,
    },
    {
      category: "Transport",
      current: 8000,
      average: 10000,
      variance: -20,
    },
    {
      category: "Entertainment",
      current: 12000,
      average: 8000,
      variance: 50,
    },
  ];

  const alerts = [
    {
      category: "Shopping",
      message: "50% higher than usual",
      severity: "high",
    },
    {
      category: "Entertainment",
      message: "Unusual weekend spending",
      severity: "medium",
    },
    {
      category: "Transport",
      message: "Lower than average",
      severity: "low",
    },
  ];

  const getAlertColor = (severity) => {
    switch (severity) {
      case "high":
        return "bg-destructive/10 text-destructive border-destructive/20";
      case "medium":
        return "bg-chart-5/10 text-chart-5 border-chart-5/20";
      case "low":
        return "bg-primary/10 text-primary border-primary/20";
      default:
        return "bg-muted text-muted-foreground";
    }
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
          {/* Spending Comparison Chart */}
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={spendingData} barGap={0}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="category"
                  tick={{ fontSize: 12 }}
                  className="text-muted-foreground"
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  className="text-muted-foreground"
                  tickFormatter={formatCurrency}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="current"
                  name="Current"
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="average"
                  name="Average"
                  fill="hsl(var(--chart-2))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Alerts Section */}
          <div className="space-y-4">
            <h4 className="font-medium">Spending Alerts</h4>
            <div className="space-y-3">
              {alerts.map((alert, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="font-medium">{alert.category}</div>
                    <div className="text-sm text-muted-foreground">
                      {alert.message}
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className={`px-2 capitalize ${getAlertColor(
                      alert.severity
                    )}`}
                  >
                    {alert.severity}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
