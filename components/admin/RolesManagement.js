"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ActionButton, ActionButtonGroup } from "./ActionButtons";
import { CreateRoleDialog } from "./dialogs/CreateRoleDialog";

export const RolesManagement = () => {
  const [roles, setRoles] = useState([
    { id: 1, name: "Freelancer", description: "Independent contractor role" },
    { id: 2, name: "Business Owner", description: "Business management role" },
    { id: 3, name: "Head of Family", description: "Family management role" },
  ]);
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  const handleCreateRole = async (data) => {
    setRoles((prev) => [
      ...prev,
      { id: prev.length + 1, name: data.name, description: data.description },
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
                Global Roles
              </CardTitle>
              <CardDescription>
                Manage system-wide roles and their configurations
              </CardDescription>
            </div>
            <Button
              variant="outline"
              className="w-full lg:w-auto shrink-0 border-primary text-primary hover:bg-primary hover:text-primary-foreground flex items-center justify-center gap-2"
              onClick={() => setShowCreateDialog(true)}
            >
              <Plus className="h-4 w-4" />
              Add Role
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="md:divide-y md:divide-border">
            {roles.map((role) => (
              <div
                key={role.id}
                className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 py-6 lg:py-4 first:pt-0 last:pb-0"
              >
                <div>
                  <h3 className="font-medium text-lg">{role.name}</h3>
                  <p className="text-muted-foreground mt-1">
                    {role.description}
                  </p>
                </div>
                <ActionButtonGroup>
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

      {showCreateDialog && (
        <CreateRoleDialog
          open={showCreateDialog}
          onOpenChange={setShowCreateDialog}
          onSubmit={handleCreateRole}
        />
      )}
    </>
  );
};
