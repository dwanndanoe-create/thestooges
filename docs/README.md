# Microjobs.sr Documentation

This directory contains the official documentation website for Microjobs.sr.

Microjobs.sr is a local-first micro-jobs and talent marketplace for Suriname. The platform allows users to create profiles, discover talent, create and apply for jobs, showcase projects, and communicate directly with other users.

The documentation website is built separately from the main web application and is intended to explain the project's architecture, features, setup process, database, authentication, and deployment.

## Tech Stack

| Technology     | Purpose                             |
| -------------- | ----------------------------------- |
| Astro          | Documentation site framework        |
| Starlight      | Documentation UI and content system |
| Markdown / MDX | Documentation content               |
| Pagefind       | Documentation search                |
| Node.js        | Development runtime                 |
| npm            | Package management                  |

## Prerequisites

To work on the documentation site locally, install:

* Node.js 22 or later
* npm
* Git

## Installation

From the repository root:

```bash
cd docs
npm install
```

## Development

Start the documentation development server:

```bash
npm run dev
```

Astro will provide a local URL, normally:

```text
http://localhost:4321
```

## Production Build

Build the documentation site:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

The generated static website is placed in:

```text
docs/dist/
```

## Documentation Structure

```text
docs/
├── public/
├── src/
│   └── content/
│       └── docs/
│           ├── index.mdx
│           ├── getting-started.md
│           ├── architecture.md
│           ├── authentication.md
│           ├── database.md
│           ├── jobs.md
│           ├── projects.md
│           ├── messaging.md
│           ├── admin.md
│           └── deployment.md
│
├── astro.config.mjs
├── package.json
├── tsconfig.json
└── README.md
```

## Documentation Topics

The documentation covers the major parts of Microjobs.sr:

### Getting Started

Explains the prerequisites, installation process, environment configuration, database setup, and local development workflow.

### Architecture

Describes the overall repository structure and how the documentation site and Next.js application are organized.

### Authentication

Documents the custom session-based authentication system, password hashing, sessions, cookies, and protected routes.

### Database

Explains the PostgreSQL database, Prisma ORM, important models, relationships, migrations, and database rules.

### Jobs and Applications

Documents job creation, job discovery, applications, application rules, and the job lifecycle.

### Projects

Explains how users create and showcase projects as part of their profiles.

### Messaging

Documents conversations, messages, conversation rules, and restrictions such as preventing self-messaging and duplicate conversations.

### Administration

Explains the protected admin area and server-side administrative authorization.

### Deployment

Documents the production architecture using GitHub, Vercel, Next.js, Prisma, and Neon PostgreSQL.

## Usage

The documentation website can be used as a reference for:

* Setting up the project locally
* Understanding the application architecture
* Understanding the database
* Understanding authentication
* Understanding application features
* Running migrations
* Building the application
* Deploying the project

## Relationship to the Web Application

The repository follows the required MPA structure:

```text
microjobs-sr revised/
├── README.md
├── docs/
│   ├── README.md
│   └── src/content/docs/
│
└── web/
    ├── README.md
    ├── package.json
    ├── prisma/
    └── src/
```

The `web` directory contains the Next.js application.

The `docs` directory contains the Astro + Starlight documentation website.

The root `README.md` provides the project overview required by the submission structure.

## Build Verification

The documentation site can be verified with:

```bash
npm run build
```

A successful build generates the static documentation website in `docs/dist/`.

The current documentation build completes successfully.

## Deployment

The documentation site is a static Astro site and can be deployed to a static hosting platform.

The deployed documentation URL must be publicly accessible for submission.

## Project

Microjobs.sr is designed around a simple idea:

> Make it easier for people in Suriname to find opportunities, find talent, and connect with each other.

The platform focuses on local opportunities, practical skills, and direct connections between people.
