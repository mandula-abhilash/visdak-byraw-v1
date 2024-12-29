// Generate dates relative to today
const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(today.getDate() - 1);
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);
const nextWeek = new Date(today);
nextWeek.setDate(today.getDate() + 7);
const lastWeek = new Date(today);
lastWeek.setDate(today.getDate() - 7);

export const MOCK_TASKS = [
  // Upcoming Tasks
  {
    id: 1,
    title: "Review project proposal",
    status: "pending",
    priority: "high",
    due_date: tomorrow.toISOString().split("T")[0],
  },
  {
    id: 2,
    title: "Team planning meeting",
    status: "pending",
    priority: "medium",
    due_date: nextWeek.toISOString().split("T")[0],
  },

  // Overdue Tasks
  {
    id: 3,
    title: "Submit quarterly report",
    status: "overdue",
    priority: "high",
    due_date: lastWeek.toISOString().split("T")[0],
    overdue_days: 7,
  },
  {
    id: 4,
    title: "Client presentation preparation",
    status: "overdue",
    priority: "high",
    due_date: yesterday.toISOString().split("T")[0],
    overdue_days: 1,
  },

  // Completed Tasks
  {
    id: 5,
    title: "Update documentation",
    status: "completed",
    priority: "medium",
    due_date: yesterday.toISOString().split("T")[0],
    completed_on: yesterday.toISOString().split("T")[0],
  },
  {
    id: 6,
    title: "Code review",
    status: "completed",
    priority: "high",
    due_date: yesterday.toISOString().split("T")[0],
    completed_on: yesterday.toISOString().split("T")[0],
  },

  // High Priority Tasks
  {
    id: 7,
    title: "Security audit",
    status: "pending",
    priority: "high",
    due_date: tomorrow.toISOString().split("T")[0],
  },
  {
    id: 8,
    title: "Deploy hotfix",
    status: "in progress",
    priority: "high",
    due_date: today.toISOString().split("T")[0],
  },

  // Due Today
  {
    id: 9,
    title: "Daily standup",
    status: "pending",
    priority: "medium",
    due_date: today.toISOString().split("T")[0],
  },
  {
    id: 10,
    title: "Review pull requests",
    status: "pending",
    priority: "high",
    due_date: today.toISOString().split("T")[0],
  },
];
