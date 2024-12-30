# **1. Preliminary Notes & Conventions**

1. **Schema Name**

   - If you have a dedicated schema in PostgreSQL, for example `CREATE SCHEMA byraw;`, you would prefix tables with `byraw.` (e.g., `byraw.people`).
   - For simplicity, the scripts below assume the default schema or a single shared schema.

2. **Timestamps**

   - We consistently use `created_on` and `updated_on` with `DEFAULT CURRENT_TIMESTAMP`.
   - In production, consider adding **ON UPDATE** triggers or stored procedures to automatically refresh `updated_on`.

3. **On Delete Policies**

   - We use `ON DELETE CASCADE` for relationships where child rows should be removed if the parent is removed (e.g., if a `person` is removed, remove that person’s memberships).
   - We use `ON DELETE SET NULL` if we only want to **nullify** the foreign key but not delete the record (e.g., an `entity` referencing a `group_id` can remain if the group is deleted, losing the group link).
   - We use `ON DELETE RESTRICT` if the row should **not** be deleted if a child references it (e.g., you can’t delete a `role` if it’s still in use).

4. **Indexes**

   - Primary keys automatically create a unique index.
   - We add additional indexes on columns frequently used in WHERE clauses or JOINs (e.g. `group_id`, `person_id`).
   - For large-scale production, you might add partial indexes, composite indexes, or other performance tweaks.

5. **Vector Embeddings**
   - The `VECTOR(768)` column requires the **pgvector** extension in PostgreSQL. If not needed, remove it or replace with a `TEXT` placeholder.

---

# **2. People & Identities**

## 2.1 `people`

Maintains **basic user records**.

```sql
CREATE TABLE people (
    person_id       SERIAL          PRIMARY KEY,
    full_name       VARCHAR(100)    NOT NULL,
    email_address   VARCHAR(255)    NOT NULL UNIQUE,
    placeholder     BOOLEAN         NOT NULL DEFAULT FALSE,
    created_on      TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_on      TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Optional: Index for frequent name searches
CREATE INDEX idx_people_full_name ON people (full_name);
```

**Column Details**

- **`person_id`**: Surrogate PK, unique per user.
- **`full_name`**: The user’s display name.
- **`email_address`**: Must be unique. Often used for login or contact.
- **`placeholder`**: If `TRUE`, this indicates a “shell” or “guest” user.
- **`created_on`, `updated_on`**: Timestamps for record lifecycle.

---

## 2.2 `identities`

Represents **various personas** a user can have. For example, “Doctor,” “Freelancer,” “Artist,” etc.

```sql
CREATE TABLE identities (
    identity_id     SERIAL          PRIMARY KEY,
    label           VARCHAR(50)     NOT NULL UNIQUE,
    details         TEXT,
    created_on      TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_on      TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Optional: Index if you filter by label often
CREATE INDEX idx_identities_label ON identities (label);
```

**Column Details**

- **`identity_id`**: PK, each row is one unique identity type.
- **`label`**: Short descriptor (e.g., “Doctor”). Must be unique to avoid collisions.
- **`details`**: Additional notes about the identity.

---

## 2.3 `person_identities`

**Mapping** table to link **people** with **one or more** identities.

```sql
CREATE TABLE person_identities (
    person_id       INT NOT NULL,
    identity_id     INT NOT NULL,
    assigned_on     TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (person_id, identity_id),

    CONSTRAINT fk_person_identities_person
        FOREIGN KEY (person_id)
        REFERENCES people (person_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_person_identities_identity
        FOREIGN KEY (identity_id)
        REFERENCES identities (identity_id)
        ON DELETE CASCADE
);

-- Optional index if filtering by identity_id
CREATE INDEX idx_person_identities_identity_id
    ON person_identities (identity_id);
```

**Column Details**

- **`person_id`**: References `people.person_id`.
- **`identity_id`**: References `identities.identity_id`.
- **`assigned_on`**: Timestamp for when the identity was assigned.

---

# **3. Groups & Roles**

## 3.1 `groups`

Represents **organizations**, **departments**, or any **collective** structure.  
Allows **hierarchies** through `parent_group_id`.

```sql
CREATE TABLE groups (
    group_id            SERIAL          PRIMARY KEY,
    group_name          VARCHAR(100)    NOT NULL,
    parent_group_id     INT,
    created_on          TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_on          TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_groups_parent
        FOREIGN KEY (parent_group_id)
        REFERENCES groups (group_id)
        ON DELETE SET NULL
);

-- Index for quick lookups
CREATE INDEX idx_groups_name ON groups (group_name);

-- Optional: Index for hierarchical queries
CREATE INDEX idx_groups_parent_id ON groups (parent_group_id);
```

**Column Details**

- **`group_id`**: PK for each group.
- **`group_name`**: Descriptive label (e.g., “Acme Corp,” “Marketing Dept”).
- **`parent_group_id`**: Points to another `group_id`, enabling a tree-like structure.

---

## 3.2 `group_roles`

A table of **roles** that can be assigned in groups. For instance, “Owner,” “Admin,” “Team Lead,” “Member.”

```sql
CREATE TABLE group_roles (
    role_id         SERIAL          PRIMARY KEY,
    role_name       VARCHAR(50)     NOT NULL,  -- e.g. "Admin", "Member"
    description     TEXT,
    created_on      TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_on      TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- If you frequently search by role_name:
CREATE INDEX idx_group_roles_name ON group_roles (role_name);
```

**Column Details**

- **`role_id`**: PK.
- **`role_name`**: The textual name of the role.
- **`description`**: Explanation of privileges for that role.

---

## 3.3 `group_memberships`

**Connects** a `person` to a `group` with a specified `role`.

```sql
CREATE TABLE group_memberships (
    person_id       INT NOT NULL,
    group_id        INT NOT NULL,
    role_id         INT NOT NULL,
    joined_on       TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (person_id, group_id),

    CONSTRAINT fk_gm_person
        FOREIGN KEY (person_id)
        REFERENCES people (person_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_gm_group
        FOREIGN KEY (group_id)
        REFERENCES groups (group_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_gm_role
        FOREIGN KEY (role_id)
        REFERENCES group_roles (role_id)
        ON DELETE RESTRICT
);

-- Indexes for faster membership lookups
CREATE INDEX idx_group_memberships_person ON group_memberships (person_id);
CREATE INDEX idx_group_memberships_group ON group_memberships (group_id);
```

**Column Details**

- **`person_id`**: References `people(person_id)`.
- **`group_id`**: References `groups(group_id)`.
- **`role_id`**: References `group_roles(role_id)`.
- **`joined_on`**: When the user joined that group in that role.

---

# **4. Teams (Optional Sub-Group Layer)**

## 4.1 `teams`

If you want a distinct concept of **“Teams”** under a group.

```sql
CREATE TABLE teams (
    team_id     SERIAL          PRIMARY KEY,
    group_id    INT             NOT NULL,
    team_name   VARCHAR(100)    NOT NULL,
    details     TEXT,
    created_on  TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_on  TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_teams_group
        FOREIGN KEY (group_id)
        REFERENCES groups (group_id)
        ON DELETE CASCADE
);

-- Index for quick lookups
CREATE INDEX idx_teams_group_id ON teams (group_id);
CREATE INDEX idx_teams_name ON teams (team_name);
```

**Column Details**

- **`team_id`**: PK for the team.
- **`group_id`**: The parent group/department it belongs to.
- **`team_name`**: Name like “Design Squad,” “Security Team.”

---

## 4.2 `team_members`

Maps people to **teams**, potentially with a sub-role (e.g., “Lead”).

```sql
CREATE TABLE team_members (
    team_id     INT NOT NULL,
    person_id   INT NOT NULL,
    role_name   VARCHAR(50),  -- "Lead", "Reviewer", etc.
    joined_on   TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (team_id, person_id),

    CONSTRAINT fk_tm_team
        FOREIGN KEY (team_id)
        REFERENCES teams (team_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_tm_person
        FOREIGN KEY (person_id)
        REFERENCES people (person_id)
        ON DELETE CASCADE
);

-- Indexes
CREATE INDEX idx_team_members_team ON team_members (team_id);
CREATE INDEX idx_team_members_person ON team_members (person_id);
```

**Column Details**

- **`team_id`**: References `teams(team_id)`.
- **`person_id`**: References `people(person_id)`.
- **`role_name`**: Optional textual role within the team.

---

# **5. Entities & Permissions**

## 5.1 `entity_types`

Defines categories like **Task, Note, Appointment, Report, Widget**, etc.

```sql
CREATE TABLE entity_types (
    type_id         SERIAL          PRIMARY KEY,
    type_name       VARCHAR(100)    NOT NULL UNIQUE,
    description     TEXT,
    created_on      TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_on      TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Already has a unique index on type_name
```

**Column Details**

- **`type_id`**: PK.
- **`type_name`**: Short descriptive label.
- **`description`**: Detailed usage info.

---

## 5.2 `entities`

The **universal “item”** table. All tasks, notes, events, etc. are here.

```sql
CREATE TABLE entities (
    entity_id       SERIAL          PRIMARY KEY,
    owner_id        INT             NOT NULL,
    group_id        INT,
    type_id         INT             NOT NULL,
    title           VARCHAR(255)    NOT NULL,
    description     TEXT,
    start_at        TIMESTAMP,
    end_at          TIMESTAMP,
    extra_data      JSONB,
    vector_embed    VECTOR(768),    -- requires pgvector extension if used
    created_on      TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_on      TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_entities_owner
        FOREIGN KEY (owner_id)
        REFERENCES people (person_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_entities_group
        FOREIGN KEY (group_id)
        REFERENCES groups (group_id)
        ON DELETE SET NULL,

    CONSTRAINT fk_entities_type
        FOREIGN KEY (type_id)
        REFERENCES entity_types (type_id)
        ON DELETE RESTRICT
);

-- Indexes
CREATE INDEX idx_entities_owner     ON entities (owner_id);
CREATE INDEX idx_entities_group     ON entities (group_id);
CREATE INDEX idx_entities_type      ON entities (type_id);
-- If start_at is heavily queried for scheduling:
CREATE INDEX idx_entities_start_at  ON entities (start_at);
```

**Column Details**

- **`entity_id`**: PK.
- **`owner_id`**: The person primarily responsible.
- **`group_id`**: If it belongs to a group. `NULL` if personal.
- **`type_id`**: References `entity_types` (e.g. “Task”).
- **`title`, `description`**: Basic textual fields.
- **`start_at`, `end_at`**: For scheduling, if relevant.
- **`extra_data`**: JSON for domain-specific fields (e.g., `{"priority":"High","approval_status":"Pending"}`).
- **`vector_embed`**: Optional embedding vector for AI-based search.

---

## 5.3 `entity_permissions`

A **fine-grained** permission layer to share entities with specific people, groups, or teams.

```sql
CREATE TABLE entity_permissions (
    permission_id   SERIAL          PRIMARY KEY,
    entity_id       INT             NOT NULL,
    subject_type    VARCHAR(50)     NOT NULL, -- 'Person','Group','Team'
    subject_id      INT             NOT NULL,
    access_level    VARCHAR(50)     NOT NULL, -- 'view','edit','admin','owner'
    created_on      TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_on      TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_entity_permissions_entity
        FOREIGN KEY (entity_id)
        REFERENCES entities (entity_id)
        ON DELETE CASCADE
);

-- Indexes
CREATE INDEX idx_entity_permissions_entity
    ON entity_permissions (entity_id);
CREATE INDEX idx_entity_permissions_subject
    ON entity_permissions (subject_type, subject_id);
```

**Column Details**

- **`entity_id`**: Which entity the permission applies to.
- **`subject_type`**: “Person”, “Group”, or “Team”.
- **`subject_id`**: The `person_id`, `group_id`, or `team_id`.
- **`access_level`**: e.g. “view”, “edit”, “admin”, etc.

---

# **6. Collaboration & Workflow**

## 6.1 `comments`

Allows users to leave **comments** on any entity, forming conversation threads.

```sql
CREATE TABLE comments (
    comment_id   SERIAL          PRIMARY KEY,
    entity_id    INT             NOT NULL,
    author_id    INT             NOT NULL,
    content      TEXT            NOT NULL,
    created_on   TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_comments_entity
        FOREIGN KEY (entity_id)
        REFERENCES entities (entity_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_comments_author
        FOREIGN KEY (author_id)
        REFERENCES people (person_id)
        ON DELETE CASCADE
);

-- Indexes
CREATE INDEX idx_comments_entity    ON comments (entity_id);
CREATE INDEX idx_comments_author    ON comments (author_id);
```

**Column Details**

- **`entity_id`**: The entity being commented on.
- **`author_id`**: The person who wrote the comment.
- **`content`**: The actual text.
- **`created_on`**: Timestamp of comment creation.

---

## 6.2 `activity_logs`

Stores **audit/event** records for changes to entities or other system actions.

```sql
CREATE TABLE activity_logs (
    activity_id    SERIAL          PRIMARY KEY,
    entity_id      INT,
    actor_id       INT,
    action_type    VARCHAR(50)     NOT NULL, -- e.g. "COMMENT_ADDED","STATUS_CHANGED"
    details        JSONB,                  -- extra info, e.g. {"old_status":"Open","new_status":"Closed"}
    created_on     TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_activity_entity
        FOREIGN KEY (entity_id)
        REFERENCES entities (entity_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_activity_actor
        FOREIGN KEY (actor_id)
        REFERENCES people (person_id)
        ON DELETE CASCADE
);

-- Index
CREATE INDEX idx_activity_logs_entity ON activity_logs (entity_id);
CREATE INDEX idx_activity_logs_actor  ON activity_logs (actor_id);
```

**Column Details**

- **`entity_id`**: Which entity changed.
- **`actor_id`**: Who performed the action.
- **`action_type`**: Short code for what happened (e.g. “COMMENT_ADDED”).
- **`details`**: JSON for extra context (e.g. old/new values).

---

## 6.3 `approvals` (Optional)

For **multi-step** or formal approval flows.

```sql
CREATE TABLE approvals (
    approval_id     SERIAL          PRIMARY KEY,
    entity_id       INT             NOT NULL,
    approver_id     INT             NOT NULL,
    status          VARCHAR(50)     NOT NULL DEFAULT 'Pending', -- e.g. "Pending","Approved","Rejected"
    created_on      TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_on      TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_approvals_entity
        FOREIGN KEY (entity_id)
        REFERENCES entities (entity_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_approvals_approver
        FOREIGN KEY (approver_id)
        REFERENCES people (person_id)
        ON DELETE CASCADE
);

-- Indexes
CREATE INDEX idx_approvals_entity   ON approvals (entity_id);
CREATE INDEX idx_approvals_approver ON approvals (approver_id);
```

**Column Details**

- **`entity_id`**: The entity requiring approval (e.g., a “Purchase Request”).
- **`approver_id`**: The person who needs to approve.
- **`status`**: “Pending,” “Approved,” “Rejected.”

---

## 6.4 `recurring_tasks` (Optional)

If you have **auto-generated** tasks/appointments.

```sql
CREATE TABLE recurring_tasks (
    recurring_id  SERIAL          PRIMARY KEY,
    entity_id     INT             NOT NULL, -- references a "template" entity
    rule          VARCHAR(255)    NOT NULL, -- e.g. "FREQ=WEEKLY;BYDAY=MO"
    next_run      TIMESTAMP,              -- when to generate the next instance
    created_on    TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_on    TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_recurring_entity
        FOREIGN KEY (entity_id)
        REFERENCES entities (entity_id)
        ON DELETE CASCADE
);

-- Indexes
CREATE INDEX idx_recurring_tasks_entity  ON recurring_tasks (entity_id);
CREATE INDEX idx_recurring_tasks_next_run ON recurring_tasks (next_run);
```

**Column Details**

- **`entity_id`**: Points to an “Entity” that acts as a **template**.
- **`rule`**: Could store an iCal RRULE string or a custom scheme.
- **`next_run`**: The next datetime a background job will clone this entity.

---

# **7. Analytics & Dashboards**

## 7.1 `widgets`

Defines **global “widget”** types for dashboards (Calendar, Task Board, Charts, etc.).

```sql
CREATE TABLE widgets (
    widget_id      SERIAL          PRIMARY KEY,
    widget_name    VARCHAR(100)    NOT NULL UNIQUE,
    widget_config  JSONB,
    created_on     TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_on     TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Already unique on widget_name, so no separate index needed
```

**Column Details**

- **`widget_id`**: PK for each widget.
- **`widget_name`**: A unique textual identifier (e.g. “CalendarWidget”).
- **`widget_config`**: JSON for default or global settings.

---

## 7.2 `person_widgets`

Stores each **person’s** chosen widgets, order, and config overrides.

```sql
CREATE TABLE person_widgets (
    person_widget_id SERIAL          PRIMARY KEY,
    person_id        INT             NOT NULL,
    widget_id        INT             NOT NULL,
    user_config      JSONB,
    position         INT,
    enabled          BOOLEAN         NOT NULL DEFAULT TRUE,
    created_on       TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_on       TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_pw_person
        FOREIGN KEY (person_id)
        REFERENCES people (person_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_pw_widget
        FOREIGN KEY (widget_id)
        REFERENCES widgets (widget_id)
        ON DELETE CASCADE
);

-- Indexes
CREATE INDEX idx_person_widgets_person
    ON person_widgets (person_id);
CREATE INDEX idx_person_widgets_widget
    ON person_widgets (widget_id);
```

**Column Details**

- **`person_id`**: Which user is customizing the widget.
- **`widget_id`**: The base widget being used.
- **`user_config`**: JSON for user-specific filters or style.
- **`position`**: Order in the user’s dashboard.
- **`enabled`**: If `FALSE`, user has disabled this widget from display.

---

## 7.3 `group_widgets`

Allows **shared widgets** for entire groups/teams (e.g. a “Team Task Board”).

```sql
CREATE TABLE group_widgets (
    group_widget_id SERIAL          PRIMARY KEY,
    group_id        INT             NOT NULL,
    widget_id       INT             NOT NULL,
    config          JSONB,
    position        INT,
    enabled         BOOLEAN         NOT NULL DEFAULT TRUE,
    created_on      TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_on      TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_gw_group
        FOREIGN KEY (group_id)
        REFERENCES groups (group_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_gw_widget
        FOREIGN KEY (widget_id)
        REFERENCES widgets (widget_id)
        ON DELETE CASCADE
);

-- Indexes
CREATE INDEX idx_group_widgets_group
    ON group_widgets (group_id);
CREATE INDEX idx_group_widgets_widget
    ON group_widgets (widget_id);
```

**Column Details**

- **`group_id`**: Which group sees this widget.
- **`widget_id`**: References the base widget.
- **`config`**: JSON for group-level overrides (like filter by “Marketing Dept.”).
- **`position`**: Order on the group dashboard.
- **`enabled`**: If `FALSE`, the widget is hidden from group dashboards.

---

# **8. Extra Implementation Details**

## 8.1 Automatic `updated_on` Handling

By default, Postgres doesn’t automatically refresh `updated_on`.  
You can create a **trigger** like so:

```sql
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_on = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Example trigger for the `entities` table
CREATE TRIGGER tr_entities_updated_on
BEFORE UPDATE ON entities
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();
```

Repeat for any table (e.g., `people`, `groups`, etc.) that needs automated `updated_on` updates.

---

## 8.2 Row-Level Security (Optional)

If you **prefer** Postgres RLS over `entity_permissions`, you can do:

```sql
ALTER TABLE entities ENABLE ROW LEVEL SECURITY;
-- Then define policies per group or user membership
```

But it requires more complex policy definitions. The `entity_permissions` table is a more straightforward approach at the application level.

---

## 8.3 Sample Data (Optional)

You might insert basic roles:

```sql
INSERT INTO group_roles (role_name, description)
VALUES
  ('Owner', 'Full control of the group'),
  ('Admin', 'Manage group settings and members'),
  ('Team Lead', 'Create tasks, assign tasks to members'),
  ('Member', 'View and update tasks assigned to them');
```

---

# **9. Final Schema Recap**

The tables, columns, constraints, and indexes needed are:

1. **People & Identities**
   - `people`
   - `identities`
   - `person_identities`
2. **Groups & Roles**
   - `groups` (with `parent_group_id`)
   - `group_roles`
   - `group_memberships`
3. **(Optional) Teams**
   - `teams`
   - `team_members`
4. **Core Entities**
   - `entity_types`
   - `entities` (the universal container)
   - `entity_permissions` (fine-grained sharing)
5. **Collaboration & Workflow**
   - `comments`
   - `activity_logs`
   - `approvals` (optional)
   - `recurring_tasks` (optional)
6. **Widgets & Dashboards**
   - `widgets`
   - `person_widgets`
   - `group_widgets`
