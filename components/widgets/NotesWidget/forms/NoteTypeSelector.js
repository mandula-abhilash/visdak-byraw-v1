"use client";

import { NOTE_TYPES } from "./NoteTypes";
import { Button } from "@/components/ui/button";
import * as Icons from "lucide-react";

export const NoteTypeSelector = ({ selectedType, onSelect }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {Object.values(NOTE_TYPES).map((type) => {
        const Icon = Icons[type.icon];
        return (
          <Button
            key={type.id}
            variant={selectedType === type.id ? "secondary" : "outline"}
            className="h-auto py-4 px-4 flex flex-col items-center gap-2 text-left"
            onClick={() => onSelect(type.id)}
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
  );
};
