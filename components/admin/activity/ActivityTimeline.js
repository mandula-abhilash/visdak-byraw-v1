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
} from "lucide-react";
import { TimelineFilters } from "./filters/TimelineFilters";
import { generateActivityLogs } from "./utils/activityMockData";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const loader = useRef(null);

  const filterOptions = [
    { value: "all", label: "All Activities" },
    { value: "task", label: "Tasks" },
    { value: "payment", label: "Payments" },
    { value: "system", label: "System" },
    { value: "calendar", label: "Calendar" },
    { value: "document", label: "Documents" },
    { value: "message", label: "Messages" },
  ];

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

  const filterLogs = (logs) => {
    return Object.entries(logs).reduce((filtered, [date, dayLogs]) => {
      const filteredDayLogs = dayLogs.filter((log) => {
        const matchesSearch = searchQuery
          ? log.target.toLowerCase().includes(searchQuery.toLowerCase()) ||
            log.details.toLowerCase().includes(searchQuery.toLowerCase())
          : true;

        const matchesFilter =
          selectedFilter === "all" ? true : log.type === selectedFilter;

        return matchesSearch && matchesFilter;
      });

      if (filteredDayLogs.length > 0) {
        filtered[date] = filteredDayLogs;
      }

      return filtered;
    }, {});
  };

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

  const filteredLogs = filterLogs(logGroups);

  return (
    <div className="relative space-y-8">
      <TimelineFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedFilter={selectedFilter}
        onFilterChange={setSelectedFilter}
        filterOptions={filterOptions}
      />

      {Object.keys(filteredLogs).length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No activities found
        </div>
      ) : (
        Object.entries(filteredLogs).map(([date, logs], groupIndex) => (
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
        ))
      )}
      <div ref={loader} className="h-4" />
    </div>
  );
};
