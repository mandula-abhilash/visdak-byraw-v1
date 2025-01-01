"use client";

import { useState, useEffect } from "react";

const MOCK_LOCATIONS = [
  {
    id: 1,
    title: "Office",
    description: "Main office location",
    location: { lat: 17.385, lng: 78.4867 },
  },
  {
    id: 2,
    title: "Warehouse",
    description: "Storage facility",
    location: { lat: 17.395, lng: 78.4967 },
  },
];

export const useMapWidget = () => {
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setLocations(MOCK_LOCATIONS);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };

    fetchLocations();
  }, []);

  const addLocation = (location) => {
    setLocations((prev) => [...prev, { ...location, id: Date.now() }]);
  };

  const removeLocation = (locationId) => {
    setLocations((prev) => prev.filter((loc) => loc.id !== locationId));
  };

  return { locations, isLoading, error, addLocation, removeLocation };
};
