"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { AssignIdentityForm } from "../forms/AssignIdentityForm";

export const AssignIdentityDialog = ({
  open,
  onOpenChange,
  onSubmit,
  person,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Assign Identity</DialogTitle>
          <DialogDescription>
            {person
              ? `Assign identities to ${person.full_name}`
              : "Select a person and assign identities"}
          </DialogDescription>
        </DialogHeader>
        <AssignIdentityForm
          onSubmit={onSubmit}
          onCancel={() => onOpenChange(false)}
          selectedPerson={person}
        />
      </DialogContent>
    </Dialog>
  );
};
