"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { DebtHeader } from "./DebtHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "../../utils/formatters";
import { WIDGET_STYLES } from "@/lib/constants/widget-styles";

export const LoanCalculatorWidget = ({
  title = "Loan Calculator",
  description = "Calculate loan payments and interest",
}) => {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [result, setResult] = useState(null);

  const calculateLoan = () => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100 / 12;
    const months = parseFloat(loanTerm) * 12;

    const monthlyPayment =
      (principal * rate * Math.pow(1 + rate, months)) /
      (Math.pow(1 + rate, months) - 1);
    const totalPayment = monthlyPayment * months;
    const totalInterest = totalPayment - principal;

    setResult({
      monthlyPayment,
      totalPayment,
      totalInterest,
    });
  };

  return (
    <Card className="h-full flex flex-col shadow-lg">
      <DebtHeader title={title} description={description} />
      <div
        className="flex-1 p-4 overflow-y-auto"
        style={{
          minHeight: WIDGET_STYLES.MIN_HEIGHT,
          maxHeight: WIDGET_STYLES.MAX_HEIGHT,
        }}
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Loan Amount</label>
            <Input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              placeholder="Enter loan amount"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Interest Rate (%)</label>
            <Input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              placeholder="Enter annual interest rate"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Loan Term (Years)</label>
            <Input
              type="number"
              value={loanTerm}
              onChange={(e) => setLoanTerm(e.target.value)}
              placeholder="Enter loan term in years"
            />
          </div>

          <Button onClick={calculateLoan} className="w-full">
            Calculate
          </Button>

          {result && (
            <div className="mt-6 space-y-4 p-4 border rounded-lg">
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">
                  Monthly Payment
                </div>
                <div className="text-lg font-semibold">
                  {formatCurrency(result.monthlyPayment)}
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">
                  Total Interest
                </div>
                <div className="text-lg font-semibold text-destructive">
                  {formatCurrency(result.totalInterest)}
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">
                  Total Payment
                </div>
                <div className="text-lg font-semibold">
                  {formatCurrency(result.totalPayment)}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
