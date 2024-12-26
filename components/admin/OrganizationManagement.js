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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Organizations</CardTitle>
            <CardDescription>
              Manage organizations and their role configurations
            </CardDescription>
          </div>
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Organization
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">Organization Name</TableHead>
              <TableHead className="text-left">Roles</TableHead>
              <TableHead className="text-left">Members</TableHead>
              <TableHead className="text-left w-[120px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {organizations.map((org) => (
              <TableRow key={org.id}>
                <TableCell className="font-medium">{org.name}</TableCell>
                <TableCell>{org.roles.join(", ")}</TableCell>
                <TableCell>{org.memberCount}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="hover:bg-primary/10"
                    >
                      <Settings className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="hover:bg-primary/10"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
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
