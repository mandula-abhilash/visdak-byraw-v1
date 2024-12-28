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
import { CreateIdentityDialog } from "./dialogs/CreateIdentityDialog";

export const IdentityManagement = () => {
  const [identities, setIdentities] = useState([
    {
      id: 1,
      label: "Doctor",
      details: "Medical professional identity",
    },
    {
      id: 2,
      label: "Freelancer",
      details: "Independent contractor identity",
    },
  ]);
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  const handleCreateIdentity = async (data) => {
    setIdentities((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        label: data.label,
        details: data.details || "",
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
                Identities
              </CardTitle>
              <CardDescription>
                Manage identity types and their descriptions
              </CardDescription>
            </div>
            <Button
              variant="outline"
              className="w-full lg:w-auto shrink-0 border-primary text-primary hover:bg-primary hover:text-primary-foreground flex items-center justify-center gap-2"
              onClick={() => setShowCreateDialog(true)}
            >
              <Plus className="h-4 w-4" />
              Add Identity
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="md:divide-y md:divide-border">
            {identities.map((identity) => (
              <div
                key={identity.id}
                className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 py-6 lg:py-4 first:pt-0 last:pb-0"
              >
                <div>
                  <h3 className="font-medium text-lg">{identity.label}</h3>
                  {identity.details && (
                    <div className="text-sm text-muted-foreground mt-1">
                      {identity.details}
                    </div>
                  )}
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

      <CreateIdentityDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        onSubmit={handleCreateIdentity}
      />
    </>
  );
};
