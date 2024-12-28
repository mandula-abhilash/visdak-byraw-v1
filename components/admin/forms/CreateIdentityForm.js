"use client";

import { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  label: z
    .string()
    .trim()
    .min(1, "Identity label is required")
    .max(50, "Identity label cannot exceed 50 characters")
    .regex(
      /^[a-zA-Z\s]+$/,
      "Identity label can only contain letters and spaces"
    ),
  details: z
    .string()
    .trim()
    .max(200, "Details cannot exceed 200 characters")
    .optional(),
});

export const CreateIdentityForm = ({ onSubmit, onCancel }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      label: "",
      details: "",
    },
    mode: "onChange",
  });

  const { formState, watch } = form;
  const { isValid } = formState;
  const label = watch("label");

  const isFormValid = isValid && label?.trim();

  const handleSubmit = async (data) => {
    if (!isFormValid || isSubmitting) {
      return;
    }

    try {
      setIsSubmitting(true);
      await onSubmit(data);
      form.reset();
    } catch (error) {
      console.error("Failed to create identity:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Identity Label</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter identity label"
                  {...field}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
                    field.onChange(value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="details"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Details (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter additional details"
                  className="resize-none"
                  {...field}
                />
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
            className={`${
              !isFormValid || isSubmitting
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            {isSubmitting ? "Creating..." : "Create Identity"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
