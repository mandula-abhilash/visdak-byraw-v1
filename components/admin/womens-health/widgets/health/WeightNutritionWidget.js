"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { generateHealthData } from "./mockData";
import { WIDGET_STYLES } from "@/lib/constants/widget-styles";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background/95 backdrop-blur-sm border rounded-lg shadow-lg p-4">
        <p className="text-sm font-medium">
          {new Date(label).toLocaleDateString()}
        </p>
        <div className="flex items-center gap-2 text-sm mt-1">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <span className="text-muted-foreground">Weight:</span>
          <span className="font-medium">{payload[0].value} kg</span>
        </div>
      </div>
    );
  }
  return null;
};

export const WeightNutritionWidget = ({ title, description }) => {
  const data = generateHealthData();
  const { weight_log, nutrition } = data;

  // Calculate weight change
  const weightChange =
    weight_log[weight_log.length - 1].weight - weight_log[0].weight;

  // Calculate nutrition percentages
  const totalNutrients = nutrition.protein + nutrition.carbs + nutrition.fat;
  const proteinPercentage = (nutrition.protein / totalNutrients) * 100;
  const carbsPercentage = (nutrition.carbs / totalNutrients) * 100;
  const fatPercentage = (nutrition.fat / totalNutrients) * 100;

  // Calculate water intake percentage
  const waterPercentage = (nutrition.water / 2000) * 100;

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
          {/* Weight Summary */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">
                Current Weight
              </div>
              <Badge
                variant="outline"
                className="px-2 bg-primary/10 text-primary border-primary/20"
              >
                {weight_log[weight_log.length - 1].weight} kg
              </Badge>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Weight Change</div>
              <Badge
                variant="outline"
                className={`px-2 ${
                  weightChange > 0
                    ? "bg-destructive/10 text-destructive border-destructive/20"
                    : "bg-primary/10 text-primary border-primary/20"
                }`}
              >
                {weightChange > 0 ? "+" : ""}
                {weightChange.toFixed(1)} kg
              </Badge>
            </div>
          </div>

          {/* Weight Chart */}
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weight_log}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12 }}
                  tickFormatter={(date) =>
                    new Date(date).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                    })
                  }
                  className="text-muted-foreground"
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  domain={["dataMin - 1", "dataMax + 1"]}
                  className="text-muted-foreground"
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="weight"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--primary))" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Nutrition Overview */}
          <div className="space-y-4">
            <h4 className="font-medium">Nutrition Overview</h4>

            {/* Macronutrients */}
            <div className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Protein ({nutrition.protein}g)</span>
                  <span>{Math.round(proteinPercentage)}%</span>
                </div>
                <Progress value={proteinPercentage} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Carbs ({nutrition.carbs}g)</span>
                  <span>{Math.round(carbsPercentage)}%</span>
                </div>
                <Progress value={carbsPercentage} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Fat ({nutrition.fat}g)</span>
                  <span>{Math.round(fatPercentage)}%</span>
                </div>
                <Progress value={fatPercentage} className="h-2" />
              </div>
            </div>

            {/* Water Intake */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Water Intake</span>
                <span>
                  {nutrition.water}ml / {2000}ml
                </span>
              </div>
              <Progress value={waterPercentage} className="h-2" />
            </div>
          </div>

          {/* Nutrition Tips */}
          <div className="space-y-3">
            <h4 className="font-medium">Nutrition Tips</h4>
            <div className="space-y-2">
              {[
                "Eat plenty of fruits and vegetables",
                "Include protein in every meal",
                "Choose whole grains over refined grains",
                "Stay hydrated throughout the day",
                "Limit processed foods and added sugars",
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
        </div>
      </div>
    </Card>
  );
};
