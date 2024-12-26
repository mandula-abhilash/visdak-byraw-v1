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

export const RolesManagement = () => {
  const [roles] = useState([
    { id: 1, name: "Freelancer", description: "Independent contractor role" },
    { id: 2, name: "Business Owner", description: "Business management role" },
    { id: 3, name: "Head of Family", description: "Family management role" },
  ]);

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
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
            className="w-full md:w-auto shrink-0 border-primary text-primary hover:bg-primary hover:text-primary-foreground flex items-center justify-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Role
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {roles.map((role) => (
            <Card key={role.id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-lg">{role.name}</h3>
                    <p className="text-muted-foreground mt-1">
                      {role.description}
                    </p>
                  </div>
                  <ActionButtonGroup>
                    <ActionButton
                      icon={Pencil}
                      label="Edit"
                      onClick={() => {}}
                    />
                    <ActionButton
                      icon={Trash2}
                      label="Delete"
                      destructive
                      onClick={() => {}}
                    />
                  </ActionButtonGroup>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
