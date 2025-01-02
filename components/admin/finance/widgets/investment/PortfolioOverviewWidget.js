"use client";

import { Card } from "@/components/ui/card";
import { InvestmentHeader } from "./InvestmentHeader";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "../../utils/formatters";
import { useInvestments } from "./hooks/useInvestments";
import { WIDGET_STYLES } from "@/lib/constants/widget-styles";
import { cn } from "@/lib/utils"; // Add this import

const InvestmentCard = ({ investment }) => {
  const value = investment.shares * investment.price;
  const gain = value - investment.shares * investment.cost_basis;
  const gainPercent =
    (value / (investment.shares * investment.cost_basis) - 1) * 100;

  return (
    <div className="p-4 border rounded-lg space-y-3 hover:bg-accent/50 transition-colors">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-medium">{investment.name}</h3>
          <p className="text-sm text-muted-foreground">{investment.symbol}</p>
        </div>
        <Badge
          variant="outline"
          className={cn(
            investment.change_percent >= 0
              ? "bg-primary/10 text-primary border-primary/20 px-2"
              : "bg-destructive/10 text-destructive border-destructive/20 px-2"
          )}
        >
          {investment.change_percent >= 0 ? "+" : ""}
          {investment.change_percent.toFixed(2)}%
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <div className="text-muted-foreground">Current Value</div>
          <div className="font-medium">{formatCurrency(value)}</div>
        </div>
        <div>
          <div className="text-muted-foreground">Gain/Loss</div>
          <div
            className={cn(
              "font-medium",
              gain >= 0 ? "text-primary" : "text-destructive"
            )}
          >
            {gain >= 0 ? "+" : ""}
            {formatCurrency(gain)} ({gainPercent.toFixed(2)}%)
          </div>
        </div>
      </div>

      <div className="text-xs text-muted-foreground">
        {investment.shares} shares @ {formatCurrency(investment.price)}
      </div>
    </div>
  );
};

export const PortfolioOverviewWidget = ({ title, description }) => {
  const { investments, isLoading, error } = useInvestments();

  if (error) {
    return (
      <Card className="h-full">
        <div className="p-6 text-sm text-destructive">
          Error loading investments: {error.message}
        </div>
      </Card>
    );
  }

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
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-[120px] rounded-lg bg-accent/50 animate-pulse"
              />
            ))}
          </div>
        ) : investments.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-6">
            <p className="text-muted-foreground mb-2">No investments yet</p>
            <p className="text-sm text-muted-foreground">
              Click the + button to add your first investment
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {investments.map((investment) => (
              <InvestmentCard key={investment.id} investment={investment} />
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};
