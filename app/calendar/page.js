"use client";

import { Layout } from "@/components/layout/Layout";

export default function CalendarPage() {
  return (
    <Layout>
      <div className="md:pl-[240px] space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
          <p className="text-muted-foreground">View and manage your schedule</p>
        </div>
        <div className="bg-card p-6 rounded-lg border">
          <p className="text-muted-foreground">
            Calendar features coming soon...
          </p>
        </div>
      </div>
    </Layout>
  );
}
