"use client";

import { MOCK_EVENTS } from "../mockData";

export const getEventDistributionStats = () => {
  const stats = {
    upcoming: 0,
    ongoing: 0,
    completed: 0,
    cancelled: 0,
  };

  MOCK_EVENTS.forEach((event) => {
    stats[event.status]++;
  });

  return Object.entries(stats).map(([label, value]) => ({
    label: label.charAt(0).toUpperCase() + label.slice(1),
    value,
  }));
};

export const getEventTypeStats = () => {
  const stats = {
    meeting: 0,
    appointment: 0,
    reminder: 0,
    deadline: 0,
    other: 0,
  };

  MOCK_EVENTS.forEach((event) => {
    if (event.type) {
      stats[event.type.toLowerCase()]++;
    } else {
      stats.other++;
    }
  });

  return Object.entries(stats).map(([label, value]) => ({
    label: label.charAt(0).toUpperCase() + label.slice(1),
    value,
  }));
};

export const getEventsByDayStats = () => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const stats = days.reduce((acc, day) => ({ ...acc, [day]: 0 }), {});

  MOCK_EVENTS.forEach((event) => {
    const day = new Date(event.start_time).getDay();
    stats[days[day]]++;
  });

  return Object.entries(stats).map(([label, value]) => ({
    label,
    value,
  }));
};

export const getEventsByTimeStats = () => {
  const timeSlots = [
    "Morning (6-12)",
    "Afternoon (12-17)",
    "Evening (17-22)",
    "Night (22-6)",
  ];
  const stats = timeSlots.reduce((acc, slot) => ({ ...acc, [slot]: 0 }), {});

  MOCK_EVENTS.forEach((event) => {
    const hour = new Date(event.start_time).getHours();
    if (hour >= 6 && hour < 12) stats["Morning (6-12)"]++;
    else if (hour >= 12 && hour < 17) stats["Afternoon (12-17)"]++;
    else if (hour >= 17 && hour < 22) stats["Evening (17-22)"]++;
    else stats["Night (22-6)"]++;
  });

  return Object.entries(stats).map(([label, value]) => ({
    label,
    value,
  }));
};

export const getEventsByMonthStats = () => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const stats = months.reduce((acc, month) => ({ ...acc, [month]: 0 }), {});

  MOCK_EVENTS.forEach((event) => {
    const month = new Date(event.start_time).getMonth();
    stats[months[month]]++;
  });

  return Object.entries(stats).map(([label, value]) => ({
    label,
    value,
  }));
};

export const getEventsByStatusStats = () => {
  const stats = {
    upcoming: 0,
    ongoing: 0,
    completed: 0,
    cancelled: 0,
  };

  MOCK_EVENTS.forEach((event) => {
    stats[event.status]++;
  });

  return Object.entries(stats).map(([label, value]) => ({
    label: label.charAt(0).toUpperCase() + label.slice(1),
    value,
  }));
};
