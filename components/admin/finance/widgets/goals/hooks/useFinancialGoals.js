"use client";

import { useState, useEffect } from "react";
import { generateFinancialGoals } from "../utils/mockData";

export const useFinancialGoals = () => {
  const [goals, setGoals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const mockGoals = generateFinancialGoals();
        setGoals(mockGoals);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGoals();
  }, []);

  return { goals, isLoading, error };
};
