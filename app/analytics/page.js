"use client";

import { Layout } from "@/components/layout/Layout";

export default function AnalyticsPage() {
  return (
    <Layout>
      <div className=" space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">
            Track your productivity metrics
          </p>
        </div>
        <div className="bg-card p-6 rounded-lg border">
          <p className="text-muted-foreground">
            Analytics features coming soon...
          </p>
        </div>
      </div>
    </Layout>
  );
}
