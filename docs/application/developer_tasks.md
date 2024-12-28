# **Developer Forms Guide (Using New Names)**

This guide covers the **sequential forms** or “screens” developers need to **build** so that the data model (people, identities, groups, roles, etc.) is correctly populated.

---

## **1. Create Person**

### **Purpose**

- Let an admin (or super-admin) create a new “person” record in the `people` table.

### **Form Fields**

1. **Full Name** (string)
2. **Email Address** (string)

**Example JSON** (frontend -> backend):

```json
{
  "full_name": "Alice Baker",
  "email_address": "alice@example.com"
}
```

### **Backend Actions**

1. **POST** request to `/api/people` (example endpoint).
2. **Check** if `email_address` already exists:
   - If yes, **return** an error (409 Conflict or 400 Bad Request).
   - If no, **insert** into `people`:
     ```sql
     INSERT INTO people (full_name, email_address)
     VALUES ($1, $2)
     RETURNING person_id;
     ```
3. **Return** the new `person_id` (and the record) to the frontend.

### **Validation** & **Edge Cases**

- **Empty Name**: Return 400 “Name is required.”
- **Duplicate Email**: Return 409 “Email in use.”
- **Invalid Email**: Return 400 “Invalid email format.”

### **Dependencies**

- Generally **none**—this is often your very first step.

---

## **2. (Optional) Create Person Config**

### **Purpose**

- Some systems want a **user-level config** (e.g., default widgets, dashboard layout) right away.

### **Form Fields**

- **Person ID** (select from a list of people).
- **JSON Configuration** (text area or editor).

**Example JSON** (frontend -> backend):

```json
{
  "person_id": 123,
  "config_data": {
    "theme": "light",
    "widgets": ["Calendar", "TaskList"]
  }
}
```

### **Backend Actions**

1. **POST** request to `/api/person-configs` (example endpoint).
2. **Check** if the person exists (person_id is valid).
3. **Insert** config into something like `person_configurations` or `user_configurations` table:
   ```sql
   INSERT INTO person_configurations (person_id, config_data)
   VALUES ($1, $2);
   ```
4. **Return** success or newly inserted ID.

### **Edge Cases**

- **Missing Person**: Return 404 “Person not found.”
- **Duplicate Config**: Decide if you overwrite or block if a config already exists.

### **Dependencies**

- **Must** have a `person_id` from Step 1.

---

## **3. Invite Person**

### **Purpose**

- Send an email or link for the new person to log in or set up their password.

### **Form / Trigger**

- Could be a button “Invite Person” in the UI next to a newly created person.

### **Backend Actions**

1. **Send** a token to the user’s email.
2. Possibly create an “Invitation” row in a table for tracking.
3. The user eventually clicks the invitation link, hits an endpoint (like `/api/invites/accept`), and sets their password.

### **Edge Cases**

- **Email Failure**: Log the error, maybe show “Could not send invite.”
- **Already Invited**: Might do a “resend invite.”

### **Dependencies**

- Must have a **valid `person_id`** (someone in the `people` table) and an email.

---

## **4. Create Identity**

### **Purpose**

- Developers implement a form to **add** a new row to the `identities` table (like “Doctor,” “Freelancer,” etc.).

### **Form Fields**

1. **Label** (string, required)
2. **Details** (text, optional)

**Example**:

```json
{
  "label": "Doctor",
  "details": "Medical professional identity."
}
```

### **Backend Actions**

1. **POST** `/api/identities`.
2. **Insert** into `identities(label, details)`.
3. Return the new `identity_id`.

### **Edge Cases**

- **Duplicate Label**: If you require unique labels, return an error.
- **Empty Label**: Return 400.

### **Dependencies**

- None, you can create identities anytime.

---

## **5. Assign Identity to Person**

### **Purpose**

- If your system allows multiple “identities” per person, we build a form to link them via `person_identities`.

### **Form Fields**

1. **Person ID** (select from a dropdown).
2. **Identity ID** (select from a dropdown).

**Example**:

```json
{
  "person_id": 123,
  "identity_id": 4
}
```

### **Backend Actions**

1. **POST** `/api/person-identities`.
2. Check if the row `(person_id, identity_id)` already exists.
   - If so, return a 409 or simply do nothing.
3. If not, insert into `person_identities`.

### **Edge Cases**

- **Missing Person** or **Missing Identity**: Return 404 “Not Found.”
- **Already Assigned**: Return a conflict or ignore duplication.

### **Dependencies**

- A valid **person** from Step 1, a valid **identity** from Step 4.

---

## **6. (Optional) Create Group**

### **Purpose**

- A “group” might represent an organization or team. Developers build a form to create a new row in the `groups` table.

### **Form Fields**

- **Group Name** (string)

**Example**:

```json
{
  "group_name": "Sunrise Hospital"
}
```

### **Backend Actions**

1. **POST** `/api/groups`.
2. Insert into `groups (group_name)`.
3. Return the new `group_id`.

### **Edge Cases**

- **Duplicate Group Name**: Possibly block or allow, depending on business rules.

### **Dependencies**

- None (can create groups at any time).

---

## **7. Create Group Role**

### **Purpose**

- Inside each group, you might have roles (like “Owner,” “Doctor,” “Nurse”).

### **Form Fields**

1. **Group ID** (select which group this role belongs to)
2. **Role Name** (string)
3. **Description** (optional)

**Example**:

```json
{
  "group_id": 10,
  "role_name": "Doctor",
  "description": "A medical role within the hospital."
}
```

### **Backend Actions**

1. **POST** `/api/group-roles`.
2. Check if the group exists (`group_id` is valid).
3. Insert into `group_roles (group_id, role_name, description)` or a similar table design.
4. Return the new `role_id`.

### **Edge Cases**

- **Group Not Found**: Return 404.
- **Duplicate Role** in the same group: block or allow, depending on business rules.

### **Dependencies**

- Must have a **group** (Step 6).

---

## **8. Assign Person to Group with a Role**

### **Purpose**

- Now we link a **person** to a **group** with a **role**. This typically goes in a `group_memberships` table.

### **Form Fields**

1. **Person ID**
2. **Group ID**
3. **Role ID** (the role that belongs to that group)

**Example**:

```json
{
  "person_id": 123,
  "group_id": 10,
  "role_id": 5
}
```

### **Backend Actions**

1. **POST** `/api/group-memberships`.
2. Validate all three IDs are valid; ensure `role_id` belongs to the same `group_id`.
3. Insert into `group_memberships (person_id, group_id, role_id)`.
4. Return success.

### **Edge Cases**

- **Already in group**: Possibly a conflict or allow multiple roles if that’s your design.
- **Role Not From This Group**: Return an error (mismatch).

### **Dependencies**

- Person (Step 1), Group (Step 6), Group Role (Step 7).

---

# **Additional Considerations**

## **A. Merging or Overwriting Data**

- For things like **config** or **role-based** overrides, you need a strategy:
  - Overwrite?
  - Merge JSON?
  - If a config entry exists, do you block a second insertion?

## **B. Deletion Flows**

- If you delete a **person**, what happens to their group memberships or identities? Typically, you set `ON DELETE CASCADE` or handle it in code.
- If you delete a **group**, do you also remove group roles and memberships?

## **C. Invites vs. Edits**

- Some systems prefer to create “people” with **placeholder** data, then send an **invite** so the user completes their info.
- Others want a fully detailed record before sending invites.

## **D. Validation & Error Handling**

- For each endpoint, return consistent HTTP codes:
  - **400** if the request is malformed (missing fields).
  - **404** if referencing non-existent IDs.
  - **409** if conflict (duplicate, already exists).
  - **200** or **201** if success.

---

# **Sequential Workflow Example**

1. **Create a Person** (`POST /api/people`) → get back `person_id = 123`.
2. **(Optional) Create Config** for that person → store some default layout (`POST /api/person-configs`).
3. **Invite Person** → system sends email link.
4. **Create Identity** “Doctor” → get `identity_id = 4`.
5. **Assign Identity** → `(person_id=123, identity_id=4)`.
6. **Create Group** “Sunrise Hospital” → get `group_id = 10`.
7. **Create Group Role** “Doctor” for group 10 → get `role_id = 5`.
8. **Assign Person** → `(person_id=123, group_id=10, role_id=5)`.

At the end of these steps, you have:

- A **Person** named Alice with an email.
- An **Identity** labeled “Doctor.”
- A **Group** named “Sunrise Hospital.”
- A **Role** in that group also called “Doctor.”
- The person is now **linked** to that group in that role.
- Alice might also have a **config** (Step 2) for personal layouts.
