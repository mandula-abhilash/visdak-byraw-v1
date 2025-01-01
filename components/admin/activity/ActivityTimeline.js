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
  Lock,
  Unlock,
  Star,
} from "lucide-react";

// Generate more realistic mock data
const generateMockActivities = () => {
  const activities = [];
  const now = new Date();
  const types = [
    "task",
    "payment",
    "system",
    "notification",
    "alert",
    "calendar",
    "document",
    "comment",
    "upload",
    "download",
    "team",
    "security",
  ];
  const users = [
    "Alice Baker",
    "Bob Johnson",
    "Carol White",
    "David Brown",
    "Emma Davis",
    "Frank Miller",
    "Grace Wilson",
    "Henry Taylor",
  ];

  for (let i = 0; i < 25; i++) {
    const type = types[Math.floor(Math.random() * types.length)];
    const timestamp = new Date(now - Math.random() * 7 * 24 * 60 * 60 * 1000);
    const user = users[Math.floor(Math.random() * users.length)];

    let activity = {
      id: i + 1,
      type,
      user,
      timestamp: timestamp.toISOString(),
    };

    switch (type) {
      case "task":
        activity = {
          ...activity,
          title: "Task Update",
          description: `${user} ${
            Math.random() > 0.5 ? "completed" : "updated"
          } the task "${
            [
              "Website Redesign",
              "Bug Fix",
              "Feature Implementation",
              "Code Review",
            ][Math.floor(Math.random() * 4)]
          }"`,
          status: Math.random() > 0.5 ? "completed" : "pending",
        };
        break;
      case "payment":
        activity = {
          ...activity,
          title: "Payment Transaction",
          description: `${
            Math.random() > 0.5 ? "Received" : "Sent"
          } payment of $${Math.floor(Math.random() * 1000) + 100} ${
            Math.random() > 0.5 ? "from" : "to"
          } Client XYZ`,
          status: "completed",
        };
        break;
      case "calendar":
        activity = {
          ...activity,
          title: "Calendar Event",
          description: `${user} ${
            Math.random() > 0.5 ? "scheduled" : "updated"
          } meeting: "${
            [
              "Team Sync",
              "Client Presentation",
              "Project Review",
              "Sprint Planning",
            ][Math.floor(Math.random() * 4)]
          }"`,
        };
        break;
      case "document":
        activity = {
          ...activity,
          title: "Document Activity",
          description: `${user} ${
            Math.random() > 0.5 ? "created" : "modified"
          } document: "${
            [
              "Project Proposal",
              "Technical Spec",
              "Meeting Notes",
              "Status Report",
            ][Math.floor(Math.random() * 4)]
          }"`,
        };
        break;
      case "comment":
        activity = {
          ...activity,
          title: "New Comment",
          description: `${user} commented on ${
            ["task", "document", "project", "issue"][
              Math.floor(Math.random() * 4)
            ]
          }: "Great work on this!"`,
        };
        break;
      case "system":
        activity = {
          ...activity,
          title: "System Update",
          description: `${
            [
              "New feature deployed",
              "System maintenance completed",
              "Performance optimization",
              "Security update installed",
            ][Math.floor(Math.random() * 4)]
          }`,
        };
        break;
      case "team":
        activity = {
          ...activity,
          title: "Team Update",
          description: `${user} ${
            [
              "joined the team",
              "updated team settings",
              "modified team permissions",
              "invited new member",
            ][Math.floor(Math.random() * 4)]
          }`,
        };
        break;
      case "security":
        activity = {
          ...activity,
          title: "Security Alert",
          description: `${
            [
              "New login detected",
              "Password changed",
              "Two-factor authentication enabled",
              "Security settings updated",
            ][Math.floor(Math.random() * 4)]
          }`,
          status: Math.random() > 0.7 ? "alert" : "completed",
        };
        break;
    }

    activities.push(activity);
  }

  return activities.sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );
};

const TimelineItem = ({ activity }) => {
  const getIcon = () => {
    switch (activity.type) {
      case "task":
        return activity.status === "completed" ? (
          <CheckCircle2 className="h-5 w-5 text-primary" />
        ) : (
          <Clock className="h-5 w-5 text-muted-foreground" />
        );
      case "payment":
        return <DollarSign className="h-5 w-5 text-chart-2" />;
      case "system":
        return <Settings className="h-5 w-5 text-chart-3" />;
      case "notification":
        return <Bell className="h-5 w-5 text-chart-4" />;
      case "alert":
        return <AlertCircle className="h-5 w-5 text-destructive" />;
      case "calendar":
        return <Calendar className="h-5 w-5 text-primary" />;
      case "document":
        return <FileText className="h-5 w-5 text-chart-2" />;
      case "comment":
        return <MessageSquare className="h-5 w-5 text-chart-3" />;
      case "upload":
        return <Upload className="h-5 w-5 text-chart-4" />;
      case "download":
        return <Download className="h-5 w-5 text-chart-5" />;
      case "team":
        return <Users className="h-5 w-5 text-primary" />;
      case "security":
        return activity.status === "alert" ? (
          <Unlock className="h-5 w-5 text-destructive" />
        ) : (
          <Lock className="h-5 w-5 text-chart-4" />
        );
      default:
        return <Star className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusColor = () => {
    switch (activity.status) {
      case "completed":
        return "bg-primary/10 text-primary border-primary/20";
      case "pending":
        return "bg-chart-5/10 text-chart-5 border-chart-5/20";
      case "alert":
        return "bg-destructive/10 text-destructive border-destructive/20";
      default:
        return "bg-muted text-muted-foreground border-muted";
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 60) {
      return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
    } else if (hours < 24) {
      return `${hours} hour${hours === 1 ? "" : "s"} ago`;
    } else {
      return `${days} day${days === 1 ? "" : "s"} ago`;
    }
  };

  return (
    <div className="relative pb-8">
      {/* Timeline line */}
      <div className="absolute left-5 top-5 -bottom-3 w-px bg-border" />

      <div className="relative flex items-start space-x-3">
        {/* Icon */}
        <div className="relative">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-background border shadow-sm">
            {getIcon()}
          </div>
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="bg-background rounded-lg border shadow-sm p-4">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <h3 className="font-medium">{activity.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {activity.description}
                </p>
              </div>
              {activity.status && (
                <div
                  className={cn(
                    "px-2.5 py-0.5 rounded-full text-xs font-medium",
                    getStatusColor()
                  )}
                >
                  {activity.status}
                </div>
              )}
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              <span>{formatDate(activity.timestamp)}</span>
              {activity.user && (
                <>
                  <span className="mx-1">•</span>
                  <span>{activity.user}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ActivityTimeline = () => {
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const loader = useRef(null);

  useEffect(() => {
    const loadActivities = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const mockData = generateMockActivities();
        setActivities(mockData);
      } finally {
        setIsLoading(false);
      }
    };

    loadActivities();
  }, []);

  // Infinite scroll handler
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => observer.disconnect();
  }, [hasMore, isLoading]);

  if (isLoading && !activities.length) {
    return (
      <div className="space-y-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="flex items-start space-x-3">
              <div className="h-10 w-10 rounded-full bg-accent" />
              <div className="flex-1 space-y-2">
                <div className="h-24 rounded-lg bg-accent" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <Card className="p-6">
      <div className="space-y-8">
        {activities.map((activity) => (
          <TimelineItem key={activity.id} activity={activity} />
        ))}
        <div ref={loader} className="h-4" />
      </div>
    </Card>
  );
};
