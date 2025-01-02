"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "../../utils/formatters";
import { WIDGET_STYLES } from "@/lib/constants/widget-styles";

export const TaxEstimatorWidget = ({
  title = "Tax Estimator",
  description,
}) => {
  const [income, setIncome] = useState("");
  const [deductions, setDeductions] = useState({
    "80C": "",
    "80D": "",
    "80CCD": "",
    HRA: "",
  });
  const [taxEstimate, setTaxEstimate] = useState(null);

  const calculateTax = () => {
    const totalIncome = parseFloat(income) || 0;
    const totalDeductions =
      Object.values(deductions).reduce(
        (sum, val) => sum + (parseFloat(val) || 0),
        0
      ) || 0;

    const taxableIncome = Math.max(totalIncome - totalDeductions, 0);
    let tax = 0;

    // Basic tax calculation (simplified for demo)
    if (taxableIncome > 1500000) {
      tax = taxableIncome * 0.3;
    } else if (taxableIncome > 1000000) {
      tax = taxableIncome * 0.25;
    } else if (taxableIncome > 500000) {
      tax = taxableIncome * 0.2;
    } else if (taxableIncome > 250000) {
      tax = taxableIncome * 0.1;
    }

    setTaxEstimate({
      totalIncome,
      totalDeductions,
      taxableIncome,
      tax,
      effectiveRate: (tax / totalIncome) * 100,
    });
  };

  const handleDeductionChange = (key, value) => {
    setDeductions((prev) => ({
      ...prev,
      [key]: value,
    }));
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
        <div className="space-y-6">
          {/* Income Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Total Income</label>
            <Input
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              placeholder="Enter annual income"
            />
          </div>

          {/* Deductions */}
          <div className="space-y-4">
            <h4 className="font-medium">Deductions</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">
                  Section 80C
                </label>
                <Input
                  type="number"
                  value={deductions["80C"]}
                  onChange={(e) => handleDeductionChange("80C", e.target.value)}
                  placeholder="PPF, ELSS, etc."
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">
                  Section 80D
                </label>
                <Input
                  type="number"
                  value={deductions["80D"]}
                  onChange={(e) => handleDeductionChange("80D", e.target.value)}
                  placeholder="Health Insurance"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">
                  Section 80CCD
                </label>
                <Input
                  type="number"
                  value={deductions["80CCD"]}
                  onChange={(e) =>
                    handleDeductionChange("80CCD", e.target.value)
                  }
                  placeholder="NPS Contribution"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">HRA</label>
                <Input
                  type="number"
                  value={deductions.HRA}
                  onChange={(e) => handleDeductionChange("HRA", e.target.value)}
                  placeholder="House Rent Allowance"
                />
              </div>
            </div>
          </div>

          <Button onClick={calculateTax} className="w-full">
            Calculate Tax
          </Button>

          {/* Results */}
          {taxEstimate && (
            <div className="space-y-4 p-4 bg-accent/50 rounded-lg">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Tax Liability</span>
                  <span className="font-medium">
                    {formatCurrency(taxEstimate.tax)}
                  </span>
                </div>
                <Progress
                  value={(taxEstimate.tax / taxEstimate.totalIncome) * 100}
                  className="h-2"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    Taxable Income
                  </div>
                  <div className="font-medium">
                    {formatCurrency(taxEstimate.taxableIncome)}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    Total Deductions
                  </div>
                  <div className="font-medium">
                    {formatCurrency(taxEstimate.totalDeductions)}
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t">
                <Badge
                  variant="outline"
                  className={`px-2 ${
                    taxEstimate.effectiveRate > 20
                      ? "bg-destructive/10 text-destructive border-destructive/20"
                      : "bg-primary/10 text-primary border-primary/20"
                  }`}
                >
                  Effective Tax Rate: {taxEstimate.effectiveRate.toFixed(1)}%
                </Badge>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
