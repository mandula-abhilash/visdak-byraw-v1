"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ActionButton, ActionButtonGroup } from "./ActionButtons";
import { CreatePersonDialog } from "./dialogs/CreatePersonDialog";
import { AssignIdentityDialog } from "./dialogs/AssignIdentityDialog";

export const PeopleManagement = () => {
  const [people, setPeople] = useState([
    {
      id: "1",
      full_name: "John Doe",
      email_address: "john@example.com",
    },
    {
      id: "2",
      full_name: "Jane Smith",
      email_address: "jane@example.com",
    },
  ]);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showAssignDialog, setShowAssignDialog] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);

  const handleCreatePerson = async (data) => {
    setPeople((prev) => [
      ...prev,
      {
        id: String(prev.length + 1),
        full_name: data.full_name,
        email_address: data.email_address,
      },
    ]);
    setShowCreateDialog(false);
  };

  const handleAssignIdentity = async (data) => {
    console.log("Assigning identity:", data);
    setShowAssignDialog(false);
    setSelectedPerson(null);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div className="space-y-2">
              <CardTitle className="text-xl font-semibold break-words">
                People
              </CardTitle>
              <CardDescription>
                Manage people and their information
              </CardDescription>
            </div>
            <Button
              variant="outline"
              className="w-full lg:w-auto shrink-0 border-primary text-primary hover:bg-primary hover:text-primary-foreground flex items-center justify-center gap-2"
              onClick={() => setShowCreateDialog(true)}
            >
              <Plus className="h-4 w-4" />
              Add Person
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="md:divide-y md:divide-border">
            {people.map((person) => (
              <div
                key={person.id}
                className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 py-6 lg:py-4 first:pt-0 last:pb-0"
              >
                <div>
                  <h3 className="font-medium text-lg">{person.full_name}</h3>
                  <div className="text-sm text-muted-foreground mt-1">
                    {person.email_address}
                  </div>
                </div>
                <ActionButtonGroup>
                  <ActionButton
                    icon={UserPlus}
                    label="Assign Identity"
                    onClick={() => {
                      setSelectedPerson(person);
                      setShowAssignDialog(true);
                    }}
                  />
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

      <CreatePersonDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        onSubmit={handleCreatePerson}
      />

      <AssignIdentityDialog
        open={showAssignDialog}
        onOpenChange={setShowAssignDialog}
        onSubmit={handleAssignIdentity}
        person={selectedPerson}
      />
    </>
  );
};
