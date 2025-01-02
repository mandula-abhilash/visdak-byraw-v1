"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { generateTrimesterData } from "./mockData";
import { WIDGET_STYLES } from "@/lib/constants/widget-styles";
import { CheckCircle2 } from "lucide-react";

export const TrimesterOverview = ({ title, description }) => {
  const data = generateTrimesterData();

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
          {/* Current Trimester Status */}
          <div className="text-center space-y-2">
            <Badge
              variant="outline"
              className="px-2 bg-primary/10 text-primary border-primary/20"
            >
              Trimester {data.current}
            </Badge>
            <Progress value={data.progress} className="h-2" />
            <p className="text-sm text-muted-foreground">
              {data.progress}% through current trimester
            </p>
          </div>

          {/* Trimester Timeline */}
          <div className="space-y-4">
            {data.milestones.map((milestone) => (
              <div
                key={milestone.trimester}
                className="relative flex gap-4 pb-8 last:pb-0"
              >
                {/* Timeline line */}
                {milestone.trimester < data.milestones.length && (
                  <div className="absolute left-[15px] top-7 bottom-0 w-px bg-border" />
                )}

                {/* Timeline node */}
                <div
                  className={`h-7 w-7 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    milestone.completed
                      ? "bg-primary/10 border-primary"
                      : "bg-muted border-muted-foreground"
                  }`}
                >
                  {milestone.completed && (
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                  )}
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <div className="font-medium">
                    Trimester {milestone.trimester}
                  </div>
                  <div className="space-y-1">
                    {milestone.highlights.map((highlight, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-sm"
                      >
                        <div
                          className={`h-1.5 w-1.5 rounded-full ${
                            milestone.completed
                              ? "bg-primary"
                              : "bg-muted-foreground"
                          }`}
                        />
                        <span
                          className={
                            milestone.completed ? "" : "text-muted-foreground"
                          }
                        >
                          {highlight}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};
