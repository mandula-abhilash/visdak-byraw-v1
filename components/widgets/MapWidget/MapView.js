"use client";

import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { TaskMap } from "@/components/admin/tasks/maps/TaskMap";
import { DrawingTools } from "./drawing/DrawingTools";

export const MapView = ({
  view,
  locations = [],
  isLoading,
  center,
  zoom,
  onLocationAdd,
  onLocationRemove,
}) => {
  const [drawingMode, setDrawingMode] = useState(null);
  const [drawnShapes, setDrawnShapes] = useState([]);
  const mapRef = useRef(null);

  const handleMarkerClick = (location) => {
    console.log("Marker clicked:", location);
  };

  const handleShapeComplete = (shape) => {
    setDrawnShapes((prev) => [...prev, shape]);
  };

  if (isLoading) {
    return (
      <Card className="w-full h-full flex items-center justify-center">
        <div className="text-sm text-muted-foreground">Loading map...</div>
      </Card>
    );
  }

  const mapData = locations.map((location) => ({
    ...location,
    location: location.location || location.coordinates,
  }));

  return (
    <div className="relative w-full h-full">
      <TaskMap
        ref={mapRef}
        tasks={mapData}
        type={view === "drawing" ? "drawing" : "markers"}
        center={center}
        zoom={zoom}
        onMarkerClick={handleMarkerClick}
      />
      {view === "drawing" && (
        <DrawingTools
          mode={drawingMode}
          onModeChange={setDrawingMode}
          onShapeComplete={handleShapeComplete}
          onClear={() => setDrawnShapes([])}
        />
      )}
    </div>
  );
};
