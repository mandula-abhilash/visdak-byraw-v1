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
import { NoteMap } from "../NoteMap";
import { MapPin } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title is too long"),
  content: z.string().min(1, "Content is required"),
  address: z.string().min(1, "Address is required"),
  coordinates: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
  labels: z.array(z.string()).optional(),
});

export const LocationNoteForm = ({ onSubmit, onCancel }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      address: "",
      coordinates: {
        lat: 17.385,
        lng: 78.4867,
      },
      labels: [],
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
    const address = form.watch("address");
    if (!address || isSearching) return;

    setIsSearching(true);
    try {
      // Here you would typically make an API call to a geocoding service
      // For now, we'll simulate with dummy coordinates
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
              <FormLabel>Location Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter location title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <div className="flex gap-2">
                <FormControl>
                  <Input
                    placeholder="Enter address"
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

        <div className="space-y-2">
          <FormLabel>Location Map</FormLabel>
          <NoteMap
            coordinates={form.watch("coordinates")}
            onCoordinatesChange={handleCoordinatesChange}
          />
          <div className="text-xs text-muted-foreground">
            Click on the map to update location or search by address above
          </div>
        </div>

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
            {isSubmitting ? "Creating..." : "Create Location Note"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
