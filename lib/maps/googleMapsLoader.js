"use client";

// Singleton to track script loading state
let isLoadingScript = false;
let scriptLoadPromise = null;

export const loadGoogleMapsScript = () => {
  if (scriptLoadPromise) {
    return scriptLoadPromise;
  }

  if (window.google?.maps) {
    return Promise.resolve();
  }

  if (isLoadingScript) {
    return new Promise((resolve) => {
      const checkLoaded = () => {
        if (window.google?.maps) {
          resolve();
        } else {
          setTimeout(checkLoaded, 100);
        }
      };
      checkLoaded();
    });
  }

  isLoadingScript = true;
  scriptLoadPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=visualization`;
    script.async = true;
    script.defer = true;

    script.addEventListener("load", () => {
      isLoadingScript = false;
      resolve();
    });

    script.addEventListener("error", (error) => {
      isLoadingScript = false;
      scriptLoadPromise = null;
      reject(error);
    });

    document.head.appendChild(script);
  });

  return scriptLoadPromise;
};
