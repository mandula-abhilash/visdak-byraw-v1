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
import { CreateRoleConfigDialog } from "./dialogs/CreateRoleConfigDialog";

export const GlobalConfigManagement = () => {
  const [configurations, setConfigurations] = useState([
    {
      id: 1,
      roleName: "Freelancer",
      widgets: ["Task List", "Calendar", "Analytics"],
      lastUpdated: "2 days ago",
    },
    {
      id: 2,
      roleName: "Business Owner",
      widgets: ["Revenue", "Team Overview", "Projects"],
      lastUpdated: "5 days ago",
    },
  ]);
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  const handleCreateConfig = async (data) => {
    setConfigurations((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        roleName: "New Role",
        widgets: Object.keys(data.configuration.widgets || {}),
        lastUpdated: "Just now",
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
                Global Role Configurations
              </CardTitle>
              <CardDescription>
                Manage configurations for global roles including widgets,
                sidebar items, and permissions
              </CardDescription>
            </div>
            <Button
              variant="outline"
              className="w-full lg:w-auto shrink-0 border-primary text-primary hover:bg-primary hover:text-primary-foreground flex items-center justify-center gap-2"
              onClick={() => setShowCreateDialog(true)}
            >
              <Plus className="h-4 w-4" />
              Add Configuration
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="md:divide-y md:divide-border">
            {configurations.map((config) => (
              <div
                key={config.id}
                className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 py-6 lg:py-4 first:pt-0 last:pb-0"
              >
                <div>
                  <h3 className="font-medium text-lg">{config.roleName}</h3>
                  <div className="flex flex-col lg:flex-row gap-2 text-sm text-muted-foreground mt-1">
                    <div>Widgets: {config.widgets.join(", ")}</div>
                    <div className="hidden lg:block">•</div>
                    <div>Last updated: {config.lastUpdated}</div>
                  </div>
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

      <CreateRoleConfigDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        onSubmit={handleCreateConfig}
      />
    </>
  );
};
