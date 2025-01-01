"use client";

import { Layout } from "@/components/layout/Layout";
import { NotesWidgetTabs } from "@/components/admin/notes/NotesWidgetTabs";

export default function NotesWidgetsPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Note Widgets</h1>
          <p className="text-muted-foreground">
            Available note widget variations and analytics for dashboard
            configuration
          </p>
        </div>
        <NotesWidgetTabs />
      </div>
    </Layout>
  );
}
