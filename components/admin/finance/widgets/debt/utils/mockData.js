"use client";

export const generateDebts = () => {
  return [
    {
      id: 1,
      name: "Home Loan",
      type: "Mortgage",
      balance: 4000000,
      interest_rate: 6.5,
      monthly_payment: 35000,
      next_payment_date: "2024-03-01",
    },
    {
      id: 2,
      name: "Car Loan",
      type: "Auto Loan",
      balance: 300000,
      interest_rate: 4.9,
      monthly_payment: 15000,
      next_payment_date: "2024-03-05",
    },
    {
      id: 3,
      name: "Credit Card",
      type: "Credit Card",
      balance: 50000,
      interest_rate: 18.99,
      monthly_payment: 10000,
      next_payment_date: "2024-03-15",
    },
  ];
};
