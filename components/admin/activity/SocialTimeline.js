"use client";

import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
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
import { TimelineFilters } from "./filters/TimelineFilters";
import { generatePersonalLogs } from "./utils/socialMockData";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const loader = useRef(null);

  const filterOptions = [
    { value: "all", label: "All Activities" },
    { value: "work", label: "Work" },
    { value: "learning", label: "Learning" },
    { value: "health", label: "Health" },
    { value: "reflection", label: "Reflection" },
    { value: "personal", label: "Personal" },
  ];

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

  const filterLogs = (logs) => {
    return Object.entries(logs).reduce((filtered, [date, dayLogs]) => {
      const filteredDayLogs = dayLogs.filter((log) => {
        const matchesSearch = searchQuery
          ? log.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (log.notes?.toLowerCase().includes(searchQuery.toLowerCase()) ??
              false)
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

  const filteredLogs = filterLogs(logGroups);

  return (
    <div className="relative space-y-6">
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
        Object.entries(filteredLogs).map(([date, logs]) => (
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
        ))
      )}
      <div ref={loader} className="h-4" />
    </div>
  );
};
