Below is a **comprehensive, single-source architecture document** that merges the **existing “One Brain” design** with the **new organizational features**: group/team hierarchies, collaboration tools, workflow automation, and analytics. This document is meant to be **production-grade**—all teams (technical, non-technical, management) should rely on it to understand, build, and extend the system.

---

# **1. Introduction**

## **1.1 Purpose**

The “One Brain” platform aims to **centralize personal and organizational data** into a **single system**. It must accommodate:

1. **Personal usage** (individual tasks, notes, appointments, etc.)
2. **Organizational usage** (team tasks, approvals, analytics dashboards, recurring processes).

This document describes how the **core architecture** supports **all** these use cases seamlessly.

## **1.2 Vision**

1. **Think Better**
   - Capture and organize ideas, notes, tasks in real time, for individuals and teams.
2. **Work Smarter**
   - Streamline daily routines with tasks, reminders, recurring workflows, and integrated calendars.
3. **Achieve More**
   - Provide both **simple** personal productivity features and **powerful** enterprise-level modules (approvals, analytics, collaboration).

---

# **2. Core Concepts**

1. **Unified Data Model**
   - Everything (tasks, notes, appointments, approvals) is an **entity** in the same table.
2. **Personas / Identities**
   - Each user can switch between personal and organizational roles.
3. **Hierarchical Groups**
   - Companies, departments, sub-teams, families—arranged in parent-child relationships.
4. **Granular Permissions**
   - Roles at the group/team level (e.g. “Team Lead,” “Team Member”).
5. **Collaboration & Automation**
   - Shared tasks, comments, activity logs, approval workflows, recurring tasks.
6. **Analytics**
   - Dashboards and widgets that show productivity, budget usage, or any custom reports.

---

# **3. Data Model & Schema**

This section provides **all tables** required to support personal and organizational features. **Every new feature** (team hierarchy, comments, approvals, etc.) appears here in detail.

## **3.1 People & Identities**

### **Table: `people`**

| Column            | Type                           | Description                                  |
| ----------------- | ------------------------------ | -------------------------------------------- |
| **person_id**     | `SERIAL PK`                    | Uniquely identifies each person.             |
| **full_name**     | `VARCHAR(100)`                 | Person’s display name (e.g., “Alice Baker”). |
| **email_address** | `VARCHAR(255) UNIQUE NOT NULL` | Primary email or login credential.           |
| **placeholder**   | `BOOLEAN`                      | For “guest” or “shell” users.                |
| **created_on**    | `TIMESTAMP`                    | Defaults to `CURRENT_TIMESTAMP`.             |
| **updated_on**    | `TIMESTAMP`                    | Timestamp of last update.                    |

### **Table: `identities`**

| Column          | Type          | Description                              |
| --------------- | ------------- | ---------------------------------------- |
| **identity_id** | `SERIAL PK`   | Unique ID for each identity.             |
| **label**       | `VARCHAR(50)` | Name of the persona/identity (“Doctor”). |
| **details**     | `TEXT`        | Additional description of this identity. |
| **created_on**  | `TIMESTAMP`   | Defaults to `CURRENT_TIMESTAMP`.         |
| **updated_on**  | `TIMESTAMP`   | Timestamp for last update.               |

### **Table: `person_identities`**

| Column                                  | Type        | Description                                |
| --------------------------------------- | ----------- | ------------------------------------------ |
| **person_id**                           | `INT`       | FK referencing `people(person_id)`.        |
| **identity_id**                         | `INT`       | FK referencing `identities(identity_id)`.  |
| **assigned_on**                         | `TIMESTAMP` | Defaults to `CURRENT_TIMESTAMP`.           |
| **PRIMARY KEY**(person_id, identity_id) | -           | Ensures uniqueness per (person, identity). |

---

## **3.2 Groups & Hierarchies**

### **Table: `groups`**

| Column              | Type           | Description                                               |
| ------------------- | -------------- | --------------------------------------------------------- |
| **group_id**        | `SERIAL PK`    | Unique group identifier.                                  |
| **group_name**      | `VARCHAR(100)` | Descriptive name (e.g., “Acme Corp,” “Sunrise Hospital”). |
| **parent_group_id** | `INT`          | FK to `groups(group_id)` for hierarchical structure.      |
| **created_on**      | `TIMESTAMP`    | Defaults to `CURRENT_TIMESTAMP`.                          |
| **updated_on**      | `TIMESTAMP`    | Track changes.                                            |

> **Note**: `parent_group_id` can be `NULL` for top-level organizations or set to another `group_id` to form a parent-child hierarchy (e.g., “Marketing Dept” within “Acme Corp”).

### **Table: `group_roles`**

| Column          | Type          | Description                               |
| --------------- | ------------- | ----------------------------------------- |
| **role_id**     | `SERIAL PK`   | Unique role record.                       |
| **role_name**   | `VARCHAR(50)` | E.g., “Owner,” “Admin,” “Team Lead,” etc. |
| **description** | `TEXT`        | Explains privileges or intended usage.    |
| **created_on**  | `TIMESTAMP`   | Defaults to `CURRENT_TIMESTAMP`.          |
| **updated_on**  | `TIMESTAMP`   | Track last update.                        |

### **Table: `group_memberships`**

| Column                               | Type        | Description                            |
| ------------------------------------ | ----------- | -------------------------------------- |
| **person_id**                        | `INT`       | FK referencing `people(person_id)`.    |
| **group_id**                         | `INT`       | FK referencing `groups(group_id)`.     |
| **role_id**                          | `INT`       | FK referencing `group_roles(role_id)`. |
| **joined_on**                        | `TIMESTAMP` | Defaults to `CURRENT_TIMESTAMP`.       |
| **PRIMARY KEY**(person_id, group_id) | -           | One record per (person, group).        |

> Roles determine what a user can do within the group: **Team Lead** can create tasks and assign them; **Team Member** might only view tasks.

---

## **3.3 Unified Entities**

### **Table: `entity_types`**

| Column          | Type           | Description                                              |
| --------------- | -------------- | -------------------------------------------------------- |
| **type_id**     | `SERIAL PK`    | Unique ID for each entity type.                          |
| **type_name**   | `VARCHAR(100)` | E.g., “Task,” “Note,” “Appointment,” “Widget,” “Report.” |
| **description** | `TEXT`         | More info for admin reference.                           |
| **created_on**  | `TIMESTAMP`    | Defaults to `CURRENT_TIMESTAMP`.                         |
| **updated_on**  | `TIMESTAMP`    | When last updated.                                       |

### **Table: `entities`**

| Column           | Type           | Description                                                                 |
| ---------------- | -------------- | --------------------------------------------------------------------------- |
| **entity_id**    | `SERIAL PK`    | Primary key for each entity (item).                                         |
| **owner_id**     | `INT NOT NULL` | The “person_id” who owns/created this item.                                 |
| **group_id**     | `INT`          | If this entity belongs to a group, references `groups(group_id)`.           |
| **type_id**      | `INT NOT NULL` | References `entity_types(type_id)` (e.g. “Task,” “Note,” etc.).             |
| **title**        | `VARCHAR(255)` | A short label or summary of the item.                                       |
| **description**  | `TEXT`         | Longer text or content.                                                     |
| **start_at**     | `TIMESTAMP`    | Scheduling field (start time) for tasks, appointments, events.              |
| **end_at**       | `TIMESTAMP`    | Scheduling field (end time).                                                |
| **extra_data**   | `JSONB`        | Stores custom fields (e.g., priority, assigned_to, recurrence rules, etc.). |
| **vector_embed** | `VECTOR(768)`  | Optional embedding for AI / semantic queries (if using pgvector).           |
| **created_on**   | `TIMESTAMP`    | Defaults to `CURRENT_TIMESTAMP`.                                            |
| **updated_on**   | `TIMESTAMP`    | Track changes.                                                              |

> **Key Points**:
>
> - `extra_data` is central to storing domain-specific data—e.g., `{"task_status":"Pending", "assigned_to":[2,3], "approval_status":"Approved"}`.
> - `group_id` indicates whether the item is personal (`NULL`) or belongs to an organization/team.

### **Table: `entity_permissions`** (Optional if using Row-Level Security)

| Column            | Type           | Description                                       |
| ----------------- | -------------- | ------------------------------------------------- |
| **permission_id** | `SERIAL PK`    | Unique row ID for each permission record.         |
| **entity_id**     | `INT NOT NULL` | FK referencing `entities(entity_id)`.             |
| **subject_type**  | `VARCHAR(50)`  | E.g. “Person,” “Group,” “Team,” etc.              |
| **subject_id**    | `INT NOT NULL` | ID of the subject (person_id, group_id, team_id). |
| **access_level**  | `VARCHAR(50)`  | “view,” “edit,” “admin,” etc.                     |
| **created_on**    | `TIMESTAMP`    | Defaults to `CURRENT_TIMESTAMP`.                  |
| **updated_on**    | `TIMESTAMP`    | Track changes.                                    |

> Most group-level permission checks can be done by referencing `group_memberships`. This table is for **fine-grained exceptions** (e.g., “Only Dr. Bob can see this patient record.”).

---

## **3.4 Collaboration Tools**

### 3.4.1 Comments

**Option A**: Make “Comment” another entity type in `entities`.  
**Option B**: Use a separate `comments` table.

Below is a **dedicated table** approach (common in production):

```sql
CREATE TABLE comments (
    comment_id   SERIAL PRIMARY KEY,
    entity_id    INT NOT NULL,
    author_id    INT NOT NULL,
    content      TEXT NOT NULL,
    created_on   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (entity_id) REFERENCES entities(entity_id) ON DELETE CASCADE,
    FOREIGN KEY (author_id) REFERENCES people(person_id) ON DELETE CASCADE
);
```

- **@Mentions** can be stored or parsed in the `content`. The system might detect “@alice” or “@person_2” to notify that user.

### 3.4.2 Activity Logs / Notifications

Record key events (task created, status changed, comment added) for display in an activity feed.

```sql
CREATE TABLE activity_logs (
    activity_id    SERIAL PRIMARY KEY,
    entity_id      INT,           -- Which entity (task/note/etc.) changed
    actor_id       INT,           -- Who performed the action
    action_type    VARCHAR(50),   -- e.g. 'COMMENT_ADDED','STATUS_UPDATED','APPROVED'
    details        JSONB,         -- Additional data, e.g. {"old_status":"Open","new_status":"Closed"}
    created_on     TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

> **Notifications** can be generated from these logs or stored separately, depending on the UI approach.

---

## **3.5 Basic Workflow Automation**

### 3.5.1 Approval Workflows

**Minimal**: Store a state machine inside `extra_data`:

```json
{
  "approval_status": "Pending"
}
```

When the manager approves:

```json
{
  "approval_status": "Approved",
  "approved_by": 4,
  "approved_on": "2025-01-02 15:30:00"
}
```

**Advanced**: A separate `approvals` table for multi-step flows. Example:

```sql
CREATE TABLE approvals (
    approval_id SERIAL PRIMARY KEY,
    entity_id   INT NOT NULL,      -- The entity under approval
    approver_id INT NOT NULL,      -- Person who can approve
    status      VARCHAR(50),       -- Pending, Approved, Rejected
    created_on  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_on  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (entity_id) REFERENCES entities(entity_id) ON DELETE CASCADE,
    FOREIGN KEY (approver_id) REFERENCES people(person_id) ON DELETE CASCADE
);
```

---

### 3.5.2 Recurring Tasks

**Option A**: Store recurrence in `extra_data` (e.g., `"recurrence_rule":"FREQ=MONTHLY;BYDAY=MO"`).  
**Option B**: A separate `recurring_tasks` table that spawns new entities periodically.

**Extra Data Example**:

```json
{
  "recurrence_rule": "FREQ=WEEKLY;BYDAY=MO",
  "task_status": "Open"
}
```

A **background job** processes these rules and creates new entries in `entities` as needed.

---

## **3.6 Analytics & Insights**

### 3.6.1 Widgets

**Global Widget Definitions**:

```sql
CREATE TABLE widgets (
    widget_id      SERIAL PRIMARY KEY,
    widget_name    VARCHAR(100) NOT NULL, -- e.g., 'CalendarWidget', 'TaskBoardWidget'
    widget_config  JSONB,                -- default or global config
    created_on     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_on     TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3.6.2 Personalized Dashboards

**Per Person**:

```sql
CREATE TABLE person_widgets (
    person_widget_id SERIAL PRIMARY KEY,
    person_id        INT NOT NULL,
    widget_id        INT NOT NULL,
    user_config      JSONB,      -- user’s overrides (filters, color schemes)
    position         INT,         -- ordering on the user’s dashboard
    enabled          BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (person_id) REFERENCES people(person_id) ON DELETE CASCADE,
    FOREIGN KEY (widget_id) REFERENCES widgets(widget_id) ON DELETE CASCADE
);
```

### 3.6.3 Group/Team Dashboards

**Shared**:

```sql
CREATE TABLE group_widgets (
    group_widget_id SERIAL PRIMARY KEY,
    group_id        INT NOT NULL,
    widget_id       INT NOT NULL,
    config          JSONB,  -- e.g. default filters for the entire team
    position        INT,
    enabled         BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (group_id) REFERENCES groups(group_id) ON DELETE CASCADE,
    FOREIGN KEY (widget_id) REFERENCES widgets(widget_id) ON DELETE CASCADE
);
```

- **Example**: A “Team Task Board” for the Marketing Department, showing open tasks (`type_id='Task'`) with `group_id=MarketingDept`.

### 3.6.4 Custom Reports

- Create a new entity type “Report.” Then store the report definition in `extra_data`.
- Example:

  ```sql
  INSERT INTO entity_types (type_name) VALUES ('Report');

  INSERT INTO entities (
    owner_id, group_id, type_id, title, extra_data
  )
  VALUES (
    1,        -- e.g., Admin
    10,       -- group id for "Acme Corp"
    (SELECT type_id FROM entity_types WHERE type_name='Report'),
    'Monthly Budget Usage',
    '{"date_start":"2025-01-01","date_end":"2025-01-31","department_id":12}'
  );
  ```

- A “Report Widget” might read these definitions and render the data.

---

# **4. Putting It All Together: Implementation Workflow**

Below is how various teams (front-end, back-end, DevOps) can use these tables to build the actual features.

## 4.1 Create a Group Hierarchy

1. Insert the top-level org:

   ```sql
   INSERT INTO groups (group_name) VALUES ('Acme Corp');
   -- Suppose group_id=10
   ```

2. Insert a child group (e.g., “Marketing Department”):

   ```sql
   INSERT INTO groups (group_name, parent_group_id)
   VALUES ('Marketing Department', 10);
   -- Suppose group_id=11
   ```

3. Add roles if not present:

   ```sql
   INSERT INTO group_roles (role_name, description)
   VALUES ('Team Lead', 'Can create & assign tasks'),
          ('Team Member', 'Can view tasks');
   ```

4. Assign people to those groups:

   ```sql
   -- Alice is a Team Lead in Acme Corp
   INSERT INTO group_memberships (person_id, group_id, role_id)
   VALUES (1, 10, 2);

   -- Bob is a Team Member in Marketing
   INSERT INTO group_memberships (person_id, group_id, role_id)
   VALUES (2, 11, 3);
   ```

## 4.2 Create & Collaborate on a Task

1. **Alice** creates a group task:

   ```sql
   INSERT INTO entities (
       owner_id, group_id, type_id, title, description, extra_data
   )
   VALUES (
       1,      -- Alice
       11,     -- Marketing Department
       1,      -- Suppose type_id=1 => "Task"
       'Plan Marketing Campaign',
       'Focus on social media strategy',
       '{"assigned_to": [2], "task_status":"Open"}'
   );
   ```

2. **Bob** comments on it:

   ```sql
   INSERT INTO comments (entity_id, author_id, content)
   VALUES ( (the new entity_id from above), 2, 'We need to finalize budget first! @alice');
   ```

3. The system logs that comment:
   ```sql
   INSERT INTO activity_logs (entity_id, actor_id, action_type, details)
   VALUES ( (the same entity_id), 2, 'COMMENT_ADDED', '{"mention":["alice"]}');
   ```

## 4.3 Approval Workflow Example

If a purchase request is needed:

```sql
-- Step 1: Create the request
INSERT INTO entities (
  owner_id, group_id, type_id, title, extra_data
)
VALUES (
  1,       -- Alice
  10,      -- Acme Corp
  5,       -- Suppose type_id=5 => "Purchase Request"
  'Laptop Purchase',
  '{"approval_status":"Pending","cost":1500}'
);

-- Step 2: Manager or "Team Lead" updates it to Approved
UPDATE entities
SET extra_data = jsonb_set(extra_data, '{approval_status}', '"Approved"')
WHERE entity_id = 123;
```

Alternatively, if using the `approvals` table, an approval record is inserted and updated as the item moves through the pipeline.

## 4.4 Recurring Task Example

A weekly staff meeting:

```sql
INSERT INTO entities (
  owner_id, group_id, type_id, title, description, start_at, end_at, extra_data
)
VALUES (
  1,         -- Alice
  10,        -- Acme Corp
  2,         -- Suppose type_id=2 => "Appointment"
  'Weekly Staff Meeting',
  'Discuss project updates',
  '2025-01-06 10:00:00',
  '2025-01-06 10:30:00',
  '{"recurrence_rule":"FREQ=WEEKLY;BYDAY=MO"}'
);
```

A **background job** or **cron** script sees the `recurrence_rule` and auto-creates future events or regenerates them each week.

## 4.5 Analytics & Dashboards

1. **Widgets**: Insert a “TaskBoardWidget” in `widgets`.

   ```sql
   INSERT INTO widgets (widget_name, widget_config)
   VALUES ('TaskBoardWidget', '{"default_filter":"group"}');
   ```

2. **Group Dashboard**:

   ```sql
   INSERT INTO group_widgets (group_id, widget_id, config, position)
   VALUES (
       10,
       (SELECT widget_id FROM widgets WHERE widget_name='TaskBoardWidget'),
       '{"filter":"open_tasks"}',
       1
   );
   ```

   - All members of “Acme Corp” see this board by default (if the UI loads group widgets).

3. **Reports**: A “Monthly Performance Report” entity might store date ranges, department filters, etc., in `extra_data`. Then a “ReportWidget” fetches data accordingly.

---

# **5. Diagram & Reference**

Below is an **integrated ER Diagram** capturing **all** key tables:

```
 ┌───────────┐          ┌───────────────────┐          ┌─────────────────┐
 │   people  │ 1 ---- * │ person_identities │ * ---- 1 │   identities    │
 └───────────┘          └───────────────────┘          └─────────────────┘

 ┌───────────┐                                     ┌─────────────────┐
 │   groups  │ 1 ---- * (child)   parent_group_id   │   groups        │
 └───────────┘                                     └─────────────────┘
         |
         | 1 ---- *
 ┌───────────────────┐          ┌─────────────────┐
 │ group_memberships │ * ---- 1 │  group_roles    │
 └───────────────────┘          └─────────────────┘

 ┌─────────────────┐
 │  entity_types   │
 └─────────────────┘
            ^
            │ (FK)
            │
 ┌─────────────────────────────────────────────────────────────────────┐
 │                            entities                                 │
 │ (entity_id, owner_id, group_id, type_id, title, extra_data, etc.)   │
 └─────────────────────────────────────────────────────────────────────┘
            |
            ├────────────────────────┐
            │                        v
            │                ┌────────────────────────┐
            │                │   entity_permissions   │ (optional)
            │                └────────────────────────┘
            v
   (child via entity_id)
 ┌─────────────┐
 │  comments   │
 └─────────────┘

 ┌─────────────────────┐
 │   activity_logs     │
 └─────────────────────┘

 ┌────────────────────┐         ┌───────────────────────┐
 │     widgets        │  <---   │     group_widgets     │
 └────────────────────┘         └───────────────────────┘
            ^
            │ (FK)
            │
 ┌────────────────────────┐
 │     person_widgets     │
 └────────────────────────┘
```

**Notes**:

- `groups.parent_group_id` allows hierarchical nesting.
- `entities` are always central.
- `comments` & `activity_logs` are linked to `entities(entity_id)`.
- `widgets` tie into both individuals (`person_widgets`) and groups (`group_widgets`).

---

# **6. Production Considerations**

1. **Scalability & Indexing**

   - Index all FK columns (e.g. `person_id`, `group_id`, `entity_id`).
   - Large organizations: consider partitioning or sharding.

2. **Permissions & Security**

   - For **simple** scenarios, rely on `group_memberships` + roles.
   - For **complex** or partial sharing, use `entity_permissions` or **Row-Level Security** (RLS).

3. **Performance**

   - `extra_data` in `JSONB` is flexible but can become large. Evaluate separate tables if you have repeated, structured fields.

4. **AI Integration**

   - The `vector_embed` column can store embeddings for tasks/notes to enable semantic search. Always apply **permission checks** when returning results.

5. **Auditing & Compliance**

   - If your domain is healthcare or finance, logs of user actions (`activity_logs`) and `comments` may require encryption or advanced auditing.

6. **Automation**
   - For recurring tasks, a background scheduler or CRON job is crucial. It parses `extra_data.recurrence_rule` and spawns new items.

---

# **7. Conclusion**

This **unified architecture** empowers BYRAW to scale from personal productivity to complex organizational workflows. By combining:

- **Hierarchical groups** (with roles and memberships),
- **Entities** as the universal container for tasks, notes, appointments, etc.,
- **Collaboration** (comments, mentions, activity logs),
- **Workflow automation** (approvals, recurring tasks),
- **Analytics & dashboards** (widgets for individuals and groups),

…we enable **multiple use cases** (personal, team, or enterprise) under **one** cohesive platform.

---

## **Appendix: Implementation Checklist**

1. **Set Up Core Tables**: `people`, `groups`, `group_memberships`, `entities`, `entity_types`.
2. **Enable Hierarchy**: `parent_group_id` in `groups`.
3. **Enable Collaboration**: `comments`, `activity_logs`.
4. **Enable Automation**: Manage `approval_status` or create an `approvals` table, handle `recurrence_rule`.
5. **Enable Dashboards**: `widgets`, `person_widgets`, `group_widgets`.
6. **Build Services** (API endpoints) around each major feature:
   - **Task Service**: CRUD on `entities` with type “Task.”
   - **Collaboration Service**: Create/read comments, logs, mentions.
   - **Workflow Service**: Manage approvals, statuses, recurrences.
   - **Analytics Service**: Aggregate data for dashboards, generate custom reports.
7. **Security & Permissions**: Enforce `group_memberships` or `entity_permissions` (or RLS).

Following these guidelines ensures all teams—**from front-end developers** to **database administrators**—build features consistently and safely in the “One Brain” ecosystem.
