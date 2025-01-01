"use client";

import { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
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

const formSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title is too long"),
  content: z.string().min(1, "Content is required"),
  priority: z.enum(["low", "medium", "high"]),
  due_date: z.date(),
  checklist: z.array(
    z.object({
      title: z.string(),
      completed: z.boolean(),
    })
  ),
  labels: z.array(z.string()).optional(),
});

export const TaskNoteForm = ({ onSubmit, onCancel }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newChecklistItem, setNewChecklistItem] = useState("");

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      priority: "medium",
      due_date: new Date(),
      checklist: [],
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

  const addChecklistItem = () => {
    if (!newChecklistItem.trim()) return;
    const currentChecklist = form.getValues("checklist");
    form.setValue("checklist", [
      ...currentChecklist,
      { title: newChecklistItem, completed: false },
    ]);
    setNewChecklistItem("");
  };

  const removeChecklistItem = (index) => {
    const currentChecklist = form.getValues("checklist");
    form.setValue(
      "checklist",
      currentChecklist.filter((_, i) => i !== index)
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Task Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter task title" {...field} />
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
          <FormLabel>Due Date</FormLabel>
          <NoteScheduling
            startDate={form.watch("due_date")}
            onStartDateChange={(date) => form.setValue("due_date", date)}
          />
        </div>

        <div className="space-y-4">
          <FormLabel>Checklist</FormLabel>
          <div className="flex gap-2">
            <Input
              value={newChecklistItem}
              onChange={(e) => setNewChecklistItem(e.target.value)}
              placeholder="Add checklist item"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addChecklistItem();
                }
              }}
            />
            <Button type="button" variant="outline" onClick={addChecklistItem}>
              Add
            </Button>
          </div>
          <div className="space-y-2">
            {form.watch("checklist").map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 p-2 border rounded-lg"
              >
                <Checkbox
                  checked={item.completed}
                  onCheckedChange={(checked) => {
                    const checklist = [...form.getValues("checklist")];
                    checklist[index].completed = checked;
                    form.setValue("checklist", checklist);
                  }}
                />
                <span className="flex-1">{item.title}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeChecklistItem(index)}
                >
                  ×
                </Button>
              </div>
            ))}
          </div>
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
            {isSubmitting ? "Creating..." : "Create Task"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
