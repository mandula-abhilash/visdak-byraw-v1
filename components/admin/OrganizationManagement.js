"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ActionButton, ActionButtonGroup } from "./ActionButtons";
import { CreateOrganizationDialog } from "./dialogs/CreateOrganizationDialog";

export const OrganizationManagement = () => {
  const [organizations, setOrganizations] = useState([
    {
      id: 1,
      name: "Freelance Team Alpha",
      roles: ["Owner", "Manager", "Member"],
      memberCount: 5,
    },
    {
      id: 2,
      name: "Business Solutions",
      roles: ["Admin", "Editor", "Viewer"],
      memberCount: 8,
    },
  ]);
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  const handleCreateOrganization = async (data) => {
    // Here you would typically make an API call to create the organization
    // For now, we'll just add it to the local state
    setOrganizations((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        name: data.name,
        roles: ["Owner"],
        memberCount: 1,
      },
    ]);
    setShowCreateDialog(false);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div className="space-y-2">
              <CardTitle className="text-xl font-semibold break-words">
                Organizations
              </CardTitle>
              <CardDescription>
                Manage organizations and their role configurations
              </CardDescription>
            </div>
            <Button
              variant="outline"
              className="w-full lg:w-auto shrink-0 border-primary text-primary hover:bg-primary hover:text-primary-foreground flex items-center justify-center gap-2"
              onClick={() => setShowCreateDialog(true)}
            >
              <Plus className="h-4 w-4" />
              Add Organization
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="md:divide-y md:divide-border">
            {organizations.map((org) => (
              <div
                key={org.id}
                className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 py-6 lg:py-4 first:pt-0 last:pb-0"
              >
                <div>
                  <h3 className="font-medium text-lg">{org.name}</h3>
                  <div className="flex flex-col lg:flex-row gap-2 text-sm text-muted-foreground mt-1">
                    <div>Roles: {org.roles.join(", ")}</div>
                    <div className="hidden lg:block">•</div>
                    <div>{org.memberCount} Members</div>
                  </div>
                </div>
                <ActionButtonGroup>
                  <ActionButton
                    icon={Settings}
                    label="Settings"
                    onClick={() => {}}
                  />
                  <ActionButton icon={Pencil} label="Edit" onClick={() => {}} />
                  <ActionButton
                    icon={Trash2}
                    label="Delete"
                    destructive
                    onClick={() => {}}
                  />
                </ActionButtonGroup>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <CreateOrganizationDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        onSubmit={handleCreateOrganization}
      />
    </>
  );
};
