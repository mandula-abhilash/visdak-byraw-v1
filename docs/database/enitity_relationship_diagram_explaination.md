# **1. Overview of the Diagram**

The diagram shows **tables** (the boxes) and their **columns** inside.  
**Lines** between tables represent **relationships** (e.g., how one table references another).  
Each table has a **primary key** (PK), often labeled, and possibly **foreign keys** (FK) pointing to columns in other tables.

In a nutshell, the schema lets us:

1. **Store people** (the end-users or system participants).
2. **Organize** them into **groups**, **teams**, and **roles**.
3. **Capture everything** users do (tasks, appointments, notes) as **entities**.
4. **Control permissions**, comments, activity logs, approvals, recurring tasks.
5. **Customize dashboards** (widgets) for individuals or entire groups.

---

# **2. People & Identities**

## **2.1 `people` Table**

- **Purpose**: Holds **basic info** about each individual (name, email, etc.).
- **Key Columns**:
  - **`person_id`** (PK): a unique integer ID.
  - **`full_name`**: e.g. “Alice Baker.”
  - **`email_address`**: unique for each person.
  - **`placeholder`**: indicates “guest” or “shell” account if `TRUE`.

### **Why It Matters**

Everyone in the system (employees, contractors, patients, etc.) will have a **row** here.

---

## **2.2 `identities` Table**

- **Purpose**: Defines **“persona” labels** that a user might assume.
- **Examples**: “Doctor,” “Freelancer,” “Student.”

### **Key Columns**

- **`identity_id`** (PK).
- **`label`**: short descriptor (must be unique).
- **`details`**: optional text for more info (e.g., “Surgeon specializing in orthopedics”).

---

## **2.3 `person_identities` Table (Link)**

- **Purpose**: **Merges** `people` and `identities` in a many-to-many relationship.

### **Example**

- If “Alice” (person_id=1) has the “Doctor” identity (identity_id=2), we insert `(1,2)` here.

---

# **3. Groups & Roles**

## **3.1 `groups` Table**

- **Purpose**: Represents **organizations** (e.g. “Acme Corp”) or **sub-divisions** (e.g. “Marketing Dept”).
- **`parent_group_id`**: allows groups to nest under a **parent** group, forming a **hierarchy**.

### **Key Columns**

- **`group_id`** (PK).
- **`group_name`**: e.g. “Acme Corp,” “Marketing Dept.”
- **`parent_group_id`** (FK to `groups.group_id`): references a **parent** group (or `NULL` if top-level).

---

## **3.2 `group_roles` Table**

- **Purpose**: Lists possible **roles** in a group, like “Owner,” “Admin,” “Team Lead,” “Member.”

### **Key Columns**

- **`role_id`** (PK).
- **`role_name`**: e.g. “Admin.”
- **`description`**: What that role entails.

---

## **3.3 `group_memberships` Table (Link)**

- **Purpose**: Links a **person** to a **group**, along with their **role**.
- **One person** can be in **many** groups, and **one group** can have **many** people.

### **Example**

- If Bob (person_id=2) is an “Admin” (role_id=1) in “Acme Corp” (group_id=10), we insert:
  - `(person_id=2, group_id=10, role_id=1)`.

---

# **4. Teams (Optional Sub-Group Layer)**

Some organizations might want a **finer breakdown** below the “group” level (for projects, squads, specialized teams). These two tables handle that scenario.

## **4.1 `teams` Table**

- **Purpose**: A **sub-entity** of a `group`. For instance, “Design Team” under “Marketing Dept.”
- **Key Columns**:
  - **`team_id`** (PK).
  - **`group_id`** (FK): The **parent group**.

### **Why It Matters**

If “Marketing Dept” is a group, they can have multiple **teams** (“Social Media Team,” “Product Launch Team”).

---

## **4.2 `team_members` Table (Link)**

- **Purpose**: Many-to-many link between `people` and `teams`.
- **You can** store an extra `role_name` here if you want “Team Lead” vs. “Team Member.”

### **Example**

- If Alice (person_id=1) joins the “Design Team” (team_id=5) as “Lead,” you’d insert:
  - `(team_id=5, person_id=1, role_name='Lead')`.

---

# **5. Entities & Permissions**

## **5.1 `entity_types` Table**

- **Purpose**: Defines **categories** of items (e.g., “Task,” “Note,” “Appointment,” “PurchaseRequest”).

### **Key Columns**

- **`type_name`**: e.g. “Task.”
- **`description`**: A short explanation, if needed.

---

## **5.2 `entities` Table**

- **Purpose**: **Central** table for **all items**. A row here could represent a:
  - **Task** (“Finish report”)
  - **Appointment** (“Doctor visit next Monday”)
  - **Note** (“Project brainstorm ideas”)
  - etc.
- **Key Columns**:
  - **`owner_id`** (FK to `people`): who owns or created it.
  - **`group_id`** (FK to `groups`): which group it belongs to, if any.
  - **`type_id`** (FK to `entity_types`): what kind of item it is.
  - **`title`**, **`description`**: textual details.
  - **`start_at`, `end_at`**: scheduling times.
  - **`extra_data`**: flexible JSON field for custom attributes (e.g., “priority”: “High”).
  - **`vector_embed`**: optional AI embedding.

### **Why It Matters**

Everything from personal tasks to corporate documents can be stored uniformly, making it easy to query or filter.

---

## **5.3 `entity_permissions` Table (Optional)**

- **Purpose**: **Fine-grained** sharing.
- If you want to specify exactly who can “view,” “edit,” or “admin” an entity, you add rows here.
- **`subject_type`**: can be “Person,” “Group,” or “Team.”
- **`subject_id`**: the actual ID of that person/group/team.

### **Use Case**

- “Only Person #7 can edit this entity,” or “Group #10 can view this entity.”

---

# **6. Collaboration & Workflow**

These tables extend functionality for **comments**, **logs**, **approvals**, and **recurring tasks**.

## **6.1 `comments` Table**

- **Purpose**: Let people **comment** on an `entity` (like posting messages on a task).
- **Key Columns**:
  - **`entity_id`** (FK to `entities`): which item is being commented on.
  - **`author_id`** (FK to `people`): who wrote the comment.
  - **`content`**: the message text.
  - **`created_on`**: timestamp of comment.

### **Example**

- “@Bob, can you finalize the report?” is stored as a row referencing the “report” entity.

---

## **6.2 `activity_logs` Table**

- **Purpose**: **Audit trail** or **history** of events. Records changes in an entity or system actions.
- **Key Columns**:
  - **`entity_id`**: which entity changed.
  - **`actor_id`**: who triggered the change.
  - **`action_type`**: short label (e.g. “COMMENT_ADDED”, “STATUS_UPDATED”).
  - **`details`**: JSON with extra info.

### **Example**

- If someone changes a task from “Open” to “Closed,” an **activity_logs** row can store that event.

---

## **6.3 `approvals` Table (Optional)**

- **Purpose**: For **multi-step** or official approval processes (e.g., “Pending → Approved/Rejected”).
- **Key Columns**:
  - **`entity_id`**: which entity requires approval.
  - **`approver_id`**: who can approve/reject.
  - **`status`**: “Pending,” “Approved,” “Rejected.”

### **Example**

- A “Purchase Request” entity can have multiple `approvals` rows for different managers.

---

## **6.4 `recurring_tasks` Table (Optional)**

- **Purpose**: Automate creation of repeated tasks/appointments (weekly, monthly, etc.).
- **Key Columns**:
  - **`entity_id`**: references a “template” entity.
  - **`rule`**: e.g. “FREQ=WEEKLY;BYDAY=MO.”
  - **`next_run`**: next date/time to spawn a new occurrence.

### **Example**

- “Team Meeting every Monday at 10 AM.” The system checks `recurring_tasks` to generate new entities on schedule.

---

# **7. Widgets & Dashboards**

## **7.1 `widgets` Table**

- **Purpose**: Holds the **global definition** of each widget type (e.g. “CalendarWidget,” “TaskBoardWidget”).
- **Key Columns**:
  - **`widget_name`**: unique label.
  - **`widget_config`**: JSON for default settings.

---

## **7.2 `person_widgets` Table**

- **Purpose**: Tracks which widgets a **person** uses, their ordering, and custom config.
- **Key Columns**:
  - **`person_id`** (FK): whose dashboard it is.
  - **`widget_id`** (FK): which global widget they’re using.
  - **`position`**: the widget’s order on their screen.

### **Example**

- If Alice wants a “CalendarWidget” at the top (position=1), we insert `(person_id=Alice, widget_id=Calendar, position=1)` here.

---

## **7.3 `group_widgets` Table**

- **Purpose**: Let an **entire group** share a widget-based dashboard (e.g., a “Team Task Board”).
- **Key Columns**:
  - **`group_id`** (FK to `groups`).
  - **`widget_id`** (FK to `widgets`).
  - **`config`**: JSON overrides for group-wide settings.

### **Example**

- “Marketing Dept” (group_id=5) has a “TaskBoardWidget” (widget_id=2) showing only tasks under the marketing group. Insert `(group_id=5, widget_id=2, config={...})`.

---

# **8. Putting It All Together**

## **8.1 Typical Setup Flow**

1. **Create People**
   - Insert rows in `people`.
2. **Set Up Groups**
   - Insert rows in `groups` (e.g., “Acme Corp,” “HR Dept”).
   - If needed, nest them via `parent_group_id`.
3. **Define Roles & Memberships**
   - Insert `group_roles` (like “Owner,” “Admin,” “Member”).
   - Add `group_memberships` to link each person to a group with a role.
   - (Optionally) create `teams` within a group, then `team_members`.
4. **Entity Types & Entities**
   - Insert `entity_types` (“Task,” “Note,” etc.).
   - Users create new items in `entities` referencing the appropriate `type_id`.
   - If needed, set `entity_permissions` for custom sharing rules.
5. **Collaboration & Workflow**
   - Add `comments` for discussions on entities.
   - Use `activity_logs` to record status changes or events.
   - If multi-step sign-off is needed, create `approvals` rows.
   - If repeating tasks, define them in `recurring_tasks`.
6. **Widgets & Dashboards**
   - Define global widgets in `widgets`.
   - For personal dashboards, insert `person_widgets`.
   - For shared group dashboards, insert `group_widgets`.

---

## **8.2 Example: A New Project Team**

1. **Add People**
   - “Alice” (person_id=1), “Bob” (person_id=2).
2. **Create Group**
   - “Marketing Dept” in `groups` (group_id=10).
3. **Roles**
   - “Team Lead” (role_id=2), “Member” (role_id=3) in `group_roles`.
4. **Group Membership**
   - Alice = Team Lead, so `(person_id=1, group_id=10, role_id=2)`.
   - Bob = Member, so `(person_id=2, group_id=10, role_id=3)`.
5. **Create a Team** (optional)
   - “Design Squad” under `group_id=10` in `teams`.
   - Alice and Bob join `team_members` with `(team_id=5, person_id=1, role_name='Lead')`, `(team_id=5, person_id=2, role_name='Member')`.
6. **Entity Types**
   - Insert “Task” (type_id=1), “Note” (type_id=2).
7. **Entities**
   - Alice creates a “Task” entity with `owner_id=1, group_id=10, type_id=1, title='Plan Marketing Campaign'`.
8. **Collaboration**
   - Bob comments in `comments`: `(entity_id=theTaskID, author_id=2, content='We need budget approval!')`.
   - The system logs it in `activity_logs`.
   - Optionally, create an approval process in `approvals` for a budget request.
9. **Recurring**
   - If they have a standing Monday meeting, define `recurring_tasks` with a rule “FREQ=WEEKLY;BYDAY=MO.”
10. **Widgets**

- `widgets`: “TaskBoardWidget.”
- `group_widgets`: `(group_id=10, widget_id=TaskBoardWidget, config={filter:'Marketing'})`.

---

# **9. Conclusion**

1. **People & Identities**: Keep track of **who** is in the system and **what personas** they have.
2. **Groups & Teams**: Organize those people into **companies**, **departments**, and **specialized teams**.
3. **Entities & Permissions**: Everything (tasks, notes, appointments) goes in a single table, with optional **fine-grained** access control.
4. **Collaboration & Workflow**: Use **comments**, **activity_logs**, **approvals**, and **recurring_tasks** to handle discussions, auditing, approvals, and repeating tasks.
5. **Widgets & Dashboards**: Let individuals or entire groups configure their **UI** via **widgets**.

By **understanding** each table’s **purpose** and the **relationships** between them, your team (technicians, DB devs, QA testers, admins) can confidently **build, extend, and troubleshoot** the platform—whether for personal tasks or enterprise-scale organizational workflows.
