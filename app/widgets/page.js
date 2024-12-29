"use client";

import { Layout } from "@/components/layout/Layout";
import { WidgetManagement } from "@/components/admin/WidgetManagement";

export default function WidgetsPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Widget Management
          </h1>
          <p className="text-muted-foreground">
            Configure and manage dashboard widgets
          </p>
        </div>
        <WidgetManagement />
      </div>
    </Layout>
  );
}
