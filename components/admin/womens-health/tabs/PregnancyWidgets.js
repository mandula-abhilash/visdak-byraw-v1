"use client";

import { PregnancyWeekTracker } from "../widgets/pregnancy/PregnancyWeekTracker";
import { TrimesterOverview } from "../widgets/pregnancy/TrimesterOverview";
import { BabyDevelopment } from "../widgets/pregnancy/BabyDevelopment";
import { MotherHealthTips } from "../widgets/pregnancy/MotherHealthTips";
import { AppointmentReminder } from "../widgets/pregnancy/AppointmentReminder";
import { DueDateCountdown } from "../widgets/pregnancy/DueDateCountdown";
import { KickCounter } from "../widgets/pregnancy/KickCounter";
import { SymptomTracker } from "../widgets/pregnancy/SymptomTracker";
import { WeightTracker } from "../widgets/pregnancy/WeightTracker";
import { HospitalBagChecklist } from "../widgets/pregnancy/HospitalBagChecklist";

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

export const PregnancyWidgets = () => {
  const widgets = [
    {
      component: PregnancyWeekTracker,
      title: "Pregnancy Week Tracker",
      description: "Track your pregnancy progress week by week",
      width: "1/3",
    },
    {
      component: TrimesterOverview,
      title: "Trimester Overview",
      description: "Key milestones and activities for your current trimester",
      width: "1/3",
    },
    {
      component: AppointmentReminder,
      title: "Appointment Reminder",
      description: "Track your upcoming medical appointments",
      width: "1/3",
    },
    {
      component: BabyDevelopment,
      title: "Baby Development",
      description: "Weekly updates on your baby's growth",
      width: "1/2",
    },
    {
      component: MotherHealthTips,
      title: "Mother's Health Tips",
      description: "Personalized health tips for your pregnancy stage",
      width: "1/2",
    },

    {
      component: DueDateCountdown,
      title: "Due Date Countdown",
      description: "Countdown to your expected delivery date",
      width: "1/3",
    },
    {
      component: KickCounter,
      title: "Kick Counter",
      description: "Track your baby's movements",
      width: "1/3",
    },
    {
      component: SymptomTracker,
      title: "Symptom Tracker",
      description: "Monitor pregnancy symptoms and trends",
      width: "1/2",
    },
    {
      component: WeightTracker,
      title: "Weight Tracker",
      description: "Track your pregnancy weight progression",
      width: "1/2",
    },
    {
      component: HospitalBagChecklist,
      title: "Hospital Bag Checklist",
      description: "Prepare for your hospital stay",
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
