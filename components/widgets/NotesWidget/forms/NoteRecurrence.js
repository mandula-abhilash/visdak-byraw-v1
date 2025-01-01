"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const getIntervalLabel = (frequency) => {
  switch (frequency) {
    case "daily":
      return "days";
    case "weekly":
      return "weeks";
    case "monthly":
      return "months";
    case "yearly":
      return "years";
    default:
      return "intervals";
  }
};

export const NoteRecurrence = ({ value = {}, onChange }) => {
  const handleChange = (field, fieldValue) => {
    onChange({
      ...value,
      [field]: fieldValue,
    });
  };

  const intervalLabel = getIntervalLabel(value.frequency);

  return (
    <div className="space-y-4">
      {/* Enable Recurrence */}
      <div className="flex items-center gap-2">
        <Switch
          checked={value.enabled}
          onCheckedChange={(checked) => handleChange("enabled", checked)}
          className="h-6 w-11 rounded-full bg-muted transition-colors data-[state=checked]:bg-primary"
          thumbClassName="block h-5 w-5 rounded-full bg-background transition-transform data-[state=checked]:translate-x-5"
        />
        <label className="text-sm font-medium">Enable recurrence</label>
      </div>

      {value.enabled && (
        <>
          {/* Frequency */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Frequency</label>
              <Select
                value={value.frequency}
                onValueChange={(val) => handleChange("frequency", val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Repeat every{" "}
                {value.frequency ? (
                  <span className="text-muted-foreground">
                    ({intervalLabel})
                  </span>
                ) : (
                  ""
                )}
              </label>
              <Input
                type="number"
                min="1"
                max="365"
                value={value.interval || ""}
                onChange={(e) =>
                  handleChange("interval", parseInt(e.target.value, 10))
                }
                placeholder={`Enter number of ${intervalLabel}`}
              />
            </div>
          </div>

          {/* Ends */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Ends</label>
            <Select
              value={value.ends}
              onValueChange={(val) => handleChange("ends", val)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select when to end" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="never">Never</SelectItem>
                <SelectItem value="after">After occurrences</SelectItem>
                <SelectItem value="on">On date</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {value.ends === "after" && (
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Number of occurrences
              </label>
              <Input
                type="number"
                min="1"
                max="999"
                value={value.count || ""}
                onChange={(e) =>
                  handleChange("count", parseInt(e.target.value, 10))
                }
                placeholder="Enter number of occurrences"
              />
            </div>
          )}

          {value.ends === "on" && (
            <div className="space-y-2">
              <label className="text-sm font-medium">End date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !value.until && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {value.until
                      ? value.until.toLocaleDateString()
                      : "Pick an end date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={value.until}
                    onSelect={(date) => handleChange("until", date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          )}
        </>
      )}
    </div>
  );
};
