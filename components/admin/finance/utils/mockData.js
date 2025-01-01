"use client";

// Helper function to format currency
export const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
};

// Income-related mock data
export const generateMonthlyIncome = () => {
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
    amount: Math.floor(Math.random() * 500000) + 300000, // Higher amounts for INR
  }));
};

export const generateIncomeSourcesData = () => {
  return [
    { name: "Salary", value: 500000 },
    { name: "Freelancing", value: 200000 },
    { name: "Investments", value: 150000 },
    { name: "Rental Income", value: 120000 },
    { name: "Other", value: 80000 },
  ];
};

export const generateRecurringIncomeData = () => {
  return [
    {
      id: 1,
      name: "Monthly Salary",
      amount: 500000,
      frequency: "Monthly",
      nextDate: "Mar 1, 2024",
    },
    {
      id: 2,
      name: "Rental Income",
      amount: 120000,
      frequency: "Monthly",
      nextDate: "Mar 5, 2024",
    },
    {
      id: 3,
      name: "Dividend Payment",
      amount: 50000,
      frequency: "Quarterly",
      nextDate: "Apr 15, 2024",
    },
    {
      id: 4,
      name: "Freelance Contract",
      amount: 200000,
      frequency: "Bi-weekly",
      nextDate: "Feb 28, 2024",
    },
  ];
};

export const generateProjectedIncomeData = () => {
  const months = ["Mar", "Apr", "May", "Jun", "Jul", "Aug"];
  const currentMonth = new Date().getMonth();

  return months.map((month, index) => {
    const projected = Math.floor(Math.random() * 200000) + 600000;
    return {
      month,
      projected,
      actual:
        index <= currentMonth
          ? Math.floor(Math.random() * 100000) + projected - 50000
          : null,
    };
  });
};

// Expense-related mock data
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
    amount: Math.floor(Math.random() * 300000) + 100000,
  }));
};

export const generateExpenseCategories = () => {
  return [
    { name: "Rent", value: 150000 },
    { name: "Utilities", value: 50000 },
    { name: "Groceries", value: 80000 },
    { name: "Transportation", value: 40000 },
    { name: "Entertainment", value: 30000 },
  ];
};

export const generateRecurringExpenses = () => {
  return [
    {
      id: 1,
      name: "Office Rent",
      amount: 150000,
      frequency: "Monthly",
      nextDate: "Mar 1, 2024",
    },
    {
      id: 2,
      name: "Internet Service",
      amount: 15000,
      frequency: "Monthly",
      nextDate: "Mar 5, 2024",
    },
    {
      id: 3,
      name: "Insurance Premium",
      amount: 75000,
      frequency: "Quarterly",
      nextDate: "Apr 15, 2024",
    },
    {
      id: 4,
      name: "Software Subscriptions",
      amount: 25000,
      frequency: "Monthly",
      nextDate: "Feb 28, 2024",
    },
  ];
};

export const generateTopExpenses = () => {
  return [
    {
      id: 1,
      name: "Annual Office Lease",
      amount: 1800000,
      category: "Rent",
      date: "Jan 15, 2024",
    },
    {
      id: 2,
      name: "Server Infrastructure",
      amount: 500000,
      category: "Technology",
      date: "Jan 20, 2024",
    },
    {
      id: 3,
      name: "Team Retreat",
      amount: 300000,
      category: "Events",
      date: "Jan 25, 2024",
    },
    {
      id: 4,
      name: "Marketing Campaign",
      amount: 250000,
      category: "Marketing",
      date: "Jan 30, 2024",
    },
  ];
};

export const generateExpenseTrends = () => {
  const months = ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb"];
  return months.map((month) => ({
    month,
    amount: Math.floor(Math.random() * 400000) + 200000,
  }));
};

export const generateSpendingAlerts = () => {
  return [
    {
      id: 1,
      type: "overspend",
      category: "Marketing",
      severity: "high",
      amount: 50000,
      message: "Over budget by 25%",
    },
    {
      id: 2,
      type: "trend",
      category: "Utilities",
      severity: "medium",
      amount: 30000,
      message: "20% increase from last month",
    },
    {
      id: 3,
      type: "overspend",
      category: "Travel",
      severity: "low",
      amount: 20000,
      message: "Approaching budget limit",
    },
    {
      id: 4,
      type: "trend",
      category: "Software",
      severity: "medium",
      amount: 25000,
      message: "Unusual spending pattern",
    },
  ];
};
