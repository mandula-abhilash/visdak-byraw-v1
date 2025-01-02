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
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { X } from "lucide-react";

const LoanBadge = ({ loan, onRemove }) => {
  const formattedAmount = formatCurrency(parseFloat(loan.amount));
  // Truncate amount if it's too long
  const displayAmount =
    formattedAmount.length > 10
      ? formattedAmount.slice(0, 8) + "..."
      : formattedAmount;

  return (
    <Badge
      variant="secondary"
      className="px-3 py-1.5 flex items-center gap-2 hover:bg-accent group"
    >
      <div className="flex flex-col min-w-0">
        <div className="flex items-center gap-1">
          <span className="font-medium truncate" title={formattedAmount}>
            L{loan.id}: {displayAmount}
          </span>
        </div>
        <span className="text-xs text-muted-foreground whitespace-nowrap">
          {loan.rate}% / {loan.term}yr
        </span>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={(e) => {
          e.stopPropagation();
          onRemove(loan.id);
        }}
        className="h-5 w-5 ml-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/20 hover:text-destructive"
      >
        <X className="h-3 w-3" />
      </Button>
    </Badge>
  );
};

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

const COLORS = [
  "hsl(var(--primary))",
  "hsl(var(--destructive))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
];

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
  const [activeChart, setActiveChart] = useState("payment");

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

    // Generate data points for each loan independently
    loans.forEach((loan) => {
      const term = parseInt(loan.term);
      const metrics = calculateLoanMetrics(loan);
      const monthlyPayment = metrics?.monthlyPayment || 0;

      // Add data points only up to this loan's term
      for (let year = 0; year <= term; year++) {
        // Find or create data point for this year
        let yearData = timelineData.find((d) => d.year === year);
        if (!yearData) {
          yearData = { year };
          timelineData.push(yearData);
        }
        // Add this loan's payment to the year data
        yearData[`L${loan.id}`] = year === term ? 0 : monthlyPayment * 12;
      }
    });

    // Sort by year to ensure correct display
    return timelineData.sort((a, b) => a.year - b.year);
  };

  const generateBreakdownData = () => {
    return loans
      .map((loan) => {
        const metrics = calculateLoanMetrics(loan);
        if (!metrics) return null;
        return {
          name: `L${loan.id}`,
          principal: metrics.principal,
          interest: metrics.totalInterest,
        };
      })
      .filter(Boolean);
  };

  return (
    <Card className="h-full flex flex-col shadow-lg">
      <DebtHeader title={title} description={description} />
      <div className="flex-1 p-4 space-y-3 overflow-y-auto">
        {/* Top Section with Badges and Toggle */}
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            {loans.map((loan) => (
              <LoanBadge key={loan.id} loan={loan} onRemove={removeLoan} />
            ))}
          </div>
          <div className="flex gap-2">
            <Button
              variant={activeChart === "payment" ? "default" : "outline"}
              onClick={() => setActiveChart("payment")}
              size="sm"
              className="text-xs h-7"
            >
              Payment Timeline
            </Button>
            <Button
              variant={activeChart === "breakdown" ? "default" : "outline"}
              onClick={() => setActiveChart("breakdown")}
              size="sm"
              className="text-xs h-7"
            >
              Cost Breakdown
            </Button>
          </div>
        </div>

        {/* Chart Section */}
        <div className="flex justify-center">
          <div className="h-[280px] w-[90%]">
            {loans.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                {activeChart === "payment" ? (
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
                      label={{ value: "Years", position: "bottom", dy: 10 }}
                      tickFormatter={(value) => `Year ${value}`}
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
                ) : (
                  <PieChart margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                    {loans.map((loan, index) => {
                      const metrics = calculateLoanMetrics(loan);
                      if (!metrics) return null;
                      const data = [
                        { name: "Principal", value: metrics.principal },
                        { name: "Interest", value: metrics.totalInterest },
                      ];
                      return (
                        <Pie
                          key={loan.id}
                          data={data}
                          cx={`${(index + 1) * (100 / (loans.length + 1))}%`}
                          cy="50%"
                          innerRadius={40}
                          outerRadius={55}
                          label={({ name, value }) =>
                            `${name}: ${formatCurrency(value)}`
                          }
                        >
                          {data.map((entry, index) => (
                            <Cell
                              key={index}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                      );
                    })}
                  </PieChart>
                )}
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

        {/* Input Form Section */}
        <div className="p-3 border rounded-lg bg-accent/5">
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

export default LoanComparisonWidget;
