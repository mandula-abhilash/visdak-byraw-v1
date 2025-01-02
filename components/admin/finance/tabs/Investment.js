"use client";

import { PortfolioOverviewWidget } from "../widgets/investment/PortfolioOverviewWidget";
import { StockPerformanceWidget } from "../widgets/investment/StockPerformanceWidget";
import { NetWorthWidget } from "../widgets/investment/NetWorthWidget";
import { InvestmentGrowthWidget } from "../widgets/investment/InvestmentGrowthWidget";
import { AssetAllocationWidget } from "../widgets/investment/AssetAllocationWidget";
import { RiskReturnWidget } from "../widgets/investment/RiskReturnWidget";
import { TopPerformersWidget } from "../widgets/investment/TopPerformersWidget";
import { SectorPerformanceWidget } from "../widgets/investment/SectorPerformanceWidget";

const widthClasses = {
  "1/4": "w-full md:w-1/4 px-3",
  "1/3": "w-full md:w-1/3 px-3",
  "1/2": "w-full md:w-1/2 px-3",
  "2/3": "w-full md:w-2/3 px-3",
  "3/4": "w-full md:w-3/4 px-3",
  full: "w-full px-3",
};

const getWidgetWidth = (width) => {
  return widthClasses[width] || widthClasses["full"];
};

export const Investment = () => {
  const widgets = [
    {
      component: PortfolioOverviewWidget,
      title: "Portfolio Overview",
      description: "Track your investment portfolio",
      width: "2/3",
    },
    {
      component: StockPerformanceWidget,
      title: "Stock Performance",
      description: "Monitor individual stocks",
      width: "1/3",
    },
    {
      component: NetWorthWidget,
      title: "Net Worth",
      description: "Track your total net worth",
      width: "1/2",
    },
    {
      component: InvestmentGrowthWidget,
      title: "Investment Growth",
      description: "Monitor portfolio growth over time",
      width: "1/2",
    },
    {
      component: AssetAllocationWidget,
      title: "Asset Allocation",
      description: "View portfolio distribution",
      width: "1/3",
    },
    {
      component: RiskReturnWidget,
      title: "Risk vs Return",
      description: "Analyze risk-return tradeoff",
      width: "1/3",
    },
    {
      component: TopPerformersWidget,
      title: "Top Performers",
      description: "Best and worst investments",
      width: "1/3",
    },
    {
      component: SectorPerformanceWidget,
      title: "Sector Performance",
      description: "Performance by sector",
      width: "full",
    },
  ];

  return (
    <div className="flex flex-wrap -mx-3">
      {widgets.map((widget, index) => {
        const Widget = widget.component;
        return (
          <div key={index} className={`${getWidgetWidth(widget.width)} mb-6`}>
            <div className="h-full">
              <Widget title={widget.title} description={widget.description} />
            </div>
          </div>
        );
      })}
    </div>
  );
};
