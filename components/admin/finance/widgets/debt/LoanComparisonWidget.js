import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { DebtHeader } from "./DebtHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "../../utils/formatters";
import { WIDGET_STYLES } from "@/lib/constants/widget-styles";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { X } from "lucide-react";

const COLORS = [
  "hsl(var(--primary))",
  "hsl(var(--destructive))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background/95 backdrop-blur-sm border rounded-lg shadow-lg p-3">
        <p className="font-medium mb-1 text-sm">Year {label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 text-xs">
            <div
              className="w-2 h-2 rounded-full"
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
      principal,
    };
  };

  const generateTimelineData = () => {
    const timelineData = [];

    loans.forEach((loan) => {
      const term = parseInt(loan.term);
      const metrics = calculateLoanMetrics(loan);
      const monthlyPayment = metrics?.monthlyPayment || 0;

      for (let year = 0; year <= term; year++) {
        let yearData = timelineData.find((d) => d.year === year);
        if (!yearData) {
          yearData = { year };
          timelineData.push(yearData);
        }
        yearData[`L${loan.id}`] = year === term ? 0 : monthlyPayment * 12;
      }
    });

    return timelineData.sort((a, b) => a.year - b.year);
  };

  return (
    <Card className="h-full flex flex-col shadow-lg">
      <DebtHeader title={title} description={description} />
      <div className="flex-1 p-4 space-y-4 lg:space-y-0 overflow-y-auto">
        <div className="flex flex-col-reverse lg:flex-row gap-4">
          {/* Left side - Loan List */}
          <div className="w-full lg:w-64">
            <div className="max-h-[300px] overflow-y-auto pr-2 space-y-2">
              {loans.map((loan) => (
                <div
                  key={loan.id}
                  className="flex items-center justify-between p-2 border rounded-lg bg-card hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="h-5 shrink-0">
                      Loan {loan.id}
                    </Badge>
                    <div className="text-xs">
                      <span className="font-medium">
                        {formatCurrency(parseFloat(loan.amount))}
                      </span>
                      <span className="text-muted-foreground">
                        {" "}
                        @ {loan.rate}% / {loan.term}y
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeLoan(loan.id)}
                    className="h-6 w-6 text-muted-foreground hover:text-destructive shrink-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              {loans.length === 0 && (
                <div className="text-center p-3 border rounded-lg text-sm text-muted-foreground">
                  No loans added yet
                </div>
              )}
            </div>
          </div>

          {/* Right side - Graph */}
          <div className="flex-1 min-h-[300px]">
            {loans.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={generateTimelineData()}
                  margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-muted"
                  />
                  <XAxis
                    dataKey="year"
                    tickFormatter={(value) => value}
                    label={{ value: "Years", position: "bottom", offset: -5 }}
                  />
                  <YAxis tickFormatter={formatCurrency} width={80} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  {loans.map((loan, index) => (
                    <Line
                      key={loan.id}
                      type="monotone"
                      dataKey={`L${loan.id}`}
                      name={`Loan ${loan.id}`}
                      stroke={COLORS[index % COLORS.length]}
                      strokeWidth={2}
                      dot={{ r: 3 }}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center border rounded-lg">
                <p className="text-muted-foreground text-sm">
                  Add a loan to see comparison
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Input Form */}
        <div className="mt-4 p-3 border rounded-lg bg-accent/5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
            <div className="space-y-1">
              <label className="text-xs font-medium">Loan Amount</label>
              <Input
                type="number"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
                placeholder="Enter amount"
                className="h-8"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium">Interest Rate (%)</label>
              <Input
                type="number"
                value={formData.rate}
                onChange={(e) =>
                  setFormData({ ...formData, rate: e.target.value })
                }
                placeholder="Enter rate"
                className="h-8"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium">Term (Years)</label>
              <Input
                type="number"
                value={formData.term}
                onChange={(e) =>
                  setFormData({ ...formData, term: e.target.value })
                }
                placeholder="Enter term"
                className="h-8"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={addLoan}
              className="flex-1 h-8 text-sm"
              disabled={!formData.amount || !formData.rate || !formData.term}
            >
              Add Loan
            </Button>
            <Button
              onClick={resetComparison}
              variant="outline"
              className="flex-1 h-8 text-sm"
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
