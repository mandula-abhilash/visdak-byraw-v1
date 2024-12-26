"use client";

import { useState } from "react";
import { Search, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="space-y-2">
            <CardTitle className="text-xl font-semibold break-words">
              User Configuration Overrides
            </CardTitle>
            <CardDescription>
              Manage user-specific configuration overrides
            </CardDescription>
          </div>
          <div className="w-full md:w-72 shrink-0">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search users..." className="pl-8" />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {users.map((user) => (
            <Card key={user.id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-medium text-lg">{user.name}</h3>
                    <div className="flex flex-col sm:flex-row gap-2 text-sm text-muted-foreground">
                      <div>{user.email}</div>
                      <div className="hidden sm:block">•</div>
                      <div>{user.overrides.join(", ")}</div>
                    </div>
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
