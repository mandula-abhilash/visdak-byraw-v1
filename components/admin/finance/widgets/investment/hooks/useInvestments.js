"use client";

import { useState, useEffect } from "react";
import { generateInvestments } from "../utils/mockData";

export const useInvestments = () => {
  const [investments, setInvestments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const mockInvestments = generateInvestments();
        setInvestments(mockInvestments);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInvestments();
  }, []);

  return { investments, isLoading, error };
};
