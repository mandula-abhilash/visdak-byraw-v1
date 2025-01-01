"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import {
  generateCategoryBudgetData,
  formatCurrency,
} from "../../utils/mockData";
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
          <span className="text-sm text-muted-foreground">Budget:</span>
          <span className="text-sm font-medium">
            {formatCurrency(payload[0].value)}
          </span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-sm text-muted-foreground">Spent:</span>
          <span className="text-sm font-medium">
            {formatCurrency(payload[0].payload.spent)}
          </span>
        </div>
      </div>
    );
  }
  return null;
};

const CustomLegend = ({ payload }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mt-4">
      {payload.map((entry, index) => (
        <div key={`legend-${index}`} className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm text-muted-foreground">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

export const CategoryBudgets = ({ title, description }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const data = generateCategoryBudgetData();

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
              dataKey="budget"
              nameKey="category"
              onMouseEnter={(_, index) => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {data.map((entry, index) => {
                const isActive = index === activeIndex;
                return (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    className="transition-all duration-300 ease-in-out"
                    style={{
                      transform: isActive ? "scale(1.1)" : "scale(1)",
                      filter: isActive ? "brightness(1.1)" : "none",
                      transformOrigin: "center",
                      cursor: "pointer",
                    }}
                  />
                );
              })}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
