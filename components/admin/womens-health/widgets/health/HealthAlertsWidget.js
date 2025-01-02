"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { generateHealthData } from "./mockData";
import { WIDGET_STYLES } from "@/lib/constants/widget-styles";

export const HealthAlertsWidget = ({ title, description }) => {
  const data = generateHealthData();
  const { alerts } = data;

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "high":
        return "bg-destructive/10 text-destructive border-destructive/20";
      case "medium":
        return "bg-chart-5/10 text-chart-5 border-chart-5/20";
      default:
        return "bg-primary/10 text-primary border-primary/20";
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case "symptom_pattern":
        return "🔄";
      case "appointment":
        return "📅";
      case "medication":
        return "💊";
      default:
        return "⚠️";
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
        <div className="space-y-6">
          {/* Active Alerts */}
          <div className="space-y-3">
            <h4 className="font-medium">Active Alerts</h4>
            <div className="space-y-2">
              {alerts.map((alert, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-2xl">{getAlertIcon(alert.type)}</div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <div className="font-medium">{alert.message}</div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(alert.date).toLocaleDateString()}
                          </div>
                        </div>
                        <Badge
                          variant="outline"
                          className={`px-2 capitalize whitespace-nowrap ${getSeverityColor(
                            alert.severity
                          )}`}
                        >
                          {alert.severity}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Alert Categories */}
          <div className="space-y-3">
            <h4 className="font-medium">Alert Categories</h4>
            <div className="grid gap-2">
              {[
                {
                  type: "Symptom Patterns",
                  description: "Recurring or unusual symptoms",
                  icon: "🔄",
                },
                {
                  type: "Appointments",
                  description: "Upcoming medical visits",
                  icon: "📅",
                },
                {
                  type: "Medications",
                  description: "Refills and adherence",
                  icon: "💊",
                },
                {
                  type: "Health Goals",
                  description: "Progress and milestones",
                  icon: "🎯",
                },
              ].map((category, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-lg border hover:bg-accent/50 transition-colors"
                >
                  <div className="text-xl">{category.icon}</div>
                  <div className="space-y-1">
                    <div className="font-medium">{category.type}</div>
                    <div className="text-sm text-muted-foreground">
                      {category.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Alert Guidelines */}
          <div className="space-y-3">
            <h4 className="font-medium">Alert Guidelines</h4>
            <div className="space-y-2">
              {[
                {
                  severity: "High",
                  action: "Requires immediate attention",
                },
                {
                  severity: "Medium",
                  action: "Monitor closely and take action if worsens",
                },
                {
                  severity: "Low",
                  action: "For awareness and tracking",
                },
              ].map((guide, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent/50 transition-colors"
                >
                  <Badge
                    variant="outline"
                    className={`px-2 ${getSeverityColor(
                      guide.severity.toLowerCase()
                    )}`}
                  >
                    {guide.severity}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {guide.action}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
