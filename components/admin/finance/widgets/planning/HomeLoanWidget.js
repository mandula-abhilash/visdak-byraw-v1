"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { calculateLoanAffordability } from "./utils/calculations";
import { formatCurrency } from "../../utils/formatters";
import { WIDGET_STYLES } from "@/lib/constants/widget-styles";

export const HomeLoanWidget = ({
  title = "Home Loan Affordability",
  description,
}) => {
  const [values, setValues] = useState({
    monthlyIncome: "",
    existingEMIs: "",
    loanTenure: "",
    interestRate: "",
  });
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const calculation = calculateLoanAffordability(
      parseFloat(values.monthlyIncome),
      parseFloat(values.existingEMIs),
      parseFloat(values.loanTenure),
      parseFloat(values.interestRate)
    );
    setResult(calculation);
  };

  return (
    <Card className="h-full flex flex-col shadow-lg">
      <div className="p-6 flex-none border-b">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">{title}</h3>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
      <div
        className="flex-1 p-4 overflow-y-auto"
        style={{
          minHeight: WIDGET_STYLES.MIN_HEIGHT,
          maxHeight: WIDGET_STYLES.MAX_HEIGHT,
        }}
      >
        <div className="h-full flex flex-col">
          <div className="flex-1 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Monthly Income</label>
                <Input
                  type="number"
                  value={values.monthlyIncome}
                  onChange={(e) =>
                    setValues({ ...values, monthlyIncome: e.target.value })
                  }
                  placeholder="Enter monthly income"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Existing EMIs</label>
                <Input
                  type="number"
                  value={values.existingEMIs}
                  onChange={(e) =>
                    setValues({ ...values, existingEMIs: e.target.value })
                  }
                  placeholder="Enter existing EMIs"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Loan Tenure (Years)
                </label>
                <Input
                  type="number"
                  value={values.loanTenure}
                  onChange={(e) =>
                    setValues({ ...values, loanTenure: e.target.value })
                  }
                  placeholder="Enter loan tenure"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Interest Rate (%)</label>
                <Input
                  type="number"
                  value={values.interestRate}
                  onChange={(e) =>
                    setValues({ ...values, interestRate: e.target.value })
                  }
                  placeholder="Enter interest rate"
                />
              </div>
            </div>

            {result && (
              <div className="space-y-4 p-4 bg-accent/50 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">
                      Maximum Loan Amount
                    </div>
                    <Badge
                      variant="outline"
                      className="px-2 bg-primary/10 text-primary border-primary/20"
                    >
                      {formatCurrency(result.maxLoanAmount)}
                    </Badge>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">
                      Monthly EMI
                    </div>
                    <Badge
                      variant="outline"
                      className="px-2 bg-chart-2/10 text-chart-2 border-chart-2/20"
                    >
                      {formatCurrency(result.monthlyEMI)}
                    </Badge>
                  </div>
                </div>

                <div className="pt-2 border-t">
                  <div className="text-sm text-muted-foreground mb-1">
                    Total Interest Payable
                  </div>
                  <Badge
                    variant="outline"
                    className="px-2 bg-destructive/10 text-destructive border-destructive/20"
                  >
                    {formatCurrency(result.totalInterest)}
                  </Badge>
                </div>
              </div>
            )}
          </div>

          {/* Buttons at bottom */}
          <div className="mt-6 flex justify-between gap-2">
            <Button variant="outline" onClick={() => setResult(null)}>
              Reset
            </Button>
            <Button onClick={handleCalculate}>
              Calculate Loan Eligibility
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
