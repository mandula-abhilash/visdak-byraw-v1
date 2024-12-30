# **Admin Dashboard: Phase 1 Requirements (New Schema Edition)**

## **1. Overview**

We aim to create an **Admin Dashboard** that allows administrators to manage:

1. **People** and their **identities** (like “Doctor,” “Freelancer,” “Student”).
2. **Groups** (e.g., “Sunrise Hospital,” “Acme Corp”) and **roles** within those groups.
3. **Entity Types** (like “Task,” “Appointment,” “Note”) and the **Entities** themselves (individual records).
4. **Permissions** and **Configurations** so each role or person gets the correct **widgets** or **panels** on their dashboard.

This **Phase 1** focuses on providing **straightforward CRUD** (Create, Read, Update, Delete) functionality for the essential tables, plus a **configuration** mechanism so roles or people can have **predefined** or **custom** dashboard layouts.

---

## **2. Core Concepts to Manage**

### 2.1 **People & Identities**

- **People**: The main table storing user info (name, email, etc.). Each user is a “person.”
- **Identities**: Labels for personas/roles in daily life (e.g., “Doctor,” “Freelancer,” “Engineer”).
- **`person_identities`**: Junction table linking **people** and **identities** (many-to-many).

### 2.2 **Groups & Roles**

- **Groups**: Organizational structures (companies, hospitals, etc.).
- **Group Roles**: “Owner,” “Admin,” “Member,” etc. Each group can have multiple roles.
- **Group Memberships**: Connect a person to a group **with** a specific role.

### 2.3 **Entity Types & Entities**

- **Entity Types**: Like “Task,” “Appointment,” “Note,” “File,” etc.
- **Entities**: The actual items. Each one **references** a type (e.g., a `type_id` for “Task”), an owner, and optionally a group.

### 2.4 **Permissions & Configurations**

- **Entity Permissions**: Fine-grained sharing (e.g., certain people or groups see an entity).
- **Role Configurations** (JSON-based): Decide **which widgets** or **panels** a role can use.
- **Person Overrides**: If a specific user wants different widgets than their role’s default.

---

## **3. Phase 1 Admin Tasks**

In **Phase 1**, the Admin Dashboard must let administrators:

1. **Manage People & Identities**

   - Create, read, update, delete **people**.
   - Create, read, update, delete **identities** (e.g., “Doctor”).
   - Assign or remove identities from a person.

2. **Manage Groups & Roles**

   - Create, read, update, delete **groups** (e.g., “Sunrise Hospital”).
   - Create, read, update, delete **group roles** (e.g., “Doctor,” “Admin”).
   - Assign people to groups with specific roles (group memberships).

3. **(Optional) Manage Entity Types & Entities**

   - Possibly let admins create/edit **entity types** (e.g., “Task,” “File”).
   - Possibly let them view or create test **entities**.

4. **Configure Dashboards**
   - Create or edit **role-based** JSON configs.
   - (Optional) Person-level overrides if a single user needs something special.

Everything else (like `comments`, `activity_logs`, `approvals`, `recurring_tasks`) can be handled later or in specialized dashboards. **Phase 1** focuses on the main system tables for people, groups, roles, and basic configurations.

---

## **4. Detailed Requirements**

### **4.1 People & Identities**

#### 4.1.1 People

- **List People**
  - A table or grid showing all rows in the `people` table.
- **Create Person**
  - A form collecting `full_name`, `email_address`, and optionally `placeholder`.
- **Edit Person**
  - Update existing fields. Possibly show warnings if changing an email.
- **Delete Person**
  - Confirmation. If the person belongs to any group, decide if you allow or block.

#### 4.1.2 Identities

- **List Identities**
  - A table of “Doctor,” “Student,” “Freelancer,” etc.
- **Create Identity**
  - Minimal form: `label` (unique) + optional `details`.
- **Edit Identity**
  - Update `label` or `details`.
- **Delete Identity**
  - Confirmation. If it’s in use by any `person_identities`, handle carefully.

#### 4.1.3 Person-Identity Assignments

- A sub-page or modal to **link** a person with one or more identities.
- Example: Admin picks “Alice” → selects identity “Doctor” → clicks “Assign.”

---

### **4.2 Groups & Roles**

#### 4.2.1 Groups

- **List Groups**
  - Show “Acme Corp,” “Sunrise Hospital,” etc.
- **Create Group**
  - Form with `group_name`. Possibly a `parent_group_id` if you want hierarchy in Phase 1.
- **Edit Group**
  - Rename or set `parent_group_id`.
- **Delete Group**
  - Confirmation. If it has members or child groups, you might block or require reassignments.

#### 4.2.2 Group Roles

- **List Roles** in a selected group
  - e.g., “Owner,” “Admin,” “Member.”
- **Create Role**
  - Provide `role_name` and `description`.
- **Edit Role**
  - Possibly rename.
- **Delete Role**
  - If people are using it, confirm or block.

#### 4.2.3 Group Membership

- **Add Person to Group**
  - Choose `person_id`, `group_id`, `role_id`.
- **View Members**
  - Show a table of `(person, role)` for that group.
- **Remove Member**
  - Confirmation: “Remove Bob from ‘Sunrise Hospital’?”

---

### **4.3 Entity Types & Entities** (Optional in Phase 1)

- **Entity Types**
  - Let admin create new types, e.g. “Document,” “Invoice,” “CaseFile.”
  - Or keep them fixed if your system doesn’t allow custom definitions.
- **Entities**
  - Admin might want to see existing items for debugging or testing.
  - Possibly create “test tasks” or “test appointments” to confirm features work.

---

### **4.4 Role Configurations (JSON)**

- **Purpose**: Let the admin define **widget layouts** or **UI panels** for each role.
- **Example** JSON:
  ```json
  {
    "layout": ["CalendarPanel", "TaskListPanel"],
    "theme": "light",
    "defaultFilters": { "task_status": "open" }
  }
  ```
- **Actions**:
  - **Create** a new config: choose a role, paste JSON.
  - **Edit** an existing config: load the JSON in a code editor or form.
  - **Delete** a config: confirm before removing.

#### 4.4.1 Storage

- Might go into a dedicated `group_role_configs` or `role_configurations` table.
- Alternatively, store in `extra_data` in `group_roles`.
- The Admin Dashboard should provide a simple JSON editor or key-value UI.

---

### **4.5 Person Overrides** (Optional)

- If a single user wants a unique layout, override the defaults.
- **Actions**:
  - Create override → store custom JSON for that user.
  - Edit override → update JSON.
  - Delete override → revert to role-based default.

---

## **5. Workflow Scenarios**

1. **New Employee Onboarding**

   1. Admin goes to **People** → **Create Person** (“Alice”, `alice@example.com`).
   2. Optionally assigns **identities** (e.g., “Doctor”).
   3. Admin goes to **Groups** → selects “Sunrise Hospital” → **Add Person** → picks “Alice,” role “Admin.”
   4. If needed, admin sets a **role config** for “Admin” to see “ManagementPanel,” “StatisticsWidget,” etc.

2. **Removing a User**

   1. Admin finds “Bob” in the **People** listing.
   2. Sees Bob is in “Sunrise Hospital” as a “Doctor.”
   3. Removes Bob from that group membership.
   4. Deletes Bob’s person record (if fully removing from the system).

3. **Updating Role Config**
   1. Admin edits the “Doctor” role config JSON to add a new “PatientListPanel.”
   2. All members of “Doctor” role see that panel in their dashboard (unless they have an override).

---

## **6. Frontend / UI Outline**

1. **Navigation**:

   - **Dashboard Home** → Admin sees quick links to manage People, Groups, Roles, etc.
   - **People** → Table of all persons.
   - **Identities** → Table of identities (“Doctor,” “Freelancer”).
   - **Groups** → List of groups; clicking a group shows its roles, members, etc.
   - **Role Configs** → A list or grid of JSON configs for roles.
   - **Person Overrides** → (Optional) A place to search for a user and see any custom override.

2. **Forms**

   - Simple **Create** and **Edit** forms, each with fields for the relevant columns (`full_name`, `email_address`, etc.).
   - **JSON Editor** for role configs, possibly with validation.

3. **Confirmation Dialogs**

   - For **deletes** or major changes (like removing a user from a group).

4. **Search / Filtering**
   - If the system has many people or groups, provide quick search or filters.

---

## **7. Backend / API Endpoints**

Assuming a REST approach:

- **`POST /api/admin/people`** → create a person
- **`GET /api/admin/people`** → list all people
- **`GET /api/admin/people/{id}`** → get details of a single person
- **`PUT /api/admin/people/{id}`** → update
- **`DELETE /api/admin/people/{id}`** → delete

And similarly for:

- **Identities**: `/api/admin/identities`
- **Groups**: `/api/admin/groups`
- **GroupRoles**: `/api/admin/group-roles` or nested under `/api/admin/groups/{groupId}/roles`
- **Memberships**: `/api/admin/group-memberships`
- **RoleConfigs**: `/api/admin/role-configs`
- **PersonOverrides**: `/api/admin/person-overrides`

---

## **8. Edge Cases**

1. **Deleting a Role**
   - If any `group_memberships` references it, either block or require switching their role.
2. **Deleting a Group**
   - If it has child groups or members, handle carefully.
3. **Deleting an Identity**
   - If assigned to people in `person_identities`, block or unassign first.
4. **Overriding Role Config**
   - Person overrides might conflict with new role configs. Decide priority.

---

## **9. Summary**

**Phase 1** of the Admin Dashboard should let you:

1. **Easily manage People** (create/edit/delete, plus identities).
2. **Create & organize Groups** with Roles.
3. **Assign roles to people** so they have correct access.
4. **Optionally define** new entity types or test data.
5. **Configure role-based layouts** using JSON.
6. **(Optional) Set user-specific overrides** to tweak a single person’s dashboard.

By covering these areas, the admin team can maintain a consistent, flexible environment that matches your **“One Brain / Second Brain”** architecture—ensuring **roles, groups, and dashboards** remain well-structured without requiring deep developer intervention.
