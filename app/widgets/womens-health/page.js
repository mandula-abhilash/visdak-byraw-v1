"use client";

import { Layout } from "@/components/layout/Layout";
import { WomensHealthWidgetTabs } from "@/components/admin/womens-health/WomensHealthWidgetTabs";

export default function WomensHealthWidgetsPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Women's Health Widgets
          </h1>
          <p className="text-muted-foreground">
            Manage and track women's health metrics and insights
          </p>
        </div>
        <WomensHealthWidgetTabs />
      </div>
    </Layout>
  );
}
