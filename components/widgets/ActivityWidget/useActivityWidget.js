"use client";

import { useState, useEffect } from "react";

const MOCK_ACTIVITIES = [
  {
    id: 1,
    type: "task",
    title: "Project Milestone Completed",
    description: "Successfully delivered Phase 1 deliverables",
    status: "completed",
    timestamp: "2 hours ago",
    user: "Alice Baker",
  },
  {
    id: 2,
    type: "payment",
    title: "Invoice Payment Received",
    description: "Payment of $1,500 received from Client XYZ",
    status: "completed",
    timestamp: "4 hours ago",
    user: "Finance Team",
  },
  {
    id: 3,
    type: "system",
    title: "System Update",
    description: "New features deployed: Calendar integration",
    timestamp: "1 day ago",
  },
  {
    id: 4,
    type: "task",
    title: "Client Meeting",
    description: "Upcoming meeting with stakeholders",
    status: "pending",
    timestamp: "in 2 hours",
    user: "Team Lead",
  },
  {
    id: 5,
    type: "alert",
    title: "Server Performance Alert",
    description: "High CPU usage detected",
    status: "overdue",
    timestamp: "10 minutes ago",
  },
  {
    id: 6,
    type: "notification",
    title: "New Team Member",
    description: "Bob Johnson joined the development team",
    timestamp: "1 hour ago",
  },
];

export const useActivityWidget = () => {
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setActivities(MOCK_ACTIVITIES);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };

    fetchActivities();
  }, []);

  return { activities, isLoading, error };
};
