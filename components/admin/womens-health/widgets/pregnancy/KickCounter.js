"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { generatePregnancyData } from "./mockData";
import { WIDGET_STYLES } from "@/lib/constants/widget-styles";

export const KickCounter = ({ title, description }) => {
  const data = generatePregnancyData();

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
          {/* Today's Summary */}
          <div className="text-center space-y-2">
            <Badge
              variant="outline"
              className="px-2 bg-primary/10 text-primary border-primary/20"
            >
              Today's Movements
            </Badge>
            <div className="text-4xl font-bold">{data.kicks[0].count}</div>
            <p className="text-sm text-muted-foreground">
              in {data.kicks[0].duration}
            </p>
          </div>

          {/* Recent History */}
          <div className="space-y-3">
            <h4 className="font-medium">Recent Activity</h4>
            <div className="space-y-2">
              {data.kicks.map((record, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent/50 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="text-sm font-medium">
                      {new Date(record.date).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Duration: {record.duration}
                    </div>
                  </div>
                  <Badge variant="secondary" className="px-2">
                    {record.count} kicks
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Guidelines */}
          <div className="space-y-3">
            <h4 className="font-medium">Guidelines</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• Count kicks at the same time each day</p>
              <p>• Aim for 10 movements within 2 hours</p>
              <p>• Contact your doctor if movements decrease</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
