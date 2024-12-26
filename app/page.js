import { Layout } from "@/components/layout/Layout";
import { Dashboard } from "@/components/dashboard/Dashboard";

export default function Home() {
  return (
    <Layout>
      <div className="md:pl-[240px]">
        <Dashboard />
      </div>
    </Layout>
  );
}
