"use client";

import { getDateStr } from "./dateUtils";

export const generateBillPayments = () => {
  return [
    {
      id: 1,
      title: "Electricity Bill",
      amount: 3500,
      dueDate: getDateStr(5),
      category: "Utilities",
      status: "upcoming",
      reminderSet: "3 days before",
    },
    {
      id: 2,
      title: "Rent Payment",
      amount: 25000,
      dueDate: getDateStr(2),
      category: "Housing",
      status: "upcoming",
      reminderSet: "1 week before",
    },
    {
      id: 3,
      title: "Internet Bill",
      amount: 1200,
      dueDate: getDateStr(-2),
      category: "Utilities",
      status: "overdue",
      reminderSet: "1 day before",
    },
  ];
};

export const generateSubscriptions = () => {
  return [
    {
      id: 1,
      title: "Netflix",
      amount: 649,
      renewalDate: getDateStr(15),
      category: "Entertainment",
      status: "active",
      billingCycle: "monthly",
      autoRenew: true,
    },
    {
      id: 2,
      title: "Amazon Prime",
      amount: 1499,
      renewalDate: getDateStr(45),
      category: "Shopping",
      status: "active",
      billingCycle: "yearly",
      autoRenew: true,
    },
    {
      id: 3,
      title: "ChatGPT Plus",
      amount: 1640,
      renewalDate: getDateStr(8),
      category: "Productivity",
      status: "active",
      billingCycle: "monthly",
      autoRenew: true,
    },
    {
      id: 4,
      title: "Chola Vehicle Insurance",
      amount: 12000,
      renewalDate: getDateStr(30),
      category: "Insurance",
      status: "active",
      billingCycle: "yearly",
      autoRenew: false,
    },
  ];
};

export const generateBalanceAlerts = () => {
  return [
    {
      id: 1,
      accountName: "Savings Account",
      currentBalance: 25000,
      threshold: 30000,
      status: "warning",
    },
    {
      id: 2,
      accountName: "Emergency Fund",
      currentBalance: 45000,
      threshold: 50000,
      status: "warning",
    },
    {
      id: 3,
      accountName: "Checking Account",
      currentBalance: 8000,
      threshold: 10000,
      status: "critical",
    },
  ];
};
