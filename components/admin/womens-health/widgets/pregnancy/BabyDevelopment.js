"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { generateBabyDevelopmentData } from "./mockData";
import { WIDGET_STYLES } from "@/lib/constants/widget-styles";

export const BabyDevelopment = ({ title, description }) => {
  const data = generateBabyDevelopmentData();

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
          {/* Current Size */}
          <div className="text-center space-y-4">
            <Badge
              variant="outline"
              className="px-2 bg-primary/10 text-primary border-primary/20"
            >
              Week {data.current_week}
            </Badge>
            <div className="text-4xl font-bold">🍆</div>
            <p className="text-lg">
              Your baby is the size of an {data.size.comparison}
            </p>
            <div className="flex justify-center gap-4 text-sm text-muted-foreground">
              <span>{data.size.length} long</span>
              <span>•</span>
              <span>{data.size.weight}</span>
            </div>
          </div>

          {/* Current Developments */}
          <div className="space-y-3">
            <h4 className="font-medium">This Week's Developments</h4>
            <div className="space-y-2">
              {data.developments.map((development, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-sm p-2 rounded-lg border hover:bg-accent/50 transition-colors"
                >
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  <span>{development}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Coming Up */}
          <div className="space-y-3">
            <h4 className="font-medium">Coming Up Next</h4>
            <div className="space-y-2">
              {data.upcoming.map((development, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-sm p-2 rounded-lg border hover:bg-accent/50 transition-colors"
                >
                  <div className="h-1.5 w-1.5 rounded-full bg-chart-2" />
                  <span className="text-muted-foreground">{development}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
