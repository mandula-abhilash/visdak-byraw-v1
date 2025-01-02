"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { calculateCompoundInterest } from "./utils/calculations";
import { formatCurrency } from "../../utils/formatters";
import { WIDGET_STYLES } from "@/lib/constants/widget-styles";

export const InterestCalculatorWidget = ({
  title = "Interest Calculator",
  description,
}) => {
  const [values, setValues] = useState({
    principal: "",
    rate: "",
    years: "",
    frequency: "12",
  });
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const { principal, rate, years, frequency } = values;
    const { amount, interest } = calculateCompoundInterest(
      parseFloat(principal),
      parseFloat(rate),
      parseFloat(years),
      parseInt(frequency)
    );
    setResult({ amount, interest });
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Principal Amount</label>
              <Input
                type="number"
                value={values.principal}
                onChange={(e) =>
                  setValues({ ...values, principal: e.target.value })
                }
                placeholder="Enter principal amount"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Interest Rate (%)</label>
              <Input
                type="number"
                value={values.rate}
                onChange={(e) => setValues({ ...values, rate: e.target.value })}
                placeholder="Enter annual interest rate"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Time Period (Years)</label>
              <Input
                type="number"
                value={values.years}
                onChange={(e) =>
                  setValues({ ...values, years: e.target.value })
                }
                placeholder="Enter time period"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Compounding Frequency
              </label>
              <Select
                value={values.frequency}
                onValueChange={(value) =>
                  setValues({ ...values, frequency: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Yearly</SelectItem>
                  <SelectItem value="4">Quarterly</SelectItem>
                  <SelectItem value="12">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={handleCalculate} className="w-full">
            Calculate Interest
          </Button>

          {result && (
            <div className="space-y-4 p-4 bg-accent/50 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    Interest Earned
                  </div>
                  <Badge
                    variant="outline"
                    className="px-2 bg-primary/10 text-primary border-primary/20"
                  >
                    {formatCurrency(result.interest)}
                  </Badge>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    Maturity Amount
                  </div>
                  <Badge
                    variant="outline"
                    className="px-2 bg-chart-2/10 text-chart-2 border-chart-2/20"
                  >
                    {formatCurrency(result.amount)}
                  </Badge>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
