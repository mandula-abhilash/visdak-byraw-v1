"use client";

import { useState } from "react";
import { Search, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ActionButton } from "./ActionButton";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>User Configuration Overrides</CardTitle>
            <CardDescription>
              Manage user-specific configuration overrides
            </CardDescription>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search users..." className="pl-8" />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">User</TableHead>
              <TableHead className="text-left">Email</TableHead>
              <TableHead className="text-left">Active Overrides</TableHead>
              <TableHead className="text-left w-[120px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.overrides.join(", ")}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <ActionButton
                      icon={Pencil}
                      className="hover:bg-primary/10"
                    />
                    <ActionButton
                      icon={Trash2}
                      className="hover:bg-destructive/10 hover:text-destructive"
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
