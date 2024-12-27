"use client";

import { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
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
import { JsonEditor } from "../json/JsonEditor";

const formSchema = z.object({
  roleId: z.string().min(1, "Please select a role"),
  configuration: z
    .string()
    .min(2, "Configuration is required")
    .refine(
      (value) => {
        try {
          JSON.parse(value);
          return true;
        } catch {
          return false;
        }
      },
      {
        message: "Invalid JSON format",
      }
    ),
});

const defaultConfig = {
  sidebar: {
    items: [
      {
        label: "Dashboard",
        route: "/dashboard",
        icon: "home",
        enabled: true,
      },
    ],
  },
  widgets: {
    dashboard: [
      {
        widget_name: "Task List",
        size: "1/2",
        custom_label: "Tasks",
      },
    ],
  },
  permissions: {
    canEditWidgets: false,
    canCustomizeTheme: false,
  },
};

export const CreateRoleConfigForm = ({ onSubmit, onCancel }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [roles] = useState([
    { id: "1", name: "Freelancer" },
    { id: "2", name: "Business Owner" },
    { id: "3", name: "Head of Family" },
  ]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roleId: "",
      configuration: JSON.stringify(defaultConfig, null, 2),
    },
    mode: "onChange",
  });

  const { formState, watch } = form;
  const { isValid } = formState;
  const roleId = watch("roleId");
  const configuration = watch("configuration");

  const isFormValid = isValid && roleId && configuration;

  const handleSubmit = async (data) => {
    if (!isFormValid || isSubmitting) {
      return;
    }

    try {
      setIsSubmitting(true);
      await onSubmit({
        ...data,
        configuration: JSON.parse(data.configuration),
      });
      form.reset();
    } catch (error) {
      console.error("Failed to create role configuration:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="roleId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Global Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role.id} value={role.id}>
                      {role.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="configuration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Configuration</FormLabel>
              <FormControl>
                <JsonEditor
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Enter JSON configuration"
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
            {isSubmitting ? "Creating..." : "Create Configuration"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
