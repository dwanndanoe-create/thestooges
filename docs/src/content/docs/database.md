---
title: Database
description: PostgreSQL models, Prisma configuration, relationships, constraints, migrations, and maintenance commands.
---

Microjobs.sr uses PostgreSQL through Neon. Prisma 7 defines the schema, generates the typed client, and manages database migrations.

## Connection configuration

The project uses two database environment variables:

~~~text
DATABASE_URL="your-pooled-postgresql-url"
DIRECT_URL="your-direct-postgresql-url"
~~~

| Variable | Used by | Purpose |
| --- | --- | --- |
| DATABASE_URL | web/src/lib/prisma.ts | Normal application queries through the PostgreSQL adapter |
| DIRECT_URL | web/prisma.config.ts | Prisma migration and schema commands |

Keep these values in **web/.env** for local development and in the hosting provider's encrypted environment-variable settings for production. Never commit real credentials.

## Data model overview

~~~text
User
├── Session
├── Job ── JobApplication ── User
├── Project ── ProjectMember ── User
├── Conversation ── Message
└── Profile fields: bio, location, skills

Supporting models
├── BlacklistedName
└── ErrorLog
~~~

## Models

### User

Stores account and profile information:

- Unique email address.
- bcrypt password hash.
- Administrator and active-account flags.
- Name, optional biography, optional location, and skill list.
- Creation and update timestamps.

The User is connected to jobs, applications, projects, memberships, sessions, conversations, and messages.

### Session

Stores login sessions:

- Unique random token.
- User relationship.
- Expiration timestamp.
- Creation timestamp.

Deleting a User deletes related Session records through cascade behavior.

### Job

Stores marketplace listings:

- Title and description.
- Positive whole-number budget stored as an integer.
- Optional location and a PostgreSQL text-array of skills.
- OPEN or CLOSED status.
- Creator relationship.
- Creation and update timestamps.

### JobApplication

Connects a User to a Job:

- Optional message field.
- PENDING, ACCEPTED, or REJECTED status.
- Job and applicant relationships.
- Creation and update timestamps.

The combined **jobId + userId** value is unique, so one user cannot create two applications for the same job.

### Project

Stores collaboration and mentorship projects:

- Title and description.
- COLLABORATION or MENTORSHIP type.
- ACTIVE, COMPLETED, or ARCHIVED status.
- Creator relationship.
- Member relationships.
- Creation and update timestamps.

### ProjectMember

Connects an invited User to a Project:

- MEMBER role.
- PENDING, ACCEPTED, or DECLINED status.
- Project and user relationships.
- Creation and update timestamps.

The combined **projectId + userId** value is unique.

### Conversation

Stores a one-to-one conversation:

- Starter User.
- Receiver User.
- Related Message records.
- Creation and update timestamps.

The server action searches both participant directions before creating a conversation. Duplicate prevention is currently implemented in application code rather than a database uniqueness constraint.

### Message

Stores direct messages:

- Text content.
- Conversation relationship.
- Sender relationship.
- Creation timestamp.
- Optional read timestamp.

### BlacklistedName

Stores a unique name and an optional reason. The model exists in the schema but is not currently connected to registration or an administrator screen.

### ErrorLog

Provides fields for an error message, stack trace, path, request method, and timestamp. The model exists in the schema, but current application code does not write error records to it.

## Enums

| Enum | Values |
| --- | --- |
| JobStatus | OPEN, CLOSED |
| ApplicationStatus | PENDING, ACCEPTED, REJECTED |
| ProjectType | COLLABORATION, MENTORSHIP |
| ProjectStatus | ACTIVE, COMPLETED, ARCHIVED |
| ProjectMemberRole | MEMBER |
| ProjectMemberStatus | PENDING, ACCEPTED, DECLINED |

## Constraints and indexes

Important schema protections include:

- Unique User email.
- Unique Session token.
- One JobApplication for each job-and-user pair.
- One ProjectMember for each project-and-user pair.
- Indexes on active users, job and project status, foreign keys, message timestamps, and conversation timestamps.
- Cascade deletion for related records when their owning User, Job, Project, or Conversation is deleted.

Business rules such as no self-messaging, no self-application, no self-project invitation, and no contact with inactive users are enforced by server actions.

## Prisma client

The generated client is written to:

~~~text
web/src/generated/prisma
~~~

The shared runtime client is created in **web/src/lib/prisma.ts** with the PostgreSQL adapter. During development, it is cached on **globalThis** to avoid creating a new client during every hot reload.

## Common commands

Run all commands from the **web** directory.

### Generate the Prisma client

~~~powershell
npx prisma generate
~~~

Run this after changing the Prisma schema or installing dependencies.

### Apply existing migrations

~~~powershell
npx prisma migrate deploy
~~~

Use this for a fresh database, shared environment, or production database when migrations already exist.

### Create a development migration

~~~powershell
npx prisma migrate dev --name describe_your_change
~~~

Use this only against a development database when intentionally changing the schema.

### Inspect and edit data

~~~powershell
npx prisma studio
~~~

Prisma Studio is useful for reviewing test data and assigning the first administrator.

### Validate the schema

~~~powershell
npx prisma validate
~~~

## Safe database workflow

1. Use a separate development database.
2. Update **prisma/schema.prisma**.
3. Create and review a development migration.
4. Test registration, login, jobs, projects, and messages.
5. Back up important production data.
6. Apply the reviewed migration with **prisma migrate deploy**.
7. Deploy application code that expects the new schema.

Do not use **prisma migrate reset** on a production or important shared database because it deletes data.

## Relevant files

| File | Purpose |
| --- | --- |
| web/prisma/schema.prisma | Models, relationships, indexes, and enums |
| web/prisma/migrations/ | Ordered SQL migration history |
| web/prisma.config.ts | Prisma schema, migration path, and DIRECT_URL configuration |
| web/src/lib/prisma.ts | Shared application Prisma client using DATABASE_URL |
| web/.env.example | Required environment-variable names |