export const NAV_ITEMS = [
  {
    section: "",
    items: [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: "LayoutDashboard",
        path: "/",
      },
      { id: "tasks", label: "Tasks", icon: "CheckSquare", path: "/tasks" },
      {
        id: "calendar",
        label: "Calendar",
        icon: "Calendar",
        path: "/calendar",
      },
      { id: "notes", label: "Notes", icon: "StickyNote", path: "/notes" },
      {
        id: "analytics",
        label: "Analytics",
        icon: "BarChart",
        path: "/analytics",
      },
    ],
  },
  {
    section: "Admin",
    items: [
      { id: "admin", label: "Admin Dashboard", icon: "Shield", path: "/admin" },
      { id: "widgets", label: "Widgets", icon: "Layout", path: "/widgets" },
    ],
  },
  {
    section: "Settings",
    items: [
      {
        id: "settings",
        label: "Settings",
        icon: "Settings",
        path: "/settings",
      },
      {
        id: "theme",
        label: "Theme",
        icon: "Sun",
        path: "#",
        isThemeToggle: true,
      },
    ],
  },
];

export const WIDGET_SIZES = {
  SMALL: {
    DEFAULT: "col-span-12 sm:col-span-6 lg:col-span-3",
  },
  MEDIUM: {
    DEFAULT: "col-span-12 sm:col-span-6",
  },
  LARGE: {
    DEFAULT: "col-span-12 lg:col-span-8",
  },
  FULL: {
    DEFAULT: "col-span-12",
  },
};

export const DEFAULT_WIDGETS_CONFIG = [
  { id: "tasks", component: "TaskWidget", size: "MEDIUM", position: 1 },
  { id: "calendar", component: "CalendarWidget", size: "MEDIUM", position: 2 },
  { id: "notes", component: "NotesWidget", size: "MEDIUM", position: 3 },
  {
    id: "reminders",
    component: "RemindersWidget",
    size: "MEDIUM",
    position: 4,
  },
  { id: "analytics", component: "AnalyticsWidget", size: "FULL", position: 5 },
];
