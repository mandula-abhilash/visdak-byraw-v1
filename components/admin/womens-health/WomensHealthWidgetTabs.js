"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PregnancyWidgets } from "./tabs/PregnancyWidgets";
import { PeriodWidgets } from "./tabs/PeriodWidgets";
import { HealthInsightsWidgets } from "./tabs/HealthInsightsWidgets";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const WomensHealthWidgetTabs = () => {
  const [activeTab, setActiveTab] = useState("pregnancy");

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
      {/* Mobile Dropdown */}
      <div className="block md:hidden w-full relative">
        <Select value={activeTab} onValueChange={setActiveTab}>
          <SelectTrigger className="w-full py-2">
            <SelectValue>
              {activeTab === "pregnancy" && "Pregnancy"}
              {activeTab === "period" && "Period"}
              {activeTab === "insights" && "Health Insights"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent
            className="bg-secondary/50 backdrop-blur-md w-[var(--radix-select-trigger-width)] absolute left-0 cursor-pointer"
            position="popper"
            sideOffset={4}
          >
            <SelectItem value="pregnancy" className="py-2 focus:bg-primary/10">
              Pregnancy
            </SelectItem>
            <SelectItem value="period" className="py-2 focus:bg-primary/10">
              Period
            </SelectItem>
            <SelectItem value="insights" className="py-2 focus:bg-primary/10">
              Health Insights
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Desktop Tabs */}
      <TabsList className="hidden md:flex bg-transparent justify-start p-1 gap-2">
        <TabsTrigger
          value="pregnancy"
          className="rounded-md px-6 py-2 bg-muted/100 hover:bg-muted/70 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-colors"
        >
          Pregnancy
        </TabsTrigger>
        <TabsTrigger
          value="period"
          className="rounded-md px-6 py-2 bg-muted/100 hover:bg-muted/70 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-colors"
        >
          Period
        </TabsTrigger>
        <TabsTrigger
          value="insights"
          className="rounded-md px-6 py-2 bg-muted/100 hover:bg-muted/70 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-colors"
        >
          Health Insights
        </TabsTrigger>
      </TabsList>

      <TabsContent value="pregnancy" className="space-y-4 mt-4">
        <PregnancyWidgets />
      </TabsContent>

      <TabsContent value="period" className="space-y-4 mt-4">
        <PeriodWidgets />
      </TabsContent>

      <TabsContent value="insights" className="space-y-4 mt-4">
        <HealthInsightsWidgets />
      </TabsContent>
    </Tabs>
  );
};
