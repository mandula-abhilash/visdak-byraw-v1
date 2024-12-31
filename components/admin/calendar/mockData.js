// Generate dates relative to today
const today = new Date();
const getDate = (daysOffset, hoursOffset = 0) => {
  const date = new Date(today);
  date.setDate(today.getDate() + daysOffset);
  date.setHours(today.getHours() + hoursOffset);
  return date.toISOString();
};

export const MOCK_EVENTS = [
  // Meetings
  {
    id: 1,
    title: "Team Standup",
    type: "Meeting",
    status: "upcoming",
    start_time: getDate(0, 1),
    end_time: getDate(0, 2),
    location: "Conference Room A",
    attendees: ["Alice", "Bob", "Charlie"],
    description: "Daily team sync-up",
  },
  {
    id: 2,
    title: "Client Presentation",
    type: "Meeting",
    status: "upcoming",
    start_time: getDate(1, 3),
    end_time: getDate(1, 4),
    location: "Virtual",
    attendees: ["Alice", "Client Team"],
    description: "Project progress review",
  },

  // Appointments
  {
    id: 3,
    title: "Dentist Appointment",
    type: "Appointment",
    status: "upcoming",
    start_time: getDate(2, 5),
    end_time: getDate(2, 6),
    location: "Dental Clinic",
    description: "Regular checkup",
  },
  {
    id: 4,
    title: "Car Service",
    type: "Appointment",
    status: "completed",
    start_time: getDate(-1, 2),
    end_time: getDate(-1, 4),
    location: "Auto Shop",
    description: "Regular maintenance",
  },

  // Reminders
  {
    id: 5,
    title: "Project Deadline",
    type: "Reminder",
    status: "upcoming",
    start_time: getDate(5, 9),
    end_time: getDate(5, 9),
    description: "Submit final deliverables",
  },
  {
    id: 6,
    title: "Pay Bills",
    type: "Reminder",
    status: "completed",
    start_time: getDate(-2, 10),
    end_time: getDate(-2, 10),
    description: "Monthly utility bills",
  },

  // Deadlines
  {
    id: 7,
    title: "Report Submission",
    type: "Deadline",
    status: "upcoming",
    start_time: getDate(3, 8),
    end_time: getDate(3, 8),
    description: "Q1 performance report",
  },
  {
    id: 8,
    title: "License Renewal",
    type: "Deadline",
    status: "cancelled",
    start_time: getDate(4, 7),
    end_time: getDate(4, 7),
    description: "Annual license renewal",
  },

  // Past Events
  {
    id: 9,
    title: "Team Building",
    type: "Meeting",
    status: "completed",
    start_time: getDate(-5, 4),
    end_time: getDate(-5, 8),
    location: "City Park",
    attendees: ["Entire Team"],
    description: "Annual team outing",
  },
  {
    id: 10,
    title: "Training Session",
    type: "Meeting",
    status: "completed",
    start_time: getDate(-3, 2),
    end_time: getDate(-3, 4),
    location: "Training Room",
    attendees: ["New Hires", "HR Team"],
    description: "Onboarding training",
  },

  // Ongoing Events
  {
    id: 11,
    title: "Conference",
    type: "Meeting",
    status: "ongoing",
    start_time: getDate(-1, 0),
    end_time: getDate(2, 0),
    location: "Convention Center",
    attendees: ["Department Heads"],
    description: "Annual industry conference",
  },
  {
    id: 12,
    title: "Sprint Planning",
    type: "Meeting",
    status: "ongoing",
    start_time: getDate(0, -2),
    end_time: getDate(0, 2),
    location: "Meeting Room B",
    attendees: ["Development Team"],
    description: "Plan next sprint tasks",
  },

  // Future Events
  {
    id: 13,
    title: "Product Launch",
    type: "Deadline",
    status: "upcoming",
    start_time: getDate(10, 5),
    end_time: getDate(10, 8),
    location: "Main Auditorium",
    description: "New product release event",
  },
  {
    id: 14,
    title: "Performance Review",
    type: "Meeting",
    status: "upcoming",
    start_time: getDate(7, 3),
    end_time: getDate(7, 4),
    location: "HR Office",
    attendees: ["Manager", "Employee"],
    description: "Quarterly performance discussion",
  },
  {
    id: 15,
    title: "System Maintenance",
    type: "Reminder",
    status: "upcoming",
    start_time: getDate(6, 1),
    end_time: getDate(6, 3),
    description: "Scheduled system downtime",
  },
];
