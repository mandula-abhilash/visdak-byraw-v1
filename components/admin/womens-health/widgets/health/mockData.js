"use client";

// Generate dates relative to today
const today = new Date();
const getDate = (daysOffset) => {
  const date = new Date(today);
  date.setDate(today.getDate() + daysOffset);
  return date.toISOString();
};

export const generateHealthData = () => {
  return {
    trends: {
      cycle_length: [28, 29, 28, 27, 28, 28],
      weight: [65, 65.5, 65.2, 65.8, 65.3, 65.6],
      energy_levels: [8, 7, 6, 8, 7, 9],
      mood_scores: [7, 8, 6, 7, 8, 7],
      sleep_hours: [7.5, 8, 6.5, 7, 8, 7.5],
      stress_levels: [4, 5, 6, 4, 3, 4],
      dates: Array.from({ length: 6 }, (_, i) => getDate(-30 + i * 5)),
    },
    symptoms: [
      {
        date: getDate(-2),
        type: "headache",
        severity: "mild",
        triggers: ["stress", "lack of sleep"],
        notes: "Started in the afternoon",
      },
      {
        date: getDate(-1),
        type: "fatigue",
        severity: "moderate",
        triggers: ["poor sleep", "busy day"],
        notes: "Felt tired all day",
      },
      {
        date: getDate(0),
        type: "nausea",
        severity: "mild",
        triggers: ["food"],
        notes: "After lunch",
      },
    ],
    moods: [
      {
        date: getDate(-2),
        mood: "happy",
        score: 8,
        notes: "Productive day",
      },
      {
        date: getDate(-1),
        mood: "stressed",
        score: 5,
        notes: "Work deadline",
      },
      {
        date: getDate(0),
        mood: "calm",
        score: 7,
        notes: "Relaxing evening",
      },
    ],
    weight_log: [
      { date: getDate(-14), weight: 65.0 },
      { date: getDate(-7), weight: 65.5 },
      { date: getDate(-1), weight: 65.2 },
    ],
    nutrition: {
      calories: 2000,
      protein: 75,
      carbs: 250,
      fat: 65,
      water: 2000,
    },
    energy_levels: [
      { time: "Morning", level: 7 },
      { time: "Afternoon", level: 6 },
      { time: "Evening", level: 8 },
    ],
    sleep: {
      recent: [
        {
          date: getDate(-2),
          hours: 7.5,
          quality: "good",
          notes: "Woke up once",
        },
        {
          date: getDate(-1),
          hours: 8,
          quality: "excellent",
          notes: "Uninterrupted sleep",
        },
        {
          date: getDate(0),
          hours: 6.5,
          quality: "fair",
          notes: "Late night",
        },
      ],
      average_hours: 7.3,
      quality_score: 8,
    },
    stress: {
      current_level: 4,
      triggers: ["work", "deadlines"],
      coping_methods: ["meditation", "exercise"],
    },
    activity: {
      steps: 8500,
      active_minutes: 45,
      exercises: [
        {
          type: "walking",
          duration: 30,
          intensity: "moderate",
        },
        {
          type: "yoga",
          duration: 15,
          intensity: "light",
        },
      ],
    },
    water_intake: {
      current: 1500,
      goal: 2000,
      history: [
        { time: "Morning", amount: 500 },
        { time: "Afternoon", amount: 750 },
        { time: "Evening", amount: 250 },
      ],
    },
    alerts: [
      {
        type: "symptom_pattern",
        message: "Frequent headaches detected",
        severity: "medium",
        date: getDate(-1),
      },
      {
        type: "appointment",
        message: "Annual checkup due next month",
        severity: "low",
        date: getDate(30),
      },
      {
        type: "medication",
        message: "Iron supplement running low",
        severity: "high",
        date: getDate(0),
      },
    ],
  };
};
