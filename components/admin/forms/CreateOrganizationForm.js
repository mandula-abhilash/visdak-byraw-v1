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

const formSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Organization name is required")
    .max(100, "Organization name cannot exceed 100 characters")
    .regex(
      /^[a-zA-Z0-9\s-]+$/,
      "Organization name can only contain letters, numbers, spaces, and hyphens"
    ),
});

export const CreateOrganizationForm = ({ onSubmit, onCancel }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
    mode: "onChange",
  });

  const { formState, watch } = form;
  const { isValid } = formState;
  const name = watch("name");

  const isFormValid = isValid && name?.trim();

  const handleSubmit = async (data) => {
    if (!isFormValid || isSubmitting) {
      return;
    }

    try {
      setIsSubmitting(true);
      await onSubmit(data);
      form.reset();
    } catch (error) {
      console.error("Failed to create organization:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organization Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter organization name"
                  {...field}
                  onChange={(e) => {
                    const value = e.target.value.replace(
                      /[^a-zA-Z0-9\s-]/g,
                      ""
                    );
                    field.onChange(value);
                  }}
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
            {isSubmitting ? "Creating..." : "Create Organization"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
