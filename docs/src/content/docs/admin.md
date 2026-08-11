---
title: Administration
description: Set up and use the protected Microjobs.sr administrator area.
---

Microjobs.sr includes a server-protected administrator area for monitoring users, jobs, applications, and projects.

## Access protection

Administrator pages call **requireAdmin()** before loading their content.

~~~text
Open an /admin route
  ↓
Valid session?
  ├── No  → Redirect to /login
  └── Yes
        ↓
      isAdmin true?
        ├── No  → Redirect to /dashboard
        └── Yes → Show administrator page
~~~

Changing the browser URL is not enough to bypass this check because it runs on the server.

## Create the first administrator

There is no public screen for creating the first administrator. First register a normal account, then update that account through Prisma Studio.

1. Configure the database values in **web/.env**.
2. Open a terminal in the **web** folder.
3. Run:

~~~powershell
npx prisma studio
~~~

4. Open the **User** model.
5. Find the correct account by email address.
6. Change **isAdmin** from false to true.
7. Save the record.
8. Log out of Microjobs.sr and log in again.

After login, the administrator is redirected to **/admin**.

> Verify the email carefully before granting access. An administrator can activate accounts, deactivate accounts, grant administrator rights, remove administrator rights, and control job visibility.

## Admin Dashboard

The Admin Dashboard shows platform-wide totals:

- Total and active users.
- Total and open jobs.
- Total and pending applications.
- Total and active projects.

The **Needs attention** panel highlights pending applications and open jobs. Its links open the matching administrator section.

## Manage users

Open **Admin → Users**.

The page shows each user's:

- Name and email address.
- Optional location.
- Active or inactive status.
- Administrator status.

Available actions:

| Action | Result |
| --- | --- |
| Deactivate | Sets isActive to false. The account cannot complete a new login. |
| Activate | Sets isActive to true. The account can log in again. |
| Make admin | Sets isAdmin to true. |
| Remove admin | Sets isAdmin to false. |

The current administrator cannot deactivate themselves or remove their own administrator status through these server actions.

> Deactivating a user currently blocks future login attempts, but it does not automatically delete existing sessions. See the Authentication page for this limitation.

## Manage jobs

Open **Admin → Jobs**.

Each job displays:

- Title and status.
- Creator name and email address.
- Budget in SRD.
- Number of applications.

Select **Close job** to change an OPEN job to CLOSED. Select **Reopen job** to change a CLOSED job back to OPEN.

Closing a job removes it from the public open-jobs list and prevents new applications. It does not delete the job or its existing applications.

## View applications

Open **Admin → Applications**.

The page shows:

- Job title.
- Applicant name and email address.
- Job owner name.
- Application status.

This page is currently read-only. It does not accept or reject applications.

## View projects

Open **Admin → Projects**.

The page shows:

- Project title.
- Creator name and email address.
- Project type and status.
- Number of ProjectMember records.

This page is currently read-only. It does not edit, complete, archive, or delete projects.

## Log out

Select **Log out** in the administrator header or navigation. The session record and browser cookie are removed, and the user is returned to the login page.

## Current limitations

- The first administrator must be assigned directly in the database.
- Application decisions cannot be changed in the administrator interface.
- Projects cannot be edited or moderated in the administrator interface.
- Users and content cannot be searched, filtered, or paginated.
- There is no administrator audit log showing who performed an action.
- There is no confirmation dialog before account-status, administrator-status, or job-status changes.

## Relevant files

| File | Purpose |
| --- | --- |
| web/src/lib/admin.ts | requireAdmin() route guard |
| web/src/app/admin/page.tsx | Admin Dashboard and totals |
| web/src/app/admin/users/page.tsx | User management |
| web/src/app/admin/jobs/page.tsx | Job management |
| web/src/app/admin/applications/page.tsx | Application monitoring |
| web/src/app/admin/projects/page.tsx | Project monitoring |
| web/src/app/actions/admin.ts | User activation and administrator actions |
| web/src/app/actions/adminJobs.ts | Job close and reopen action |