"use client";

import { Switch } from "@/components/ui/switch";

const PERMISSIONS = [
  {
    key: "canEditWidgets",
    label: "Can Edit Widgets",
    description: "Allow users to customize their widget layout",
  },
  {
    key: "canCustomizeTheme",
    label: "Can Customize Theme",
    description: "Allow users to change colors and appearance",
  },
];

export const PermissionBuilder = ({ form }) => {
  const permissions = form.watch("configuration.permissions");

  const updatePermission = (key, value) => {
    form.setValue("configuration.permissions", {
      ...permissions,
      [key]: value,
    });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Permissions</h3>
      <div className="space-y-4">
        {PERMISSIONS.map(({ key, label, description }) => (
          <div
            key={key}
            className="flex items-center justify-between p-4 border rounded-lg"
          >
            <div className="space-y-0.5">
              <div className="text-sm font-medium">{label}</div>
              <div className="text-sm text-muted-foreground">{description}</div>
            </div>
            <Switch
              checked={permissions[key]}
              onCheckedChange={(checked) => updatePermission(key, checked)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
