"use client";

import { useState, useEffect } from "react";
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
import { SidebarBuilder } from "../config/SidebarBuilder";
import { WidgetBuilder } from "../config/WidgetBuilder";
import { PermissionBuilder } from "../config/PermissionBuilder";
import { ConfigPreview } from "../config/ConfigPreview";

const formSchema = z.object({
  roleId: z.string().min(1, "Please select a role"),
  configuration: z.object({
    sidebar: z.object({
      items: z.array(
        z.object({
          label: z.string().min(1, "Label is required"),
          route: z.string().min(1, "Route is required"),
          icon: z.string().min(1, "Icon is required"),
          enabled: z.boolean(),
        })
      ),
    }),
    widgets: z.record(
      z.array(
        z.object({
          widget_name: z.string().min(1, "Widget type is required"),
          size: z.string().min(1, "Size is required"),
          custom_label: z.string().optional(),
        })
      )
    ),
    permissions: z.object({
      canEditWidgets: z.boolean(),
      canCustomizeTheme: z.boolean(),
    }),
  }),
});

const defaultConfig = {
  sidebar: {
    items: [],
  },
  widgets: {},
  permissions: {
    canEditWidgets: false,
    canCustomizeTheme: false,
  },
};

export const CreateRoleConfigForm = ({ onSubmit, onCancel }) => {
  // Simulated data - replace with actual API call
  const [roles, setRoles] = useState([
    { id: "1", name: "Freelancer", hasConfig: true },
    { id: "2", name: "Business Owner", hasConfig: false },
    { id: "3", name: "Head of Family", hasConfig: false },
  ]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roleId: "",
      configuration: defaultConfig,
    },
    mode: "onChange",
  });

  const { formState, watch } = form;
  const { isValid, errors } = formState;
  const roleId = watch("roleId");
  const configuration = watch("configuration");
  const sidebarItems = watch("configuration.sidebar.items") || [];

  const availableRoles = roles.filter((role) => !role.hasConfig);
  const isFormValid = isValid && roleId && configuration;

  // Update widgets object when sidebar items change
  useEffect(() => {
    const currentWidgets = form.getValues("configuration.widgets");
    const newWidgets = {};

    sidebarItems.forEach((item) => {
      const route = item.route.replace("/", "");
      if (item.enabled) {
        newWidgets[route] = currentWidgets[route] || [];
      }
    });

    form.setValue("configuration.widgets", newWidgets);
  }, [sidebarItems]);

  const handleSubmit = async (data) => {
    if (!isFormValid) return;
    try {
      await onSubmit(data);
      // Update roles list after successful submission
      setRoles((prev) =>
        prev.map((role) =>
          role.id === data.roleId ? { ...role, hasConfig: true } : role
        )
      );
      form.reset();
    } catch (error) {
      console.error("Failed to create role configuration:", error);
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
                  <SelectTrigger className="w-full backdrop-blur-md">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="backdrop-blur-md">
                  {availableRoles.map((role) => (
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

        {roleId && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="space-y-6">
                <div className="border rounded-lg p-4 space-y-4">
                  <h3 className="text-lg font-medium">Sidebar Configuration</h3>
                  <SidebarBuilder form={form} />
                </div>

                {sidebarItems.length > 0 && (
                  <div className="border rounded-lg p-4 space-y-4">
                    <h3 className="text-lg font-medium">
                      Widget Configuration
                    </h3>
                    <WidgetBuilder form={form} sidebarItems={sidebarItems} />
                  </div>
                )}

                <div className="border rounded-lg p-4 space-y-4">
                  <PermissionBuilder form={form} />
                </div>
              </div>

              <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
                <Button type="button" variant="outline" onClick={onCancel}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className={
                    !isFormValid
                      ? "opacity-50 cursor-not-allowed bg-primary"
                      : "bg-primary"
                  }
                >
                  Create Configuration
                </Button>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <ConfigPreview configuration={configuration} />
            </div>
          </div>
        )}
      </form>
    </Form>
  );
};
