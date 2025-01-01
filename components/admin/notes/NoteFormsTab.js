"use client";

import { useState } from "react";
import { NOTE_TYPES } from "@/components/widgets/NotesWidget/forms/NoteTypes";
import { CreateNoteDialog } from "@/components/widgets/NotesWidget/dialogs/CreateNoteDialog";
import { Button } from "@/components/ui/button";
import * as Icons from "lucide-react";

export const NoteFormsTab = () => {
  const [selectedType, setSelectedType] = useState(null);

  const handleCreateNote = async (data) => {
    console.log("Creating note:", data);
    setSelectedType(null);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {Object.values(NOTE_TYPES).map((type) => {
          const Icon = Icons[type.icon];
          return (
            <Button
              key={type.id}
              variant="outline"
              className="h-auto py-4 px-4 flex flex-col items-center gap-2 text-left"
              onClick={() => setSelectedType(type.id)}
            >
              <Icon className="h-6 w-6" />
              <div>
                <div className="font-medium">{type.label}</div>
                <div className="text-xs text-muted-foreground">
                  {type.description}
                </div>
              </div>
            </Button>
          );
        })}
      </div>

      <CreateNoteDialog
        open={!!selectedType}
        onOpenChange={(open) => !open && setSelectedType(null)}
        onSubmit={handleCreateNote}
        noteType={selectedType}
      />
    </>
  );
};
