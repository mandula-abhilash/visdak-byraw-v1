// Generate dates relative to today
const today = new Date();
const getDate = (daysOffset) => {
  const date = new Date(today);
  date.setDate(today.getDate() + daysOffset);
  return date.toISOString().split("T")[0];
};

export const MOCK_TASKS = [
  // High Priority Tasks
  {
    id: 1,
    title: "Critical System Update",
    status: "pending",
    priority: "high",
    due_date: getDate(1),
  },
  {
    id: 2,
    title: "Security Audit",
    status: "in progress",
    priority: "high",
    due_date: getDate(2),
  },
  {
    id: 3,
    title: "Client Presentation",
    status: "completed",
    priority: "high",
    due_date: getDate(-1),
    completed_on: getDate(-1),
  },

  // Medium Priority Tasks
  {
    id: 4,
    title: "Team Planning",
    status: "pending",
    priority: "medium",
    due_date: getDate(3),
  },
  {
    id: 5,
    title: "Documentation Update",
    status: "in progress",
    priority: "medium",
    due_date: getDate(1),
  },
  {
    id: 6,
    title: "Code Review",
    status: "completed",
    priority: "medium",
    due_date: getDate(-2),
    completed_on: getDate(-2),
  },

  // Low Priority Tasks
  {
    id: 7,
    title: "Office Supplies",
    status: "pending",
    priority: "low",
    due_date: getDate(5),
  },
  {
    id: 8,
    title: "Team Lunch",
    status: "completed",
    priority: "low",
    due_date: getDate(-3),
    completed_on: getDate(-3),
  },

  // Overdue Tasks
  {
    id: 9,
    title: "Quarterly Report",
    status: "overdue",
    priority: "high",
    due_date: getDate(-7),
    overdue_days: 7,
  },
  {
    id: 10,
    title: "Budget Review",
    status: "overdue",
    priority: "high",
    due_date: getDate(-5),
    overdue_days: 5,
  },

  // Today's Tasks
  {
    id: 11,
    title: "Daily Standup",
    status: "pending",
    priority: "medium",
    due_date: getDate(0),
  },
  {
    id: 12,
    title: "Client Meeting",
    status: "pending",
    priority: "high",
    due_date: getDate(0),
  },

  // Additional Tasks for Timeline
  {
    id: 13,
    title: "Project Milestone",
    status: "pending",
    priority: "high",
    due_date: getDate(4),
  },
  {
    id: 14,
    title: "Team Training",
    status: "pending",
    priority: "medium",
    due_date: getDate(6),
  },
  {
    id: 15,
    title: "Performance Reviews",
    status: "pending",
    priority: "high",
    due_date: getDate(2),
  },
];
