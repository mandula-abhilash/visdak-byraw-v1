"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
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
          <span className="text-sm text-muted-foreground">Percentage:</span>
          <span className="text-sm font-medium">
            {Math.round(payload[0].percentage)}%
          </span>
        </div>
      </div>
    );
  }
  return null;
};

export const CategoryBreakdown = ({ title, description, type = "income" }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  // Mock data - replace with real data
  const data =
    type === "income"
      ? [
          { name: "Salary", value: 500000, percentage: 50 },
          { name: "Investments", value: 200000, percentage: 20 },
          { name: "Freelancing", value: 150000, percentage: 15 },
          { name: "Rental", value: 100000, percentage: 10 },
          { name: "Other", value: 50000, percentage: 5 },
        ]
      : [
          { name: "Housing", value: 300000, percentage: 40 },
          { name: "Transportation", value: 150000, percentage: 20 },
          { name: "Food", value: 112500, percentage: 15 },
          { name: "Utilities", value: 75000, percentage: 10 },
          { name: "Entertainment", value: 112500, percentage: 15 },
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
        <div className="h-full grid grid-cols-1 lg:grid-cols-2 gap-4 overflow-auto">
          <div className="flex items-center justify-center min-h-[200px]">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  onMouseEnter={(_, index) => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                >
                  {data.map((entry, index) => {
                    const isActive = index === activeIndex;
                    return (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                        className="transition-all duration-300"
                        style={{
                          transform: isActive ? "scale(1.1)" : "scale(1)",
                          transformOrigin: "center",
                        }}
                      />
                    );
                  })}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center min-h-[200px]">
            <div className="w-full space-y-2 overflow-auto">
              {data.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-accent/50 transition-colors"
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-sm">{item.name}</span>
                  </div>
                  <div className="text-sm font-medium">
                    {formatCurrency(item.value)}
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
