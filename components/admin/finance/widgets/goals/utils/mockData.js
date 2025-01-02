"use client";

export const generateFinancialGoals = () => {
  return [
    {
      id: 1,
      title: "Emergency Fund",
      description: "6 months of living expenses",
      current_amount: 450000,
      target_amount: 600000,
      status: "On Track",
      status_class: "bg-primary/10 text-primary",
      target_date: "2024-12-31",
    },
    {
      id: 2,
      title: "House Down Payment",
      description: "20% down payment for home purchase",
      current_amount: 1200000,
      target_amount: 2000000,
      status: "Behind",
      status_class: "bg-destructive/10 text-destructive",
      target_date: "2025-06-30",
    },
    {
      id: 3,
      title: "Vacation Fund",
      description: "European trip savings",
      current_amount: 180000,
      target_amount: 200000,
      status: "Almost There",
      status_class: "bg-chart-2/10 text-chart-2",
      target_date: "2024-08-15",
    },
    {
      id: 4,
      title: "Investment Portfolio",
      description: "Retirement savings goal",
      current_amount: 3500000,
      target_amount: 5000000,
      status: "On Track",
      status_class: "bg-primary/10 text-primary",
      target_date: "2025-12-31",
    },
  ];
};
