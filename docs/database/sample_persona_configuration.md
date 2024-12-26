Below is a **comprehensive set** of **sample JSON configurations** for a scenario where one user has:

1. **Two global roles**:

   - **Freelancer**
   - **HeadOfFamily**

2. **Organization-level role**:

   - **TeamOwner** (to manage a small freelance team)

3. **User-specific overrides** to add/remove certain widgets.

These JSON examples illustrate how you might store configurations in:

- **`global_role_configurations`** for **Freelancer** and **HeadOfFamily** roles.
- **`organization_role_configurations`** for the **TeamOwner** role within an organization.
- **`user_configurations`** if the user wants to override parts of their combined config (e.g., add or remove widgets).

Finally, we show a **Merged Example** to demonstrate how these could be combined at runtime if a single user has multiple roles.

---

# 1. **Global Role: Freelancer**

**File**: `freelancer_role_config.json` (example in `global_role_configurations.configuration`)

```json
{
  "sidebar": {
    "items": [
      {
        "label": "Dashboard",
        "route": "/dashboard",
        "icon": "home",
        "enabled": true
      },
      {
        "label": "Clients",
        "route": "/clients",
        "icon": "people",
        "enabled": true
      },
      {
        "label": "Invoices",
        "route": "/invoices",
        "icon": "receipt",
        "enabled": true
      },
      {
        "label": "Time Tracking",
        "route": "/time-tracking",
        "icon": "timer",
        "enabled": true
      }
    ]
  },
  "widgets": {
    "dashboard": [
      {
        "widget_name": "Task List",
        "size": "1/2",
        "custom_label": "Client Tasks"
      },
      {
        "widget_name": "Invoice Overview",
        "size": "1/2",
        "custom_label": "Pending Invoices"
      }
    ],
    "clients": [
      {
        "widget_name": "Add New Client",
        "size": "full",
        "fields": [
          { "field": "Client Name", "type": "text", "required": true },
          { "field": "Email", "type": "email", "required": true },
          { "field": "Phone", "type": "text", "required": false }
        ]
      }
    ]
  },
  "labels": {
    "Dashboard": "Freelance Home",
    "Clients": "My Clients",
    "Invoices": "Billing",
    "Time Tracking": "Work Hours"
  },
  "forms": {
    "invoices": [
      { "field": "Invoice Number", "type": "text", "required": true },
      { "field": "Amount", "type": "number", "required": true },
      { "field": "Due Date", "type": "date", "required": false }
    ]
  },
  "permissions": {
    "canEditWidgets": false,
    "canCustomizeTheme": false
  }
}
```

---

# 2. **Global Role: HeadOfFamily**

**File**: `head_of_family_role_config.json` (example in `global_role_configurations.configuration`)

```json
{
  "sidebar": {
    "items": [
      {
        "label": "Family Dashboard",
        "route": "/family-home",
        "icon": "house",
        "enabled": true
      },
      {
        "label": "Family Calendar",
        "route": "/family-calendar",
        "icon": "calendar",
        "enabled": true
      },
      {
        "label": "Budget",
        "route": "/family-budget",
        "icon": "account_balance",
        "enabled": true
      },
      {
        "label": "Kids",
        "route": "/kids",
        "icon": "child_friendly",
        "enabled": true
      }
    ]
  },
  "widgets": {
    "family-home": [
      {
        "widget_name": "Upcoming Family Events",
        "size": "1/2",
        "custom_label": "What’s Coming Up?"
      },
      {
        "widget_name": "Family Tasks",
        "size": "1/2"
      }
    ],
    "family-budget": [
      {
        "widget_name": "Budget Tracker",
        "size": "full",
        "fields": [
          { "field": "Monthly Income", "type": "number", "required": true },
          { "field": "Monthly Expenses", "type": "number", "required": true }
        ]
      }
    ]
  },
  "labels": {
    "Family Dashboard": "Family Home",
    "Family Calendar": "Calendar",
    "Budget": "Family Budget",
    "Kids": "Children"
  },
  "forms": {
    "family_tasks": [
      { "field": "Task", "type": "text", "required": true },
      {
        "field": "Assignee",
        "type": "dropdown",
        "options": ["Spouse", "Child 1", "Child 2"]
      }
    ]
  },
  "permissions": {
    "canEditWidgets": true,
    "canCustomizeTheme": false
  }
}
```

---

# 3. **Organization-Level Role: TeamOwner**

Suppose this user also **owns** a small freelance team (organization). The organization-level role is **TeamOwner**.

**File**: `team_owner_config.json` (example in `organization_role_configurations.configuration`)

```json
{
  "sidebar": {
    "items": [
      {
        "label": "Team Board",
        "route": "/team-board",
        "icon": "group_work",
        "enabled": true
      },
      {
        "label": "Team Tasks",
        "route": "/team-tasks",
        "icon": "checklist",
        "enabled": true
      },
      {
        "label": "Analytics",
        "route": "/team-analytics",
        "icon": "insights",
        "enabled": true
      },
      {
        "label": "Settings",
        "route": "/team-settings",
        "icon": "settings",
        "enabled": true
      }
    ]
  },
  "widgets": {
    "team-board": [
      {
        "widget_name": "Member Overview",
        "size": "1/2",
        "custom_label": "My Team"
      },
      {
        "widget_name": "Team Announcements",
        "size": "1/2"
      }
    ],
    "team-analytics": [
      {
        "widget_name": "Revenue Chart",
        "size": "1/2"
      },
      {
        "widget_name": "Project Progress",
        "size": "1/2"
      }
    ]
  },
  "labels": {
    "Team Board": "Team Home",
    "Team Tasks": "Tasks",
    "Analytics": "Reports"
  },
  "forms": {
    "team_tasks": [
      { "field": "Task Name", "type": "text", "required": true },
      {
        "field": "Assigned To",
        "type": "dropdown",
        "options": ["Team Member 1", "Team Member 2"]
      }
    ]
  },
  "permissions": {
    "canInviteMembers": true,
    "canRemoveMembers": true,
    "canViewAnalytics": true
  }
}
```

In this scenario, anyone with **TeamOwner** role in this **organization** sees these **sidebar items** and **widgets**. They also have advanced permissions like inviting or removing team members.

---

# 4. **User-Level Override** (Add/Remove Widgets)

Finally, let’s assume the user wants a **personal tweak**:

- **Add** a “Marketing Overview” widget to the **Freelancer** dashboard.
- **Remove** the “Budget Tracker” widget from **HeadOfFamily** role (they might do budgeting elsewhere, or prefer it hidden).

**File**: `user_config_override.json` (example in `user_configurations.configuration`)

```json
{
  "widgets": {
    "add": [
      {
        "widget_name": "Marketing Overview",
        "size": "1/2",
        "custom_label": "Marketing & Leads",
        "target_page": "dashboard"
        /* 
          We'll place this under the Freelancer "dashboard" 
          or you could reference the exact page if you prefer 
          a different naming scheme.
        */
      }
    ],
    "remove": [
      {
        "widget_name": "Budget Tracker",
        "target_page": "family-budget"
      }
    ]
  }
}
```

- `add`: We add a “Marketing Overview” widget to the user’s **dashboard** (relevant to their **Freelancer** context).
- `remove`: We hide “Budget Tracker” from **family-budget**.

---

# 5. **Merged Example** (At Runtime)

If a user has **two global roles** (**Freelancer** + **HeadOfFamily**), **TeamOwner** in their organization, **and** the user override above:

1. **Global Role: Freelancer** config is loaded.
2. **Global Role: HeadOfFamily** config is loaded.
   - If you **union** the sidebars, you’ll have combined items from both roles.
   - The user could see items for “Clients,” “Invoices,” AND “Family Calendar,” etc.
3. **Org-Level Role: TeamOwner** is merged in if the user is viewing the **team context**.
   - E.g., if they switch to “My Freelance Team,” they see that org’s sidebar, widgets, analytics, etc.
4. **User override** is finally applied:
   - **Adds** “Marketing Overview” widget to the (Freelancer) `dashboard`.
   - **Removes** “Budget Tracker” from the (HeadOfFamily) `family-budget`.

Here’s a **possible** final merged snippet (hypothetical) if the user is on their **Freelancer** home screen:

```json
{
  "sidebar": {
    "items": [
      {
        "label": "Dashboard",
        "route": "/dashboard",
        "icon": "home",
        "enabled": true
      },
      {
        "label": "Clients",
        "route": "/clients",
        "icon": "people",
        "enabled": true
      },
      {
        "label": "Invoices",
        "route": "/invoices",
        "icon": "receipt",
        "enabled": true
      },
      {
        "label": "Time Tracking",
        "route": "/time-tracking",
        "icon": "timer",
        "enabled": true
      }

      /* HeadOfFamily items might appear if you merge them at the same time
         "Family Dashboard", "Family Calendar", "Kids", etc.
         Possibly the user toggles role or sees them all at once—your choice. */
    ]
  },
  "widgets": {
    "dashboard": [
      {
        "widget_name": "Task List",
        "size": "1/2",
        "custom_label": "Client Tasks"
      },
      {
        "widget_name": "Invoice Overview",
        "size": "1/2",
        "custom_label": "Pending Invoices"
      },
      {
        "widget_name": "Marketing Overview",
        "size": "1/2",
        "custom_label": "Marketing & Leads"
      }
      /* Possibly more from HeadOfFamily if you unify them. */
    ]
    /* "family-budget" page might *not* include "Budget Tracker" anymore because user removed it. */
  },
  "labels": {
    "Dashboard": "Freelance Home",
    "Clients": "My Clients",
    "Invoices": "Billing",
    "Time Tracking": "Work Hours"
    /* Merge HeadOfFamily labels, too, if showing them together:
       "Family Dashboard": "Family Home", 
       "Budget": "Family Budget", etc. */
  },
  "permissions": {
    /* Freed from both roles, union or intersect them,
       e.g., canEditWidgets: (true or false?), canCustomizeTheme, etc. */
  }
}
```

Meanwhile, when the user switches to their **Team Owner** organization context, they’ll see the **team**’s sidebar items and widgets (Team Board, Team Tasks, Analytics, etc.), possibly merged with personal overrides if applicable.

---

## Final Notes

- These **sample** JSON files are just **illustrations**. In your actual system, you might store them in separate records in `global_role_configurations`, `organization_role_configurations`, and `user_configurations`.
- **Merging Logic** can be implemented however you see fit:
  - A strict **union** across roles (all features visible at once).
  - A **role-switch** approach, letting the user pick which role’s UI they currently use.
  - **Team context** can override or add items when the user is “active” in that organization.

This setup gives you **maximum flexibility** to:

- Provide distinct experiences for the **Freelancer** and **HeadOfFamily** roles.
- Maintain a **TeamOwner** org-level config to control what the user (and possibly their teammates) see in the **team context**.
- Let the user have **small personal tweaks** (add/remove) without cluttering the universal role configs for everyone else.
