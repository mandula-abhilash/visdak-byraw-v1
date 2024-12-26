"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RolesManagement } from "./RolesManagement";
import { OrganizationManagement } from "./OrganizationManagement";
import { UserOverrides } from "./UserOverrides";

export const AdminDashboard = () => {
  return (
    <Tabs defaultValue="roles" className="space-y-4">
      <TabsList>
        <TabsTrigger value="roles">Global Roles</TabsTrigger>
        <TabsTrigger value="organizations">Organizations</TabsTrigger>
        <TabsTrigger value="overrides">User Overrides</TabsTrigger>
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
