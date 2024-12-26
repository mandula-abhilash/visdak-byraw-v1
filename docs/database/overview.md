# BYRAW Database & Configuration Overview

This document provides an **overview** of the database design and approach for BYRAW (“Build Yourself: Reflect, Act, Work”), including:

- **Role-Based & User-Based** configurations for dashboards, widgets, and more.
- **Organization** (team) membership and roles.
- **Multiple Global Roles** per user (e.g., “BusinessOwner” + “HeadOfFamily”).
- **Optional** user-level overrides for adding/removing widgets.
- **JSON** columns to store configuration data, enabling easy updates without frequent schema changes.
- **pgvector** integration for future AI-based searching over user data.

## Contents

1. [ERD Diagram (Mermaid)](#erd-diagram-mermaid)
2. [Schema (DDL)](#schema-ddl)
3. [Sample Configuration (JSON)](#sample-configuration-json)
4. [Advanced Notes](#advanced-notes)

---

## ERD Diagram (Mermaid)

See [`ERD.mmd`](./ERD.mmd) for a Mermaid-based ER diagram showing all tables, relationships, and primary/foreign keys.

## Schema (DDL)

See [`schema.sql`](./schema.sql) for table creation statements. It includes:

- **Users & Global Roles**
- **User-Global Roles** (many-to-many)
- **Global Role Configurations**
- **Organizations & Organization Roles**
- **Organization Role Configurations**
- **Organization Members** (linking user + org + org_role)
- **User Configurations** (optional overrides)

## Sample Configuration (JSON)

See [`sample_configuration.json`](./sample_configuration.json) for an example of how we store role-based or user-based UI settings in **JSON**.

## Advanced Notes

See [`advanced_notes.md`](./advanced_notes.md) for:

- Merging multiple roles’ configurations (global + org-level + user override).
- Handling team-based data access.
- Usage of **pgvector** for natural language queries with access control.

---

## Quick Start

1. **Create the Tables**: Run the SQL in `schema.sql` against your PostgreSQL database (ensure `pgvector` extension is installed if you plan to use vector functionality).
2. **Load Sample Data**: Insert a few rows for `global_roles`, `organizations`, etc., and experiment with user/role assignments.
3. **Configuration Merging**:
   - Fetch user’s global roles from `user_global_roles`.
   - (Optional) Fetch org-level roles from `organization_members`.
   - Combine or “union” relevant JSON configs from `global_role_configurations` + `organization_role_configurations` + `user_configurations`.
4. **pgvector**: For advanced searching, add vector columns to domain tables (e.g., `tasks`, `notes`), and store embeddings. Use indexes like `ivfflat` for similarity search.

---

## Contact & Further Docs

- **Contact**: Provide your database team with:
  - This repository (ERD, schema, config samples).
  - Any additional domain-specific table details (e.g., `tasks`, `notes`, `analytics`).
- **Updates**: For major changes, coordinate with the team to update the DDL and JSON structures.
