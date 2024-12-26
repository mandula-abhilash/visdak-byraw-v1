-- Enable pgvector extension if needed for advanced AI queries:
-- CREATE EXTENSION IF NOT EXISTS vector;

---------------------------------------
-- USERS
---------------------------------------
CREATE TABLE users (
    id              SERIAL        PRIMARY KEY,
    name            VARCHAR(100)  NOT NULL,
    email           VARCHAR(255)  UNIQUE NOT NULL,
    is_dummy        BOOLEAN       DEFAULT FALSE,
    created_at      TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
);

---------------------------------------
-- GLOBAL ROLES
---------------------------------------
CREATE TABLE global_roles (
    id              SERIAL        PRIMARY KEY,
    name            VARCHAR(50)   UNIQUE NOT NULL,
    description     TEXT,
    created_at      TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
);

---------------------------------------
-- USER_GLOBAL_ROLES (Many-to-many)
---------------------------------------
CREATE TABLE user_global_roles (
    user_id         INT           NOT NULL,
    role_id         INT           NOT NULL,
    assigned_at     TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, role_id),
    CONSTRAINT fk_user
        FOREIGN KEY (user_id)
        REFERENCES users (id)
        ON DELETE CASCADE,
    CONSTRAINT fk_global_role
        FOREIGN KEY (role_id)
        REFERENCES global_roles (id)
        ON DELETE CASCADE
);

---------------------------------------
-- GLOBAL_ROLE_CONFIGURATIONS
---------------------------------------
CREATE TABLE global_role_configurations (
    id              SERIAL     PRIMARY KEY,
    global_role_id  INT        NOT NULL,
    configuration   JSONB      NOT NULL,
    created_at      TIMESTAMP  DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP  DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_global_role
        FOREIGN KEY (global_role_id)
        REFERENCES global_roles (id)
        ON DELETE CASCADE
);

---------------------------------------
-- USER_CONFIGURATIONS
-- (Optional user-level overrides)
---------------------------------------
CREATE TABLE user_configurations (
    id             SERIAL       PRIMARY KEY,
    user_id        INT          NOT NULL,
    configuration  JSONB        NOT NULL,
    created_at     TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
    updated_at     TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user
        FOREIGN KEY (user_id)
        REFERENCES users (id)
        ON DELETE CASCADE
);

---------------------------------------
-- ORGANIZATIONS (Teams)
---------------------------------------
CREATE TABLE organizations (
    id             SERIAL        PRIMARY KEY,
    name           VARCHAR(100)  NOT NULL,
    created_at     TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
    updated_at     TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
);

---------------------------------------
-- ORGANIZATION ROLES
-- (e.g. Owner, Manager, Contributor)
---------------------------------------
CREATE TABLE organization_roles (
    id             SERIAL       PRIMARY KEY,
    name           VARCHAR(50)  NOT NULL,
    description    TEXT,
    created_at     TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
    updated_at     TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
);

---------------------------------------
-- ORGANIZATION_ROLE_CONFIGURATIONS
-- (Optional: unique configs per org+role)
---------------------------------------
CREATE TABLE organization_role_configurations (
    id                      SERIAL       PRIMARY KEY,
    organization_id         INT          NOT NULL,
    organization_role_id    INT          NOT NULL,
    configuration           JSONB        NOT NULL,
    created_at              TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
    updated_at              TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_org
        FOREIGN KEY (organization_id)
        REFERENCES organizations (id)
        ON DELETE CASCADE,
    CONSTRAINT fk_org_role
        FOREIGN KEY (organization_role_id)
        REFERENCES organization_roles (id)
        ON DELETE CASCADE
);

---------------------------------------
-- ORGANIZATION_MEMBERS
-- (Links user + org + org_role)
---------------------------------------
CREATE TABLE organization_members (
    user_id              INT NOT NULL,
    organization_id      INT NOT NULL,
    organization_role_id INT NOT NULL,
    joined_at            TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, organization_id),
    CONSTRAINT fk_user
        FOREIGN KEY (user_id)
        REFERENCES users (id)
        ON DELETE CASCADE,
    CONSTRAINT fk_org
        FOREIGN KEY (organization_id)
        REFERENCES organizations (id)
        ON DELETE CASCADE,
    CONSTRAINT fk_org_role
        FOREIGN KEY (organization_role_id)
        REFERENCES organization_roles (id)
        ON DELETE RESTRICT
);
