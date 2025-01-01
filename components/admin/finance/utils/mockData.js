"use client";

// Helper function to format currency
export const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
};

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
