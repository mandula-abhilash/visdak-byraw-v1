"use client";

import { useState } from "react";
import { NOTE_TYPES } from "@/components/widgets/NotesWidget/forms/NoteTypes";
import { CreateNoteDialog } from "@/components/widgets/NotesWidget/dialogs/CreateNoteDialog";
import { Card } from "@/components/ui/card";
import * as Icons from "lucide-react";
import { cn } from "@/lib/utils";

export const NoteFormsTab = () => {
  const [selectedType, setSelectedType] = useState(null);

  const handleCreateNote = async (data) => {
    console.log("Creating note:", data);
    setSelectedType(null);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Object.values(NOTE_TYPES).map((type) => {
          const Icon = Icons[type.icon];
          return (
            <Card
              key={type.id}
              className={cn(
                "relative overflow-hidden cursor-pointer group transition-all duration-300",
                "hover:shadow-lg hover:border-primary/50 hover:-translate-y-0.5"
              )}
              onClick={() => setSelectedType(type.id)}
            >
              <div className="relative p-6 flex items-start gap-4">
                {/* Main Icon */}
                <div className="shrink-0">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-8 w-8" />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-1">
                  <h3 className="font-semibold tracking-tight">{type.label}</h3>
                  <p className="text-sm text-muted-foreground">
                    {type.description}
                  </p>
                </div>
              </div>
            </Card>
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
