"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

export const AdminNavigation = ({ activeTab, onTabChange }) => {
  return (
    <>
      {/* Mobile Dropdown */}
      <div className="block md:hidden w-full relative">
        <Select value={activeTab} onValueChange={onTabChange}>
          <SelectTrigger className="w-full py-2">
            <SelectValue>
              {activeTab === "roles" && "Global Roles"}
              {activeTab === "organizations" && "Organizations"}
              {activeTab === "overrides" && "User Overrides"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent
            className="bg-secondary/50 backdrop-blur-md w-[var(--radix-select-trigger-width)] absolute left-0 cursor-pointer"
            position="popper"
            sideOffset={4}
          >
            <SelectItem value="roles" className="py-2 focus:bg-primary/10">
              Global Roles
            </SelectItem>
            <SelectItem
              value="organizations"
              className="py-2 focus:bg-primary/10"
            >
              Organizations
            </SelectItem>
            <SelectItem value="overrides" className="py-2 focus:bg-primary/10">
              User Overrides
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Desktop Tabs */}
      <TabsList className="hidden md:flex bg-transparent justify-start p-1 gap-2">
        <TabsTrigger
          value="roles"
          className="rounded-md px-6 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-colors"
        >
          Global Roles
        </TabsTrigger>
        <TabsTrigger
          value="organizations"
          className="rounded-md px-6 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-colors"
        >
          Organizations
        </TabsTrigger>
        <TabsTrigger
          value="overrides"
          className="rounded-md px-6 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-colors"
        >
          User Overrides
        </TabsTrigger>
      </TabsList>
    </>
  );
};