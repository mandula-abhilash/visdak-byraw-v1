"use client";

import { useState, useEffect } from "react";
import { generateDebts } from "../utils/mockData";

export const useDebts = () => {
  const [debts, setDebts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDebts = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const mockDebts = generateDebts();
        setDebts(mockDebts);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDebts();
  }, []);

  return { debts, isLoading, error };
};
