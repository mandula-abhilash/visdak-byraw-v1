"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MapWidgetHeader } from "./MapWidgetHeader";
import { MapView } from "./MapView";
import { useMapWidget } from "./useMapWidget";
import { WIDGET_STYLES } from "@/lib/constants/widget-styles";

export const MapWidget = ({
  title = "Map",
  view = "markers",
  showControls = true,
  showSearch = true,
  showDrawing = true,
  center = { lat: 17.385, lng: 78.4867 },
  zoom = 12,
}) => {
  const [selectedView, setSelectedView] = useState(view);
  const { locations, isLoading, error, addLocation, removeLocation } =
    useMapWidget();

  if (error) {
    return (
      <Card className="h-full">
        <CardContent className="pt-6">
          <div className="text-sm text-destructive">
            Error loading map: {error.message}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full flex flex-col shadow-lg">
      <CardHeader className="pb-3 flex-none border-b">
        <MapWidgetHeader
          title={title}
          selectedView={selectedView}
          onViewChange={setSelectedView}
          showControls={showControls}
          showSearch={showSearch}
          showDrawing={showDrawing}
          onLocationAdd={addLocation}
        />
      </CardHeader>
      <CardContent
        className="flex-1 p-4 overflow-hidden"
        style={{
          minHeight: WIDGET_STYLES.MIN_HEIGHT,
          maxHeight: WIDGET_STYLES.MAX_HEIGHT,
        }}
      >
        <MapView
          view={selectedView}
          locations={locations}
          isLoading={isLoading}
          center={center}
          zoom={zoom}
          onLocationAdd={addLocation}
          onLocationRemove={removeLocation}
        />
      </CardContent>
    </Card>
  );
};
