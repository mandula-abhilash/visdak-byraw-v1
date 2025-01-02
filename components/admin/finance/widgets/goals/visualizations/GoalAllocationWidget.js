"use client";

import { Card } from "@/components/ui/card";
import { GoalsHeader } from "../GoalsHeader";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { formatCurrency } from "../../../utils/formatters";
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
      </div>
    );
  }
  return null;
};

export const GoalAllocationWidget = ({
  title = "Goal Allocation",
  description = "Distribution of funds across goals",
}) => {
  const allocationData = [
    { name: "Emergency Fund", value: 600000 },
    { name: "House Down Payment", value: 2000000 },
    { name: "Vacation", value: 200000 },
    { name: "Investment", value: 1000000 },
    { name: "Education", value: 500000 },
  ];

  return (
    <Card className="h-full flex flex-col shadow-lg">
      <GoalsHeader title={title} description={description} />
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
              data={allocationData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {allocationData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
