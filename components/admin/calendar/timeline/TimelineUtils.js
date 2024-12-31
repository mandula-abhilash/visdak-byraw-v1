"use client";

import { MOCK_EVENTS } from "../mockData";

export const getTimelineData = () => {
  const now = new Date();
  const startOfDay = new Date(now.setHours(0, 0, 0, 0));
  const endOfDay = new Date(now.setHours(23, 59, 59, 999));
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  return {
    daily: MOCK_EVENTS.filter((event) => {
      const eventDate = new Date(event.start_time);
      return eventDate >= startOfDay && eventDate <= endOfDay;
    }).sort((a, b) => new Date(a.start_time) - new Date(b.start_time)),

    weekly: MOCK_EVENTS.filter((event) => {
      const eventDate = new Date(event.start_time);
      return eventDate >= startOfWeek && eventDate <= endOfWeek;
    }).sort((a, b) => new Date(a.start_time) - new Date(b.start_time)),

    monthly: MOCK_EVENTS.filter((event) => {
      const eventDate = new Date(event.start_time);
      return eventDate >= startOfMonth && eventDate <= endOfMonth;
    }).sort((a, b) => new Date(a.start_time) - new Date(b.start_time)),
  };
};
