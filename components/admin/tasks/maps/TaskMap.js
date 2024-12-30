"use client";

import { useEffect, useRef } from "react";
import { useGoogleMaps } from "@/lib/providers/GoogleMapsProvider";

export const TaskMap = ({ tasks = [], onMarkerClick }) => {
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const infoWindowRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const { isLoaded, loadError } = useGoogleMaps();

  useEffect(() => {
    if (isLoaded && mapRef.current && !mapInstanceRef.current) {
      initializeMap();
    }
  }, [isLoaded]);

  useEffect(() => {
    if (mapInstanceRef.current) {
      updateMarkers();
    }
  }, [tasks]);

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

    // Initialize InfoWindow
    infoWindowRef.current = new window.google.maps.InfoWindow();

    updateMarkers();
  };

  const createInfoWindowContent = (task) => {
    return `
      <div class="p-4 min-w-[200px]">
        <h3 class="font-medium mb-2">${task.title}</h3>
        <div class="space-y-1 text-sm">
          ${
            task.customer
              ? `
            <p class="text-muted-foreground">
              <strong>Customer:</strong> ${task.customer.name}
            </p>
            <p class="text-muted-foreground">
              <strong>Address:</strong> ${task.customer.address}
            </p>
          `
              : ""
          }
          ${
            task.service_type
              ? `
            <p class="text-muted-foreground">
              <strong>Service:</strong> ${task.service_type}
            </p>
          `
              : ""
          }
          <p class="text-muted-foreground">
            <strong>Status:</strong> ${task.status}
          </p>
          <p class="text-muted-foreground">
            <strong>Priority:</strong> ${task.priority}
          </p>
          <p class="text-muted-foreground">
            <strong>Due:</strong> ${new Date(
              task.due_date
            ).toLocaleDateString()}
          </p>
        </div>
      </div>
    `;
  };

  const updateMarkers = () => {
    // Clear existing markers
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];

    // Add new markers
    tasks.forEach((task) => {
      if (task.location) {
        const marker = new window.google.maps.Marker({
          position: task.location,
          map: mapInstanceRef.current,
          title: task.title,
        });

        marker.addListener("click", () => {
          // Close any open info window
          infoWindowRef.current.close();

          // Set content and open the info window
          infoWindowRef.current.setContent(createInfoWindowContent(task));
          infoWindowRef.current.open(mapInstanceRef.current, marker);

          if (onMarkerClick) {
            onMarkerClick(task);
          }
        });

        markersRef.current.push(marker);
      }
    });
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
