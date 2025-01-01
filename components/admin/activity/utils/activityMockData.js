"use client";

import {
  CheckCircle2,
  DollarSign,
  Settings,
  Calendar,
  FileText,
  MessageSquare,
} from "lucide-react";

// Generate activity logs with proper grouping by date
export const generateActivityLogs = () => {
  const logs = [];
  const now = new Date();
  const types = [
    { type: "task", icon: CheckCircle2, color: "text-primary" },
    { type: "payment", icon: DollarSign, color: "text-chart-2" },
    { type: "system", icon: Settings, color: "text-chart-3" },
    { type: "calendar", icon: Calendar, color: "text-chart-4" },
    { type: "document", icon: FileText, color: "text-chart-5" },
    { type: "message", icon: MessageSquare, color: "text-primary" },
  ];

  const actions = [
    // Task actions
    { type: "task", action: "completed", target: "Project Milestone" },
    { type: "task", action: "updated", target: "Bug Fix #123" },
    { type: "task", action: "created", target: "New Feature Implementation" },

    // Calendar actions
    { type: "calendar", action: "scheduled", target: "Team Meeting" },
    { type: "calendar", action: "rescheduled", target: "Client Call" },
    { type: "calendar", action: "cancelled", target: "Project Review" },

    // Document actions
    { type: "document", action: "uploaded", target: "Project Proposal.pdf" },
    { type: "document", action: "edited", target: "Meeting Notes" },
    { type: "document", action: "shared", target: "Budget Report" },

    // Message actions
    { type: "message", action: "sent", target: "Project Update" },
    { type: "message", action: "received", target: "Client Feedback" },
    { type: "message", action: "mentioned", target: "Design Review Thread" },
  ];

  // Generate 25 random logs
  for (let i = 0; i < 25; i++) {
    const randomAction = actions[Math.floor(Math.random() * actions.length)];
    const typeInfo = types.find((t) => t.type === randomAction.type);
    const timestamp = new Date(now - Math.random() * 7 * 24 * 60 * 60 * 1000);

    logs.push({
      id: i + 1,
      type: randomAction.type,
      icon: typeInfo.icon,
      iconColor: typeInfo.color,
      action: randomAction.action,
      target: randomAction.target,
      timestamp: timestamp.toISOString(),
      details: `${randomAction.action} ${randomAction.target}`,
      category:
        randomAction.type.charAt(0).toUpperCase() + randomAction.type.slice(1),
    });
  }

  // Sort by date and group by day
  return logs
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .reduce((groups, log) => {
      const date = new Date(log.timestamp).toLocaleDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(log);
      return groups;
    }, {});
};
