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

const LoanCard = ({ loan, onRemove }) => {
  return (
    <div className="p-4 border rounded-lg space-y-3 hover:bg-accent/50 transition-colors">
      <div className="flex items-center justify-between">
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
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-sm text-muted-foreground">Amount:</span>
          <span className="font-medium">
            {formatCurrency(parseFloat(loan.amount))}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-muted-foreground">Interest Rate:</span>
          <span className="font-medium">{loan.rate}%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-muted-foreground">Term:</span>
          <span className="font-medium">{loan.term} years</span>
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
  const [formData, setFormData] = useState({
    amount: "",
    rate: "",
    term: "",
  });

  const addLoan = () => {
    if (!formData.amount || !formData.rate || !formData.term) return;

    setLoans([...loans, { id: nextId, ...formData }]);
    setNextId(nextId + 1);
    setFormData({ amount: "", rate: "", term: "" });
  };

  const removeLoan = (id) => {
    setLoans(loans.filter((loan) => loan.id !== id));
  };

  const resetComparison = () => {
    setLoans([]);
    setNextId(1);
    setFormData({ amount: "", rate: "", term: "" });
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
        <div className="flex flex-col-reverse lg:flex-row gap-6">
          {/* Graph Section */}
          <div className="flex-1">
            {comparisonData.length > 0 ? (
              <div className="h-[400px]">
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
            ) : (
              <div className="h-[400px] flex items-center justify-center border rounded-lg">
                <p className="text-muted-foreground">
                  Add a loan to see comparison
                </p>
              </div>
            )}
          </div>

          {/* Loan List Section */}
          <div className="w-full lg:w-64 space-y-4">
            <div className="space-y-4">
              {loans.map((loan) => (
                <LoanCard key={loan.id} loan={loan} onRemove={removeLoan} />
              ))}
            </div>
          </div>
        </div>

        {/* Input Form Section */}
        <div className="mt-6 p-4 border rounded-lg bg-accent/5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Loan Amount</label>
              <Input
                type="number"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
                placeholder="Enter amount"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Interest Rate (%)</label>
              <Input
                type="number"
                value={formData.rate}
                onChange={(e) =>
                  setFormData({ ...formData, rate: e.target.value })
                }
                placeholder="Enter rate"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Term (Years)</label>
              <Input
                type="number"
                value={formData.term}
                onChange={(e) =>
                  setFormData({ ...formData, term: e.target.value })
                }
                placeholder="Enter term"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={addLoan}
              className="flex-1"
              disabled={!formData.amount || !formData.rate || !formData.term}
            >
              Add Loan
            </Button>
            <Button
              onClick={resetComparison}
              variant="outline"
              className="flex-1"
              disabled={loans.length === 0}
            >
              Reset
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
