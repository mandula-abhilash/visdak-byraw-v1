"use client";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Pin, Archive, Star } from "lucide-react";

const NoteCard = ({ note, showLabels, showDates }) => {
  const getStatusIcon = () => {
    if (note.pinned) return <Pin className="h-4 w-4 text-primary" />;
    if (note.archived)
      return <Archive className="h-4 w-4 text-muted-foreground" />;
    if (note.important) return <Star className="h-4 w-4 text-chart-5" />;
    return null;
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-lg border p-4 hover:bg-accent/50 transition-colors",
        note.pinned && "border-primary/50 bg-primary/5"
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="font-medium leading-none">{note.title}</h3>
            {getStatusIcon()}
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {note.content}
          </p>
        </div>
      </div>
      {showLabels && note.labels?.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {note.labels.map((label) => (
            <Badge
              key={label}
              variant="secondary"
              className="px-2 py-0.5 text-xs font-medium"
            >
              {label}
            </Badge>
          ))}
        </div>
      )}
      {showDates && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          {note.start_date && (
            <span>From: {new Date(note.start_date).toLocaleDateString()}</span>
          )}
          {note.end_date && (
            <span>To: {new Date(note.end_date).toLocaleDateString()}</span>
          )}
        </div>
      )}
    </div>
  );
};

export const NotesList = ({
  notes = [],
  isLoading,
  view = "list",
  filter = "all",
  showLabels = true,
  showDates = true,
  limit = null,
}) => {
  if (isLoading) {
    return (
      <div className="space-y-2">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="h-[100px] rounded-lg bg-accent/50 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (!notes.length) {
    return (
      <div className="py-6 text-center text-sm text-muted-foreground">
        No notes found
      </div>
    );
  }

  // Filter notes based on selected filter
  let filteredNotes = notes;
  switch (filter) {
    case "active":
      filteredNotes = notes.filter((note) => !note.archived);
      break;
    case "archived":
      filteredNotes = notes.filter((note) => note.archived);
      break;
    case "pinned":
      filteredNotes = notes.filter((note) => note.pinned);
      break;
    default:
      break;
  }

  // Apply limit if specified
  if (limit) {
    filteredNotes = filteredNotes.slice(0, limit);
  }

  return (
    <div
      className={cn(
        view === "grid"
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          : "space-y-2"
      )}
    >
      {filteredNotes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          showLabels={showLabels}
          showDates={showDates}
        />
      ))}
    </div>
  );
};
