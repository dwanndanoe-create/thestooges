---
title: Jobs and Applications
description: Browse jobs, post listings, apply for work, track requests, and discover talent.
---

The Jobs area supports both sides of the marketplace. A user can browse and apply for work, or use the same account to post a job and look for talent.

## Browse open jobs

1. Open **Jobs** from the homepage or select **Find jobs** on the Dashboard.
2. Review the available open jobs.
3. Select a job card to open its details.
4. Review the title, description, budget, location, required skills, and person who posted it.

The public Jobs page displays only jobs whose status is **OPEN**, with the newest records first.

> The visible **Search jobs...** field is not connected to filtering yet. Typing in it currently does not change the job list.

## Apply for a job

You must be logged in before an application can be submitted.

1. Open an available job.
2. Read all job details.
3. Select **Apply**.
4. Wait for the success message.
5. Open **Dashboard → Requests Sent** to review the application.

The server prevents a user from:

- Applying while logged out.
- Applying to a job they created.
- Applying to a closed job.
- Applying to the same job more than once.

An application currently contains no message from the applicant, even though the database model has an optional message field.

## Track submitted applications

Open **Dashboard → Requests Sent**. Each application shows the job details and an application status.

| Status | Meaning |
| --- | --- |
| PENDING | The application was submitted and no decision has been recorded. |
| ACCEPTED | The application was selected. |
| REJECTED | The application was not selected. |

New applications are created as **PENDING**.

> The current application has no owner or administrator control for accepting or rejecting an application. The ACCEPTED and REJECTED states exist in the database and interface, but no current screen updates an application to those values.

## Post a job

1. Log in.
2. Select **Post a job** on the Dashboard or Jobs page.
3. Enter a job title.
4. Describe the work clearly.
5. Enter a positive budget in Surinamese dollars.
6. Enter a location when applicable.
7. Add relevant skills individually.
8. Select **Post job**.

After creation, the job is saved as **OPEN** and the user is sent to the Jobs page.

### Job validation

| Field | Rule |
| --- | --- |
| Title | Required and at least 5 characters |
| Description | Required, at least 20 characters, and at most 2,000 characters in the form |
| Budget | Required, greater than zero, and rounded to a whole SRD amount |
| Location | Optional |
| Skills | Optional, unique in the form, and limited to 10 |

## Review jobs you posted

Open **Dashboard → My Listings**. The page shows all jobs created by the current user, including both open and closed jobs.

Select **View details** to see a listing exactly as it appears on the job detail page.

The job owner currently cannot edit, delete, close, or reopen a listing from the normal user interface. An administrator can close or reopen it from **Admin → Jobs**.

## Job lifecycle

~~~text
User posts job
  ↓
OPEN
  ↓
Other users submit PENDING applications
  ↓
Administrator may close the job
  ↓
CLOSED
~~~

Closed jobs no longer appear on the public Jobs list and do not accept new applications. Existing applications remain in the database.

## Find talent

The Talent area is the worker-discovery side of the marketplace.

1. Select **Find talent** on the Dashboard.
2. Search by name, location, or skill.
3. Open an active profile.
4. Review the person's biography and skills.
5. Select **Message** to start or continue a conversation, or **Start a project** to create a collaboration or mentorship invitation.

Unlike the Jobs search field, the Talent search is connected to filtering.

Only active users appear in Talent results. A user cannot message themselves, create a project with themselves, or contact an inactive account.

## Relevant files

| File | Purpose |
| --- | --- |
| web/src/app/jobs/page.tsx | Open job list |
| web/src/app/jobs/[jobId]/page.tsx | Job detail page |
| web/src/app/jobs/create/page.tsx | Protected job-creation page |
| web/src/components/jobs/CreateJobForm.tsx | Job form and client-side behavior |
| web/src/app/actions/job.ts | Job creation and application server actions |
| web/src/app/requests/page.tsx | Applications submitted by the current user |
| web/src/app/listings/page.tsx | Jobs posted by the current user |
| web/src/app/talent/page.tsx | Talent list and search |
| web/src/app/talent/[id]/page.tsx | Public talent profile |