"use client";

import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  CheckCircle2,
  Book,
  Brain,
  Coffee,
  Dumbbell,
  Pencil,
  Heart,
  Laptop,
  BookOpen,
  Briefcase,
  Clock,
  Calendar,
} from "lucide-react";

// Generate personal activity logs with proper date handling
const generatePersonalLogs = () => {
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

const TimelineHeader = ({ date }) => {
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const isToday = date === today;

  return (
    <div className="sticky top-0 z-10 -mx-4 px-4 py-3 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">{isToday ? "Today" : date}</h3>
        <div className="text-sm text-muted-foreground">
          <Calendar className="h-4 w-4 inline-block mr-2" />
          {new Date(date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </div>
      </div>
    </div>
  );
};

const TimelineItem = ({ log, isFirst, isLast }) => {
  const Icon = log.icon;

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) return "Invalid time";

    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
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
          log.type === "work" && "border-primary",
          log.type === "learning" && "border-chart-2",
          log.type === "health" && "border-chart-3",
          log.type === "reflection" && "border-chart-4",
          log.type === "personal" && "border-chart-5"
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
          <span className="text-lg">{log.mood}</span>
        </div>

        <Card className="p-4 transition-all duration-200 group-hover:shadow-md group-hover:-translate-y-0.5">
          <div className="space-y-2">
            <p className="text-sm">{log.content}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1">
              {log.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Additional Notes */}
            {log.notes && (
              <div className="mt-3 text-sm text-muted-foreground border-l-2 border-muted pl-3">
                {log.notes}
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export const SocialTimeline = () => {
  const [logGroups, setLogGroups] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const loader = useRef(null);

  useEffect(() => {
    const loadLogs = async () => {
      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const mockData = generatePersonalLogs();
        setLogGroups(mockData);
      } finally {
        setIsLoading(false);
      }
    };

    loadLogs();
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="p-4">
            <div className="flex items-center gap-4 mb-3">
              <div className="h-8 w-8 rounded-full bg-accent animate-pulse" />
              <div className="flex-1">
                <div className="h-4 bg-accent rounded animate-pulse w-1/4" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-accent rounded animate-pulse w-3/4" />
              <div className="h-4 bg-accent rounded animate-pulse w-1/2" />
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="relative space-y-6">
      {Object.entries(logGroups).map(([date, logs]) => (
        <div key={date} className="relative">
          <TimelineHeader date={date} />
          <div className="space-y-6 mt-4">
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
