"use client";

import { useState } from "react";
import { MapPin, Map as MapIcon, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AddLocationDialog } from "./dialogs/AddLocationDialog";

export const MapWidgetHeader = ({
  title,
  selectedView,
  onViewChange,
  showControls,
  showSearch,
  showDrawing,
  onLocationAdd,
}) => {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    // Here you would typically make a geocoding API call
    // For demo, we'll use a fixed location
    onLocationAdd({
      id: Date.now(),
      title: searchQuery,
      location: { lat: 17.385, lng: 78.4867 },
    });
    setSearchQuery("");
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">{title}</CardTitle>
        </div>
        <div className="flex items-center gap-2">
          {showSearch && (
            <div className="relative">
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSearch();
                  }
                }}
                placeholder="Search location..."
                className="w-[200px]"
              />
            </div>
          )}
          {showControls && (
            <div className="bg-muted rounded-md p-1 flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                className={`h-7 w-7 ${
                  selectedView === "markers"
                    ? "bg-background shadow-sm"
                    : "hover:bg-background/50"
                }`}
                onClick={() => onViewChange("markers")}
              >
                <MapPin className="h-4 w-4" />
                <span className="sr-only">Markers view</span>
              </Button>
              {showDrawing && (
                <Button
                  variant="ghost"
                  size="icon"
                  className={`h-7 w-7 ${
                    selectedView === "drawing"
                      ? "bg-background shadow-sm"
                      : "hover:bg-background/50"
                  }`}
                  onClick={() => onViewChange("drawing")}
                >
                  <Pencil className="h-4 w-4" />
                  <span className="sr-only">Drawing view</span>
                </Button>
              )}
            </div>
          )}
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            onClick={() => setShowAddDialog(true)}
          >
            <MapPin className="h-4 w-4" />
            <span className="sr-only">Add location</span>
          </Button>
        </div>
      </div>

      <AddLocationDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onSubmit={onLocationAdd}
      />
    </>
  );
};
