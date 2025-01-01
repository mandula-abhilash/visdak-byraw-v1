"use client";

import { Layout } from "@/components/layout/Layout";
import { ActivityWidgetTabs } from "@/components/admin/activity/ActivityWidgetTabs";

export default function ActivityWidgetsPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Activity Widgets
          </h1>
          <p className="text-muted-foreground">
            Available activity widget variations and analytics for dashboard
            configuration
          </p>
        </div>
        <ActivityWidgetTabs />
      </div>
    </Layout>
  );
}
