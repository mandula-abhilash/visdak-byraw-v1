"use client";

import { Layout } from "@/components/layout/Layout";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export default function AdminPage() {
  return (
    <Layout>
      <div className="md:pl-[240px] space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage roles, configurations, and user settings
          </p>
        </div>
        <AdminDashboard />
      </div>
    </Layout>
  );
}
