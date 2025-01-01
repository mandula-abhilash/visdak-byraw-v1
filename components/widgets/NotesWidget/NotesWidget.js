"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { NotesList } from "./NotesList";
import { NotesWidgetHeader } from "./NotesWidgetHeader";
import { useNotesWidget } from "./useNotesWidget";
import { WIDGET_STYLES } from "@/lib/constants/widget-styles";

export const NotesWidget = ({
  title = "Notes",
  view = "list",
  showCount = true,
  showLabels = true,
  showDates = true,
  limit = null,
}) => {
  const [selectedView, setSelectedView] = useState(view);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const { notes, isLoading, error } = useNotesWidget();

  if (error) {
    return (
      <Card className="h-full">
        <CardContent className="pt-6">
          <div className="text-sm text-destructive">
            Error loading notes: {error.message}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full flex flex-col shadow-lg">
      <CardHeader className="pb-3 flex-none border-b">
        <NotesWidgetHeader
          title={title}
          selectedView={selectedView}
          onViewChange={setSelectedView}
          selectedFilter={selectedFilter}
          onFilterChange={setSelectedFilter}
          noteCount={notes?.length || 0}
          showCount={showCount}
        />
      </CardHeader>
      <CardContent
        className="flex-1 p-4 overflow-y-auto"
        style={{
          minHeight: WIDGET_STYLES.MIN_HEIGHT,
          maxHeight: WIDGET_STYLES.MAX_HEIGHT,
        }}
      >
        <div className="h-full">
          <NotesList
            notes={notes}
            isLoading={isLoading}
            view={selectedView}
            filter={selectedFilter}
            showLabels={showLabels}
            showDates={showDates}
            limit={limit}
          />
        </div>
      </CardContent>
    </Card>
  );
};
