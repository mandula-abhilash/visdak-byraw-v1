"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ActivityList } from "./ActivityList";
import { ActivityWidgetHeader } from "./ActivityWidgetHeader";
import { useActivityWidget } from "./useActivityWidget";
import { WIDGET_STYLES } from "@/lib/constants/widget-styles";

export const ActivityWidget = ({
  title = "Activity",
  view = "timeline",
  showFilters = true,
  showSearch = true,
}) => {
  const [selectedView, setSelectedView] = useState(view);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { activities, isLoading, error } = useActivityWidget();

  if (error) {
    return (
      <Card className="h-full">
        <CardContent className="pt-6">
          <div className="text-sm text-destructive">
            Error loading activities: {error.message}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full flex flex-col shadow-lg">
      <CardHeader className="pb-3 flex-none border-b">
        <ActivityWidgetHeader
          title={title}
          selectedView={selectedView}
          onViewChange={setSelectedView}
          selectedFilter={selectedFilter}
          onFilterChange={setSelectedFilter}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          showFilters={showFilters}
          showSearch={showSearch}
        />
      </CardHeader>
      <CardContent
        className="flex-1 p-4 overflow-y-auto"
        style={{
          minHeight: WIDGET_STYLES.MIN_HEIGHT,
          maxHeight: WIDGET_STYLES.MAX_HEIGHT,
        }}
      >
        <div className="h-full">
          <ActivityList
            activities={activities}
            isLoading={isLoading}
            view={selectedView}
            filter={selectedFilter}
            searchQuery={searchQuery}
          />
        </div>
      </CardContent>
    </Card>
  );
};
