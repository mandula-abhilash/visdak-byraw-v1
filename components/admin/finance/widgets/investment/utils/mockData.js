"use client";

export const generateInvestments = () => {
  return [
    {
      id: 1,
      symbol: "AAPL",
      name: "Apple Inc.",
      shares: 100,
      price: 175.84,
      cost_basis: 150.0,
      sector: "Technology",
      type: "Stock",
      change_percent: 2.5,
      risk_score: 3,
      return_rate: 15.2,
    },
    {
      id: 2,
      symbol: "GOOGL",
      name: "Alphabet Inc.",
      shares: 50,
      price: 141.8,
      cost_basis: 120.0,
      sector: "Technology",
      type: "Stock",
      change_percent: -1.2,
      risk_score: 3,
      return_rate: 12.8,
    },
    {
      id: 3,
      symbol: "VTI",
      name: "Vanguard Total Stock Market ETF",
      shares: 200,
      price: 235.67,
      cost_basis: 200.0,
      sector: "ETF",
      type: "ETF",
      change_percent: 0.8,
      risk_score: 2,
      return_rate: 8.5,
    },
  ];
};

export const generateSectorData = () => {
  return [
    { sector: "Technology", value: 450000, change: 12.5 },
    { sector: "Healthcare", value: 300000, change: 8.2 },
    { sector: "Finance", value: 250000, change: -2.1 },
    { sector: "Consumer", value: 200000, change: 5.4 },
    { sector: "Energy", value: 150000, change: -1.8 },
  ];
};

export const generateAssetAllocation = () => {
  return [
    { name: "Stocks", value: 600000 },
    { name: "Bonds", value: 300000 },
    { name: "Real Estate", value: 200000 },
    { name: "Cash", value: 100000 },
    { name: "Crypto", value: 50000 },
  ];
};

export const generateGrowthData = () => {
  return [
    { month: "Jan", value: 1000000 },
    { month: "Feb", value: 1050000 },
    { month: "Mar", value: 1150000 },
    { month: "Apr", value: 1100000 },
    { month: "May", value: 1200000 },
    { month: "Jun", value: 1250000 },
  ];
};

export const generateNetWorthData = () => {
  return {
    total_assets: 2500000,
    total_liabilities: 800000,
    net_worth: 1700000,
    history: [
      { month: "Jan", assets: 2300000, liabilities: 850000 },
      { month: "Feb", assets: 2400000, liabilities: 830000 },
      { month: "Mar", assets: 2450000, liabilities: 820000 },
      { month: "Apr", assets: 2480000, liabilities: 810000 },
      { month: "May", assets: 2500000, liabilities: 800000 },
    ],
  };
};
