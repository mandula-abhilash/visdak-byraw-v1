"use client";

import { Layout } from "@/components/layout/Layout";

export default function TasksPage() {
  return (
    <Layout>
      <div className="md:pl-[240px] space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
          <p className="text-muted-foreground">
            Manage and organize your tasks
          </p>
        </div>
        <div className="grid gap-4">
          <div className="bg-card p-6 rounded-lg border">
            <p className="text-muted-foreground">
              Task management features coming soon...
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
