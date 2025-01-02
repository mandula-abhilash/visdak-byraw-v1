"use client";

import { Card } from "@/components/ui/card";
import { InvestmentHeader } from "./InvestmentHeader";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "../../utils/formatters";
import { useInvestments } from "./hooks/useInvestments";
import { WIDGET_STYLES } from "@/lib/constants/widget-styles";

const PerformanceCard = ({ investment }) => {
  const value = investment.shares * investment.price;
  const gain = value - investment.shares * investment.cost_basis;
  const gainPercent =
    (value / (investment.shares * investment.cost_basis) - 1) * 100;

  return (
    <div className="p-4 border rounded-lg hover:bg-accent/50 transition-colors">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="font-medium">{investment.symbol}</h3>
          <p className="text-sm text-muted-foreground">{investment.type}</p>
        </div>
        <Badge
          variant="outline"
          className={`${
            gainPercent >= 0
              ? "bg-primary/10 text-primary border-primary/20 px-2"
              : "bg-destructive/10 text-destructive border-destructive/20 px-2"
          }`}
        >
          {gainPercent >= 0 ? "+" : ""}
          {gainPercent.toFixed(2)}%
        </Badge>
      </div>
      <div className="text-sm text-muted-foreground">
        Gain/Loss: {formatCurrency(gain)}
      </div>
    </div>
  );
};

export const TopPerformersWidget = ({
  title = "Top Performers",
  description = "Best and worst investments",
}) => {
  const { investments, isLoading } = useInvestments();

  const sortedInvestments = [...investments].sort((a, b) => {
    const aGain = (a.price / a.cost_basis - 1) * 100;
    const bGain = (b.price / b.cost_basis - 1) * 100;
    return bGain - aGain;
  });

  const topPerformers = sortedInvestments.slice(0, 2);
  const worstPerformers = sortedInvestments.slice(-2).reverse();

  return (
    <Card className="h-full flex flex-col shadow-lg">
      <InvestmentHeader title={title} description={description} />
      <div
        className="flex-1 p-4 overflow-y-auto"
        style={{
          minHeight: WIDGET_STYLES.MIN_HEIGHT,
          maxHeight: WIDGET_STYLES.MAX_HEIGHT,
        }}
      >
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-[80px] rounded-lg bg-accent/50 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-primary">
                Best Performing
              </h3>
              <div className="space-y-2">
                {topPerformers.map((investment) => (
                  <PerformanceCard
                    key={investment.id}
                    investment={investment}
                  />
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-destructive">
                Worst Performing
              </h3>
              <div className="space-y-2">
                {worstPerformers.map((investment) => (
                  <PerformanceCard
                    key={investment.id}
                    investment={investment}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
