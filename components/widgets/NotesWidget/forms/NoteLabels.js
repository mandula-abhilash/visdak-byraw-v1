"use client";

import { useState } from "react";
import { X, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const NoteLabels = ({ value = [], onChange }) => {
  const [newLabel, setNewLabel] = useState("");

  const handleAddLabel = () => {
    if (!newLabel.trim()) return;

    const label = newLabel.trim();
    if (!value.includes(label)) {
      onChange([...value, label]);
    }
    setNewLabel("");
  };

  const handleRemoveLabel = (labelToRemove) => {
    onChange(value.filter((label) => label !== labelToRemove));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddLabel();
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input
          value={newLabel}
          onChange={(e) => setNewLabel(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add a label"
          className="flex-1"
        />
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={handleAddLabel}
          className="shrink-0"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      {value.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {value.map((label) => (
            <Badge
              key={label}
              variant="secondary"
              className="px-2 py-0.5 text-xs font-medium group"
            >
              {label}
              <button
                type="button"
                onClick={() => handleRemoveLabel(label)}
                className="ml-1 hover:text-destructive focus:outline-none"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};
