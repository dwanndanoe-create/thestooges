---
title: Projects
description: Create collaboration or mentorship projects and manage invitation responses.
---

Projects let two Microjobs.sr users organize a collaboration or mentorship relationship. A project starts with one user selecting another active person from the Talent area.

## Project types

| Type | Purpose |
| --- | --- |
| Collaboration | Build something together and gain practical experience as a team. |
| Mentorship | Learn from each other while working toward a practical goal. |

The selected type is saved in the database as **COLLABORATION** or **MENTORSHIP**.

## Create a project

1. Log in and open **Find talent**.
2. Search for the person you want to invite.
3. Open that person's profile.
4. Select **Start a project**.
5. Enter a project title of at least 5 characters.
6. Enter a description of at least 20 characters.
7. Choose **Collaboration** or **Mentorship**.
8. Select **Create project**.

The description form accepts up to 2,000 characters.

The website creates an active project, assigns the logged-in user as its creator, and adds the selected person as a pending member.

> A project must start with selected talent. Opening **/projects/create** without a talent identifier sends the user to the Talent page. This is why the Dashboard's **Create project** action first leads to choosing a person.

## Invitation flow

~~~text
Creator selects talent
  ↓
Project created as ACTIVE
  ↓
Member invitation created as PENDING
  ├── Accept → ACCEPTED
  └── Decline → DECLINED
~~~

A duplicate membership for the same user and project is prevented by a database uniqueness rule.

## Review a project invitation

1. Log in and open the Dashboard.
2. Select the bell icon in the upper-right corner.
3. Open the project invitation.
4. Review the project type, title, description, creator, and member information.
5. Select **Accept** or **Decline**.

The invitation controls are displayed only while the current user's membership is **PENDING**.

## View projects

Open **Dashboard → Current Projects** or select **Projects**.

The Projects page includes:

- Projects created by the current user.
- Projects where the current user accepted the invitation.
- Project type and status.
- The creator's name.
- The number of accepted members plus the creator.

Pending invitations are not listed as joined projects. They are shown through Dashboard notifications until accepted or declined.

## Project detail page

The project detail page shows:

- Project type: Collaboration or Mentorship.
- Project status.
- Title and description.
- Creator information.
- Invited and accepted members.
- The invitation decision area when applicable.
- A confirmation when the current user is the creator or an accepted member.

## Project and member statuses

### Project status

| Status | Meaning |
| --- | --- |
| ACTIVE | The project is currently active. |
| COMPLETED | The work has been completed. |
| ARCHIVED | The project is retained but no longer active. |

New projects are created as **ACTIVE**. No current interface changes a project to COMPLETED or ARCHIVED.

### Member status

| Status | Meaning |
| --- | --- |
| PENDING | The invited person has not answered. |
| ACCEPTED | The person joined the project. |
| DECLINED | The person rejected the invitation. |

## Current limitations and security note

- A project currently supports one invited member when it is created.
- There is no interface to invite additional members later.
- There is no interface to edit, delete, complete, or archive a project.
- Declined invitations cannot be resent from the interface.
- The project detail route requires login but currently loads a project by its identifier without checking whether the user is its creator or a member. Add creator/member authorization before storing private project information.

## Relevant files

| File | Purpose |
| --- | --- |
| web/src/app/projects/page.tsx | Projects created or joined by the current user |
| web/src/app/projects/create/page.tsx | Protected creation page with selected talent |
| web/src/app/projects/[projectId]/page.tsx | Project details and invitation state |
| web/src/components/projects/CreateProjectForm.tsx | Project form and type selection |
| web/src/components/projects/ProjectInvitationActions.tsx | Accept and decline controls |
| web/src/app/actions/project.ts | Project creation and invitation actions |
| web/prisma/schema.prisma | Project and ProjectMember models and enums |