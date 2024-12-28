# **1. Overview of the Diagram**

The diagram shows **boxes** (tables) with **columns** inside, and **lines** between them indicating **relationships**. For example, **one table** might link to **another** if they need to share data (like a “Person” belonging to a “Group”).

---

# **2. People & Identities**

## **2.1 `people` Table**

- This table **stores info about each person** in the system—like their **full name** and **email**.
- Each row in `people` has a **`person_id`** (a unique number) to identify them.

### **Why it Matters**

- If Alice is a user, her info (name, email) is here.
- If Bob is another user, he also has a row here.

## **2.2 `identities` Table**

- This table **stores the different ‘personas’ or ‘roles’** a person can have on a day-to-day basis.
- Example: “Doctor,” “Freelancer,” or “Student.”

### **Why it Matters**

- Each identity (like “Doctor”) has its own **`identity_id`** and name.

## **2.3 `person_identities` Table (Link)**

- Because one **person** can have **many** identities, and one **identity** can be used by **many** different people, we have a **middle table**.
- This table connects **which person** has **which identity**.

### **Example**

- If Alice (person_id=1) is both a **Doctor** (identity_id=2) and a **Mother** (identity_id=3), we put **two** rows here:
  1. `(person_id=1, identity_id=2)`
  2. `(person_id=1, identity_id=3)`.

### **What to Create First**

1. Make sure **people** (like Alice) exist in `people`.
2. Make sure the “Doctor” or “Mother” identity exists in `identities`.
3. Then **link** them by adding a row to `person_identities`.

---

# **3. Groups & Roles**

## **3.1 `groups` Table**

- This table represents **organizations** or **teams** (like **“Acme Corp”** or **“Sunrise Hospital”**).
- Each group has a **`group_id`** (unique number) and a **name**.

### **Why It Matters**

- If your user belongs to a **company** or **hospital**, that gets a row in `groups`.

## **3.2 `group_roles` Table**

- This stores **roles** people can have inside a group—like “Owner,” “Admin,” or “Member.”
- Each row has a **`role_id`** and a **name** (e.g. “Manager”).

### **Why It Matters**

- This defines what level of access or authority a person has in the group.

## **3.3 `group_memberships` Table (Link)**

- Because one **person** can belong to **many** groups, and each group can have **many** people, this table **links** them.
- It also has a **`role_id`** so we know the person’s role in that group.

### **Example**

- If Bob (person_id=2) is part of “Acme Corp” (group_id=10) as a “Manager” (role_id=2), we add a row:
  - `(person_id=2, group_id=10, role_id=2)`.

### **What to Create First**

1. Create entries in `people` for your users.
2. Create an entry in `groups` (like “Acme Corp”).
3. Create a “Manager” role in `group_roles`.
4. Link them up in `group_memberships`.

---

# **4. Entities & Permissions**

## **4.1 `entity_types` Table**

- This table stores **categories** or **types** of items we can create, like **“Task,” “Appointment,” “Note,” “Widget”** etc.
- Each row has a **`type_id`** and a **`type_name`**.

### **Why It Matters**

- It helps us label each item we store—so the system knows if it’s a task, note, or appointment.

## **4.2 `entities` Table**

- This is the **main** table for **all items** or **“things”** in the system (like tasks, notes, appointments).
- Important columns:
  - **`owner_id`**: The **person** who created or “owns” the item.
  - **`group_id`**: (Optional) The **group** that item might belong to.
  - **`type_id`**: Ties back to `entity_types` to say what kind of item it is.
  - **`title`** & **`description`**: Basic info.
  - **`start_at`** & **`end_at`**: If it’s an appointment or event with a time.
  - **`extra_data`**: A **jsonb** field (fancy flexible storage) for anything else (like location, tags, etc.).

### **Example**

- If Alice creates a “Doctor’s Appointment” for a patient, that is one row in `entities`.
- If Bob creates a “Task” called “Buy Office Supplies,” that’s another row.

### **What to Create First**

1. Create some row(s) in `entity_types` to define “Task,” “Appointment,” etc.
2. Then, when a user wants to add an item, add a row in `entities` referencing the correct **`type_id`**.

## **4.3 `entity_permissions` Table (Optional)**

- This table is for **fine-grained sharing**. If you want **only** certain people or certain teams to see an item, you create rows here.
- **`subject_type`** could be “Person” or “Group.”
- **`subject_id`** is the ID of that person or group.

### **Example**

- If you have entity #50 that only user #7 can see, you insert:
  - `(entity_id=50, subject_type='Person', subject_id=7, access_level='view')`.

### **When to Use**

- If you want a **private** item or a **private** set of items for certain members.
- Some systems skip this if they rely on each entity’s `group_id` to control sharing.

---

# **5. Widgets (Optional)**

## **5.1 `widgets` Table**

- This table stores **pre-built** widget definitions, like “TaskListWidget,” “CalendarWidget,” etc.
- Each widget has a **`widget_id`** and a **`widget_name`**.

## **5.2 `person_widgets` Table**

- This table says which **person** is using which **widget** and how it’s configured.
- For example, if Alice wants a **CalendarWidget** in position #1 on her dashboard, we add a row here with:
  - `(person_id=1, widget_id=2, position=1)`.

---

# **6. Putting It All Together**

### **Step-by-Step Setup**

1. **Create People**

   - Fill in `people` with real user names and emails.
   - Optional: Add “identities” (personas) in `identities`, then link them with `person_identities`.

2. **Create Groups & Roles**

   - In `groups`, add your organization (like “Acme Corp”).
   - In `group_roles`, add roles (“Owner,” “Manager,” “Member”).
   - In `group_memberships`, link each person to the right group with the right role.

3. **Define Entity Types**

   - For each kind of item your system supports—“Task,” “Appointment,” “Note”—create a row in `entity_types`.

4. **Add Entities**

   - Whenever someone creates a new task or appointment, add it to `entities` with the **correct** `owner_id`, `group_id` (if it belongs to a group), and `type_id`.

5. **Use Entity Permissions** (If needed)

   - If you want specific sharing, insert rows into `entity_permissions`. For example, `(entity_id=101, subject_type='Person', subject_id=2, access_level='edit')`.

6. **Widgets & Dashboards**
   - If you need custom dashboards, create widget definitions in `widgets`.
   - Then, assign them to a person by adding rows in `person_widgets`.

---

# **7. Example Use Case: Setting Up a Dashboard for Bob**

Let’s say Bob is a new employee at “Sunrise Hospital,” and we want him to see his personal tasks, hospital tasks, and a calendar widget.

1. **Add Bob to `people`**:

   - `(full_name='Bob Smith', email_address='bob@example.com')`.

2. **Add “Sunrise Hospital” to `groups`**:

   - `(group_name='Sunrise Hospital')`.

3. **Add a role in `group_roles`**:

   - `(role_name='Doctor')` or `(role_name='Nurse')` etc.

4. **Link Bob to Sunrise Hospital**:

   - In `group_memberships`, `(person_id=Bob, group_id=SunriseHospital, role_id=DoctorOrNurse)`.

5. **Create widget definitions** (once, globally):

   - `('CalendarWidget')`, `('TaskListWidget')`.

6. **Add Bob’s personal widgets**:
   - In `person_widgets`, `(person_id=Bob, widget_id=CalendarWidget, position=1, enabled=true)`
   - Also `(person_id=Bob, widget_id=TaskListWidget, position=2, enabled=true)`

Now, Bob will have a **dashboard** with a **calendar** and a **task list**.

- If you want Bob to see a **hospital appointment** item, you can create an **entity** with `group_id` = Sunrise Hospital and `type_id` = Appointment.

---

# **8. Conclusion**

This **diagram** and **step-by-step** explanation helps you see:

- **What** each table is for.
- **How** they link together.
- **Why** you need them.

By following the recommended **creation order** (people/groups first, then memberships and widgets), you’ll ensure the system is set up cleanly. The **entities** table is your “central hub” for tasks, appointments, notes, etc., and you can optionally extend **permissions** if you need advanced sharing rules.

This approach gives you a **flexible, powerful** way to manage user data, group data, and custom dashboard widgets, without overwhelming your team.
