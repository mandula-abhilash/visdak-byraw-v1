"use client";

import { useState, useEffect } from "react";

const MOCK_NOTES = [
  {
    id: 1,
    title: "Project Ideas",
    content: "Brainstorming session for new features and improvements",
    labels: ["Work", "Planning"],
    pinned: true,
    important: true,
    archived: false,
    start_date: "2024-02-20",
    end_date: "2024-03-01",
  },
  {
    id: 2,
    title: "Meeting Notes",
    content: "Key points from the team sync-up meeting",
    labels: ["Work", "Meeting"],
    pinned: false,
    important: false,
    archived: false,
    start_date: "2024-02-19",
  },
  {
    id: 3,
    title: "Shopping List",
    content: "Items to buy for the weekend",
    labels: ["Personal"],
    pinned: false,
    important: false,
    archived: true,
    end_date: "2024-02-24",
  },
  {
    id: 4,
    title: "Book Recommendations",
    content: "List of books to read this month",
    labels: ["Personal", "Reading"],
    pinned: true,
    important: false,
    archived: false,
  },
  {
    id: 5,
    title: "Workout Plan",
    content: "Exercise routine for the next month",
    labels: ["Health", "Personal"],
    pinned: false,
    important: true,
    archived: false,
    start_date: "2024-02-01",
    end_date: "2024-02-28",
  },
];

export const useNotesWidget = () => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setNotes(MOCK_NOTES);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return { notes, isLoading, error };
};
