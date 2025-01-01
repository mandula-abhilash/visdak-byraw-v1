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
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
      </div>
      <div className="flex items-center gap-2">
        {showSearch && (
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search activities..."
              className="w-[200px] pl-8"
            />
          </div>
        )}
        {showFilters && (
          <div className="flex items-center gap-2">
            <Select value={selectedFilter} onValueChange={onFilterChange}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Filter by..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Activities</SelectItem>
                <SelectItem value="tasks">Tasks</SelectItem>
                <SelectItem value="payments">Payments</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
            <div className="bg-muted rounded-md p-1 flex gap-1">
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
          </div>
        )}
      </div>
    </div>
  );
};
