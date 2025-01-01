"use client";

import { useEffect, useState } from "react";
import { MapWidget } from "@/components/widgets/MapWidget/MapWidget";
import { Card } from "@/components/ui/card";

export const NoteMap = ({ coordinates, onCoordinatesChange }) => {
  const [mapData, setMapData] = useState([]);

  useEffect(() => {
    if (coordinates?.lat && coordinates?.lng) {
      setMapData([
        {
          id: 1,
          title: "Selected Location",
          location: {
            lat: coordinates.lat,
            lng: coordinates.lng,
          },
        },
      ]);
    }
  }, [coordinates]);

  const handleLocationAdd = (location) => {
    if (onCoordinatesChange) {
      onCoordinatesChange(location.location);
    }
  };

  return (
    <Card className="w-full h-[300px] overflow-hidden">
      <MapWidget
        title=""
        view="markers"
        showControls={false}
        showSearch={false}
        showDrawing={false}
        center={coordinates}
        zoom={15}
        initialLocations={mapData}
        onLocationAdd={handleLocationAdd}
        className="h-full"
      />
    </Card>
  );
};
