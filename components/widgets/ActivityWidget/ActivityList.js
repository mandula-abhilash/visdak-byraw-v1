"use client";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  AlertCircle,
  Bell,
  DollarSign,
  Settings,
  Clock,
} from "lucide-react";

const ActivityItem = ({ activity }) => {
  const getIcon = () => {
    switch (activity.type) {
      case "task":
        return activity.status === "completed" ? (
          <CheckCircle2 className="h-4 w-4 text-primary" />
        ) : (
          <Clock className="h-4 w-4 text-muted-foreground" />
        );
      case "payment":
        return <DollarSign className="h-4 w-4 text-chart-2" />;
      case "system":
        return <Settings className="h-4 w-4 text-chart-3" />;
      case "notification":
        return <Bell className="h-4 w-4 text-chart-4" />;
      case "alert":
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      default:
        return null;
    }
  };

  const getStatusColor = () => {
    switch (activity.status) {
      case "completed":
        return "bg-primary/10 text-primary border-primary/20";
      case "pending":
        return "bg-chart-5/10 text-chart-5 border-chart-5/20";
      case "overdue":
        return "bg-destructive/10 text-destructive border-destructive/20";
      default:
        return "bg-muted text-muted-foreground border-muted";
    }
  };

  return (
    <div className="flex items-start gap-3 rounded-lg border p-3 hover:bg-accent/50 transition-colors">
      <div className="pt-0.5">{getIcon()}</div>
      <div className="flex-1 space-y-1">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-sm font-medium leading-none">{activity.title}</p>
            <p className="text-sm text-muted-foreground mt-1">
              {activity.description}
            </p>
          </div>
          {activity.status && (
            <Badge
              variant="outline"
              className={cn("ml-2 px-2", getStatusColor())}
            >
              {activity.status}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{activity.timestamp}</span>
          {activity.user && (
            <>
              <span>•</span>
              <span>{activity.user}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export const ActivityList = ({
  activities = [],
  isLoading,
  view,
  filter,
  searchQuery,
}) => {
  if (isLoading) {
    return (
      <div className="space-y-2 pb-6">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="h-[80px] rounded-lg bg-accent/50 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (!activities.length) {
    return (
      <div className="py-6 text-center text-sm text-muted-foreground">
        No activities found
      </div>
    );
  }

  // Filter activities
  let filteredActivities = activities;
  if (filter !== "all") {
    filteredActivities = activities.filter(
      (activity) => activity.type === filter
    );
  }

  // Apply search
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredActivities = filteredActivities.filter(
      (activity) =>
        activity.title.toLowerCase().includes(query) ||
        activity.description.toLowerCase().includes(query)
    );
  }

  return (
    <div className="space-y-2 pb-6">
      {filteredActivities.map((activity) => (
        <ActivityItem key={activity.id} activity={activity} />
      ))}
    </div>
  );
};
