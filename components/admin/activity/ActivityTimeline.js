"use client";

import { useState, useEffect, useRef } from "react";
import { TimelineHeader } from "./timeline/TimelineHeader";
import { TimelineItem } from "./timeline/TimelineItem";
import { TimelineFilters } from "./filters/TimelineFilters";
import { generateActivityLogs } from "./utils/activityMockData";

export const ActivityTimeline = () => {
  const [logGroups, setLogGroups] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedMonth, setSelectedMonth] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");
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
                <div
                  key={j}
                  className="h-[80px] rounded-lg bg-accent/50 animate-pulse"
                />
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
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        onMonthChange={setSelectedMonth}
        onYearChange={setSelectedYear}
      />

      {Object.entries(filteredLogs).map(([date, logs], groupIndex) => (
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
