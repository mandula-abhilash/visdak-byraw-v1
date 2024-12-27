"use client";

import { useState } from "react";
import { Search, Pencil, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ActionButton, ActionButtonGroup } from "./ActionButtons";

export const UserOverrides = () => {
  const [users] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      overrides: ["Custom Dashboard Layout", "Additional Widgets"],
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      overrides: ["Modified Task View"],
    },
  ]);

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <div className="space-y-2">
            <CardTitle className="text-xl font-semibold break-words">
              User Configuration Overrides
            </CardTitle>
            <CardDescription>
              Manage user-specific configuration overrides
            </CardDescription>
          </div>
          <div className="w-full lg:w-72 shrink-0">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search users..." className="pl-8" />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="md:divide-y md:divide-border">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 py-6 lg:py-4 first:pt-0 last:pb-0"
            >
              <div>
                <h3 className="font-medium text-lg">{user.name}</h3>
                <div className="flex flex-col lg:flex-row gap-2 text-sm text-muted-foreground mt-1">
                  <div>{user.email}</div>
                  <div className="hidden lg:block">•</div>
                  <div>{user.overrides.join(", ")}</div>
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
  );
};
