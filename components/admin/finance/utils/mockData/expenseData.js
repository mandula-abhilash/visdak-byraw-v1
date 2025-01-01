"use client";

// Generate monthly expense data
export const generateMonthlyExpenses = () => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return months.map((month) => ({
    month,
    amount: Math.floor(Math.random() * 300000) + 200000,
  }));
};

// Generate expense categories data
export const generateExpenseCategories = () => {
  return [
    { name: "Housing", value: 150000 },
    { name: "Transportation", value: 50000 },
    { name: "Food", value: 80000 },
    { name: "Utilities", value: 40000 },
    { name: "Entertainment", value: 30000 },
  ];
};

// Generate expense trends data
export const generateExpenseTrends = () => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  return months.map((month) => ({
    month,
    amount: Math.floor(Math.random() * 300000) + 200000,
  }));
};

// Generate recurring expenses data
export const generateRecurringExpenses = () => {
  return [
    {
      id: 1,
      name: "Rent",
      amount: 150000,
      frequency: "Monthly",
      nextDate: "Mar 1, 2024",
    },
    {
      id: 2,
      name: "Car Payment",
      amount: 50000,
      frequency: "Monthly",
      nextDate: "Mar 5, 2024",
    },
    {
      id: 3,
      name: "Insurance",
      amount: 30000,
      frequency: "Quarterly",
      nextDate: "Apr 15, 2024",
    },
    {
      id: 4,
      name: "Utilities",
      amount: 40000,
      frequency: "Monthly",
      nextDate: "Feb 28, 2024",
    },
  ];
};

// Generate spending alerts data
export const generateSpendingAlerts = () => {
  return [
    {
      id: 1,
      category: "Entertainment",
      type: "overspend",
      severity: "high",
      amount: 50000,
      message: "Entertainment spending 50% over budget",
    },
    {
      id: 2,
      category: "Food",
      type: "trend",
      severity: "medium",
      amount: 85000,
      message: "Food expenses trending higher than usual",
    },
    {
      id: 3,
      category: "Transportation",
      type: "overspend",
      severity: "low",
      amount: 45000,
      message: "Transportation expenses slightly above average",
    },
  ];
};

// Generate top expenses data
export const generateTopExpenses = () => {
  return [
    {
      id: 1,
      name: "Annual Insurance Premium",
      amount: 120000,
      category: "Insurance",
      date: "Feb 15, 2024",
    },
    {
      id: 2,
      name: "Monthly Rent",
      amount: 150000,
      category: "Housing",
      date: "Feb 1, 2024",
    },
    {
      id: 3,
      name: "Car Maintenance",
      amount: 45000,
      category: "Transportation",
      date: "Feb 10, 2024",
    },
    {
      id: 4,
      name: "Grocery Shopping",
      amount: 35000,
      category: "Food",
      date: "Feb 20, 2024",
    },
  ];
};
