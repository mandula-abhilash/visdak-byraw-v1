"use client";

import { useState, useCallback } from "react";

export const useIdentities = () => {
  const [identities] = useState([
    { id: "1", label: "Doctor", details: "Medical professional" },
    { id: "2", label: "Freelancer", details: "Independent contractor" },
    { id: "3", label: "Student", details: "Academic learner" },
    { id: "4", label: "Parent", details: "Family caregiver" },
  ]);

  const [currentIdentities, setCurrentIdentities] = useState([]);

  const fetchCurrentIdentities = useCallback(async (personId) => {
    // Simulated API call - replace with actual API integration
    // This would fetch the current identities for the given person
    setCurrentIdentities([{ id: "1", label: "Doctor" }]);
  }, []);

  return {
    identities,
    currentIdentities,
    fetchCurrentIdentities,
  };
};
