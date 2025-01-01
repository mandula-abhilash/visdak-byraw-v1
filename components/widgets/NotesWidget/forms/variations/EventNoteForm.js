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
import { NoteEditor } from "../NoteEditor";
import { NoteLabels } from "../NoteLabels";
import { NoteScheduling } from "../NoteScheduling";
import { NoteRecurrence } from "../NoteRecurrence";
import { NoteMap } from "../NoteMap";
import { MapPin } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title is too long"),
  content: z.string().min(1, "Content is required"),
  location: z.string().optional(),
  coordinates: z
    .object({
      lat: z.number(),
      lng: z.number(),
    })
    .optional(),
  start_date: z.date(),
  end_date: z.date().optional(),
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

export const EventNoteForm = ({ onSubmit, onCancel }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      location: "",
      coordinates: {
        lat: 17.385,
        lng: 78.4867,
      },
      start_date: new Date(),
      end_date: null,
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

  const handleAddressSearch = async () => {
    const location = form.watch("location");
    if (!location || isSearching) return;

    setIsSearching(true);
    try {
      // Here you would typically make an API call to a geocoding service
      await new Promise((resolve) => setTimeout(resolve, 1000));
      form.setValue("coordinates", {
        lat: 17.385,
        lng: 78.4867,
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleCoordinatesChange = (coordinates) => {
    form.setValue("coordinates", coordinates);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter event title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location (Optional)</FormLabel>
              <div className="flex gap-2">
                <FormControl>
                  <Input
                    placeholder="Enter event location"
                    {...field}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddressSearch();
                      }
                    }}
                  />
                </FormControl>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAddressSearch}
                  disabled={isSearching}
                >
                  <MapPin className="h-4 w-4" />
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.watch("location") && (
          <div className="space-y-2">
            <FormLabel>Event Location Map</FormLabel>
            <NoteMap
              coordinates={form.watch("coordinates")}
              onCoordinatesChange={handleCoordinatesChange}
            />
            <div className="text-xs text-muted-foreground">
              Click on the map to update location or search by address above
            </div>
          </div>
        )}

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
          <FormLabel>Event Schedule</FormLabel>
          <NoteScheduling
            startDate={form.watch("start_date")}
            endDate={form.watch("end_date")}
            onStartDateChange={(date) => form.setValue("start_date", date)}
            onEndDateChange={(date) => form.setValue("end_date", date)}
          />
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
            {isSubmitting ? "Creating..." : "Create Event"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
