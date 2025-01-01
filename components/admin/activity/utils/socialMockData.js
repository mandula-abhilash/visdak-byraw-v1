"use client";

import { Briefcase, BookOpen, Dumbbell, Brain, Heart } from "lucide-react";

// Generate personal activity logs with proper date handling
export const generatePersonalLogs = () => {
  const categories = [
    {
      type: "work",
      icon: Briefcase,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      type: "learning",
      icon: BookOpen,
      color: "text-chart-2",
      bgColor: "bg-chart-2/10",
    },
    {
      type: "health",
      icon: Dumbbell,
      color: "text-chart-3",
      bgColor: "bg-chart-3/10",
    },
    {
      type: "reflection",
      icon: Brain,
      color: "text-chart-4",
      bgColor: "bg-chart-4/10",
    },
    {
      type: "personal",
      icon: Heart,
      color: "text-chart-5",
      bgColor: "bg-chart-5/10",
    },
  ];

  const activities = [
    {
      type: "work",
      entries: [
        "Completed project milestone ahead of schedule",
        "Resolved critical bug in production",
        "Led team meeting and set quarterly goals",
        "Implemented new feature for client",
      ],
    },
    {
      type: "learning",
      entries: [
        "Studied advanced React patterns",
        "Completed chapter on system design",
        "Practiced algorithm challenges",
        "Watched tech conference talks",
      ],
    },
    {
      type: "health",
      entries: [
        "Morning workout: 5km run",
        "Meditation session - 20 minutes",
        "Meal prep for the week",
        "Evening yoga session",
      ],
    },
    {
      type: "reflection",
      entries: [
        "Weekly goal review and planning",
        "Journaled about recent challenges",
        "Brainstormed solutions for project bottlenecks",
        "Reviewed personal growth objectives",
      ],
    },
    {
      type: "personal",
      entries: [
        "Read 30 pages of current book",
        "Family video call",
        "Practiced guitar",
        "Organized home office",
      ],
    },
  ];

  const logs = [];
  const now = new Date();

  // Generate 20 detailed logs with proper timestamps
  for (let i = 0; i < 20; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const activitySet = activities.find((a) => a.type === category.type);
    const entry =
      activitySet.entries[
        Math.floor(Math.random() * activitySet.entries.length)
      ];

    // Generate timestamp within the last 7 days
    const timestamp = new Date(
      now.getTime() - Math.random() * 7 * 24 * 60 * 60 * 1000
    );

    // Ensure valid date by setting hours/minutes
    timestamp.setHours(Math.floor(Math.random() * 24));
    timestamp.setMinutes(Math.floor(Math.random() * 60));

    logs.push({
      id: i + 1,
      type: category.type,
      icon: category.icon,
      iconColor: category.color,
      bgColor: category.bgColor,
      content: entry,
      timestamp: timestamp.toISOString(),
      mood: ["😊", "🤔", "💪", "🎯", "✨"][Math.floor(Math.random() * 5)],
      tags: [
        category.type,
        timestamp.getHours() < 12 ? "morning" : "afternoon",
      ],
      notes:
        Math.random() > 0.7
          ? "Additional reflection or thoughts about this activity..."
          : null,
    });
  }

  // Sort by date (newest first) and group by day
  return logs
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .reduce((groups, log) => {
      const date = new Date(log.timestamp).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(log);
      return groups;
    }, {});
};
