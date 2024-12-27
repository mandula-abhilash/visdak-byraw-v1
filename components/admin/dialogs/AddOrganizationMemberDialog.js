"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { AddOrganizationMemberForm } from "../forms/AddOrganizationMemberForm";

export const AddOrganizationMemberDialog = ({
  open,
  onOpenChange,
  onSubmit,
  organizationId,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Organization Member</DialogTitle>
          <DialogDescription>
            Add a new member to the organization and assign them a role.
          </DialogDescription>
        </DialogHeader>
        <AddOrganizationMemberForm
          onSubmit={onSubmit}
          onCancel={() => onOpenChange(false)}
          organizationId={organizationId}
        />
      </DialogContent>
    </Dialog>
  );
};
