"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { formatCurrency } from "../../utils/formatters";
import { generateBalanceAlerts } from "./utils/mockData";
import { WIDGET_STYLES } from "@/lib/constants/widget-styles";

export const LowBalanceWidget = ({
  title = "Low Balance Alerts",
  description,
}) => {
  const accounts = generateBalanceAlerts();

  const getStatusColor = (status) => {
    switch (status) {
      case "critical":
        return "bg-destructive/10 text-destructive border-destructive/20";
      case "warning":
        return "bg-chart-5/10 text-chart-5 border-chart-5/20";
      default:
        return "bg-primary/10 text-primary border-primary/20";
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
        <div className="space-y-4">
          {accounts.map((account) => {
            const percentage =
              (account.currentBalance / account.threshold) * 100;
            return (
              <div
                key={account.id}
                className="p-4 border rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium">{account.accountName}</h4>
                      <p className="text-sm text-muted-foreground">
                        Threshold: {formatCurrency(account.threshold)}
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className={`px-2 ${getStatusColor(account.status)}`}
                    >
                      {percentage.toFixed(0)}% of threshold
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Current Balance
                      </span>
                      <span className="font-medium">
                        {formatCurrency(account.currentBalance)}
                      </span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                    <div className="text-xs text-muted-foreground">
                      {formatCurrency(
                        account.threshold - account.currentBalance
                      )}{" "}
                      needed to reach threshold
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};
