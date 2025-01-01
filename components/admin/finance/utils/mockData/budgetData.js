"use client";

// Generate monthly budget data
export const generateMonthlyBudgetData = () => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  return months.map((month) => ({
    month,
    budget: Math.floor(Math.random() * 300000) + 500000,
    actual: Math.floor(Math.random() * 300000) + 500000,
  }));
};

// Generate category budget data
export const generateCategoryBudgetData = () => {
  return [
    {
      category: "Housing",
      budget: 150000,
      spent: 145000,
    },
    {
      category: "Transportation",
      budget: 50000,
      spent: 48000,
    },
    {
      category: "Food",
      budget: 80000,
      spent: 85000,
    },
    {
      category: "Utilities",
      budget: 40000,
      spent: 38000,
    },
    {
      category: "Entertainment",
      budget: 30000,
      spent: 32000,
    },
  ];
};

// Generate savings budget data
export const generateSavingsBudgetData = () => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  let currentSavings = 200000;
  let projectedSavings = 200000;

  return months.map((month) => {
    currentSavings += Math.floor(Math.random() * 50000) + 30000;
    projectedSavings += 50000;
    return {
      month,
      savings: currentSavings,
      projected: projectedSavings,
    };
  });
};

// Generate budget distribution data (40-30-20 rule)
export const generateBudgetDistributionData = () => {
  const totalBudget = 1000000;
  return [
    {
      category: "Needs",
      amount: totalBudget * 0.4,
      percentage: 40,
    },
    {
      category: "Wants",
      amount: totalBudget * 0.3,
      percentage: 30,
    },
    {
      category: "Savings",
      amount: totalBudget * 0.2,
      percentage: 20,
    },
  ];
};
