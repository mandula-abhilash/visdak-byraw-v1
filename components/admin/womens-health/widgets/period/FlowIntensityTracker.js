"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { generatePeriodData } from "./mockData";
import { WIDGET_STYLES } from "@/lib/constants/widget-styles";

export const FlowIntensityTracker = ({ title, description }) => {
  const data = generatePeriodData();
  const { flow_log } = data;

  const getIntensityColor = (intensity) => {
    switch (intensity) {
      case "heavy":
        return "bg-destructive/10 text-destructive border-destructive/20";
      case "medium":
        return "bg-chart-5/10 text-chart-5 border-chart-5/20";
      case "light":
        return "bg-primary/10 text-primary border-primary/20";
      default:
        return "bg-muted text-muted-foreground";
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
          {/* Flow Log */}
          <div className="space-y-3">
            <h4 className="font-medium">Flow Log</h4>
            <div className="space-y-2">
              {flow_log.map((log, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="text-sm">
                        {new Date(log.date).toLocaleDateString()}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {log.products_used.map((product, idx) => (
                          <Badge
                            key={idx}
                            variant="secondary"
                            className="px-2 capitalize"
                          >
                            {product}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={`px-2 capitalize ${getIntensityColor(
                        log.intensity
                      )}`}
                    >
                      {log.intensity}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Guidelines */}
          <div className="space-y-3">
            <h4 className="font-medium">Flow Guidelines</h4>
            <div className="space-y-2">
              {[
                {
                  intensity: "Light",
                  description: "1-2 pads/tampons per day",
                },
                {
                  intensity: "Medium",
                  description: "3-4 pads/tampons per day",
                },
                {
                  intensity: "Heavy",
                  description: "5+ pads/tampons per day",
                },
              ].map((guide, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 rounded-lg border hover:bg-accent/50 transition-colors"
                >
                  <span className="text-sm font-medium">{guide.intensity}</span>
                  <span className="text-sm text-muted-foreground">
                    {guide.description}
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
