"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NotesWidgetVariants } from "./NotesWidgetVariants";
import { NoteFormsTab } from "./NoteFormsTab";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const NotesWidgetTabs = () => {
  const [activeTab, setActiveTab] = useState("widgets");

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
      {/* Mobile Dropdown */}
      <div className="block md:hidden w-full relative">
        <Select value={activeTab} onValueChange={setActiveTab}>
          <SelectTrigger className="w-full py-2">
            <SelectValue>
              {activeTab === "widgets" && "Widgets"}
              {activeTab === "forms" && "Forms"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent
            className="bg-secondary/50 backdrop-blur-md w-[var(--radix-select-trigger-width)] absolute left-0 cursor-pointer"
            position="popper"
            sideOffset={4}
          >
            <SelectItem value="widgets" className="py-2 focus:bg-primary/10">
              Widgets
            </SelectItem>
            <SelectItem value="forms" className="py-2 focus:bg-primary/10">
              Forms
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Desktop Tabs */}
      <TabsList className="hidden md:flex bg-transparent justify-start p-1 gap-2">
        <TabsTrigger
          value="widgets"
          className="rounded-md px-6 py-2 bg-muted/100 hover:bg-muted/70 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-colors"
        >
          Widgets
        </TabsTrigger>
        <TabsTrigger
          value="forms"
          className="rounded-md px-6 py-2 bg-muted/100 hover:bg-muted/70 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-colors"
        >
          Forms
        </TabsTrigger>
      </TabsList>

      <TabsContent value="widgets" className="space-y-4 mt-4">
        <NotesWidgetVariants />
      </TabsContent>

      <TabsContent value="forms" className="space-y-4 mt-4">
        <NoteFormsTab />
      </TabsContent>
    </Tabs>
  );
};