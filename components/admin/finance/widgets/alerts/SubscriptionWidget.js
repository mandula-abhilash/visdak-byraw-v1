"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "../../utils/formatters";
import { generateSubscriptions } from "./utils/mockData";
import { WIDGET_STYLES } from "@/lib/constants/widget-styles";

export const SubscriptionWidget = ({
  title = "Subscription Renewals",
  description,
}) => {
  const subscriptions = generateSubscriptions();

  const getStatusColor = (renewalDate) => {
    const daysUntilRenewal = Math.ceil(
      (new Date(renewalDate) - new Date()) / (1000 * 60 * 60 * 24)
    );
    if (daysUntilRenewal <= 7) {
      return "bg-chart-5/10 text-chart-5 border-chart-5/20";
    }
    if (daysUntilRenewal <= 15) {
      return "bg-chart-2/10 text-chart-2 border-chart-2/20";
    }
    return "bg-primary/10 text-primary border-primary/20";
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
          {subscriptions.map((subscription) => (
            <div
              key={subscription.id}
              className="p-4 border rounded-lg hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="font-medium">{subscription.title}</div>
                  <div className="text-sm text-muted-foreground">
                    Renews:{" "}
                    {new Date(subscription.renewalDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {subscription.category}
                    </Badge>
                    <Badge variant="secondary" className="text-xs capitalize">
                      {subscription.billingCycle}
                    </Badge>
                    {subscription.autoRenew && (
                      <Badge
                        variant="outline"
                        className="text-xs bg-primary/10 text-primary border-primary/20"
                      >
                        Auto-renew
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="text-right space-y-2">
                  <div className="font-semibold">
                    {formatCurrency(subscription.amount)}
                  </div>
                  <Badge
                    variant="outline"
                    className={`px-2 ${getStatusColor(
                      subscription.renewalDate
                    )}`}
                  >
                    Renews in{" "}
                    {Math.ceil(
                      (new Date(subscription.renewalDate) - new Date()) /
                        (1000 * 60 * 60 * 24)
                    )}{" "}
                    days
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
