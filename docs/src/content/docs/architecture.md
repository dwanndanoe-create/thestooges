---
title: Architecture
description: Technical structure, request flow, routes, and important design decisions in Microjobs.sr.
---

Microjobs.sr is a full-stack Next.js application. The user interface, server-rendered pages, server actions, authentication, and database access are contained in the **web** directory. The documentation website in **docs** is a separate Astro Starlight application.

## Technology stack

| Layer | Technology | Purpose |
| --- | --- | --- |
| Application framework | Next.js 16 App Router | Routing, server rendering, layouts, and server actions |
| User interface | React 19 | Interactive components and page composition |
| Language | TypeScript | Static typing for application code |
| Styling | Tailwind CSS 4 | Responsive layout and visual styling |
| Motion | Framer Motion | Interface transitions and reduced-motion support |
| Icons | Lucide React | Interface icons |
| ORM | Prisma 7 | Typed database access and migrations |
| Database | PostgreSQL through Neon | Persistent application data |
| Authentication | bcryptjs and custom sessions | Password hashing and cookie-based sessions |
| Hosting | Vercel | Production hosting for the Next.js application |
| Documentation | Astro Starlight | Documentation pages and sidebar navigation |

## High-level request flow

~~~text
Browser
  ↓
Next.js route or React component
  ↓
Server component or server action
  ↓
Authentication and validation
  ↓
Prisma client with PostgreSQL adapter
  ↓
Neon PostgreSQL database
~~~

Pages read data on the server whenever possible. Interactive forms use client components that call server actions. Server actions validate the current user and submitted values before changing database records.

## Project structure

~~~text
thestooges/
├── web/
│   ├── src/
│   │   ├── app/
│   │   │   ├── actions/       Server actions
│   │   │   ├── admin/         Protected administrator pages
│   │   │   ├── dashboard/     User workspace
│   │   │   ├── jobs/          Job list, details, and creation
│   │   │   ├── messages/      Conversation list and messages
│   │   │   ├── profile/       Current user profile
│   │   │   ├── projects/      Project list, details, and creation
│   │   │   ├── requests/      Submitted job applications
│   │   │   └── talent/        Talent search and public profiles
│   │   ├── components/        Reusable interface components
│   │   ├── data/              Demonstration homepage data
│   │   ├── generated/prisma/  Generated Prisma client
│   │   ├── i18n/              English and Dutch interface translation
│   │   └── lib/               Auth, admin, Prisma, and helper code
│   ├── prisma/
│   │   ├── schema.prisma      Database schema
│   │   └── migrations/        Database migrations
│   ├── public/                Logos and public images
│   └── package.json           Dependencies and npm scripts
└── docs/
    ├── src/content/docs/      Documentation Markdown files
    ├── public/                Public documentation assets
    └── astro.config.mjs       Starlight and sidebar configuration
~~~

## Server and client responsibilities

### Server components

Server pages read data directly through Prisma. Examples include the Dashboard, Jobs, Projects, Messages, and Admin pages. Protected pages check the current session before rendering.

### Client components

Client components handle form state, dropdowns, animation, and user interaction. Examples include the login and sign-up forms, job and project forms, message composer, invitation buttons, and language switcher.

### Server actions

Server actions are located in **web/src/app/actions**:

| File | Responsibility |
| --- | --- |
| auth.ts | Sign up, log in, and log out |
| profile.ts | Update profile information and skills |
| job.ts | Create jobs and submit applications |
| project.ts | Create projects and accept or decline invitations |
| messages.ts | Create conversations and send messages |
| admin.ts | Activate users and grant administrator access |
| adminJobs.ts | Close or reopen jobs |

## Main routes

| Route | Purpose | Login required |
| --- | --- | --- |
| / | Public homepage | No |
| /signup | Create an account | No |
| /login | Log in | No |
| /dashboard | User workspace | Yes |
| /profile | View the current profile | Yes |
| /profile/edit | Edit the current profile | Yes |
| /talent | Search active users | No |
| /talent/[id] | View an active talent profile | No |
| /jobs | Browse open jobs | No |
| /jobs/[jobId] | View a job and apply | Login required to apply |
| /jobs/create | Post a job | Yes |
| /listings | View jobs posted by the current user | Yes |
| /requests | View applications submitted by the current user | Yes |
| /projects | View created and joined projects | Yes |
| /projects/create | Create a project with selected talent | Yes |
| /projects/[projectId] | View a project and invitation | Yes |
| /messages | View conversations | Yes |
| /messages/[conversationId] | Read and send messages | Yes and must be a participant |
| /admin | Administrator dashboard | Administrator only |
| /admin/users | Manage users | Administrator only |
| /admin/jobs | Manage jobs | Administrator only |
| /admin/applications | View applications | Administrator only |
| /admin/projects | View projects | Administrator only |

## Authentication boundary

Authentication uses a random session token stored in both the database and an HTTP-only browser cookie. Protected pages call **getCurrentUser()**. Administrator pages call **requireAdmin()**, which redirects unauthenticated users to **/login** and non-administrators to **/dashboard**.

Conversation details are additionally filtered so only one of the two participants can open them.

> Project details currently require login but do not yet verify that the current user is the creator or an invited member. Add that authorization check before treating project data as private.

## Database boundary

All application database access goes through the shared Prisma client in **web/src/lib/prisma.ts**. The running application uses **DATABASE_URL**. Prisma migration commands use **DIRECT_URL** through **web/prisma.config.ts**.

## Language system

The application supports English and Dutch through **web/src/i18n/LanguageProvider.tsx**. The provider:

- Stores the selected language in a browser cookie.
- Updates the HTML language attribute and page title.
- Translates known interface text and attributes.
- Observes dynamically added interface content and translates it when a matching entry exists.

The system translates interface strings, not user-generated names, job descriptions, project descriptions, or messages.

## Static and database-backed content

The homepage currently uses demonstration data for statistics, example jobs, projects, and talent cards. The marketplace pages such as Jobs, Talent, Dashboard, Projects, Messages, and Admin read from PostgreSQL.

## Current implementation boundaries

- The Jobs search box is displayed but does not yet filter jobs.
- Google authentication and password recovery are not implemented.
- Job application acceptance and rejection are represented in the database, but no current user interface changes those statuses.
- Project completion and archiving are represented in the database, but no current user interface changes project status.
- The dashboard message badge and preview panel are placeholders; the full Messages page uses real data.
- The first administrator must be assigned directly in the database.