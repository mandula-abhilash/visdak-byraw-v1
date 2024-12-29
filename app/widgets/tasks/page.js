"use client";

import { Layout } from "@/components/layout/Layout";
import { TaskWidgetVariants } from "@/components/admin/tasks/TaskWidgetVariants";

export default function TaskWidgetsPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Task Widgets</h1>
          <p className="text-muted-foreground">
            Available task widget variations for dashboard configuration
          </p>
        </div>
        <TaskWidgetVariants />
      </div>
    </Layout>
  );
}
