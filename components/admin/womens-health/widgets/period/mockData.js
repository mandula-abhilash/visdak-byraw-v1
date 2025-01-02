"use client";

// Generate dates relative to today
const today = new Date();
const getDate = (daysOffset) => {
  const date = new Date(today);
  date.setDate(today.getDate() + daysOffset);
  return date.toISOString();
};

export const generatePeriodData = () => {
  return {
    current_cycle: {
      start_date: getDate(-3),
      predicted_end_date: getDate(2),
      cycle_day: 3,
      phase: "menstrual",
      cycle_length: 28,
      period_length: 5,
    },
    cycle_history: [
      {
        start_date: getDate(-31),
        end_date: getDate(-27),
        cycle_length: 28,
        period_length: 5,
        symptoms: ["cramps", "fatigue"],
        flow_intensity: "medium",
      },
      {
        start_date: getDate(-59),
        end_date: getDate(-55),
        cycle_length: 29,
        period_length: 5,
        symptoms: ["headache", "cramps"],
        flow_intensity: "heavy",
      },
    ],
    symptoms: [
      {
        date: getDate(-2),
        type: "cramps",
        severity: "moderate",
        notes: "Mild discomfort in the morning",
      },
      {
        date: getDate(-1),
        type: "fatigue",
        severity: "mild",
        notes: "Feeling tired in the afternoon",
      },
      {
        date: getDate(0),
        type: "headache",
        severity: "mild",
        notes: "Slight headache in the evening",
      },
    ],
    flow_log: [
      {
        date: getDate(-3),
        intensity: "heavy",
        products_used: ["tampon", "pad"],
      },
      {
        date: getDate(-2),
        intensity: "medium",
        products_used: ["tampon"],
      },
      {
        date: getDate(-1),
        intensity: "light",
        products_used: ["liner"],
      },
    ],
    fertility_window: {
      start_date: getDate(10),
      end_date: getDate(15),
      ovulation_date: getDate(13),
    },
    medications: [
      {
        name: "Birth Control",
        schedule: "daily",
        last_taken: getDate(0),
        next_due: getDate(1),
      },
      {
        name: "Iron Supplement",
        schedule: "daily",
        last_taken: getDate(-1),
        next_due: getDate(0),
      },
    ],
    hydration: {
      today: 1500, // ml
      goal: 2000, // ml
      history: [
        { date: getDate(-2), amount: 1800 },
        { date: getDate(-1), amount: 1600 },
        { date: getDate(0), amount: 1500 },
      ],
    },
  };
};
