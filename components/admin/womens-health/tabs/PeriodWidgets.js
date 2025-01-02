"use client";

import { CycleTracker } from "../widgets/period/CycleTracker";
import { PeriodCalendar } from "../widgets/period/PeriodCalendar";
import { OvulationPredictor } from "../widgets/period/OvulationPredictor";
import { SymptomLogger } from "../widgets/period/SymptomLogger";
import { FlowIntensityTracker } from "../widgets/period/FlowIntensityTracker";
import { CycleTrends } from "../widgets/period/CycleTrends";

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

export const PeriodWidgets = () => {
  const widgets = [
    {
      component: CycleTracker,
      title: "Cycle Tracker",
      description: "Track your current menstrual cycle",
      width: "1/2",
    },
    {
      component: PeriodCalendar,
      title: "Period Calendar",
      description: "View and plan your cycles",
      width: "1/2",
    },
    {
      component: OvulationPredictor,
      title: "Ovulation Predictor",
      description: "Track fertility windows and ovulation dates",
      width: "1/3",
    },
    {
      component: SymptomLogger,
      title: "Symptom Logger",
      description: "Record and monitor symptoms",
      width: "1/3",
    },
    {
      component: FlowIntensityTracker,
      title: "Flow Intensity",
      description: "Track menstrual flow patterns",
      width: "1/3",
    },
    {
      component: CycleTrends,
      title: "Cycle Trends",
      description: "Analyze your cycle patterns",
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
