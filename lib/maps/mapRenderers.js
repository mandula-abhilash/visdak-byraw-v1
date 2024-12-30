"use client";

import { MarkerClusterer } from "@googlemaps/markerclusterer";

export const renderMarkers = (tasks, map, infoWindow, onMarkerClick) => {
  return tasks
    .filter((task) => task.location)
    .map((task) => createMarker(task, map, infoWindow, onMarkerClick));
};

export const renderHeatmap = (tasks, map) => {
  if (!window.google?.maps?.visualization?.HeatmapLayer) {
    console.error("Heatmap library not loaded");
    return [];
  }

  const heatmap = new window.google.maps.visualization.HeatmapLayer({
    data: tasks
      .filter((task) => task.location)
      .map((task) => ({
        location: new window.google.maps.LatLng(
          task.location.lat,
          task.location.lng
        ),
        weight: task.intensity || 1,
      })),
    map: map,
  });

  return [heatmap];
};

export const renderClusters = (tasks, map, infoWindow, onMarkerClick) => {
  const markers = tasks
    .filter((task) => task.location)
    .map((task) => createMarker(task, map, infoWindow, onMarkerClick));

  const clusterer = new MarkerClusterer({
    map,
    markers,
  });

  return markers;
};

export const renderRoutes = (tasks, map) => {
  const elements = [];

  tasks.forEach((route) => {
    if (route.path?.length > 1) {
      const routeElements = createRouteElements(route, map);
      elements.push(...routeElements);
    }
  });

  return elements;
};

// Helper functions
const createMarker = (task, map, infoWindow, onMarkerClick) => {
  const marker = new window.google.maps.Marker({
    position: task.location,
    map: map,
    title: task.title,
  });

  marker.addListener("click", () => {
    infoWindow.setContent(createInfoWindowContent(task));
    infoWindow.open(map, marker);
    if (onMarkerClick) onMarkerClick(task);
  });

  return marker;
};

const createRouteElements = (route, map) => {
  const elements = [];

  // Create path
  const path = new window.google.maps.Polyline({
    path: route.path,
    geodesic: true,
    strokeColor: route.color || "#FF0000",
    strokeOpacity: 1.0,
    strokeWeight: 2,
    map: map,
  });
  elements.push(path);

  // Add start marker
  elements.push(createRouteMarker(route.path[0], map, "Start", "#4CAF50"));

  // Add end marker
  elements.push(
    createRouteMarker(route.path[route.path.length - 1], map, "End", "#F44336")
  );

  return elements;
};

const createRouteMarker = (position, map, title, color) => {
  return new window.google.maps.Marker({
    position,
    map,
    title,
    icon: {
      path: window.google.maps.SymbolPath.CIRCLE,
      scale: 8,
      fillColor: color,
      fillOpacity: 1,
      strokeWeight: 2,
      strokeColor: "#FFFFFF",
    },
  });
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
          <strong>Due:</strong> ${new Date(task.due_date).toLocaleDateString()}
        </p>
      </div>
    </div>
  `;
};
