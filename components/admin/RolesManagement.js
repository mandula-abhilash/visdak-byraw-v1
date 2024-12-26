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

export const RolesManagement = () => {
  const [roles] = useState([
    { id: 1, name: "Freelancer", description: "Independent contractor role" },
    { id: 2, name: "Business Owner", description: "Business management role" },
    { id: 3, name: "Head of Family", description: "Family management role" },
  ]);

  return (
    <Card>
      <CardHeader>
        <div className="space-y-4">
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
            className="w-full sm:w-auto border-primary text-primary hover:bg-primary hover:text-primary-foreground flex items-center gap-2"
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
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1 hover:bg-primary/10"
                      onClick={() => {}}
                    >
                      <Pencil className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => {}}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
