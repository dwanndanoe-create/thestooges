# Microjobs.sr Web Application

Microjobs.sr is a local-first micro-jobs and talent marketplace for Suriname. The web application connects people who need work done with people who have useful skills, allowing users to create profiles, discover talent, post and apply for jobs, showcase projects, and communicate directly.

This directory contains the complete Next.js web application for Microjobs.sr.

## Tech Stack

| Layer            | Technology                          |
| ---------------- | ----------------------------------- |
| Framework        | Next.js 16 with App Router          |
| UI               | React                               |
| Language         | TypeScript                          |
| Styling          | Tailwind CSS                        |
| Animation        | Framer Motion                       |
| Icons            | Lucide React                        |
| ORM              | Prisma 7                            |
| Database         | PostgreSQL                          |
| Database Hosting | Neon                                |
| Authentication   | Custom session-based authentication |
| Password Hashing | bcrypt                              |
| Runtime          | Node.js                             |
| Deployment       | Vercel                              |

## Prerequisites

Before running the application locally, install:

* Node.js 22 or later
* npm
* PostgreSQL-compatible database
* Git

A Neon PostgreSQL database can be used for development and production.

## Installation

From the repository root:

```bash
cd web
npm install
```

## Environment Variables

Create a local environment file:

```bash
cp .env.example .env
```

Configure the database connection:

```env
DATABASE_URL="your-neon-database-url"
DIRECT_URL="your-neon-direct-database-url"
```

Do not commit `.env` or any file containing real database credentials.

## Database Setup

Generate the Prisma client:

```bash
npx prisma generate
```

Apply development migrations:

```bash
npx prisma migrate dev
```

For a deployed environment, apply existing migrations with:

```bash
npx prisma migrate deploy
```

Useful Prisma commands:

```bash
npx prisma generate
npx prisma migrate dev --name your-migration
npx prisma migrate deploy
npx prisma studio
```

## Development

Start the Next.js development server:

```bash
npm run dev
```

The application runs at:

```text
http://localhost:3000
```

## Production Build

Create an optimized production build:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

The production build performs TypeScript checking, page generation, and optimization for the application's server-rendered routes.

## Application Features

### Authentication

Microjobs uses custom session-based authentication.

The authentication flow is:

```text
Sign Up
   ↓
Password validation
   ↓
Password hashing with bcrypt
   ↓
User creation
   ↓
Session creation
   ↓
HTTP-only session cookie
   ↓
Authenticated application
```

Users can:

* Create an account
* Log in
* Log out
* Maintain an authenticated session
* Access protected pages

Inactive accounts cannot log in.

### Profiles

Each user can maintain a profile containing information such as:

* Name
* Location
* Biography
* Skills
* Projects

Profiles are used throughout the platform to help users discover and evaluate talent.

### Talent Discovery

The talent section allows users to browse available talent and open individual profiles.

Users can view:

* User information
* Skills
* Biography
* Location
* Projects

Users can also start a conversation from a talent profile.

### Jobs

Users can create jobs containing:

* Title
* Description
* Budget
* Location
* Required skills

Jobs follow a basic lifecycle:

```text
Created
   ↓
Open
   ↓
Applications
   ↓
Accepted / Rejected
   ↓
Closed
```

### Applications

Users can apply to jobs with an optional message.

The application system prevents duplicate applications to the same job.

Applications can be reviewed by the job owner and managed through the application workflow.

### Projects

Users can create projects and showcase them as part of their profile.

Projects provide evidence of practical skills and allow users to demonstrate work rather than relying only on written skill descriptions.

### Messaging

Microjobs provides direct messaging between users.

The messaging system uses conversations shared between two users.

The application prevents:

* Self-messaging
* Duplicate conversations
* Messaging inactive users

Messages are associated with their conversation and sender.

### Dashboard

The dashboard provides a central workspace for authenticated users.

It brings together information such as:

* Profile information
* Jobs
* Applications
* Projects
* Messages
* Recent activity
* Quick actions

### Admin System

Microjobs includes a protected administrative area.

Administrative access is controlled by the user's `isAdmin` property.

The server-side authorization flow is:

```text
Request /admin
      ↓
Check current session
      ↓
No user? → /login
      ↓
Check isAdmin
      ↓
Not admin? → /dashboard
      ↓
Admin → Admin Dashboard
```

The admin system provides access to:

* Users
* Jobs
* Applications
* Projects

Admin pages perform authorization on the server, so knowing the `/admin` URL alone does not grant access.

## Application Structure

```text
web/
├── prisma/
│   ├── migrations/
│   └── schema.prisma
│
├── public/
│   ├── images/
│   └── Microjobs logos
│
├── src/
│   ├── app/
│   │   ├── actions/
│   │   ├── admin/
│   │   ├── dashboard/
│   │   ├── jobs/
│   │   ├── listings/
│   │   ├── login/
│   │   ├── messages/
│   │   ├── profile/
│   │   ├── projects/
│   │   ├── requests/
│   │   ├── signup/
│   │   └── talent/
│   │
│   ├── components/
│   │   ├── admin/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── jobs/
│   │   ├── layout/
│   │   ├── messages/
│   │   ├── projects/
│   │   ├── sections/
│   │   ├── talent/
│   │   └── ui/
│   │
│   ├── data/
│   ├── hooks/
│   ├── i18n/
│   └── lib/
│
├── .env.example
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── prisma.config.ts
├── tsconfig.json
└── README.md
```

The application follows a modular structure where routes, server actions, reusable components, authentication, database access, and shared utilities are separated into their own areas.

## Database

The application uses Prisma as its ORM and PostgreSQL as its database.

The main domain relationships include:

```text
User
 ├── Jobs
 ├── Applications
 ├── Projects
 ├── Sessions
 ├── Conversations
 │     └── Messages
 └── Profile information
```

Important application and database rules include:

* One application per job
* No duplicate conversations
* No self-messaging
* Inactive users cannot be contacted
* Inactive accounts cannot log in
* Admin routes require administrative access

## Deployment

The web application is deployed using Vercel.

The production architecture is:

```text
GitHub
   ↓
Vercel
   ↓
Next.js
   ↓
Prisma
   ↓
Neon PostgreSQL
```

Production environment variables are configured through the deployment platform and are not stored in the repository.

## Production Application

The deployed application is available at:

https://microjobs-sr.vercel.app/

## Security Considerations

The application follows several basic security practices:

* Passwords are hashed using bcrypt.
* Authentication sessions use HTTP-only cookies.
* Database credentials are stored in environment variables.
* `.env` files are excluded from version control.
* Admin authorization is performed server-side.
* Inactive accounts cannot authenticate.
* Inactive users cannot be contacted.
* Duplicate applications and conversations are prevented.

## Build Verification

The application can be verified with:

```bash
npm run build
```

The current production build completes successfully and generates all application routes.

## Repository Structure

The repository separates the application from the documentation site:

```text
microjobs-sr revised/
├── docs/    # Astro + Starlight documentation
├── web/     # Next.js web application
└── README.md
```

This structure follows the MPA submission requirements.
