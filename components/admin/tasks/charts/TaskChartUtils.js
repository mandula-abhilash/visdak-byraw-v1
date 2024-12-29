"use client";

import { MOCK_TASKS } from "../mockData";

export const getTaskCompletionStats = () => {
  const stats = {
    completed: 0,
    pending: 0,
    "in progress": 0,
    overdue: 0,
  };

  MOCK_TASKS.forEach((task) => {
    stats[task.status]++;
  });

  return Object.entries(stats).map(([label, value]) => ({
    label: label.charAt(0).toUpperCase() + label.slice(1),
    value,
  }));
};

export const getTaskPriorityStats = () => {
  const stats = {
    high: 0,
    medium: 0,
    low: 0,
  };

  MOCK_TASKS.forEach((task) => {
    if (task.priority) {
      stats[task.priority]++;
    }
  });

  return Object.entries(stats).map(([label, value]) => ({
    label: label.charAt(0).toUpperCase() + label.slice(1),
    value,
  }));
};

export const getOverdueTaskStats = () => {
  return MOCK_TASKS.filter((task) => task.status === "overdue")
    .map((task) => ({
      label: task.title,
      value: task.overdue_days || 0,
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);
};

export const getTasksDueToday = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const stats = {
    high: 0,
    medium: 0,
    low: 0,
  };

  MOCK_TASKS.forEach((task) => {
    const dueDate = new Date(task.due_date);
    if (dueDate >= today && dueDate < tomorrow && task.priority) {
      stats[task.priority]++;
    }
  });

  return Object.entries(stats).map(([label, value]) => ({
    label: label.charAt(0).toUpperCase() + label.slice(1),
    value,
  }));
};

export const getCompletedTasksByPriority = () => {
  const stats = {
    high: 0,
    medium: 0,
    low: 0,
  };

  MOCK_TASKS.forEach((task) => {
    if (task.status === "completed" && task.priority) {
      stats[task.priority]++;
    }
  });

  return Object.entries(stats).map(([label, value]) => ({
    label: label.charAt(0).toUpperCase() + label.slice(1),
    value,
  }));
};

export const getUpcomingTasksTimeline = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const nextWeek = new Date(today);
  nextWeek.setDate(nextWeek.getDate() + 7);

  const timeline = {};

  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);
    timeline[date.toISOString().split("T")[0]] = 0;
  }

  MOCK_TASKS.forEach((task) => {
    const dueDate = task.due_date.split("T")[0];
    if (timeline[dueDate] !== undefined) {
      timeline[dueDate]++;
    }
  });

  return Object.entries(timeline).map(([date, count]) => ({
    label: new Date(date).toLocaleDateString("en-US", { weekday: "short" }),
    value: count,
  }));
};

export const getHighPriorityOverview = () => {
  const stats = {
    completed: 0,
    "in progress": 0,
    pending: 0,
    overdue: 0,
  };

  MOCK_TASKS.forEach((task) => {
    if (task.priority === "high") {
      stats[task.status]++;
    }
  });

  return Object.entries(stats).map(([label, value]) => ({
    label: label.charAt(0).toUpperCase() + label.slice(1),
    value,
  }));
};
