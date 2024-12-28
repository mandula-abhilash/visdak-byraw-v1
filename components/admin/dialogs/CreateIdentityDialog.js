"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { CreateIdentityForm } from "../forms/CreateIdentityForm";

export const CreateIdentityDialog = ({ open, onOpenChange, onSubmit }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Identity</DialogTitle>
          <DialogDescription>
            Add a new identity type to the system. Identity labels must be
            unique.
          </DialogDescription>
        </DialogHeader>
        <CreateIdentityForm
          onSubmit={onSubmit}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
};
