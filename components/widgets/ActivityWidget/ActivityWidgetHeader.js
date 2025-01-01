"use client";

import { Clock, Bell, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const ActivityWidgetHeader = ({
  title,
  selectedView,
  onViewChange,
  selectedFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
  showFilters,
  showSearch,
}) => {
  return (
    <div className="space-y-4">
      {/* Title */}
      <div className="flex items-center justify-between">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
        {/* View Toggle - Only show on desktop */}
        {showFilters && (
          <div className="hidden md:flex bg-muted rounded-md p-1 gap-1">
            <Button
              variant="ghost"
              size="icon"
              className={`h-7 w-7 ${
                selectedView === "timeline"
                  ? "bg-background shadow-sm"
                  : "hover:bg-background/50"
              }`}
              onClick={() => onViewChange("timeline")}
            >
              <Clock className="h-4 w-4" />
              <span className="sr-only">Timeline view</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`h-7 w-7 ${
                selectedView === "notifications"
                  ? "bg-background shadow-sm"
                  : "hover:bg-background/50"
              }`}
              onClick={() => onViewChange("notifications")}
            >
              <Bell className="h-4 w-4" />
              <span className="sr-only">Notifications view</span>
            </Button>
          </div>
        )}
      </div>

      {/* Controls - Stack on mobile, flex on desktop */}
      <div className="flex flex-col md:flex-row gap-3 md:items-center">
        {/* Search */}
        {showSearch && (
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search activities..."
              className="pl-8 w-full"
            />
          </div>
        )}

        {/* Controls Group */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Filter Dropdown */}
          {showFilters && (
            <Select value={selectedFilter} onValueChange={onFilterChange}>
              <SelectTrigger className="w-full sm:w-[130px]">
                <SelectValue placeholder="Filter by..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Activities</SelectItem>
                <SelectItem value="tasks">Tasks</SelectItem>
                <SelectItem value="payments">Payments</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          )}

          {/* Mobile View Toggle */}
          {showFilters && (
            <div className="md:hidden flex bg-muted rounded-md p-1 gap-1">
              <Button
                variant="ghost"
                size="icon"
                className={`flex-1 h-8 ${
                  selectedView === "timeline"
                    ? "bg-background shadow-sm"
                    : "hover:bg-background/50"
                }`}
                onClick={() => onViewChange("timeline")}
              >
                <Clock className="h-4 w-4 mr-2" />
                <span className="text-sm">Timeline</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={`flex-1 h-8 ${
                  selectedView === "notifications"
                    ? "bg-background shadow-sm"
                    : "hover:bg-background/50"
                }`}
                onClick={() => onViewChange("notifications")}
              >
                <Bell className="h-4 w-4 mr-2" />
                <span className="text-sm">Notifications</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
