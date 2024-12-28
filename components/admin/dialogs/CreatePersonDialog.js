"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { CreatePersonForm } from "../forms/CreatePersonForm";

export const CreatePersonDialog = ({ open, onOpenChange, onSubmit }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Person</DialogTitle>
          <DialogDescription>
            Add a new person to the system. Each person must have a unique email
            address.
          </DialogDescription>
        </DialogHeader>
        <CreatePersonForm
          onSubmit={onSubmit}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
};
