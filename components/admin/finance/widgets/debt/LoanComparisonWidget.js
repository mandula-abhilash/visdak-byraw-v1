"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { DebtHeader } from "./DebtHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "../../utils/formatters";
import { WIDGET_STYLES } from "@/lib/constants/widget-styles";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { X } from "lucide-react";

const LoanInput = ({ loan, onUpdate, onRemove }) => {
  return (
    <div className="p-4 border rounded-lg space-y-3">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium">Loan {loan.id}</h3>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onRemove(loan.id)}
          className="h-8 w-8 text-muted-foreground hover:text-destructive"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="space-y-3">
        <div>
          <label className="text-sm font-medium">Amount</label>
          <Input
            type="number"
            value={loan.amount}
            onChange={(e) =>
              onUpdate(loan.id, { ...loan, amount: e.target.value })
            }
            placeholder="Enter loan amount"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Interest Rate (%)</label>
          <Input
            type="number"
            value={loan.rate}
            onChange={(e) =>
              onUpdate(loan.id, { ...loan, rate: e.target.value })
            }
            placeholder="Enter interest rate"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Term (Years)</label>
          <Input
            type="number"
            value={loan.term}
            onChange={(e) =>
              onUpdate(loan.id, { ...loan, term: e.target.value })
            }
            placeholder="Enter loan term"
          />
        </div>
      </div>
    </div>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background/95 backdrop-blur-sm border rounded-lg shadow-lg p-4">
        <p className="font-medium mb-2">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-muted-foreground">{entry.name}:</span>
            <span className="font-medium">{formatCurrency(entry.value)}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export const LoanComparisonWidget = ({
  title = "Loan Comparison",
  description = "Compare different loan options",
}) => {
  const [loans, setLoans] = useState([]);
  const [nextId, setNextId] = useState(1);

  const addLoan = () => {
    setLoans([...loans, { id: nextId, amount: "", rate: "", term: "" }]);
    setNextId(nextId + 1);
  };

  const updateLoan = (id, updatedLoan) => {
    setLoans(loans.map((loan) => (loan.id === id ? updatedLoan : loan)));
  };

  const removeLoan = (id) => {
    setLoans(loans.filter((loan) => loan.id !== id));
  };

  const resetComparison = () => {
    setLoans([]);
    setNextId(1);
  };

  const calculateLoanMetrics = (loan) => {
    const principal = parseFloat(loan.amount);
    const rate = parseFloat(loan.rate) / 100 / 12;
    const months = parseFloat(loan.term) * 12;

    if (!principal || !rate || !months) return null;

    const monthlyPayment =
      (principal * rate * Math.pow(1 + rate, months)) /
      (Math.pow(1 + rate, months) - 1);
    const totalPayment = monthlyPayment * months;
    const totalInterest = totalPayment - principal;

    return {
      monthlyPayment,
      totalPayment,
      totalInterest,
    };
  };

  const comparisonData = loans
    .map((loan) => {
      const metrics = calculateLoanMetrics(loan);
      if (!metrics) return null;
      return {
        name: `Loan ${loan.id}`,
        "Monthly Payment": metrics.monthlyPayment,
        "Total Interest": metrics.totalInterest,
        "Total Payment": metrics.totalPayment,
      };
    })
    .filter(Boolean);

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
        <div className="space-y-6">
          {/* Controls */}
          <div className="flex gap-2">
            <Button onClick={addLoan} className="flex-1">
              Add Loan
            </Button>
            <Button
              onClick={resetComparison}
              variant="outline"
              className="flex-1"
            >
              Reset
            </Button>
          </div>

          {/* Loan Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {loans.map((loan) => (
              <LoanInput
                key={loan.id}
                loan={loan}
                onUpdate={updateLoan}
                onRemove={removeLoan}
              />
            ))}
          </div>

          {/* Comparison Chart */}
          {comparisonData.length > 0 && (
            <div className="border rounded-lg p-4 mt-6">
              <h3 className="font-medium mb-4">Comparison Chart</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={comparisonData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      className="stroke-muted"
                    />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={formatCurrency} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar dataKey="Monthly Payment" fill="hsl(var(--primary))" />
                    <Bar
                      dataKey="Total Interest"
                      fill="hsl(var(--destructive))"
                    />
                    <Bar dataKey="Total Payment" fill="hsl(var(--chart-2))" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
