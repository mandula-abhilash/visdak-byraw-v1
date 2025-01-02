"use client";

import { Card } from "@/components/ui/card";
import { InvestmentHeader } from "./InvestmentHeader";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useInvestments } from "./hooks/useInvestments";
import { WIDGET_STYLES } from "@/lib/constants/widget-styles";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background/95 backdrop-blur-sm border rounded-lg shadow-lg p-4">
        <p className="text-sm font-medium">{payload[0].payload.name}</p>
        <div className="text-sm text-muted-foreground mt-1">
          <div>Risk Score: {payload[0].payload.risk_score}</div>
          <div>Return Rate: {payload[0].payload.return_rate}%</div>
        </div>
      </div>
    );
  }
  return null;
};

export const RiskReturnWidget = ({
  title = "Risk vs Return",
  description = "Analyze risk-return tradeoff",
}) => {
  const { investments, isLoading } = useInvestments();

  const data = investments.map((investment) => ({
    name: investment.symbol,
    x: investment.risk_score,
    y: investment.return_rate,
    risk_score: investment.risk_score,
    return_rate: investment.return_rate,
  }));

  return (
    <Card className="h-full flex flex-col shadow-lg">
      <InvestmentHeader title={title} description={description} />
      <div
        className="flex-1 p-4"
        style={{
          minHeight: WIDGET_STYLES.MIN_HEIGHT,
          maxHeight: WIDGET_STYLES.MAX_HEIGHT,
        }}
      >
        {isLoading ? (
          <div className="h-full bg-accent/50 animate-pulse rounded-lg" />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                type="number"
                dataKey="x"
                name="Risk Score"
                label={{ value: "Risk Score", position: "bottom" }}
                tick={{ fontSize: 12 }}
                className="text-muted-foreground"
              />
              <YAxis
                type="number"
                dataKey="y"
                name="Return Rate"
                label={{
                  value: "Return Rate (%)",
                  angle: -90,
                  position: "left",
                }}
                tick={{ fontSize: 12 }}
                className="text-muted-foreground"
              />
              <Tooltip content={<CustomTooltip />} />
              <Scatter data={data} fill="hsl(var(--primary))" />
            </ScatterChart>
          </ResponsiveContainer>
        )}
      </div>
    </Card>
  );
};
