# BYRAW Architecture Overview

# **1. Introduction**

## **1.1 Purpose**

This document details the **“One Brain”** architecture—a system designed to unify **personal** and **organizational** data into a **single** integrated platform. The goal is to provide:

1. **A single source of truth** for tasks, appointments, notes, and more.
2. **Flexible persona or identity management** for individuals who wear multiple hats.
3. **Granular sharing and permissions** across organizations, teams, or individuals.
4. **Customizable dashboards** (widgets) that adapt to each user’s needs, context, or role.

## **1.2 Vision**

- **Think Better**: Help users capture and organize ideas instantly.
- **Work Smarter**: Optimize daily routines through tasks, reminders, AI-driven insights, and integrated calendars.
- **Achieve More**: Provide powerful but user-friendly tools that adapt from personal use to enterprise scale.

---

# **2. Core Concepts**

## **2.1 People and Identities**

- **People**: Every individual who interacts with the system is a “person” with a profile.
- **Identities**: A “persona” or “role-based perspective” that a person can assume. For instance, “Freelancer,” “Doctor,” or “Student.” Multiple identities can attach to one person.

## **2.2 Groups and Roles**

- **Groups**: Collective entities—companies, hospitals, schools, families.
- **Roles**: Defines a person’s level of access or responsibility within a group (e.g., “Owner,” “Admin,” “Member”).

## **2.3 Entities (Items)**

- **Entities**: The universal container for tasks, appointments, reminders, notes, analytics widgets, etc.
- **Entity Types**: Admin-defined categories like “Task,” “Reminder,” “Appointment,” “Report,” or “Widget.”

## **2.4 Permissions**

- **Fine-Grained Access**: Entities can be shared with individuals, entire groups, or specialized teams at different permission levels (“view,” “edit,” “admin”).
- **Metadata & Linking**: Additional data stored in JSON for custom fields or cross-references (e.g., “source: Hospital X,” “department: Marketing”).

## **2.5 Widgets**

- **Definition**: Modular components (calendars, analytics charts, forms) that pull data from entities.
- **Dashboard Customization**: Users or admins can enable/disable specific widgets, define layouts, or set filters.

---

# **3. Data Model & Schema**

Below is the **new database schema** to support all these features. Use it as the **canonical reference** for implementation. You may rename columns or tables to suit your naming conventions, but the structure and relationships are designed for **scalability** and **modularity**.

---

## **3.1 People & Identities**

### **Table: `people`**

| Column            | Type                           | Description                                  |
| ----------------- | ------------------------------ | -------------------------------------------- |
| **person_id**     | `SERIAL PK`                    | Uniquely identifies each person.             |
| **full_name**     | `VARCHAR(100)`                 | Person’s display name (e.g., “Alice Baker”). |
| **email_address** | `VARCHAR(255) UNIQUE NOT NULL` | Primary email or login credential.           |
| **placeholder**   | `BOOLEAN`                      | Marks “dummy” or “test” accounts.            |
| **created_on**    | `TIMESTAMP`                    | Defaults to `CURRENT_TIMESTAMP`.             |
| **updated_on**    | `TIMESTAMP`                    | Updated automatically (trigger or in code).  |

**Notes**:

- **`placeholder`** can be used for “guest” or “shell” users (e.g., patients who haven’t logged in yet).

---

### **Table: `identities`**

| Column          | Type          | Description                              |
| --------------- | ------------- | ---------------------------------------- |
| **identity_id** | `SERIAL PK`   | Unique ID for each identity.             |
| **label**       | `VARCHAR(50)` | Name of the persona/identity (“Doctor”). |
| **details**     | `TEXT`        | Additional description of this identity. |
| **created_on**  | `TIMESTAMP`   | Defaults to `CURRENT_TIMESTAMP`.         |
| **updated_on**  | `TIMESTAMP`   | Timestamp for last update.               |

**Notes**:

- **Example**: “Freelancer,” “Professor,” “Consultant.”
- This helps differentiate the tools/widgets a person might see.

---

### **Table: `person_identities`**

| Column                                  | Type        | Description                               |
| --------------------------------------- | ----------- | ----------------------------------------- |
| **person_id**                           | `INT`       | FK referencing `people(person_id)`.       |
| **identity_id**                         | `INT`       | FK referencing `identities(identity_id)`. |
| **assigned_on**                         | `TIMESTAMP` | Defaults to `CURRENT_TIMESTAMP`.          |
| **PRIMARY KEY**(person_id, identity_id) | -           | Ensures uniqueness.                       |

**Example**:

- Person #1 (Alice) might have identity #2 (“Doctor”) and identity #3 (“Artist”).

---

## **3.2 Groups & Roles**

### **Table: `groups`**

| Column         | Type           | Description                                               |
| -------------- | -------------- | --------------------------------------------------------- |
| **group_id**   | `SERIAL PK`    | Unique group identifier.                                  |
| **group_name** | `VARCHAR(100)` | Descriptive name (e.g., “Acme Corp,” “Sunrise Hospital”). |
| **created_on** | `TIMESTAMP`    | Defaults to `CURRENT_TIMESTAMP`.                          |
| **updated_on** | `TIMESTAMP`    | Track changes.                                            |

**Use Cases**:

- Could represent a **company**, **hospital**, or even a **family** unit for group-based data sharing.

---

### **Table: `group_roles`**

| Column          | Type          | Description                                 |
| --------------- | ------------- | ------------------------------------------- |
| **role_id**     | `SERIAL PK`   | Unique role record.                         |
| **role_name**   | `VARCHAR(50)` | E.g., “Owner,” “Admin,” “Member,” “Viewer.” |
| **description** | `TEXT`        | Explains what privileges are included.      |
| **created_on**  | `TIMESTAMP`   | Defaults to `CURRENT_TIMESTAMP`.            |
| **updated_on**  | `TIMESTAMP`   | Track last update.                          |

**Note**:

- You can keep a standard set of roles or allow group admins to add new roles.

---

### **Table: `group_memberships`**

| Column                               | Type        | Description                            |
| ------------------------------------ | ----------- | -------------------------------------- |
| **person_id**                        | `INT`       | FK referencing `people(person_id)`.    |
| **group_id**                         | `INT`       | FK referencing `groups(group_id)`.     |
| **role_id**                          | `INT`       | FK referencing `group_roles(role_id)`. |
| **joined_on**                        | `TIMESTAMP` | Defaults to `CURRENT_TIMESTAMP`.       |
| **PRIMARY KEY**(person_id, group_id) | -           | One record per (person, group).        |

**Example**:

- Person #1 joins Group #10 with role #2 (“Admin”).
- This means they have that level of access in that group’s data.

---

## **3.3 Unified Entities & Permissions**

### **Table: `entity_types`**

| Column          | Type           | Description                                                 |
| --------------- | -------------- | ----------------------------------------------------------- |
| **type_id**     | `SERIAL PK`    | Unique ID for each entity type.                             |
| **type_name**   | `VARCHAR(100)` | Name like “Task,” “Reminder,” “Widget,” “Appointment,” etc. |
| **description** | `TEXT`         | More info for admin reference.                              |
| **created_on**  | `TIMESTAMP`    | Defaults to `CURRENT_TIMESTAMP`.                            |
| **updated_on**  | `TIMESTAMP`    | When last updated.                                          |

**Notes**:

- Admins or super-admins can insert new types: “Form,” “Analytics,” “FileUpload,” etc.

---

### **Table: `entities`**

| Column           | Type           | Description                                                       |
| ---------------- | -------------- | ----------------------------------------------------------------- |
| **entity_id**    | `SERIAL PK`    | Primary key for each entity (item).                               |
| **owner_id**     | `INT NOT NULL` | The “person_id” who primarily owns/created this item.             |
| **group_id**     | `INT`          | If this entity belongs to a group, references `groups(group_id)`. |
| **type_id**      | `INT NOT NULL` | References `entity_types(type_id)` (e.g., “Task,” “Note”).        |
| **title**        | `VARCHAR(255)` | A short label or summary of the item.                             |
| **description**  | `TEXT`         | Longer text or content.                                           |
| **start_at**     | `TIMESTAMP`    | Scheduling field (start time).                                    |
| **end_at**       | `TIMESTAMP`    | Scheduling field (end time).                                      |
| **extra_data**   | `JSONB`        | Store custom fields (e.g., location, tags, or domain-specific).   |
| **vector_embed** | `VECTOR(768)`  | Optional embedding for AI / semantic queries (pgvector).          |
| **created_on**   | `TIMESTAMP`    | Defaults to `CURRENT_TIMESTAMP`.                                  |
| **updated_on**   | `TIMESTAMP`    | Track changes.                                                    |

**Relationship & Usage**:

- **`owner_id`** references `people(person_id)`.
- **`group_id`** is optional. If present, indicates the entity is “tied” to that group.
- **`extra_data`** can hold anything from “doctor_id” to “task_priority” without altering schema.

**Example**:

1. A personal “Buy Groceries” item:
   - `owner_id = 1`, `group_id = NULL`, `type_id` (for “Task”), `title = 'Buy Groceries'`.
2. A “Team Meeting” item in a “Marketing Dept” group:
   - `owner_id = 2` (the person who created it), `group_id = 5` (Marketing), `type_id` (for “Appointment”), `title = 'Weekly Sync'`.

---

### **Table: `entity_permissions`** (Optional if using RLS)

| Column            | Type           | Description                                       |
| ----------------- | -------------- | ------------------------------------------------- |
| **permission_id** | `SERIAL PK`    | Unique row ID for each permission record.         |
| **entity_id**     | `INT NOT NULL` | FK referencing `entities(entity_id)`.             |
| **subject_type**  | `VARCHAR(50)`  | “Person,” “Group,” “Team,” etc.                   |
| **subject_id**    | `INT NOT NULL` | ID of the subject (person_id, group_id, team_id). |
| **access_level**  | `VARCHAR(50)`  | “view,” “edit,” “admin,” etc.                     |
| **created_on**    | `TIMESTAMP`    | Defaults to `CURRENT_TIMESTAMP`.                  |
| **updated_on**    | `TIMESTAMP`    | Track changes.                                    |

**Example**:

- If an entity must be visible only to person_id = 10, insert `(entity_id=99, subject_type='Person', subject_id=10, access_level='view')`.
- If the entire group_id=5 can see it, `(entity_id=99, subject_type='Group', subject_id=5, access_level='view')`.

---

## **3.4 Widgets & Dashboards (Optional Tables)**

If your system provides **configurable dashboards**, you might store **widget definitions** and **user-specific** or **group-specific** widget placements:

```sql
CREATE TABLE widgets (
    widget_id      SERIAL PRIMARY KEY,
    widget_name    VARCHAR(100) NOT NULL, -- e.g. 'CalendarWidget', 'RevenueChart'
    widget_config  JSONB,                -- default or global config for the widget
    created_on     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_on     TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE person_widgets (
    person_widget_id SERIAL PRIMARY KEY,
    person_id        INT NOT NULL,
    widget_id        INT NOT NULL,
    user_config      JSONB, -- user’s overrides (like theme color, data filters)
    position         INT,    -- ordering on the dashboard
    enabled          BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (person_id) REFERENCES people(person_id) ON DELETE CASCADE,
    FOREIGN KEY (widget_id) REFERENCES widgets(widget_id) ON DELETE CASCADE
);
```

**Explanation**:

- **`widgets`**: Global definitions (e.g., “Task List Widget,” “ITR Filing Chart Widget,” “Appointment Viewer”).
- **`person_widgets`**: Each user can enable/disable or reorder these widgets in their personal dashboard.

---

# **4. System Workflow & Examples**

## **4.1 Creating a Person and Their Identity**

1. **Insert** a new row into `people`.
2. **Optionally** assign an identity: “Freelancer,” “Doctor,” etc., in `person_identities`.

**Example**:

```sql
INSERT INTO people (full_name, email_address)
VALUES ('Alice Baker', 'alice@example.com') RETURNING person_id;
```

Then:

```sql
INSERT INTO person_identities (person_id, identity_id)
VALUES (1, 2); -- 1=Alice, 2=Doctor identity
```

## **4.2 Creating a Group and Adding Members**

1. **Insert** into `groups`: “Acme Corp.”
2. **Insert** roles into `group_roles`: “Owner,” “Admin,” “Member.”
3. **Add** membership records in `group_memberships`.

**Example**:

```sql
INSERT INTO groups (group_name) VALUES ('Acme Corp') RETURNING group_id;
-- Suppose it returns group_id = 10

INSERT INTO group_memberships (person_id, group_id, role_id)
VALUES (1, 10, 2); -- Person #1 (Alice) joins Acme with role #2= 'Admin'
```

## **4.3 Creating an Entity (e.g., a Task or Appointment)**

Suppose Alice (person_id=1) wants to create a “Task” entity for personal use:

```sql
-- Insert an entity type for "Task" if it doesn't exist already:
INSERT INTO entity_types (type_name, description)
VALUES ('Task', 'General to-do or action item');

-- Create the entity:
INSERT INTO entities (
  owner_id, group_id, type_id, title, description
)
VALUES (
  1,        -- Alice
  NULL,     -- No group, purely personal
  1,        -- Suppose type_id=1 is 'Task'
  'Buy Groceries',
  'Remember to buy milk and eggs'
);
```

For a **group** item (team meeting in Acme Corp):

```sql
INSERT INTO entities (
  owner_id, group_id, type_id, title, description, start_at, end_at
)
VALUES (
  1,    -- Alice created it
  10,   -- Belongs to Acme Corp
  2,    -- Suppose type_id=2 is 'Appointment'
  'Weekly Team Sync',
  'Discuss ongoing projects',
  '2025-09-01 10:00:00',
  '2025-09-01 11:00:00'
);
```

## **4.4 Fine-Grained Permissions**

If the entire group can see it, you might not need a separate `entity_permissions` record—**unless** you want to limit it to certain subsets.

- Example: Only the “Marketing Team” can see entity #50:

```sql
INSERT INTO entity_permissions (
  entity_id, subject_type, subject_id, access_level
)
VALUES (
  50, 'Team',  7, 'view'
);
```

(Where “7” is the ID of the marketing team.)

---

# **5. Widgets & Dashboards**

1. **Widgets** are pre-built components for tasks, calendars, analytics, etc.
2. **People** can select or reorder these via a table like `person_widgets`.

**Example**:

```sql
INSERT INTO widgets (widget_name, widget_config)
VALUES ('CalendarWidget', '{"default_view":"month"}'),
       ('RevenueChart', '{"chart_type":"bar"}');

INSERT INTO person_widgets (person_id, widget_id, user_config, position)
VALUES (1, 1, '{"color":"blue"}', 1),
       (1, 2, '{"color":"red"}', 2);
```

Now **Alice** sees two widgets: a calendar (position 1) and a revenue chart (position 2).

---

# **6. Production Considerations**

1. **Scalability**

   - **Indexes** on `person_id`, `group_id`, `type_id`, and `entity_id` are crucial.
   - For larger deployments, consider **partitioning** or sharding if data sets become massive.

2. **Row-Level Security vs. Permissions Table**

   - If you prefer **Row-Level Security** (RLS) in Postgres, you can skip the `entity_permissions` table or use it purely for app logic. RLS automatically enforces constraints at the database level.

3. **AI and pgVector**

   - The `vector_embed` column in `entities` supports natural language or semantic searches.
   - Always apply **permission checks** when running similarity queries so that sensitive data doesn’t leak.

4. **Metadata / `extra_data`**

   - Keep it minimal to avoid unbounded JSON growth. For repeated fields, consider more structured columns.

5. **Auditing & Compliance**
   - For healthcare, finance, or enterprise scenarios, you may need an **audit log** table capturing who accessed or changed records.

---

# **7. Sample Use Case & Flow**

### **Scenario**: A Doctor (Alice) at “Sunrise Health” needs to manage personal tasks and hospital appointments.

1. **Person**: Insert Alice in `people` with ID=1.
2. **Group**: Insert “Sunrise Health” in `groups` with ID=20.
3. **Membership**: Insert `(person_id=1, group_id=20, role_id=3)` to indicate she is an “Employee” or “Doctor.”
4. **Entity Types**: “Task” (#1), “Appointment” (#2).
5. **Create** a personal “Task” entity with `group_id=NULL` for “Buy groceries.”
6. **Create** a hospital appointment entity with `group_id=20` for “Patient X Checkup, Monday 9 AM.”
7. **Widgets**:
   - “CalendarWidget” shows all items with a `start_at` for Alice, merging personal + hospital events in one timeline.
   - She can filter by group in the UI if she only wants to see the hospital schedule.

---

# **8. Conclusion**

This **production-grade architecture** provides:

1. **A unified data model** that merges personal tasks/notes with organizational items and roles.
2. **Flexible identity management** so individuals can hold multiple “personas” or identities.
3. **Team or group-based** data sharing with granular permissions.
4. **Extendable** design for advanced features like AI-based search (`pgvector`), custom dashboards, and domain-specific expansions (healthcare, finance, etc.).

Adopting these schemas and design patterns will ensure your software remains **scalable**, **extensible**, and **user-friendly**, no matter how your product grows.

---

## **Appendix: Quick Reference Diagram**

```plaintext
 ┌───────────┐          ┌───────────────────┐          ┌─────────────────┐
 │   people  │ 1 ---- * │ person_identities │ * ---- 1 │   identities    │
 └───────────┘          └───────────────────┘          └─────────────────┘

 ┌───────────┐          ┌───────────────────┐          ┌─────────────────┐
 │   groups  │ 1 ---- * │ group_memberships │ * ---- 1 │  group_roles    │
 └───────────┘          └───────────────────┘          └─────────────────┘

 ┌─────────────────┐
 │  entity_types   │
 └─────────────────┘
            ^
            │ (FK)
            │
 ┌─────────────────────────────────────────────────────────────────────┐
 │                            entities                                 │
 │ (entity_id, owner_id, group_id, type_id, title, ... , vector_embed) │
 └─────────────────────────────────────────────────────────────────────┘
            |
            | (Optional Permissions)
            v
 ┌────────────────────────┐
 │   entity_permissions   │
 └────────────────────────┘

 ┌────────────────────┐
 │     widgets        │  <--- Admin config
 └────────────────────┘
            ^
            │ (FK)
            │
 ┌────────────────────────┐
 │     person_widgets     │  <--- User-specific widget overrides
 └────────────────────────┘
```

Use this as the **foundational blueprint** for all development teams to reference. Feel free to add indexes, triggers, or extra fields as your product evolves.
