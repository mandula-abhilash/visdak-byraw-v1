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
import { NoteTypeSelector } from "./NoteTypeSelector";
import { BasicNoteForm } from "./variations/BasicNoteForm";
import { EventNoteForm } from "./variations/EventNoteForm";
import { TaskNoteForm } from "./variations/TaskNoteForm";
import { ReminderNoteForm } from "./variations/ReminderNoteForm";
import { LocationNoteForm } from "./variations/LocationNoteForm";
import { NOTE_TYPES } from "./NoteTypes";

export const CreateNoteForm = ({ onSubmit, onCancel }) => {
  const [noteType, setNoteType] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data) => {
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      await onSubmit({ ...data, type: noteType });
    } catch (error) {
      console.error("Failed to create note:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderNoteForm = () => {
    switch (noteType) {
      case NOTE_TYPES.BASIC.id:
        return <BasicNoteForm onSubmit={handleSubmit} onCancel={onCancel} />;
      case NOTE_TYPES.EVENT.id:
        return <EventNoteForm onSubmit={handleSubmit} onCancel={onCancel} />;
      case NOTE_TYPES.TASK.id:
        return <TaskNoteForm onSubmit={handleSubmit} onCancel={onCancel} />;
      case NOTE_TYPES.REMINDER.id:
        return <ReminderNoteForm onSubmit={handleSubmit} onCancel={onCancel} />;
      case NOTE_TYPES.LOCATION.id:
        return <LocationNoteForm onSubmit={handleSubmit} onCancel={onCancel} />;
      default:
        return null;
    }
  };

  if (!noteType) {
    return (
      <div className="space-y-6">
        <NoteTypeSelector selectedType={noteType} onSelect={setNoteType} />
        <div className="flex justify-end">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button
          type="button"
          variant="ghost"
          onClick={() => setNoteType(null)}
          className="text-muted-foreground hover:text-foreground"
        >
          ← Back to note types
        </Button>
        <div className="text-sm text-muted-foreground">
          {NOTE_TYPES[noteType.toUpperCase()].label}
        </div>
      </div>
      {renderNoteForm()}
    </div>
  );
};
