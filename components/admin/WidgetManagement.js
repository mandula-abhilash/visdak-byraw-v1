"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ActionButton, ActionButtonGroup } from "./ActionButtons";

export const WidgetManagement = () => {
  const [widgets] = useState([
    {
      id: 1,
      name: "Task List",
      type: "TaskWidget",
      description: "Displays user tasks and todo items",
    },
    {
      id: 2,
      name: "Calendar",
      type: "CalendarWidget",
      description: "Shows upcoming events and appointments",
    },
    {
      id: 3,
      name: "Analytics",
      type: "AnalyticsWidget",
      description: "Displays productivity metrics and charts",
    },
  ]);

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <div className="space-y-2">
            <CardTitle className="text-xl font-semibold break-words">
              Available Widgets
            </CardTitle>
            <CardDescription>
              Manage and configure dashboard widgets
            </CardDescription>
          </div>
          <Button
            variant="outline"
            className="w-full lg:w-auto shrink-0 border-primary text-primary hover:bg-primary hover:text-primary-foreground flex items-center justify-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Widget
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="md:divide-y md:divide-border">
          {widgets.map((widget) => (
            <div
              key={widget.id}
              className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 py-6 lg:py-4 first:pt-0 last:pb-0"
            >
              <div>
                <h3 className="font-medium text-lg">{widget.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {widget.description}
                </p>
                <div className="text-sm text-muted-foreground mt-1">
                  Type: {widget.type}
                </div>
              </div>
              <ActionButtonGroup>
                <ActionButton
                  icon={Settings}
                  label="Configure"
                  onClick={() => {}}
                />
                <ActionButton icon={Pencil} label="Edit" onClick={() => {}} />
                <ActionButton
                  icon={Trash2}
                  label="Delete"
                  destructive
                  onClick={() => {}}
                />
              </ActionButtonGroup>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
