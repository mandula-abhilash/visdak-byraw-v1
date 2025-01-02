"use client";

import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { formatCurrency } from "../../utils/formatters";
import { Progress } from "@/components/ui/progress";
import { WIDGET_STYLES } from "@/lib/constants/widget-styles";

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
            {Math.round((payload[0].value / totalIncome) * 100)}%
          </span>
        </div>
      </div>
    );
  }
  return null;
};

// Mock data - replace with real data
const totalIncome = 1000000;
const totalExpenses = 750000;
const data = [
  { name: "Expenses", value: totalExpenses },
  { name: "Savings", value: totalIncome - totalExpenses },
];

const COLORS = ["hsl(var(--destructive))", "hsl(var(--primary))"];

export const ExpenseIncomeRatio = ({ title, description }) => {
  const expenseRatio = (totalExpenses / totalIncome) * 100;
  const savingsRatio = 100 - expenseRatio;

  const getHealthStatus = (ratio) => {
    if (ratio >= 80) return "High Risk";
    if (ratio >= 60) return "Moderate";
    return "Healthy";
  };

  const getHealthColor = (ratio) => {
    if (ratio >= 80) return "text-destructive";
    if (ratio >= 60) return "text-chart-5";
    return "text-primary";
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
        className="flex-1 p-4"
        style={{
          minHeight: WIDGET_STYLES.MIN_HEIGHT,
          maxHeight: WIDGET_STYLES.MAX_HEIGHT,
        }}
      >
        <div className="h-full flex flex-col">
          <div className="flex-1">
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
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Expense Ratio</span>
                <span className={getHealthColor(expenseRatio)}>
                  {Math.round(expenseRatio)}%
                </span>
              </div>
              <Progress value={expenseRatio} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Savings Ratio</span>
                <span className={getHealthColor(100 - expenseRatio)}>
                  {Math.round(savingsRatio)}%
                </span>
              </div>
              <Progress value={savingsRatio} className="h-2" />
            </div>

            <div className="pt-2 border-t">
              <div className="text-sm text-muted-foreground">Health Status</div>
              <div className={`font-medium ${getHealthColor(expenseRatio)}`}>
                {getHealthStatus(expenseRatio)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
