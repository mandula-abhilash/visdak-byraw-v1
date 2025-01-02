"use client";

export const calculateCompoundInterest = (
  principal,
  rate,
  years,
  frequency = 12
) => {
  const r = rate / 100;
  const n = frequency;
  const t = years;
  const amount = principal * Math.pow(1 + r / n, n * t);
  const interest = amount - principal;
  return { amount, interest };
};

export const calculateSavingsRate = (income, savings) => {
  if (!income || income === 0) return 0;
  return (savings / income) * 100;
};

export const projectSavingsGoal = (
  goal,
  currentSavings,
  monthlyContribution,
  rate
) => {
  const r = rate / 100 / 12; // Monthly interest rate
  const remaining = goal - currentSavings;

  // Calculate months needed to reach goal
  const months = Math.ceil(
    Math.log(1 + (remaining * r) / monthlyContribution) / Math.log(1 + r)
  );

  return months;
};
