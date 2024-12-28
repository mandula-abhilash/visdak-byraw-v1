"use client";

import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AVAILABLE_WIDGETS = [
  "Task List",
  "Calendar",
  "Analytics",
  "Notes",
  "Reminders",
];

const WIDGET_SIZES = ["1/4", "1/3", "1/2", "2/3", "3/4", "full"];

export const WidgetBuilder = ({ form, sidebarItems }) => {
  const widgets = form.watch("configuration.widgets") || {};
  const { errors } = form.formState;

  const addWidget = (route) => {
    const currentWidgets = widgets[route] || [];
    const newWidget = {
      widget_name: "",
      size: "",
      custom_label: "",
    };
    form.setValue("configuration.widgets", {
      ...widgets,
      [route]: [...currentWidgets, newWidget],
    });
  };

  const removeWidget = (route, index) => {
    const newWidgets = [...widgets[route]];
    newWidgets.splice(index, 1);
    form.setValue("configuration.widgets", {
      ...widgets,
      [route]: newWidgets,
    });
  };

  const updateWidget = (route, index, field, value) => {
    const newWidgets = [...widgets[route]];
    newWidgets[index] = { ...newWidgets[index], [field]: value };
    form.setValue("configuration.widgets", {
      ...widgets,
      [route]: newWidgets,
    });
  };

  return (
    <div className="space-y-6">
      {sidebarItems
        .filter((item) => item.enabled)
        .map((item) => {
          const route = item.route.replace("/", "");
          return (
            <div key={route} className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium capitalize">
                  {item.label} Widgets
                </h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addWidget(route)}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Widget
                </Button>
              </div>

              <div className="space-y-4">
                {(widgets[route] || []).map((widget, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-4 p-4 border rounded-lg relative"
                  >
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-2"
                      onClick={() => removeWidget(route, index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Widget Type *
                        </label>
                        <Select
                          value={widget.widget_name}
                          onValueChange={(value) =>
                            updateWidget(route, index, "widget_name", value)
                          }
                        >
                          <SelectTrigger
                            className={
                              errors?.configuration?.widgets?.[route]?.[index]
                                ?.widget_name
                                ? "border-red-500"
                                : ""
                            }
                          >
                            <SelectValue placeholder="Select widget" />
                          </SelectTrigger>
                          <SelectContent>
                            {AVAILABLE_WIDGETS.map((name) => (
                              <SelectItem key={name} value={name}>
                                {name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors?.configuration?.widgets?.[route]?.[index]
                          ?.widget_name && (
                          <p className="text-sm text-red-500">
                            Widget type is required
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Size *</label>
                        <Select
                          value={widget.size}
                          onValueChange={(value) =>
                            updateWidget(route, index, "size", value)
                          }
                        >
                          <SelectTrigger
                            className={
                              errors?.configuration?.widgets?.[route]?.[index]
                                ?.size
                                ? "border-red-500"
                                : ""
                            }
                          >
                            <SelectValue placeholder="Select size" />
                          </SelectTrigger>
                          <SelectContent>
                            {WIDGET_SIZES.map((size) => (
                              <SelectItem key={size} value={size}>
                                {size}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors?.configuration?.widgets?.[route]?.[index]
                          ?.size && (
                          <p className="text-sm text-red-500">
                            Size is required
                          </p>
                        )}
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-medium">
                          Custom Label (Optional)
                        </label>
                        <Input
                          value={widget.custom_label}
                          onChange={(e) =>
                            updateWidget(
                              route,
                              index,
                              "custom_label",
                              e.target.value
                            )
                          }
                          placeholder="Optional custom label"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
    </div>
  );
};
