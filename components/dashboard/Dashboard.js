'use client';

import { WidgetGrid } from '@/components/dashboard/WidgetGrid';

export const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's your personal workspace overview.</p>
      </div>
      <WidgetGrid />
    </div>
  );
};