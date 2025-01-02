"use client";

export const calculateRetirementNeeds = (
  currentAge,
  retirementAge,
  monthlyExpenses,
  inflation,
  returnRate,
  currentSavings
) => {
  const yearsToRetirement = retirementAge - currentAge;
  const yearsInRetirement = 25; // Assuming life expectancy
  const inflationAdjustedExpenses =
    monthlyExpenses * 12 * Math.pow(1 + inflation / 100, yearsToRetirement);
  const totalNeeded =
    inflationAdjustedExpenses *
    ((1 - Math.pow(1 + inflation / 100 - returnRate / 100, yearsInRetirement)) /
      (returnRate / 100 - inflation / 100));
  const savingsGap = totalNeeded - currentSavings;
  const monthlyContributionNeeded =
    (savingsGap * (returnRate / 100 / 12)) /
    (Math.pow(1 + returnRate / 100 / 12, yearsToRetirement * 12) - 1);

  return {
    totalNeeded,
    savingsGap,
    monthlyContributionNeeded,
  };
};

export const calculateEducationFund = (
  currentCost,
  yearsUntilNeeded,
  inflation,
  returnRate,
  currentSavings
) => {
  const futureEducationCost =
    currentCost * Math.pow(1 + inflation / 100, yearsUntilNeeded);
  const savingsGap =
    futureEducationCost -
    currentSavings * Math.pow(1 + returnRate / 100, yearsUntilNeeded);
  const monthlyContributionNeeded =
    (savingsGap * (returnRate / 100 / 12)) /
    (Math.pow(1 + returnRate / 100 / 12, yearsUntilNeeded * 12) - 1);

  return {
    futureEducationCost,
    savingsGap,
    monthlyContributionNeeded,
  };
};

export const calculateLoanAffordability = (
  monthlyIncome,
  existingEMIs,
  loanTenure,
  interestRate
) => {
  const maxEMIAllowed = monthlyIncome * 0.5 - existingEMIs; // 50% of income - existing EMIs
  const monthlyRate = interestRate / 12 / 100;
  const numberOfPayments = loanTenure * 12;

  // EMI = P * r * (1 + r)^n / ((1 + r)^n - 1)
  // Solving for P (Principal)
  const maxLoanAmount =
    (maxEMIAllowed * (Math.pow(1 + monthlyRate, numberOfPayments) - 1)) /
    (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments));

  const monthlyEMI =
    (maxLoanAmount *
      monthlyRate *
      Math.pow(1 + monthlyRate, numberOfPayments)) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  const totalInterest = monthlyEMI * numberOfPayments - maxLoanAmount;

  return {
    maxLoanAmount,
    monthlyEMI,
    totalInterest,
  };
};
