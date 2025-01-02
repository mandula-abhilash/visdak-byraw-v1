"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "../../utils/formatters";
import { Progress } from "@/components/ui/progress";
import { WIDGET_STYLES } from "@/lib/constants/widget-styles";
import { TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";

export const SurplusDeficitIndicator = ({ title, description }) => {
  // Mock data - replace with real data
  const data = {
    currentBalance: 250000,
    previousBalance: 200000,
    monthlyTarget: 300000,
    suggestions: [
      "Reduce discretionary spending by 10%",
      "Consider additional income sources",
      "Review and optimize monthly subscriptions",
    ],
  };

  const percentageOfTarget = (data.currentBalance / data.monthlyTarget) * 100;
  const changePercentage =
    ((data.currentBalance - data.previousBalance) / data.previousBalance) * 100;

  const getStatusColor = (balance, target) => {
    const ratio = (balance / target) * 100;
    if (ratio >= 90) return "text-primary";
    if (ratio >= 70) return "text-chart-2";
    return "text-destructive";
  };

  const getStatusBadge = (balance, target) => {
    const ratio = (balance / target) * 100;
    if (ratio >= 90) return "bg-primary/10 text-primary border-primary/20";
    if (ratio >= 70) return "bg-chart-2/10 text-chart-2 border-chart-2/20";
    return "bg-destructive/10 text-destructive border-destructive/20";
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
        className="flex-1 p-4 overflow-auto"
        style={{
          minHeight: WIDGET_STYLES.MIN_HEIGHT,
          maxHeight: WIDGET_STYLES.MAX_HEIGHT,
        }}
      >
        <div className="space-y-6">
          {/* Current Balance */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Current Balance
              </span>
              <Badge
                variant="outline"
                className={`px-2 ${getStatusBadge(
                  data.currentBalance,
                  data.monthlyTarget
                )}`}
              >
                {formatCurrency(data.currentBalance)}
              </Badge>
            </div>
            <Progress value={percentageOfTarget} className="h-2" />
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                {Math.round(percentageOfTarget)}% of target
              </span>
              <span className="text-muted-foreground">
                Target: {formatCurrency(data.monthlyTarget)}
              </span>
            </div>
          </div>

          {/* Monthly Change */}
          <div className="p-4 border rounded-lg space-y-2">
            <div className="flex items-center gap-2">
              {changePercentage >= 0 ? (
                <TrendingUp className="h-4 w-4 text-primary" />
              ) : (
                <TrendingDown className="h-4 w-4 text-destructive" />
              )}
              <span
                className={
                  changePercentage >= 0 ? "text-primary" : "text-destructive"
                }
              >
                {changePercentage >= 0 ? "+" : ""}
                {changePercentage.toFixed(1)}% from last month
              </span>
            </div>
          </div>

          {/* Suggestions */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-sm font-medium">Suggestions</span>
            </div>
            <div className="space-y-2">
              {data.suggestions.map((suggestion, index) => (
                <div key={index} className="p-2 bg-accent/50 rounded text-sm">
                  {suggestion}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
