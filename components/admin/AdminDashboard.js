"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RolesManagement } from "./RolesManagement";
import { OrganizationManagement } from "./OrganizationManagement";
import { UserOverrides } from "./UserOverrides";

export const AdminDashboard = () => {
  return (
    <Tabs defaultValue="roles" className="space-y-4">
      <TabsList className="bg-transparent justify-start p-1 flex gap-2">
        <TabsTrigger
          value="roles"
          className="rounded-md px-6 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-colors"
        >
          Global Roles
        </TabsTrigger>
        <TabsTrigger
          value="organizations"
          className="rounded-md px-6 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-colors"
        >
          Organizations
        </TabsTrigger>
        <TabsTrigger
          value="overrides"
          className="rounded-md px-6 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-colors"
        >
          User Overrides
        </TabsTrigger>
      </TabsList>

      <TabsContent value="roles" className="space-y-4">
        <RolesManagement />
      </TabsContent>

      <TabsContent value="organizations" className="space-y-4">
        <OrganizationManagement />
      </TabsContent>

      <TabsContent value="overrides" className="space-y-4">
        <UserOverrides />
      </TabsContent>
    </Tabs>
  );
};
