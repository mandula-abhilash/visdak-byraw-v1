# Advanced Notes

## 1. Merging Multiple Role Configurations

- **Global Roles**: A user can have more than one (e.g., "BusinessOwner" + "HeadOfFamily").
- **Organization Role Configs**: If a user is in an org with a role like "Manager," you might want to merge org-level configs as well.
- **User Overrides**: Add/remove widgets, possibly rename labels, etc.

### Merging Logic Example

1. **Global Role Configs**: Union or combine their sidebar/items. If collisions occur (same widget but different config), define a priority or a “role switch” approach.
2. **Org Role Config**: Override or extend what’s defined in the global config.
3. **User Overrides**: Final layer—adding or removing widgets.

---

## 2. Handling Team Access & Partial Data Visibility

- **organization_id** stored in domain tables (like `tasks`) ensures only members of that org can see/edit them, depending on their `organization_role_id`.
- Use application-level or Row-Level Security (RLS) checks.

---

## 3. pgvector Integration

1. **Add `vector` Columns**: For tasks, notes, or other entities where you want to run semantic similarity queries.
2. **Create Index**: For faster similarity search:
   ```sql
   CREATE INDEX idx_tasks_embedding
     ON tasks
     USING ivfflat (embedding vector_cosine_ops)
     WITH (lists = 100);
   ```
3. **Access Control**: Always filter results to ensure a user sees only embeddings for which they have permissions:
   ```sql
   SELECT *
   FROM tasks
   WHERE organization_id IN (
     SELECT organization_id
     FROM organization_members
     WHERE user_id = :currentUserId
   )
   ORDER BY embedding <-> :queryEmbedding
   LIMIT 5;
   ```
4. **Embedding Ingestion**: Your application calls an embedding service (OpenAI, local model, etc.), then stores the result in `tasks.embedding`.

---

## 4. Admin Dashboard

- **Role Management**: Create/edit `global_roles`, `organization_roles`, and the associated `*_configurations`.
- **User Management**: Assign multiple global roles, place user in organizations with a specific role.
- **Impersonation**: “View as user” to see how the UI merges configs, without exposing private data.
- **Promotion of Overrides**: If a user’s override is beneficial, admin can **merge** it into the global or org-level config.

---

## 5. Summary

This architecture uses:

- **JSON-based** configurations for maximum flexibility.
- **Relational** modeling for roles, organizations, and memberships.
- **pgvector** readiness for advanced AI/semantic search.
- **Minimal schema changes** needed over time—updates mostly happen in JSON.

Keep these details in mind while implementing. The approach can scale to:

- Large user bases.
- Multiple organizations.
- Rich customization of dashboards and widget sets.
