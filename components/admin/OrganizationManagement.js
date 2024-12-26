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

export const OrganizationManagement = () => {
  const [organizations] = useState([
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

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
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
            className="w-full md:w-auto shrink-0 border-primary text-primary hover:bg-primary hover:text-primary-foreground flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Organization
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {organizations.map((org) => (
            <Card key={org.id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-medium text-lg">{org.name}</h3>
                    <div className="flex flex-col sm:flex-row gap-2 text-sm text-muted-foreground">
                      <div>Roles: {org.roles.join(", ")}</div>
                      <div className="hidden sm:block">•</div>
                      <div>{org.memberCount} Members</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      variant="outline"
                      className="hover:bg-primary/10"
                      onClick={() => {}}
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Button>
                    <Button
                      variant="outline"
                      className="hover:bg-primary/10"
                      onClick={() => {}}
                    >
                      <Pencil className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      className="hover:bg-destructive/10 hover:text-destructive"
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
