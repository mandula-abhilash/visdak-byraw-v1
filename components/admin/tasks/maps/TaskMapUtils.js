"use client";

import { MOCK_TASKS } from "../mockData";

export const getTasksByLocation = () => {
  return MOCK_TASKS.map((task) => ({
    ...task,
    intensity: 1,
  }));
};

export const getTasksByPriority = () => {
  return MOCK_TASKS.filter((task) => task.priority === "high");
};

export const getTasksByStatus = (status) => {
  return MOCK_TASKS.filter((task) => task.status === status);
};

export const getTasksByServiceType = () => {
  const serviceTypes = {};
  MOCK_TASKS.forEach((task) => {
    if (!serviceTypes[task.service_type]) {
      serviceTypes[task.service_type] = [];
    }
    serviceTypes[task.service_type].push(task);
  });
  return serviceTypes;
};

export const getOverdueTasks = () => {
  return MOCK_TASKS.filter((task) => task.status === "overdue");
};

export const getTodaysTasks = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  return MOCK_TASKS.filter((task) => {
    const taskDate = new Date(task.due_date);
    return taskDate >= today && taskDate < tomorrow;
  });
};
