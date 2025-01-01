"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const TimelineFilters = ({
  searchQuery,
  onSearchChange,
  selectedFilter,
  onFilterChange,
  filterOptions,
  showSearch = true,
  showFilter = true,
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-3 mb-6">
      {/* Search */}
      {showSearch && (
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search timeline..."
            className="pl-8 w-full"
          />
        </div>
      )}

      {/* Filter */}
      {showFilter && (
        <Select value={selectedFilter} onValueChange={onFilterChange}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Filter by..." />
          </SelectTrigger>
          <SelectContent>
            {filterOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
};
