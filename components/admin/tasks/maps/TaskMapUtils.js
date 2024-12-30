"use client";

import { MOCK_TASKS } from "../mockData";

export const getTasksByLocation = () => {
  return MOCK_TASKS.map((task) => ({
    ...task,
    intensity: 1,
  }));
};

export const getTaskHeatmapData = () => {
  return MOCK_TASKS.map((task) => ({
    ...task,
    intensity:
      task.priority === "high" ? 3 : task.priority === "medium" ? 2 : 1,
  }));
};

export const getTaskClusterData = () => {
  return MOCK_TASKS.map((task) => ({
    ...task,
    cluster: task.service_type,
  }));
};

export const getTaskRouteData = () => {
  // Group tasks by service type to create routes
  const serviceTypes = {};
  MOCK_TASKS.forEach((task) => {
    if (!serviceTypes[task.service_type]) {
      serviceTypes[task.service_type] = [];
    }
    serviceTypes[task.service_type].push(task);
  });

  // Create routes for each service type
  return Object.entries(serviceTypes).map(([service, tasks]) => {
    // Sort tasks by due date to create a logical route
    const sortedTasks = [...tasks].sort(
      (a, b) => new Date(a.due_date) - new Date(b.due_date)
    );

    return {
      service_type: service,
      path: sortedTasks.map((task) => task.location),
      color: getRouteColor(service),
      tasks: sortedTasks,
    };
  });
};

const getRouteColor = (serviceType) => {
  const colors = {
    Maintenance: "#4CAF50", // Green
    Security: "#F44336", // Red
    Installation: "#2196F3", // Blue
    Setup: "#9C27B0", // Purple
    Inspection: "#FF9800", // Orange
    Review: "#795548", // Brown
    Upgrade: "#607D8B", // Blue Grey
    Support: "#00BCD4", // Cyan
    Migration: "#E91E63", // Pink
  };

  return colors[serviceType] || "#000000";
};
