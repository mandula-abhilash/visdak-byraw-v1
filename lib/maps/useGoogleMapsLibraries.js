"use client";

import { useState, useEffect } from "react";

const loadScript = (url) => {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${url}"]`)) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = url;
    script.async = true;
    script.defer = true;

    script.addEventListener("load", resolve);
    script.addEventListener("error", reject);

    document.head.appendChild(script);
  });
};

export const useGoogleMapsLibraries = () => {
  const [libraries, setLibraries] = useState({
    visualization: false,
    markerClusterer: false,
  });

  const loadVisualization = async () => {
    if (window.google?.maps?.visualization) {
      setLibraries((prev) => ({ ...prev, visualization: true }));
      return;
    }

    try {
      await loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=visualization`
      );
      setLibraries((prev) => ({ ...prev, visualization: true }));
    } catch (error) {
      console.error("Error loading visualization library:", error);
    }
  };

  const loadMarkerClusterer = async () => {
    if (window.MarkerClusterer) {
      setLibraries((prev) => ({ ...prev, markerClusterer: true }));
      return;
    }

    try {
      await loadScript(
        "https://unpkg.com/@googlemaps/markerclusterer@2.0.15/dist/index.min.js"
      );
      setLibraries((prev) => ({ ...prev, markerClusterer: true }));
    } catch (error) {
      console.error("Error loading MarkerClusterer:", error);
    }
  };

  return {
    libraries,
    loadVisualization,
    loadMarkerClusterer,
  };
};
