# **Admin Dashboard: Phase 1 Requirements (Using New Names)**

## **1. Overview**

We are building an **Admin Dashboard** to help **administrators** manage:

1. **People** and their **identities** (like “Doctor” or “Freelancer”).
2. **Groups** (e.g., “Sunrise Hospital,” “Acme Corp”) and the **roles** in those groups.
3. **Entity Types** (like “Task,” “Appointment,” “Note”) and **Entities** themselves (the individual records).
4. **Permissions** or **Configurations** so that each role or person has the correct dashboard layout.

This **Phase 1** focuses on:

1. **Basic CRUD (Create, Read, Update, Delete)** of people, identities, groups, roles, etc.
2. **Role-based configurations** to specify **which panels** or **widgets** show up for a given role.
3. **(Optional) Person-level overrides** for customized dashboards.

---

## **2. Core Concepts to Manage**

### **2.1 People & Identities**

- **People**: The main table storing each user’s name, email, etc.
- **Identities**: Labels like “Doctor,” “Freelancer,” or “Student.” A person can have multiple identities.

### **2.2 Groups & Roles**

- **Groups**: Organizational structures (e.g., “Sunrise Hospital”).
- **Group Roles**: “Owner,” “Admin,” “Member,” etc. Tied to a single group.
- **Group Memberships**: Connect a person to a group in a specific role.

### **2.3 Entity Types & Entities**

- **Entity Types**: Like “Task,” “Appointment,” or “Reminder.”
- **Entities**: Actual items stored in the system. Could be tasks or notes. Each entity references one **type**.

### **2.4 Permissions & Configurations**

- **Entity Permissions**: Fine-grained sharing (e.g., only certain people or groups can see an entity).
- **Role Configurations**: JSON-based layouts or widget settings for each role (or identity, if you prefer).
- **Person Overrides**: If a specific user wants to override default settings.

---

## **3. Phase 1 Admin Tasks**

In **Phase 1**, admins need straightforward pages to do the following:

1. **Create, View, Edit, Delete People**
2. **Create, View, Edit, Delete Identities**
3. **Assign Identities** to People
4. **Create, View, Edit, Delete Groups**
5. **Create, View, Edit, Delete Group Roles**
6. **Assign People** to Groups with a specific Role
7. **Create, View, Edit, Delete Role Configurations** (JSON-based)
8. **(Optional) Manage Person Overrides** for specialized dashboards

Each action typically involves a **form** (for creating/editing) and a **confirmation** prompt (for deleting).

---

## **4. Detailed Requirements**

### **4.1 Managing People & Identities**

#### 4.1.1 People

- **List People**
  - An admin sees a table of all `people`.
- **Create Person**
  - A form asking for **full_name** and **email_address**.
- **Edit Person**
  - A page or modal to change name, email, or placeholder flag.
- **Delete Person**
  - Must confirm. If they belong to a group, you might ask if that’s okay or require a reassign.

#### 4.1.2 Identities

- **List Identities**
  - E.g., “Doctor,” “Freelancer,” “Student.”
- **Create Identity**
  - Just needs a **label** and **details**.
- **Edit Identity**
  - Update the label if needed.
- **Delete Identity**
  - Confirmation. If people are using this identity, you may block deletion or reassign them.

#### 4.1.3 Person-Identity Assignments

- **Add Identity to Person**
  - Choose a **person** and pick an **identity**.
- **Remove Identity**
  - Possibly remove the row in `person_identities`.
- **UI Example**
  - A dropdown of identities + a “+Add” button on the person’s page.

---

### **4.2 Managing Groups & Their Roles**

#### 4.2.1 Groups

- **List Groups**
  - Example: “Sunrise Hospital,” “Acme Corp.”
- **Create Group**
  - Needs a **group_name**.
- **Edit Group**
  - Change name if needed.
- **Delete Group**
  - Confirm. If it has members, you might block or require a plan to reassign them.

#### 4.2.2 Group Roles

- **List Roles for a Group**
  - E.g., for “Sunrise Hospital,” see “Doctor,” “Nurse,” “Admin.”
- **Create Group Role**
  - Form with **role_name** and **description**.
- **Edit Group Role**
  - Possibly rename the role or change description.
- **Delete Group Role**
  - If members have this role, decide on reassignment or block the deletion.

#### 4.2.3 Group Membership

- **Add Person to Group**
  - Select a **person**, select the group, pick a role.
- **View Members of a Group**
  - See all who belong to “Sunrise Hospital,” for example.
- **Remove Person** from a Group
  - For example, they leave the hospital or are no longer staff.

---

### **4.3 Entity Types & Entities** (Optional for Phase 1)

In some projects, you might let admins define **entity_types**. Or you might fix them (like “Task,” “Appointment”). If you do:

1. **List Entity Types**
   - E.g., “Task,” “Note,” “Appointment.”
2. **Create, Edit, Delete** an Entity Type
   - Possibly with a **type_name** and **description**.

**Entities** (the actual tasks/notes) might not need direct admin management in Phase 1 unless you want to provide a test data panel:

- **(Optional) Create Test Entities**: Let admin create sample tasks or notes.

---

### **4.4 Role Configurations (JSON-based)**

This is where an admin decides **what widgets or panels** a role sees:

- **List Configs**
  - Possibly each row is “(Role ID: X, Config ID: Y).”
- **Create Config**
  - A form or JSON editor. For instance:
    ```json
    {
      "dashboard_panels": ["Calendar", "TaskList"],
      "theme": "dark"
    }
    ```
- **Edit Config**
  - Load existing JSON, let admin edit it.
- **Delete Config**
  - Confirmation needed. If a role has no config, they might fall back to defaults.

#### 4.4.1 Where to Store?

- You might have a table like `role_configurations` or `group_role_configs`. If it’s a “group role,” store it in something like `group_role_configs`.
- Admins **must** create the **role** first, then link a configuration to that role.

---

### **4.5 Person Overrides** (Optional)

- **List Person Overrides**: A table showing each user who has a custom override.
- **Create/Edit Override**: Let the admin set a custom JSON for a single user. For instance, `{"hidePanel": "RevenueChart"}`.
- **Delete Override**: Revert the user back to their role-based config.

---

## **5. Workflow for Admins (Step by Step)**

1. **Create or Edit People**
   - Admin adds new staff or corrects spelling of a name.
2. **Create Identities** (like “Doctor,” “Nurse,” “Freelancer”).
3. **Assign Identities to People**
   - If needed.
4. **Create Groups** (like “Sunrise Hospital”).
5. **Create Roles within the Group** (e.g., “Doctor,” “Admin”).
6. **Add People to Groups** with the appropriate Role.
7. **Create or Edit Role Config** to define the dashboard for each role.
8. (Optional) **Person Overrides** if a special user needs a special layout.
9. (Optional) **Test Entities**: Admin might create some “fake tasks” or “fake appointments” to see how things look on the user’s dashboard.

---

## **6. Frontend & Backend Examples**

### **6.1 Frontend Pages (Next.js)**

1. **`/admin/people`**

   - List all people. “Create New Person” button.
   - Each row has “Edit” or “Delete.”
   - A link to “Assign Identities.”

2. **`/admin/identities`**

   - Similar layout for listing, creating, and deleting.

3. **`/admin/groups`**

   - Show each group. “Create Group” button.
   - Each group has “Manage Roles” and “View Members.”

4. **`/admin/[groupId]/roles`**

   - List roles in that group.
   - “Create Role,” “Edit,” “Delete,” “Link Config.”

5. **`/admin/role-configs`**

   - List all role configs (global or group-based).
   - “Create” or “Edit” with a JSON editor or simple form.

6. **`/admin/user-overrides`**
   - Search for a user → “Edit override.”

### **6.2 Backend Endpoints (Express.js)**

1. **POST /api/admin/people** → Create a new person
2. **GET /api/admin/people** → List people
3. **PUT /api/admin/people/:personId** → Update a person
4. **DELETE /api/admin/people/:personId** → Delete a person

... and so on for:

- **Identities**: `/api/admin/identities`
- **Groups**: `/api/admin/groups`
- **Group Roles**: `/api/admin/groups/:groupId/roles` (or just `/api/admin/group-roles`)
- **Role Configs**: `/api/admin/role-configs`
- **User Overrides**: `/api/admin/users/:personId/override`

---

## **7. Edge Cases & Deletion Rules**

1. **Deleting a Role**
   - If people are using that role, you might force them to pick a new role or block deletion.
2. **Deleting an Identity**
   - If assigned to people, confirm first.
3. **Deleting a Group**
   - If it has members, reassign or block.
4. **Deleting a Role Config**
   - If it’s the only config for a popular role, you could break dashboards. Prompt a fallback or block.

---

## **8. Conclusion**

Using **new names** like `people`, `identities`, `groups`, `entity_types`, and `entities`, your **Admin Dashboard** (Phase 1) will let administrators:

1. **Onboard** new people, give them identities.
2. **Create** groups (like companies or hospitals).
3. **Define** roles in those groups and assign people.
4. **Write** JSON config to shape each role’s default dashboard.
5. **Optionally** customize single-user overrides for special cases.

This approach gives you a **clean** foundation, letting admins easily manage the system while staying consistent with your new **“Second Brain”** schema.
