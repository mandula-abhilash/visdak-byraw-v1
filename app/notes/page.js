"use client";

import { Layout } from "@/components/layout/Layout";

export default function NotesPage() {
  return (
    <Layout>
      <div className=" space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Notes</h1>
          <p className="text-muted-foreground">
            Your personal note-taking space
          </p>
        </div>
        <div className="bg-card p-6 rounded-lg border">
          <p className="text-muted-foreground">
            Note-taking features coming soon...
          </p>
        </div>
      </div>
    </Layout>
  );
}
