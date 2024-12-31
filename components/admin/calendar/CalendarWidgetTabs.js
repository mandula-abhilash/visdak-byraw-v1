"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarWidgetVariants } from "./CalendarWidgetVariants";
import { CalendarWidgetTimeline } from "./CalendarWidgetTimeline";

export const CalendarWidgetTabs = () => {
  return (
    <Tabs defaultValue="widgets" className="space-y-4">
      <TabsList className="bg-transparent justify-start p-1 gap-2">
        <TabsTrigger
          value="widgets"
          className="rounded-md px-6 py-2 bg-muted/100 hover:bg-muted/70 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-colors"
        >
          Widgets
        </TabsTrigger>
        <TabsTrigger
          value="timeline"
          className="rounded-md px-6 py-2 bg-muted/100 hover:bg-muted/70 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-colors"
        >
          Timeline
        </TabsTrigger>
      </TabsList>

      <TabsContent value="widgets" className="space-y-4 mt-4">
        <CalendarWidgetVariants />
      </TabsContent>

      <TabsContent value="timeline" className="space-y-4 mt-4">
        <CalendarWidgetTimeline />
      </TabsContent>
    </Tabs>
  );
};
