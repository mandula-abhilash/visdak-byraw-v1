"use client";

import { Card } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { formatCurrency } from "../../utils/formatters";
import { WIDGET_STYLES } from "@/lib/constants/widget-styles";

const COLORS = [
  "hsl(var(--primary))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background/95 backdrop-blur-sm border rounded-lg shadow-lg p-4">
        <p className="text-sm font-medium">{payload[0].name}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-sm text-muted-foreground">Amount:</span>
          <span className="text-sm font-medium">
            {formatCurrency(payload[0].value)}
          </span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-sm text-muted-foreground">Priority:</span>
          <span className="text-sm font-medium">
            {payload[0].payload.priority}
          </span>
        </div>
      </div>
    );
  }
  return null;
};

export const GoalPriorityWidget = ({
  title = "Goal Priority",
  description = "Financial goals by priority",
}) => {
  // Mock data - replace with real data
  const data = [
    {
      name: "Retirement",
      value: 5000000,
      priority: "High",
    },
    {
      name: "Emergency Fund",
      value: 1000000,
      priority: "High",
    },
    {
      name: "Children's Education",
      value: 2500000,
      priority: "Medium",
    },
    {
      name: "Home Purchase",
      value: 3000000,
      priority: "Medium",
    },
    {
      name: "Travel",
      value: 500000,
      priority: "Low",
    },
  ];

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
        className="flex-1 p-4"
        style={{
          minHeight: WIDGET_STYLES.MIN_HEIGHT,
          maxHeight: WIDGET_STYLES.MAX_HEIGHT,
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  className="transition-all duration-300 hover:opacity-80"
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              formatter={(value, entry) => (
                <span className="text-sm text-muted-foreground">
                  {value} ({entry.payload.priority})
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
