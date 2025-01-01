"use client";

import { Layout } from "@/components/layout/Layout";
import { FinanceWidgetTabs } from "@/components/admin/finance/FinanceWidgetTabs";

export default function FinanceWidgetsPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Finance Widgets</h1>
          <p className="text-muted-foreground">
            Manage and configure financial widgets and analytics
          </p>
        </div>
        <FinanceWidgetTabs />
      </div>
    </Layout>
  );
}
