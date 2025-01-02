"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { InvestmentHeader } from "./InvestmentHeader";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { formatCurrency } from "../../utils/formatters";
import { generateAssetAllocation } from "./utils/mockData";
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

export const AssetAllocationWidget = ({
  title = "Asset Allocation",
  description = "View portfolio distribution",
}) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const data = generateAssetAllocation();

  return (
    <Card className="h-full flex flex-col shadow-lg">
      <InvestmentHeader title={title} description={description} />
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
                    }}
                  />
                );
              })}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
