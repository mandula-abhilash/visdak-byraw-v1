## **1. People & Identities**

### **A. `people`**

- **Purpose**: Holds basic information about each individual in the system.
- **Possible Use Cases**: End users, placeholders, etc.

```sql
CREATE TABLE people (
    person_id       SERIAL      PRIMARY KEY,
    full_name       VARCHAR(100) NOT NULL,
    email_address   VARCHAR(255) UNIQUE NOT NULL,
    placeholder     BOOLEAN     DEFAULT FALSE,
    created_on      TIMESTAMP   DEFAULT CURRENT_TIMESTAMP,
    updated_on      TIMESTAMP   DEFAULT CURRENT_TIMESTAMP
);
```

**Columns**:

- `person_id`: PK to identify each person.
- `full_name`: Display name.
- `email_address`: Login or contact info.
- `placeholder`: Similar to `is_dummy`—indicates a temporary record.
- `created_on` / `updated_on`: Timestamps.

---

### **B. `identities`**

- **Purpose**: Represents different “persona” contexts (e.g., “Doctor,” “Freelancer,” “Student”).
- **Why?**: Some users want separate dashboards or configurations for each identity type.

```sql
CREATE TABLE identities (
    identity_id     SERIAL      PRIMARY KEY,
    label           VARCHAR(50) UNIQUE NOT NULL,  -- e.g. "Doctor"
    details         TEXT,
    created_on      TIMESTAMP   DEFAULT CURRENT_TIMESTAMP,
    updated_on      TIMESTAMP   DEFAULT CURRENT_TIMESTAMP
);
```

**Columns**:

- `identity_id`: PK for identity record.
- `label`: A short name for the identity (must be unique).
- `details`: Optional textual description.

---

### **C. `person_identities`** (Many-to-Many)

- **Purpose**: Links people to their possible identities.

```sql
CREATE TABLE person_identities (
    person_id       INT NOT NULL,
    identity_id     INT NOT NULL,
    assigned_on     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (person_id, identity_id),
    CONSTRAINT fk_person
        FOREIGN KEY (person_id)
        REFERENCES people (person_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_identity
        FOREIGN KEY (identity_id)
        REFERENCES identities (identity_id)
        ON DELETE CASCADE
);
```

---

## **2. Groups & Roles**

### **A. `groups`**

- **Purpose**: Represents any collective entity (e.g., company, hospital, school, family).
- **Equivalent to** “organizations” in some designs.

```sql
CREATE TABLE groups (
    group_id        SERIAL      PRIMARY KEY,
    group_name      VARCHAR(100) NOT NULL,
    created_on      TIMESTAMP   DEFAULT CURRENT_TIMESTAMP,
    updated_on      TIMESTAMP   DEFAULT CURRENT_TIMESTAMP
);
```

---

### **B. `group_roles`**

- **Purpose**: Predefined roles within a group (e.g., “Owner,” “Admin,” “Member,” etc.).
- **Approach**: Use an enum or a separate table. Below is a table approach.

```sql
-- If you still want an enum, you can create it similarly,
-- but here is a table-based approach for more flexibility.
CREATE TABLE group_roles (
    role_id         SERIAL      PRIMARY KEY,
    role_name       VARCHAR(50) NOT NULL,  -- e.g. 'Owner'
    description     TEXT,
    created_on      TIMESTAMP   DEFAULT CURRENT_TIMESTAMP,
    updated_on      TIMESTAMP   DEFAULT CURRENT_TIMESTAMP
);
```

---

### **C. `group_memberships`**

- **Purpose**: Connects `people` with `groups` in a specific `role`.

```sql
CREATE TABLE group_memberships (
    person_id       INT NOT NULL,
    group_id        INT NOT NULL,
    role_id         INT NOT NULL,
    joined_on       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (person_id, group_id),
    CONSTRAINT fk_person
        FOREIGN KEY (person_id)
        REFERENCES people (person_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_group
        FOREIGN KEY (group_id)
        REFERENCES groups (group_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_role
        FOREIGN KEY (role_id)
        REFERENCES group_roles (role_id)
        ON DELETE RESTRICT
);
```

---

## **3. Configuration Tables** (Optional)

If you still want to store JSON-based UI or role configs, you can rename them:

### **A. `identity_configs`**

```sql
CREATE TABLE identity_configs (
    config_id       SERIAL PRIMARY KEY,
    identity_id     INT NOT NULL,
    config_data     JSONB NOT NULL,
    created_on      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_on      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_identity
        FOREIGN KEY (identity_id)
        REFERENCES identities (identity_id)
        ON DELETE CASCADE
);
```

### **B. `group_role_configs`**

```sql
CREATE TABLE group_role_configs (
    config_id       SERIAL PRIMARY KEY,
    group_id        INT NOT NULL,
    role_id         INT NOT NULL,
    config_data     JSONB NOT NULL,
    created_on      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_on      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_group
        FOREIGN KEY (group_id)
        REFERENCES groups (group_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_role
        FOREIGN KEY (role_id)
        REFERENCES group_roles (role_id)
        ON DELETE CASCADE
);
```

---

## **4. Unified Items & Permissions**

### **A. `entity_types`**

- **Purpose**: Admin-defined categories for what you store (e.g., “Task,” “Reminder,” “Appointment,” “Note,” “AnalyticsWidget,” etc.).

```sql
CREATE TABLE entity_types (
    type_id         SERIAL      PRIMARY KEY,
    type_name       VARCHAR(100) NOT NULL UNIQUE,
    description     TEXT,
    created_on      TIMESTAMP   DEFAULT CURRENT_TIMESTAMP,
    updated_on      TIMESTAMP   DEFAULT CURRENT_TIMESTAMP
);
```

---

### **B. `entities`**

- **Purpose**: The single “second brain” table that holds all items.
- **Examples**: A personal task, a work appointment, a note, a receipt, etc.

```sql
CREATE TABLE entities (
    entity_id       SERIAL      PRIMARY KEY,
    owner_id        INT         NOT NULL,   -- references people(person_id)
    group_id        INT,                   -- optional if tied to a group
    type_id         INT         NOT NULL,   -- references entity_types
    title           VARCHAR(255) NOT NULL,
    description     TEXT,
    start_at        TIMESTAMP,             -- for scheduled items
    end_at          TIMESTAMP,             -- optional end time
    extra_data      JSONB,                 -- store custom fields or domain-specific data
    vector_embed    VECTOR(768),           -- for pgvector usage, if needed
    created_on      TIMESTAMP   DEFAULT CURRENT_TIMESTAMP,
    updated_on      TIMESTAMP   DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_owner
        FOREIGN KEY (owner_id)
        REFERENCES people (person_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_group
        FOREIGN KEY (group_id)
        REFERENCES groups (group_id)
        ON DELETE SET NULL,

    CONSTRAINT fk_type
        FOREIGN KEY (type_id)
        REFERENCES entity_types (type_id)
        ON DELETE RESTRICT
);
```

**Notes**:

- **`owner_id`**: The primary user responsible for the entity.
- **`group_id`**: If it belongs to a group, store a reference. If personal, leave `NULL`.
- **`extra_data`**: Flexible JSON for domain-specific fields.
- **`vector_embed`**: If using pgvector for advanced search or AI queries.

---

### **C. `entity_permissions`** (If not using Postgres Row-Level Security)

- **Purpose**: Allows sharing an entity with certain people, groups, or subsets (teams, etc.) at different permission levels.

```sql
CREATE TABLE entity_permissions (
    permission_id   SERIAL      PRIMARY KEY,
    entity_id       INT         NOT NULL,  -- references entities(entity_id)
    subject_type    VARCHAR(50) NOT NULL,  -- 'Person', 'Group', 'Team', etc.
    subject_id      INT         NOT NULL,  -- e.g. person_id or group_id
    access_level    VARCHAR(50) NOT NULL,  -- 'view', 'edit', 'owner' etc.
    created_on      TIMESTAMP   DEFAULT CURRENT_TIMESTAMP,
    updated_on      TIMESTAMP   DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_entity
        FOREIGN KEY (entity_id)
        REFERENCES entities (entity_id)
        ON DELETE CASCADE
);
```

**How it works**:

- If `subject_type = 'Person'` and `subject_id = 10`, that means a specific `person_id=10` can access the entity.
- If `subject_type = 'Group'` and `subject_id = 3`, the entire `group_id=3` can see it (or see it at a specific “view/edit” level).

Your **application logic** or **queries** check these permission records to see if a requesting user is allowed to see the data.

---

## **5. (Optional) Teams or Subgroups**

If you want specialized subgroups inside a bigger group, you can add:

### **A. `teams`**

```sql
CREATE TABLE teams (
    team_id     SERIAL      PRIMARY KEY,
    group_id    INT         NOT NULL,
    team_name   VARCHAR(100) NOT NULL,
    details     TEXT,
    created_on  TIMESTAMP   DEFAULT CURRENT_TIMESTAMP,
    updated_on  TIMESTAMP   DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_group
        FOREIGN KEY (group_id)
        REFERENCES groups (group_id)
        ON DELETE CASCADE
);
```

### **B. `team_members`**

```sql
CREATE TABLE team_members (
    team_id     INT NOT NULL,
    person_id   INT NOT NULL,
    role_name   VARCHAR(50),  -- e.g., 'Lead', 'Assistant'
    joined_on   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (team_id, person_id),

    FOREIGN KEY (team_id) REFERENCES teams(team_id) ON DELETE CASCADE,
    FOREIGN KEY (person_id) REFERENCES people(person_id) ON DELETE CASCADE
);
```

Then in `entity_permissions`, you could have `subject_type='Team'` with `subject_id=<team_id>`.

---

## **6. Summary of the Brand-New Schema**

1. **People & Identities**
   - `people` / `identities` / `person_identities`
2. **Groups & Roles**
   - `groups`, `group_roles`, `group_memberships`
3. **Optional Config Tables**
   - `identity_configs`, `group_role_configs`
4. **Unified Items**
   - `entity_types` (admin-defined) and `entities` (all your tasks, notes, appointments, etc.)
5. **Permissions**
   - `entity_permissions` to share items with individuals, groups, or teams
6. **Optional Teams**
   - `teams` / `team_members` to define subgroups within a group if needed.

This approach is **modular** and **extensible**, giving you:

- A single place (`entities`) to store everything.
- Fine-grained or broad permissions (`entity_permissions`).
- The ability to handle multiple roles, groups, or “identities” elegantly.

You can now build a **“Second Brain”** system with flexible dashboards, personal or organizational contexts, and advanced AI-based search (via `vector_embed`)—all while having a clean, from-scratch naming scheme.
