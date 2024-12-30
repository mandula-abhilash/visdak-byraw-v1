Below is a **step-by-step developer task guide** that shows the **exact sequence** in which forms, endpoints, and sample data should be created so your new **BYRAW** schema (with `people`, `identities`, `groups`, `roles`, etc.) can be properly populated. This document is **very detailed**—each step covers **what** to build, **why** it matters, **sample data**, and **any dependencies** on prior steps.

---

# **Developer Task Sequence: Final Guide**

## **1. Overview**

This guide helps developers **organize** their work in a **logical order**, ensuring that:

1. **People** are created before they can be assigned anything else.
2. **Identities** exist before we link them to people.
3. **Groups** and **group roles** exist before we add members.
4. **(Optional) Teams**, if needed, come after the groups that contain them.

By following these steps sequentially, you avoid referencing **non-existent** records and ensure a smooth data flow.

---

## **2. Step-by-Step Development Tasks**

### **Step 1: Create Person**

**Goal**: Provide a form (or endpoint) to insert a new row into the `people` table.

1. **Form Fields**

   - **Full Name** (string, required)
   - **Email Address** (string, unique, required)
   - **Placeholder** (boolean, optional) if you want to mark “guest” or “temp” users

2. **Backend**
   - `POST /api/people`
   - Sample DB insert:
     ```sql
     INSERT INTO people (full_name, email_address, placeholder)
     VALUES ($full_name, $email_address, $placeholder)
     RETURNING person_id;
     ```
3. **Sample Request**
   ```json
   {
     "full_name": "Alice Baker",
     "email_address": "alice@example.com",
     "placeholder": false
   }
   ```
4. **Checks**

   - **Duplicate email** → Return 409 Conflict or 400 Bad Request.
   - **Empty or invalid fields** → Return 400.

5. **Result**
   - Returns the new `person_id` and maybe the entire new record.

**Why**: A person **must** exist before we can assign them identities, group memberships, or advanced features.

---

### **Step 2: (Optional) Person Configuration**

**Goal**: Some projects want a **user-level config** right after creation—e.g., default widgets or theme preferences.

1. **Form Fields**

   - **Person ID** (dropdown or hidden from Step 1)
   - **JSON Config** (text area or JSON editor)

2. **Backend**

   - `POST /api/person-configs` (or similar)
   - Insert into a table like `person_configurations (person_id, config_data)`

3. **Sample Request**
   ```json
   {
     "person_id": 123,
     "config_data": {
       "theme": "dark",
       "default_widgets": ["Calendar", "TaskList"]
     }
   }
   ```
4. **Checks**

   - If `person_id` doesn’t exist → 404.
   - If a config already exists → decide to overwrite or block.

5. **Why**: This is **optional**. If you plan to manage configurations at the **role** level only, skip.

---

### **Step 3: Invite Person (Optional)**

**Goal**: Send an **invite** email to the newly created person, so they can set a password or login.

1. **Trigger**: A button or action, “Invite Person,” on the admin side.
2. **Backend**:
   - Possibly `POST /api/invites` with a `person_id`.
   - Create an “Invitation” record, generate a token, send an email.
3. **User Flow**:
   - The user clicks a link in the email → visits your site → sets up credentials.
4. **Why**: The user can’t log in until invited (if that’s your policy).

> **Note**: Some systems do all user creation + invite in one step. The approach varies.

---

### **Step 4: Create Identity**

**Goal**: Provide a **form** to add a new row into `identities` table (e.g., “Doctor,” “Freelancer,” “Student”).

1. **Form Fields**

   - **Label** (string, required, must be unique)
   - **Details** (text, optional)

2. **Backend**
   - `POST /api/identities`
   - Sample insert:
     ```sql
     INSERT INTO identities (label, details)
     VALUES ($label, $details)
     RETURNING identity_id;
     ```
3. **Checks**

   - **Duplicate label** → Return 409 or 400.
   - **Empty label** → 400.

4. **Why**: We need these “identity labels” ready before we assign them to people.

---

### **Step 5: Assign Identity to Person**

**Goal**: Connect an existing **person** to an existing **identity** via `person_identities`.

1. **Form Fields**

   - **Person ID** (dropdown from existing `people`)
   - **Identity ID** (dropdown from existing `identities`)

2. **Backend**

   - `POST /api/person-identities`
   - Insert into `person_identities (person_id, identity_id)`

3. **Sample Request**
   ```json
   {
     "person_id": 123,
     "identity_id": 4
   }
   ```
4. **Checks**

   - Both IDs exist? If not, 404.
   - Already assigned? If so, 409 or ignore.

5. **Why**: This step is needed if a user can have multiple “persona” contexts.

---

### **Step 6: Create Group**

**Goal**: Provide a form to create a new row in the `groups` table, representing a company or department (e.g., “Acme Corp”).

1. **Form Fields**

   - **Group Name** (string, required)
   - **Parent Group ID** (optional, if hierarchical groups apply)

2. **Backend**
   - `POST /api/groups`
   - Sample:
     ```sql
     INSERT INTO groups (group_name, parent_group_id)
     VALUES ($group_name, $parent_group_id)
     RETURNING group_id;
     ```
3. **Checks**

   - If `parent_group_id` is provided, confirm it’s valid.

4. **Why**: Groups define organizational units. Must exist before we assign people to them.

---

### **Step 7: Create Group Role**

**Goal**: In each group, define roles like “Owner,” “Admin,” “Doctor,” etc.  
(This might be in a single `group_roles` table or a more flexible approach.)

1. **Form Fields**

   - **Group ID** (select from step 6)
   - **Role Name** (string, e.g., “Admin”)
   - **Description** (text, optional)

2. **Backend**

   - `POST /api/group-roles`
   - Insert into your roles table:
     ```sql
     INSERT INTO group_roles (role_name, description)
     VALUES ($role_name, $description)
     RETURNING role_id;
     ```
   - If storing the `group_id` in a separate link table or within `group_roles`, ensure consistency.

3. **Checks**

   - If your design requires roles to be unique within that group, check before insert.

4. **Why**: A group can’t have members with roles if roles don’t exist.

---

### **Step 8: Assign Person to Group with Role**

**Goal**: Insert a row into `group_memberships`, linking `(person_id, group_id, role_id)`.

1. **Form Fields**

   - **Person ID**
   - **Group ID**
   - **Role ID** (the role that belongs to that group)

2. **Backend**
   - `POST /api/group-memberships`
   - Insert:
     ```sql
     INSERT INTO group_memberships (person_id, group_id, role_id)
     VALUES ($person_id, $group_id, $role_id)
     ```
3. **Checks**

   - Person, group, role must all exist.
   - The `role_id` should correspond to a role valid for that group (depending on your design).

4. **Why**: Now the person is officially a “Member” or “Admin” in that group. They can see or do tasks accordingly.

---

### **(Optional) Step 9: Teams & Team Members**

If your project uses **teams** within groups:

1. **Create Team** (`POST /api/teams`)
   - Requires a `group_id`.
2. **Add Person to Team** (`POST /api/team-members`)
   - `(team_id, person_id, role_name)`.

This is only **needed** if you have sub-groups or specialized project teams.

---

### **(Optional) Step 10: Role Configurations**

If you’re implementing role-based or group-role-based **JSON configs** (for dashboards, widgets, etc.):

1. **Create Role Config**
   - e.g. `POST /api/role-configs`, storing `{"layout":["Calendar","TaskList"], "theme":"dark"}`.
   - Must link to a specific group role or a global role ID.
2. **Edit Role Config**
   - Load existing JSON, let admin edit in a form or code editor.
3. **Apply**
   - When a user with that role logs in, the system merges or loads this config for their dashboard.

---

### **(Optional) Step 11: Person Overrides**

If a single user wants a custom layout, you can have:

1. **Create Person Override**
   - e.g. `POST /api/person-overrides`, storing user-specific JSON.
2. **Use**
   - The system checks if a user has an override. If so, it merges or replaces the role config.

---

## **3. Sample Data Sequence**

Below is a hypothetical sample data insertion sequence to illustrate everything:

1. **Create Person**:

   - `POST /api/people`
     ```json
     {
       "full_name": "Alice Baker",
       "email_address": "alice@example.com"
     }
     ```
   - Returns `person_id = 1`.

2. **Create Identity**: “Doctor”

   - `POST /api/identities`
     ```json
     {
       "label": "Doctor",
       "details": "Medical specialization"
     }
     ```
   - Returns `identity_id = 2`.

3. **Assign Identity** `(person_id=1, identity_id=2)`

   - `POST /api/person-identities`
     ```json
     {
       "person_id": 1,
       "identity_id": 2
     }
     ```

4. **Create Group**: “Sunrise Hospital”

   - `POST /api/groups`
     ```json
     { "group_name": "Sunrise Hospital" }
     ```
   - Returns `group_id = 10`.

5. **Create Group Role**: “Admin” for “Sunrise Hospital”

   - `POST /api/group-roles`
     ```json
     {
       "group_id": 10,
       "role_name": "Admin",
       "description": "Full access to hospital data"
     }
     ```
   - Returns `role_id = 5`.

6. **Assign Person to Group**: `(person_id=1, group_id=10, role_id=5)`

   - `POST /api/group-memberships`
     ```json
     {
       "person_id": 1,
       "group_id": 10,
       "role_id": 5
     }
     ```

7. **(Optional) Person Config**:

   - `POST /api/person-configs`
     ```json
     {
       "person_id": 1,
       "config_data": {
         "theme": "dark",
         "favorite_widgets": ["Calendar", "Notes"]
       }
     }
     ```

8. **(Optional) Teams**: “Pediatrics Team” under group_id=10

   - `POST /api/teams`
     ```json
     {
       "group_id": 10,
       "team_name": "Pediatrics Team",
       "details": "Focus on child patients"
     }
     ```
   - Returns `team_id = 20`.

9. **(Optional) Add Person to Team**:
   - `POST /api/team-members`
     ```json
     {
       "team_id": 20,
       "person_id": 1,
       "role_name": "Lead Pediatrician"
     }
     ```

At this point, **Alice** is an **Admin** in **Sunrise Hospital**, has an **Identity** of “Doctor,” and possibly leads a “Pediatrics Team” if your organization requires it.

---

## **4. Developer Tips & Best Practices**

1. **Front-End**:

   - **Form** validations (e.g. name/email not empty).
   - **Success** modals or toast messages (like “Person created successfully!”).
   - **Error** handling: show user-friendly messages for 400/404/409 statuses.

2. **Back-End**:

   - Ensure **transaction safety** if you do multi-step inserts (like creating a person and also an invite).
   - Return **meaningful HTTP codes** (400 for invalid data, 404 if resource not found, 409 if conflict, 201 or 200 for success).
   - Use consistent **naming** for endpoints: e.g. `/api/people`, `/api/groups`, etc.

3. **Database Constraints**:

   - Consider adding unique constraints on emails or role names (if needed).
   - `ON DELETE CASCADE` or `SET NULL` for foreign keys, depending on your design for user removal or group removal.

4. **Testing**:

   - **Integration tests** to ensure each step can talk to the next.
   - **Mock data** in dev environment to confirm the UI flows:
     - Create “Alice,” “Bob,” “Acme Corp,” “Marketing Dept,” etc.

5. **Security**:
   - Restrict these admin endpoints to authorized staff only.
   - If you have row-level permissions or advanced security, ensure your code checks them.

---

## **5. Final Summary**

By following this **sequential approach**, developers will:

1. **Implement** each form and endpoint in the correct order (people → identities → groups → roles → memberships).
2. **Test** each component with sample data to ensure smooth interplay.
3. **Extend** with optional steps (teams, person overrides, invites) as needed.
4. **Deliver** a stable platform where admins can manage the new schema without confusion.

This **structured** approach ensures the **BYRAW** architecture is **populated** with correct references and minimal errors, giving you a robust foundation for later enhancements (e.g., comments, activity logs, recurring tasks, or advanced permissions).
