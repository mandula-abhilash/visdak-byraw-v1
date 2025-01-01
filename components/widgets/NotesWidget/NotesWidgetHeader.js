"use client";

import { useState } from "react";
import { LayoutList, Grid, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreateNoteDialog } from "./dialogs/CreateNoteDialog";

export const NotesWidgetHeader = ({
  title,
  selectedView,
  onViewChange,
  selectedFilter,
  onFilterChange,
  noteCount,
  showCount,
  noteType,
}) => {
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  const handleCreateNote = async (data) => {
    // Here you would typically make an API call to create the note
    console.log("Creating note:", data);
    setShowCreateDialog(false);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">
            {title}
            {showCount && noteCount > 0 && (
              <span className="ml-2 text-sm text-muted-foreground">
                ({noteCount})
              </span>
            )}
          </CardTitle>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedFilter} onValueChange={onFilterChange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Filter by..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Notes</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
              <SelectItem value="pinned">Pinned</SelectItem>
            </SelectContent>
          </Select>
          <div className="bg-muted rounded-md p-1 flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              className={`h-7 w-7 ${
                selectedView === "list"
                  ? "bg-background shadow-sm"
                  : "hover:bg-background/50"
              }`}
              onClick={() => onViewChange("list")}
            >
              <LayoutList className="h-4 w-4" />
              <span className="sr-only">List view</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`h-7 w-7 ${
                selectedView === "grid"
                  ? "bg-background shadow-sm"
                  : "hover:bg-background/50"
              }`}
              onClick={() => onViewChange("grid")}
            >
              <Grid className="h-4 w-4" />
              <span className="sr-only">Grid view</span>
            </Button>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            onClick={() => setShowCreateDialog(true)}
          >
            <Plus className="h-4 w-4" />
            <span className="sr-only">Add note</span>
          </Button>
        </div>
      </div>

      <CreateNoteDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        onSubmit={handleCreateNote}
        noteType={noteType}
      />
    </>
  );
};
