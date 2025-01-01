"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { CreateNoteForm } from "../forms/CreateNoteForm";
import { NOTE_TYPES } from "../forms/NoteTypes";

export const CreateNoteDialog = ({
  open,
  onOpenChange,
  onSubmit,
  noteType,
}) => {
  const getDialogTitle = () => {
    if (noteType) {
      return `Create ${
        NOTE_TYPES[noteType.toUpperCase()]?.label || "New Note"
      }`;
    }
    return "Create New Note";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{getDialogTitle()}</DialogTitle>
          <DialogDescription>
            {noteType
              ? NOTE_TYPES[noteType.toUpperCase()]?.description
              : "Create a new note with rich formatting, labels, and scheduling options."}
          </DialogDescription>
        </DialogHeader>
        <CreateNoteForm
          onSubmit={onSubmit}
          onCancel={() => onOpenChange(false)}
          initialNoteType={noteType}
        />
      </DialogContent>
    </Dialog>
  );
};
