"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AVAILABLE_ICONS = [
  "Home",
  "LayoutDashboard",
  "Calendar",
  "Settings",
  "Users",
  "FileText",
  "BarChart",
];

export const SidebarBuilder = ({ form }) => {
  const items = form.watch("configuration.sidebar.items") || [];
  const { errors } = form.formState;

  const addItem = () => {
    const newItem = {
      label: "",
      route: "",
      icon: "",
      enabled: true,
    };
    form.setValue("configuration.sidebar.items", [...items, newItem]);
  };

  const removeItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    form.setValue("configuration.sidebar.items", newItems);
  };

  const updateItem = (index, field, value) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    form.setValue("configuration.sidebar.items", newItems);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Sidebar Items</h3>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addItem}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Item
        </Button>
      </div>

      <div className="space-y-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex flex-col gap-4 p-4 border rounded-lg relative"
          >
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2"
              onClick={() => removeItem(index)}
            >
              <X className="h-4 w-4" />
            </Button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Label *</label>
                <Input
                  value={item.label}
                  onChange={(e) => updateItem(index, "label", e.target.value)}
                  placeholder="Menu item label"
                  className={
                    errors?.configuration?.sidebar?.items?.[index]?.label
                      ? "border-red-500"
                      : ""
                  }
                />
                {errors?.configuration?.sidebar?.items?.[index]?.label && (
                  <p className="text-sm text-red-500">Label is required</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Route *</label>
                <Input
                  value={item.route}
                  onChange={(e) => updateItem(index, "route", e.target.value)}
                  placeholder="/dashboard"
                  className={
                    errors?.configuration?.sidebar?.items?.[index]?.route
                      ? "border-red-500"
                      : ""
                  }
                />
                {errors?.configuration?.sidebar?.items?.[index]?.route && (
                  <p className="text-sm text-red-500">Route is required</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Icon *</label>
                <Select
                  value={item.icon}
                  onValueChange={(value) => updateItem(index, "icon", value)}
                >
                  <SelectTrigger
                    className={
                      errors?.configuration?.sidebar?.items?.[index]?.icon
                        ? "border-red-500"
                        : ""
                    }
                  >
                    <SelectValue placeholder="Select icon" />
                  </SelectTrigger>
                  <SelectContent>
                    {AVAILABLE_ICONS.map((icon) => (
                      <SelectItem key={icon} value={icon}>
                        {icon}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors?.configuration?.sidebar?.items?.[index]?.icon && (
                  <p className="text-sm text-red-500">Icon is required</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Enabled</label>
                <div className="pt-2">
                  <Switch
                    checked={item.enabled}
                    onCheckedChange={(checked) =>
                      updateItem(index, "enabled", checked)
                    }
                    className="bg-secondary data-[state=checked]:bg-primary"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
