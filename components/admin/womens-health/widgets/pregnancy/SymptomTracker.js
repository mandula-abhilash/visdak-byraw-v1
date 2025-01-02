"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { generatePregnancyData } from "./mockData";
import { WIDGET_STYLES } from "@/lib/constants/widget-styles";

export const SymptomTracker = ({ title, description }) => {
  const data = generatePregnancyData();

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "severe":
        return "bg-destructive/10 text-destructive border-destructive/20";
      case "moderate":
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
        <div className="space-y-6">
          {/* Recent Symptoms */}
          <div className="space-y-3">
            <h4 className="font-medium">Recent Symptoms</h4>
            <div className="space-y-2">
              {data.symptoms.map((symptom, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="font-medium capitalize">
                        {symptom.type}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(symptom.date).toLocaleDateString()}
                      </div>
                      <div className="text-sm text-muted-foreground capitalize">
                        Duration: {symptom.duration}
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={`px-2 capitalize ${getSeverityColor(
                        symptom.severity
                      )}`}
                    >
                      {symptom.severity}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Common Symptoms Guide */}
          <div className="space-y-3">
            <h4 className="font-medium">Common Symptoms Guide</h4>
            <div className="space-y-2">
              {[
                { symptom: "Nausea", when: "Common in first trimester" },
                { symptom: "Fatigue", when: "Throughout pregnancy" },
                { symptom: "Back Pain", when: "More common in later stages" },
                { symptom: "Heartburn", when: "Second and third trimester" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 rounded-lg border hover:bg-accent/50 transition-colors"
                >
                  <span className="text-sm font-medium">{item.symptom}</span>
                  <span className="text-sm text-muted-foreground">
                    {item.when}
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
