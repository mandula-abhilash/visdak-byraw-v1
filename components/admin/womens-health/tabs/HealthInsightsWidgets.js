"use client";

import { HealthTrendsWidget } from "../widgets/health/HealthTrendsWidget";
import { SymptomPatternsWidget } from "../widgets/health/SymptomPatternsWidget";
import { MoodTrackerWidget } from "../widgets/health/MoodTrackerWidget";
import { WeightNutritionWidget } from "../widgets/health/WeightNutritionWidget";
import { EnergyLevelsWidget } from "../widgets/health/EnergyLevelsWidget";
import { SleepTrackerWidget } from "../widgets/health/SleepTrackerWidget";
import { StressTrackerWidget } from "../widgets/health/StressTrackerWidget";
import { ActivityTrackerWidget } from "../widgets/health/ActivityTrackerWidget";
import { WaterIntakeWidget } from "../widgets/health/WaterIntakeWidget";
import { HealthAlertsWidget } from "../widgets/health/HealthAlertsWidget";

const widthClasses = {
  "1/4": "w-full md:w-1/4 px-3",
  "1/3": "w-full md:w-1/3 px-3",
  "1/2": "w-full md:w-1/2 px-3",
  "2/3": "w-full md:w-2/3 px-3",
  "3/4": "w-full md:w-3/4 px-3",
  full: "w-full px-3",
};

const getWidgetWidth = (width) => {
  return widthClasses[width] || widthClasses["full"];
};

export const HealthInsightsWidgets = () => {
  const widgets = [
    {
      component: HealthTrendsWidget,
      title: "Health Trends",
      description: "Overview of your health patterns",
      width: "2/3",
    },
    {
      component: SymptomPatternsWidget,
      title: "Symptom Patterns",
      description: "Track recurring symptoms and triggers",
      width: "1/3",
    },
    {
      component: MoodTrackerWidget,
      title: "Mood Tracker",
      description: "Monitor emotional patterns",
      width: "1/2",
    },
    {
      component: WeightNutritionWidget,
      title: "Weight & Nutrition",
      description: "Track weight and nutritional insights",
      width: "1/2",
    },
    {
      component: EnergyLevelsWidget,
      title: "Energy Levels",
      description: "Monitor daily energy patterns",
      width: "1/3",
    },
    {
      component: SleepTrackerWidget,
      title: "Sleep Tracker",
      description: "Track sleep patterns and quality",
      width: "1/3",
    },
    {
      component: StressTrackerWidget,
      title: "Stress Tracker",
      description: "Monitor stress levels and triggers",
      width: "1/3",
    },
    {
      component: ActivityTrackerWidget,
      title: "Activity Tracker",
      description: "Track physical activities",
      width: "1/2",
    },
    {
      component: WaterIntakeWidget,
      title: "Water Intake",
      description: "Monitor daily hydration",
      width: "1/2",
    },
    {
      component: HealthAlertsWidget,
      title: "Health Alerts",
      description: "Important health notifications",
      width: "full",
    },
  ];

  return (
    <div className="flex flex-wrap -mx-3">
      {widgets.map((widget, index) => {
        const Widget = widget.component;
        return (
          <div key={index} className={`${getWidgetWidth(widget.width)} mb-6`}>
            <div className="h-full">
              <Widget title={widget.title} description={widget.description} />
            </div>
          </div>
        );
      })}
    </div>
  );
};
