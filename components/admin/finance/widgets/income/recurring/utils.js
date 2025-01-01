"use client";

export const getFrequencyColor = (frequency) => {
  if (!frequency) return "bg-muted text-muted-foreground border-muted";

  switch (frequency.toLowerCase()) {
    case "monthly":
      return "bg-primary/10 text-primary border-primary/20";
    case "weekly":
      return "bg-chart-2/10 text-chart-2 border-chart-2/20";
    case "quarterly":
      return "bg-chart-3/10 text-chart-3 border-chart-3/20";
    case "bi-weekly":
      return "bg-chart-4/10 text-chart-4 border-chart-4/20";
    default:
      return "bg-muted text-muted-foreground border-muted";
  }
};
