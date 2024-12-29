"use client";

import { useState, useEffect } from "react";
import { MOCK_TASKS } from "@/components/admin/tasks/mockData";

export const useTaskWidget = ({
  dateRange,
  sort,
  limit,
  statusFilter,
  priorityFilter,
  groupBy,
}) => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Filter tasks based on parameters
        let filteredTasks = [...MOCK_TASKS];

        if (statusFilter?.length) {
          filteredTasks = filteredTasks.filter((task) =>
            statusFilter.includes(task.status)
          );
        }

        if (priorityFilter) {
          filteredTasks = filteredTasks.filter(
            (task) => task.priority === priorityFilter
          );
        }

        // Sort tasks
        if (sort === "asc") {
          filteredTasks.sort(
            (a, b) => new Date(a.due_date) - new Date(b.due_date)
          );
        } else {
          filteredTasks.sort(
            (a, b) => new Date(b.due_date) - new Date(a.due_date)
          );
        }

        // Apply limit
        if (limit) {
          filteredTasks = filteredTasks.slice(0, limit);
        }

        setTasks(filteredTasks);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, [dateRange, sort, limit, statusFilter, priorityFilter, groupBy]);

  return { tasks, isLoading, error };
};
