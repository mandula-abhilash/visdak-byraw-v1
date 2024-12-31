"use client";

import { Layout } from "@/components/layout/Layout";
import { CalendarWidgetTabs } from "@/components/admin/calendar/CalendarWidgetTabs";

export default function CalendarWidgetsPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Calendar Widgets
          </h1>
          <p className="text-muted-foreground">
            Available calendar widget variations and analytics for dashboard
            configuration
          </p>
        </div>
        <CalendarWidgetTabs />
      </div>
    </Layout>
  );
}
