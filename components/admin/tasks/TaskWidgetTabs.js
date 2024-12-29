"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TaskWidgetVariants } from "./TaskWidgetVariants";
import { TaskWidgetCharts } from "./TaskWidgetCharts";

export const TaskWidgetTabs = () => {
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
          value="charts"
          className="rounded-md px-6 py-2 bg-muted/100 hover:bg-muted/70 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-colors"
        >
          Charts & Analytics
        </TabsTrigger>
      </TabsList>

      <TabsContent value="widgets" className="space-y-4 mt-4">
        <TaskWidgetVariants />
      </TabsContent>

      <TabsContent value="charts" className="space-y-4 mt-4">
        <TaskWidgetCharts />
      </TabsContent>
    </Tabs>
  );
};
