"use client";

import { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NoteEditor } from "../NoteEditor";
import { NoteLabels } from "../NoteLabels";
import { NoteScheduling } from "../NoteScheduling";
import { NoteRecurrence } from "../NoteRecurrence";

const formSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title is too long"),
  content: z.string().min(1, "Content is required"),
  priority: z.enum(["low", "medium", "high"]),
  reminder_date: z.date(),
  notification_type: z.enum(["email", "push", "both"]),
  advance_notice: z.object({
    value: z.number().min(1).max(60),
    unit: z.enum(["minutes", "hours", "days"]),
  }),
  labels: z.array(z.string()).optional(),
  recurrence: z
    .object({
      enabled: z.boolean(),
      frequency: z.enum(["daily", "weekly", "monthly", "yearly"]).optional(),
      interval: z.number().min(1).max(365).optional(),
      ends: z.enum(["never", "after", "on"]).optional(),
      count: z.number().min(1).max(999).optional(),
      until: z.date().optional(),
    })
    .optional(),
});

export const ReminderNoteForm = ({ onSubmit, onCancel }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      priority: "medium",
      reminder_date: new Date(),
      notification_type: "both",
      advance_notice: {
        value: 15,
        unit: "minutes",
      },
      labels: [],
      recurrence: {
        enabled: false,
      },
    },
  });

  const handleSubmit = async (data) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      await onSubmit(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reminder Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter reminder title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Priority</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <NoteEditor {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <FormLabel>Reminder Date & Time</FormLabel>
          <NoteScheduling
            startDate={form.watch("reminder_date")}
            onStartDateChange={(date) => form.setValue("reminder_date", date)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="notification_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notification Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select notification type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="push">Push Notification</SelectItem>
                    <SelectItem value="both">Both</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-2">
            <FormLabel>Advance Notice</FormLabel>
            <div className="flex gap-2">
              <Input
                type="number"
                min="1"
                max="60"
                value={form.watch("advance_notice.value")}
                onChange={(e) =>
                  form.setValue(
                    "advance_notice.value",
                    parseInt(e.target.value, 10)
                  )
                }
                className="w-20"
              />
              <Select
                value={form.watch("advance_notice.unit")}
                onValueChange={(value) =>
                  form.setValue("advance_notice.unit", value)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="minutes">Minutes</SelectItem>
                  <SelectItem value="hours">Hours</SelectItem>
                  <SelectItem value="days">Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <FormLabel>Recurrence</FormLabel>
          <NoteRecurrence
            value={form.watch("recurrence")}
            onChange={(value) => form.setValue("recurrence", value)}
          />
        </div>

        <FormField
          control={form.control}
          name="labels"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Labels (Optional)</FormLabel>
              <FormControl>
                <NoteLabels value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            type="submit"
            className={isSubmitting ? "opacity-50 cursor-not-allowed" : ""}
          >
            {isSubmitting ? "Creating..." : "Create Reminder"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
