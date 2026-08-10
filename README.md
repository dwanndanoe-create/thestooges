<p align="center">
  <img src="./public/mj-black-logo.png" width="420" alt="Microjobs.sr logo">
</p>

<h1 align="center">Microjobs.sr</h1>

<p align="center">
  A local first micro jobs and talent marketplace for Suriname.
  <br>
  Find work. Find talent. Connect. Get things done.
</p>

<p align="center">
  <a href="https://microjobs-sr.vercel.app/"><strong>Live Application →</strong></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/status-active-brightgreen?style=flat-square" alt="status">
  <img src="https://img.shields.io/badge/platform-web-blue?style=flat-square" alt="platform">
  <img src="https://img.shields.io/badge/license-MIT-lightgrey?style=flat-square" alt="license">
</p>

<br>

## Tech Stack

<p align="center">
  <img src="https://skillicons.dev/icons?i=nextjs,react,ts,tailwind,prisma,postgres,vercel" alt="tech stack icons">
</p>

<div align="center">

| Layer | Technology |
|---|---|
| Framework | [Next.js](https://nextjs.org/) (App Router) |
| UI | [React](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/), [Lucide React](https://lucide.dev/) |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| ORM | [Prisma](https://www.prisma.io/) |
| Database | [PostgreSQL](https://www.postgresql.org/) via [Neon](https://neon.tech/) |
| Auth | Custom sessions with [bcrypt](https://www.npmjs.com/package/bcrypt) |
| Hosting | [Vercel](https://vercel.com/) |

</div>

<br>

## What is Microjobs.sr?

Microjobs.sr is a marketplace built around one simple idea: make it easier for people in Suriname to find opportunities, find talent, and connect with each other.

Instead of splitting people into rigid "employer" and "worker" roles, everyone gets one account. From there you can build a profile, showcase your skills, post jobs, apply to jobs, share projects, and message people directly, all in one place.

## The Idea

Most job platforms feel huge, corporate, and complicated. Microjobs.sr is intentionally smaller, more local, and more personal.

**Discover → Understand → Connect → Work**

## Built For

- Students
- Freelancers
- Local businesses
- People looking for work
- People looking for talent
- People who just need something done

One account can participate from either side. Need something done? Post a job and find people. Have a skill? Find a job and apply.

<br>

## Core Features

### Profiles
Every user has a profile with a name, bio, location, skills, and projects. It's the starting point for discovering people and understanding what they can actually do.

### Talent Discovery
Browse talent, open a profile, see their skills and projects, and start a conversation. The goal is to make the person behind the skill easy to understand.

### Jobs
Create jobs with a title, description, budget, location, and required skills. Jobs move through a simple lifecycle:

`Created → Open → Applications → Accepted or Rejected → Closed`

### Applications
Applications are tied directly to jobs and can include an optional message. Duplicate applications for the same job are automatically prevented.

### Projects
Users can showcase projects linked back to their profile. Skills are useful, but proof is even better.

### Messaging
Conversations happen directly inside Microjobs. Each conversation is shared between two users rather than split into two separate threads. The system prevents self messaging, duplicate conversations, and messaging inactive users.

### Dashboard
A single workspace bringing together your profile, messages, applications, jobs, projects, and recent activity.

<br>

## Authentication

Microjobs uses custom, session based authentication.

1. User signs up
2. Password is hashed with bcrypt
3. A secure session token is generated
4. The token is stored in an HTTP-only cookie
5. The user stays authenticated until the session expires or they log out

Inactive accounts are prevented from logging in.

<br>

## Admin System

Microjobs includes a protected admin area, gated by the user's `isAdmin` flag.

```
User → isAdmin: true → Admin Dashboard → Users / Jobs / Applications / Projects
```

Admin pages are protected on the server through a `requireAdmin()` check:

1. Is there a current user? If not, redirect to `/login`
2. Is the user an admin? If not, redirect to `/dashboard`
3. If both pass, render the admin dashboard

Knowing the `/admin` URL alone is not enough to access it.

### Admin Dashboard

The admin dashboard gives a platform wide overview: total and active users, total and open jobs, total and pending applications, and total and active projects. Admins can manage users and jobs, and view applications and projects, with pending items highlighted for attention.

<br>

## Database

Microjobs uses PostgreSQL through Prisma and Neon.

```
User ── Jobs ── Applications
User ── Projects
User ── Sessions
User ── Conversations ── Messages
```

The database also stores supporting data such as sessions, error logs, and blacklisted names.

**Rules enforced at the application and database level:**

- One application per job
- No duplicate conversations
- No self messaging
- Inactive users cannot be contacted
- Inactive accounts cannot log in
- Admin routes require admin access

<br>

## Project Structure

```
src/
├── app/
│   ├── actions/
│   ├── admin/
│   │   ├── applications/
│   │   ├── jobs/
│   │   ├── projects/
│   │   ├── users/
│   │   └── page.tsx
│   ├── dashboard/
│   ├── jobs/
│   ├── listings/
│   ├── login/
│   ├── messages/
│   ├── profile/
│   ├── projects/
│   ├── requests/
│   ├── signup/
│   └── talent/
│
├── components/
│   ├── admin/
│   ├── auth/
│   ├── dashboard/
│   ├── layout/
│   ├── messages/
│   ├── talent/
│   └── ui/
│
├── lib/
│   ├── auth.ts
│   ├── admin.ts
│   └── prisma.ts
│
└── generated/
    └── prisma/

prisma/
├── schema.prisma
└── migrations/

public/
└── assets/
```

Modular by design. Features live in their own areas while sharing the same authentication, database, and UI systems.

<br>

## Getting Started

Clone the repository:

```bash
git clone https://github.com/Nikhcodes/microjobs.sr.git
cd microjobs.sr
npm install
```

Create your environment file:

```bash
cp .env.example .env
```

Configure your Neon database in `.env`:

```env
DATABASE_URL="your-neon-database-url"
DIRECT_URL="your-neon-direct-database-url"
```

Generate the Prisma client and run migrations:

```bash
npx prisma generate
npx prisma migrate dev
```

Start the dev server:

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

### Database Commands

```bash
npx prisma generate                          # generate the client
npx prisma migrate dev --name your-migration  # create a migration
npx prisma migrate deploy                     # apply migrations
npx prisma studio                             # inspect the database
```

### Build

```bash
npm run build
```

The current production build compiles successfully, including all server rendered routes.

<br>

## Deployment

Microjobs.sr is deployed through Vercel.

```
GitHub → Vercel → Next.js → Prisma → Neon PostgreSQL
```

**Production:** [microjobs-sr.vercel.app](https://microjobs-sr.vercel.app/)

<br>

## Repositories

| Repository | Purpose |
|---|---|
| [dwanndanoe-create/thestooges](https://github.com/dwanndanoe-create/thestooges) | Original project repository |
| [Nikhcodes/microjobs.sr](https://github.com/Nikhcodes/microjobs.sr) | Deployment and personal repository |

The codebase is kept in sync between the two where needed.

<br>

## Current Status

The core marketplace is fully working, covering sign up and login, profiles, talent discovery, jobs and applications, projects, messaging, dashboards, and a full admin system on top of Prisma migrations and a production PostgreSQL database on Neon.

The project has moved past "does it work?" and into "how do we make it better?" The main systems are connected, and the focus now is on refinement: better interactions, better feedback, better mobile behavior, and less friction overall.

### Up Next

- Unread message counts
- Message read states
- Notifications
- Dashboard activity improvements
- Better talent and job search with filters
- Mobile polish
- Error monitoring
- Additional admin actions

Not feature bloat, just making the existing experience better.

<br>

## Design Philosophy

- People first
- Clarity over complexity
- Connection over bureaucracy
- Local over corporate
- Useful over noisy
- Simple over bloated

Microjobs should make three things obvious: who can help me, what can I do, and how do I connect. If those answers are easy to find, the platform is doing its job.

<br>

## Why Suriname?

Because local opportunities matter. Not every job needs to become a global marketplace listing, and not every freelancer needs to compete with thousands of people around the world. Sometimes the person you need is in your city, your neighborhood, or your network, and sometimes they just need someone to give them a chance.

Microjobs.sr is built around that idea.

## The Bigger Idea

A job doesn't always need a company. A worker doesn't always need a resume. A skill doesn't always need a degree. Sometimes someone just needs help, and someone else knows how to do it.

Microjobs.sr exists to make that connection easier.

Not LinkedIn. Not Upwork. Not another giant global job board. Something smaller, something local, something human.

<br>

<p align="center">
  <strong>Built for Suriname, built with intention.</strong>
  <br><br>
  <a href="https://microjobs-sr.vercel.app/"><strong>Visit Microjobs.sr →</strong></a>
  <br><br>
  <sub>Made with Next.js, Prisma, PostgreSQL, Neon, and a questionable amount of coffee.</sub>
</p>