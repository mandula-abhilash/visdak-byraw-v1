"use client";

import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  CheckCircle2,
  AlertCircle,
  Bell,
  DollarSign,
  Settings,
  Clock,
  Calendar,
  FileText,
  MessageSquare,
  Upload,
  Download,
  Users,
} from "lucide-react";

// Generate activity logs with proper grouping by date
const generateActivityLogs = () => {
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

const TimelineHeader = ({ date }) => {
  const isToday =
    new Date(date).toLocaleDateString() === new Date().toLocaleDateString();

  return (
    <div className="sticky top-0 z-10 -ml-8 pl-8 -mr-4 pr-4 pb-4 pt-2 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="font-medium">
        {isToday
          ? "Today"
          : new Date(date).toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
      </div>
    </div>
  );
};

const TimelineItem = ({ log, isFirst, isLast }) => {
  const Icon = log.icon;

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <div className="relative pl-8 pb-8 last:pb-0">
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-[11px] top-2 bottom-0 w-px bg-border" />
      )}

      {/* Timeline node */}
      <div
        className={cn(
          "absolute left-0 p-1.5 rounded-full bg-background border-2",
          log.type === "task" && "border-primary",
          log.type === "payment" && "border-chart-2",
          log.type === "system" && "border-chart-3",
          log.type === "calendar" && "border-chart-4",
          log.type === "document" && "border-chart-5",
          log.type === "message" && "border-primary"
        )}
      >
        <Icon className={cn("h-3 w-3", log.iconColor)} />
      </div>

      {/* Content */}
      <div className="group">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-medium">
            {formatTime(log.timestamp)}
          </span>
          <span className="px-2 py-0.5 text-xs rounded-full bg-secondary">
            {log.category}
          </span>
        </div>

        <Card className="p-4 transition-all duration-200 group-hover:shadow-md group-hover:-translate-y-0.5">
          <div className="space-y-1">
            <div className="text-sm font-medium">{log.target}</div>
            <div className="text-sm text-muted-foreground">{log.details}</div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export const ActivityTimeline = () => {
  const [logGroups, setLogGroups] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const loader = useRef(null);

  useEffect(() => {
    const loadLogs = async () => {
      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const mockData = generateActivityLogs();
        setLogGroups(mockData);
      } finally {
        setIsLoading(false);
      }
    };

    loadLogs();
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="space-y-4">
            <div className="h-6 bg-accent/50 rounded w-32 animate-pulse" />
            <div className="space-y-4">
              {[...Array(2)].map((_, j) => (
                <Card key={j} className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="h-6 w-6 rounded-full bg-accent animate-pulse" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-accent rounded animate-pulse w-3/4" />
                      <div className="h-3 bg-accent rounded animate-pulse w-1/2" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="relative space-y-8">
      {Object.entries(logGroups).map(([date, logs], groupIndex) => (
        <div key={date} className="relative">
          <TimelineHeader date={date} />
          <div className="space-y-6">
            {logs.map((log, index) => (
              <TimelineItem
                key={log.id}
                log={log}
                isFirst={index === 0}
                isLast={index === logs.length - 1}
              />
            ))}
          </div>
        </div>
      ))}
      <div ref={loader} className="h-4" />
    </div>
  );
};
