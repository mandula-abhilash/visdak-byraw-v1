"use client";

import { useEffect, useRef } from "react";
import { useGoogleMaps } from "@/lib/providers/GoogleMapsProvider";
import { useGoogleMapsLibraries } from "@/lib/maps/useGoogleMapsLibraries";
import {
  renderMarkers,
  renderHeatmap,
  renderClusters,
  renderRoutes,
} from "@/lib/maps/mapRenderers";

export const TaskMap = ({ tasks = [], type = "markers", onMarkerClick }) => {
  const mapRef = useRef(null);
  const elementsRef = useRef([]);
  const infoWindowRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const { isLoaded, loadError } = useGoogleMaps();
  const { libraries, loadVisualization } = useGoogleMapsLibraries();

  useEffect(() => {
    if (isLoaded && mapRef.current && !mapInstanceRef.current) {
      initializeMap();
    }
  }, [isLoaded]);

  useEffect(() => {
    const loadRequiredLibraries = async () => {
      if (type === "heatmap" && !libraries.visualization) {
        await loadVisualization();
      }
    };

    if (mapInstanceRef.current) {
      loadRequiredLibraries().then(() => {
        updateMap();
      });
    }
  }, [tasks, type, libraries.visualization]);

  const initializeMap = () => {
    const defaultCenter = { lat: 17.385, lng: 78.4867 };
    const mapOptions = {
      center: defaultCenter,
      zoom: 12,
      mapTypeId: "roadmap",
      styles: [
        {
          featureType: "all",
          elementType: "geometry",
          stylers: [{ visibility: "simplified" }],
        },
      ],
      disableDefaultUI: true,
      mapTypeControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false,
      zoomControl: false,
      scaleControl: false,
    };

    mapInstanceRef.current = new window.google.maps.Map(
      mapRef.current,
      mapOptions
    );

    infoWindowRef.current = new window.google.maps.InfoWindow();
  };

  const clearMap = () => {
    if (Array.isArray(elementsRef.current)) {
      elementsRef.current.forEach((element) => {
        if (element && typeof element.setMap === "function") {
          element.setMap(null);
        }
      });
    }
    elementsRef.current = [];
  };

  const updateMap = () => {
    if (!mapInstanceRef.current) return;

    clearMap();

    switch (type) {
      case "heatmap":
        if (libraries.visualization) {
          elementsRef.current = renderHeatmap(tasks, mapInstanceRef.current);
        }
        break;
      case "clusters":
        elementsRef.current = renderClusters(
          tasks,
          mapInstanceRef.current,
          infoWindowRef.current,
          onMarkerClick
        );
        break;
      case "routes":
        elementsRef.current = renderRoutes(tasks, mapInstanceRef.current);
        break;
      case "markers":
      default:
        elementsRef.current = renderMarkers(
          tasks,
          mapInstanceRef.current,
          infoWindowRef.current,
          onMarkerClick
        );
        break;
    }
  };

  if (loadError) {
    return (
      <div className="h-full flex items-center justify-center text-sm text-muted-foreground">
        Error loading map
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="h-full flex items-center justify-center text-sm text-muted-foreground">
        Loading map...
      </div>
    );
  }

  return <div ref={mapRef} className="w-full h-full" />;
};
