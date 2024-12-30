// Generate dates relative to today
const today = new Date();
const getDate = (daysOffset) => {
  const date = new Date(today);
  date.setDate(today.getDate() + daysOffset);
  return date.toISOString().split("T")[0];
};

// Helper function to generate random coordinates within Hyderabad area
const generateSFCoordinates = () => {
  // Hyderabad bounds
  const HYD_BOUNDS = {
    lat: { min: 17.32, max: 17.45 },
    lng: { min: 78.4, max: 78.55 },
  };

  return {
    lat:
      HYD_BOUNDS.lat.min +
      Math.random() * (HYD_BOUNDS.lat.max - HYD_BOUNDS.lat.min),
    lng:
      HYD_BOUNDS.lng.min +
      Math.random() * (HYD_BOUNDS.lng.max - HYD_BOUNDS.lng.min),
  };
};

export const MOCK_TASKS = [
  // High Priority Tasks
  {
    id: 1,
    title: "Critical System Update",
    status: "pending",
    priority: "high",
    due_date: getDate(1),
    location: generateSFCoordinates(),
    customer: {
      name: "Tech Corp HQ",
      address: "123 Market St, San Francisco, CA",
    },
    service_type: "Maintenance",
  },
  {
    id: 2,
    title: "Security Audit",
    status: "in progress",
    priority: "high",
    due_date: getDate(2),
    location: generateSFCoordinates(),
    customer: {
      name: "Financial District Office",
      address: "456 Montgomery St, San Francisco, CA",
    },
    service_type: "Security",
  },
  {
    id: 3,
    title: "Client Presentation Setup",
    status: "completed",
    priority: "high",
    due_date: getDate(-1),
    completed_on: getDate(-1),
    location: generateSFCoordinates(),
    customer: {
      name: "StartUp Inc",
      address: "789 Howard St, San Francisco, CA",
    },
    service_type: "Installation",
  },

  // Medium Priority Tasks
  {
    id: 4,
    title: "Team Planning Room Setup",
    status: "pending",
    priority: "medium",
    due_date: getDate(3),
    location: generateSFCoordinates(),
    customer: {
      name: "Innovation Hub",
      address: "321 Mission St, San Francisco, CA",
    },
    service_type: "Setup",
  },
  {
    id: 5,
    title: "Network Infrastructure Update",
    status: "in progress",
    priority: "medium",
    due_date: getDate(1),
    location: generateSFCoordinates(),
    customer: {
      name: "Cloud Services LLC",
      address: "555 California St, San Francisco, CA",
    },
    service_type: "Maintenance",
  },
  {
    id: 6,
    title: "Server Room Maintenance",
    status: "completed",
    priority: "medium",
    due_date: getDate(-2),
    completed_on: getDate(-2),
    location: generateSFCoordinates(),
    customer: {
      name: "Data Center One",
      address: "777 Folsom St, San Francisco, CA",
    },
    service_type: "Maintenance",
  },

  // Low Priority Tasks
  {
    id: 7,
    title: "Office Equipment Check",
    status: "pending",
    priority: "low",
    due_date: getDate(5),
    location: generateSFCoordinates(),
    customer: {
      name: "Small Business Center",
      address: "999 Bryant St, San Francisco, CA",
    },
    service_type: "Inspection",
  },
  {
    id: 8,
    title: "Printer Network Setup",
    status: "completed",
    priority: "low",
    due_date: getDate(-3),
    completed_on: getDate(-3),
    location: generateSFCoordinates(),
    customer: {
      name: "Print Solutions",
      address: "444 Hayes St, San Francisco, CA",
    },
    service_type: "Installation",
  },

  // Overdue Tasks
  {
    id: 9,
    title: "Quarterly System Review",
    status: "overdue",
    priority: "high",
    due_date: getDate(-7),
    overdue_days: 7,
    location: generateSFCoordinates(),
    customer: {
      name: "Enterprise Solutions",
      address: "222 Pine St, San Francisco, CA",
    },
    service_type: "Review",
  },
  {
    id: 10,
    title: "Hardware Upgrade",
    status: "overdue",
    priority: "high",
    due_date: getDate(-5),
    overdue_days: 5,
    location: generateSFCoordinates(),
    customer: {
      name: "Tech Innovations",
      address: "888 Brannan St, San Francisco, CA",
    },
    service_type: "Upgrade",
  },

  // Today's Tasks
  {
    id: 11,
    title: "Network Troubleshooting",
    status: "pending",
    priority: "medium",
    due_date: getDate(0),
    location: generateSFCoordinates(),
    customer: {
      name: "Startup Hub",
      address: "555 Mission St, San Francisco, CA",
    },
    service_type: "Support",
  },
  {
    id: 12,
    title: "Security System Installation",
    status: "pending",
    priority: "high",
    due_date: getDate(0),
    location: generateSFCoordinates(),
    customer: {
      name: "Secure Building",
      address: "777 Market St, San Francisco, CA",
    },
    service_type: "Installation",
  },

  // Additional Tasks for Timeline
  {
    id: 13,
    title: "Cloud Migration Project",
    status: "pending",
    priority: "high",
    due_date: getDate(4),
    location: generateSFCoordinates(),
    customer: {
      name: "Cloud First Inc",
      address: "999 Van Ness Ave, San Francisco, CA",
    },
    service_type: "Migration",
  },
  {
    id: 14,
    title: "Employee Workstation Setup",
    status: "pending",
    priority: "medium",
    due_date: getDate(6),
    location: generateSFCoordinates(),
    customer: {
      name: "Growth Startup",
      address: "333 Fremont St, San Francisco, CA",
    },
    service_type: "Setup",
  },
  {
    id: 15,
    title: "Data Center Inspection",
    status: "pending",
    priority: "high",
    due_date: getDate(2),
    location: generateSFCoordinates(),
    customer: {
      name: "Data Solutions",
      address: "444 Spear St, San Francisco, CA",
    },
    service_type: "Inspection",
  },
];
