"use client";

import { forwardRef } from "react";
import { Textarea } from "@/components/ui/textarea";

export const NoteEditor = forwardRef(({ value, onChange }, ref) => {
  return (
    <Textarea
      ref={ref}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Write your note content here..."
      className="min-h-[200px] resize-none"
    />
  );
});

NoteEditor.displayName = "NoteEditor";
