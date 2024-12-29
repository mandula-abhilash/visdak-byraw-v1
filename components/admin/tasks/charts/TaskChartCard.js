"use client";

import { Card } from "@/components/ui/card";

export const TaskChartCard = ({ title, children }) => {
  return (
    <Card className="p-4">
      <h3 className="font-medium mb-4">{title}</h3>
      <div className="w-full aspect-[4/3]">{children}</div>
    </Card>
  );
};
