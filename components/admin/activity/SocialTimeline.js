"use client";

import { useState, useEffect, useRef } from "react";
import { TimelineHeader } from "./timeline/TimelineHeader";
import { SocialTimelineItem } from "./timeline/SocialTimelineItem";
import { TimelineFilters } from "./filters/TimelineFilters";
import { generatePersonalLogs } from "./utils/socialMockData";

export const SocialTimeline = () => {
  const [logGroups, setLogGroups] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedMonth, setSelectedMonth] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");
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
      const logDate = new Date(date);

      // Apply date filters
      const matchesMonth =
        selectedMonth === "all" ||
        logDate.getMonth() === parseInt(selectedMonth);
      const matchesYear =
        selectedYear === "all" ||
        logDate.getFullYear() === parseInt(selectedYear);

      if (!matchesMonth || !matchesYear) return filtered;

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
          <div
            key={i}
            className="h-[100px] rounded-lg bg-accent/50 animate-pulse"
          />
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
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        onMonthChange={setSelectedMonth}
        onYearChange={setSelectedYear}
      />

      {Object.entries(filteredLogs).map(([date, logs]) => (
        <div key={date} className="relative">
          <TimelineHeader date={date} />
          <div className="space-y-6 mt-4">
            {logs.map((log, index) => (
              <SocialTimelineItem
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
