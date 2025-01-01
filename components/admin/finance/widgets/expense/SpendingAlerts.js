"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, TrendingUp } from "lucide-react";
import { generateSpendingAlerts, formatCurrency } from "../../utils/mockData";

export const SpendingAlerts = ({ title, description }) => {
  const alerts = generateSpendingAlerts();

  const getAlertColor = (severity) => {
    switch (severity.toLowerCase()) {
      case "high":
        return "bg-destructive/10 text-destructive border-destructive/20";
      case "medium":
        return "bg-chart-2/10 text-chart-2 border-chart-2/20";
      case "low":
        return "bg-chart-3/10 text-chart-3 border-chart-3/20";
      default:
        return "bg-muted text-muted-foreground border-muted";
    }
  };

  return (
    <Card className="flex flex-col shadow-lg">
      <div className="p-6 flex-none border-b">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">{title}</h3>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
      <div className="flex-1 p-4 min-h-[400px] overflow-auto">
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="flex items-start gap-3 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
            >
              <div className="shrink-0 pt-1">
                {alert.type === "overspend" ? (
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                ) : (
                  <TrendingUp className="h-5 w-5 text-chart-2" />
                )}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-medium">{alert.category}</p>
                  <Badge
                    variant="secondary"
                    className={`${getAlertColor(alert.severity)} px-2`}
                  >
                    {alert.severity}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {alert.message} ({formatCurrency(alert.amount)})
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
