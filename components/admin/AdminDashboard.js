"use client";

import { useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { RolesManagement } from "./RolesManagement";
import { OrganizationManagement } from "./OrganizationManagement";
import { UserOverrides } from "./UserOverrides";
import { GlobalConfigManagement } from "./GlobalConfigManagement";
import { PeopleManagement } from "./PeopleManagement";
import { IdentityManagement } from "./IdentityManagement";
import { AdminNavigation } from "./AdminNavigation";

export const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("people");

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
      <AdminNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      <TabsContent value="people" className="space-y-4 mt-4">
        <PeopleManagement />
      </TabsContent>

      <TabsContent value="identities" className="space-y-4 mt-4">
        <IdentityManagement />
      </TabsContent>

      <TabsContent value="roles" className="space-y-4 mt-4">
        <RolesManagement />
      </TabsContent>

      <TabsContent value="configurations" className="space-y-4 mt-4">
        <GlobalConfigManagement />
      </TabsContent>

      <TabsContent value="organizations" className="space-y-4 mt-4">
        <OrganizationManagement />
      </TabsContent>

      <TabsContent value="overrides" className="space-y-4 mt-4">
        <UserOverrides />
      </TabsContent>
    </Tabs>
  );
};
