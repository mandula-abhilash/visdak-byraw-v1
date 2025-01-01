"use client";

// Define available note types and their configurations
export const NOTE_TYPES = {
  BASIC: {
    id: "basic",
    label: "Basic Note",
    description: "Simple note with title and content",
    icon: "FileText",
  },
  EVENT: {
    id: "event",
    label: "Event Note",
    description: "Note with date, time, and location details",
    icon: "Calendar",
  },
  TASK: {
    id: "task",
    label: "Task Note",
    description: "Note with checklist and due date",
    icon: "CheckSquare",
  },
  REMINDER: {
    id: "reminder",
    label: "Reminder Note",
    description: "Note with reminder settings and priority",
    icon: "Bell",
  },
  LOCATION: {
    id: "location",
    label: "Location Note",
    description: "Note with map location and address details",
    icon: "MapPin",
  },
};
