"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { generateHealthData } from "./mockData";
import { WIDGET_STYLES } from "@/lib/constants/widget-styles";

export const WaterIntakeWidget = ({ title, description }) => {
  const data = generateHealthData();
  const { water_intake } = data;

  // Calculate progress percentage
  const progress = (water_intake.current / water_intake.goal) * 100;

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
          {/* Current Progress */}
          <div className="text-center space-y-4">
            <Badge
              variant="outline"
              className="px-2 bg-primary/10 text-primary border-primary/20"
            >
              {water_intake.current}ml / {water_intake.goal}ml
            </Badge>
            <div className="text-4xl">💧</div>
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-muted-foreground">
              {Math.round(progress)}% of daily goal
            </p>
          </div>

          {/* Daily Log */}
          <div className="space-y-3">
            <h4 className="font-medium">Today's Log</h4>
            <div className="space-y-2">
              {water_intake.history.map((entry, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent/50 transition-colors"
                >
                  <span className="text-sm font-medium">{entry.time}</span>
                  <Badge variant="secondary" className="px-2">
                    {entry.amount}ml
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Hydration Tips */}
          <div className="space-y-3">
            <h4 className="font-medium">Hydration Tips</h4>
            <div className="space-y-2">
              {[
                "Drink a glass of water when you wake up",
                "Keep a water bottle at your desk",
                "Set hydration reminders",
                "Drink before, during, and after exercise",
                "Have water with every meal",
              ].map((tip, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-2 rounded-lg border hover:bg-accent/50 transition-colors"
                >
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  <span className="text-sm">{tip}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Daily Requirements */}
          <div className="space-y-3">
            <h4 className="font-medium">Daily Requirements</h4>
            <div className="space-y-2">
              {[
                {
                  activity: "Normal daily activities",
                  amount: "2000ml",
                },
                {
                  activity: "Light exercise (30-60 min)",
                  amount: "+500ml",
                },
                {
                  activity: "Intense exercise (>60 min)",
                  amount: "+1000ml",
                },
                {
                  activity: "Hot weather",
                  amount: "+500-1000ml",
                },
              ].map((req, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 rounded-lg border hover:bg-accent/50 transition-colors"
                >
                  <span className="text-sm">{req.activity}</span>
                  <span className="text-sm font-medium">{req.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
