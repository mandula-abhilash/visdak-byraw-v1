"use client";

import { createContext, useContext, useEffect, useState } from "react";

const GoogleMapsContext = createContext(null);

// Keep track of script loading state globally
let isLoadingScript = false;
let scriptPromise = null;

const loadGoogleMapsScript = () => {
  if (scriptPromise) {
    return scriptPromise;
  }

  if (window.google?.maps) {
    return Promise.resolve();
  }

  if (isLoadingScript) {
    return new Promise((resolve, reject) => {
      const checkGoogle = () => {
        if (window.google?.maps) {
          resolve();
        } else {
          setTimeout(checkGoogle, 100);
        }
      };
      checkGoogle();
    });
  }

  isLoadingScript = true;
  scriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
    script.async = true;
    script.defer = true;

    script.addEventListener("load", () => {
      isLoadingScript = false;
      resolve();
    });

    script.addEventListener("error", (error) => {
      isLoadingScript = false;
      scriptPromise = null;
      reject(error);
    });

    document.head.appendChild(script);
  });

  return scriptPromise;
};

export const GoogleMapsProvider = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    loadGoogleMapsScript()
      .then(() => setIsLoaded(true))
      .catch((error) => setLoadError(error));
  }, []);

  return (
    <GoogleMapsContext.Provider value={{ isLoaded, loadError }}>
      {children}
    </GoogleMapsContext.Provider>
  );
};

export const useGoogleMaps = () => {
  const context = useContext(GoogleMapsContext);
  if (!context) {
    throw new Error("useGoogleMaps must be used within a GoogleMapsProvider");
  }
  return context;
};
