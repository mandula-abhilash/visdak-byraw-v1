"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { CreateRoleConfigForm } from "../forms/CreateRoleConfigForm";

export const CreateRoleConfigDialog = ({ open, onOpenChange, onSubmit }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[90vw] lg:max-w-[1100px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-1.5">
          <DialogTitle>Create Role Configuration</DialogTitle>
          <DialogDescription>
            Define the configuration for a global role, including sidebar items,
            widgets, and permissions.
          </DialogDescription>
        </DialogHeader>
        <CreateRoleConfigForm
          onSubmit={onSubmit}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
};
