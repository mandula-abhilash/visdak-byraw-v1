"use client";

// Generate dates relative to today
const today = new Date();
const getDate = (daysOffset) => {
  const date = new Date(today);
  date.setDate(today.getDate() + daysOffset);
  return date.toISOString();
};

// Mock pregnancy data
export const generatePregnancyData = () => {
  const dueDate = new Date(today);
  dueDate.setDate(today.getDate() + 120); // Example: 120 days until due date

  return {
    conception_date: "2023-06-15",
    due_date: dueDate.toISOString(),
    current_week: 28,
    current_trimester: 3,
    last_appointment: getDate(-7),
    next_appointment: getDate(14),
    weight_tracking: [
      { date: getDate(-60), weight: 65 },
      { date: getDate(-45), weight: 66.5 },
      { date: getDate(-30), weight: 68 },
      { date: getDate(-15), weight: 69.2 },
      { date: getDate(-7), weight: 70 },
      { date: getDate(0), weight: 70.5 },
    ],
    symptoms: [
      {
        date: getDate(-2),
        type: "nausea",
        severity: "mild",
        duration: "morning",
      },
      {
        date: getDate(-1),
        type: "fatigue",
        severity: "moderate",
        duration: "all day",
      },
      {
        date: getDate(0),
        type: "backache",
        severity: "mild",
        duration: "evening",
      },
    ],
    kicks: [
      { date: getDate(0), count: 12, duration: "30 minutes" },
      { date: getDate(-1), count: 15, duration: "30 minutes" },
      { date: getDate(-2), count: 10, duration: "30 minutes" },
    ],
    appointments: [
      {
        id: 1,
        title: "Regular Checkup",
        date: getDate(14),
        type: "checkup",
        doctor: "Dr. Sarah Johnson",
        location: "City Hospital",
        notes: "Bring latest test reports",
      },
      {
        id: 2,
        title: "Ultrasound",
        date: getDate(21),
        type: "ultrasound",
        doctor: "Dr. Michael Chen",
        location: "Women's Clinic",
        notes: "Detailed anatomy scan",
      },
    ],
    hospital_bag: {
      for_mother: [
        { item: "Comfortable nightgown", packed: true },
        { item: "Toiletries", packed: false },
        { item: "Slippers", packed: true },
        { item: "Going home outfit", packed: false },
      ],
      for_baby: [
        { item: "Diapers", packed: true },
        { item: "Onesies", packed: true },
        { item: "Blanket", packed: false },
        { item: "Hat and socks", packed: false },
      ],
      documents: [
        { item: "Insurance card", packed: true },
        { item: "Hospital forms", packed: false },
        { item: "Birth plan", packed: false },
      ],
    },
    weekly_tips: [
      {
        week: 28,
        baby_development: "Your baby is now the size of a large eggplant",
        mother_tips: [
          "Stay hydrated",
          "Do gentle exercises",
          "Monitor baby's movements",
        ],
        nutrition_tips: [
          "Increase iron intake",
          "Eat calcium-rich foods",
          "Continue prenatal vitamins",
        ],
      },
    ],
  };
};

// Generate trimester data
export const generateTrimesterData = () => {
  return {
    current: 3,
    progress: 75, // percentage through current trimester
    milestones: [
      {
        trimester: 1,
        completed: true,
        highlights: [
          "First ultrasound",
          "Morning sickness management",
          "Prenatal vitamins started",
        ],
      },
      {
        trimester: 2,
        completed: true,
        highlights: ["Gender reveal", "Anatomy scan", "Baby's first movements"],
      },
      {
        trimester: 3,
        completed: false,
        highlights: [
          "Regular growth scans",
          "Birth plan preparation",
          "Hospital bag packing",
        ],
      },
    ],
  };
};

// Generate baby development data
export const generateBabyDevelopmentData = () => {
  return {
    current_week: 28,
    size: {
      length: "37.6 cm",
      weight: "1 kg",
      comparison: "eggplant",
    },
    developments: [
      "Eyes can open and close",
      "Brain tissue continues to develop",
      "Can respond to sound and light",
    ],
    upcoming: [
      "Will continue gaining weight",
      "Immune system development",
      "Lung maturation",
    ],
  };
};
