---
title: Deployment
description: Build, configure, and deploy Microjobs.sr with Vercel and Neon.
---

The production Microjobs.sr application is deployed from the **web** directory to Vercel and connects to a Neon PostgreSQL database.

Production application: [https://microjobs-sr.vercel.app/](https://microjobs-sr.vercel.app/)

## Deployment architecture

~~~text
GitHub repository
  ↓
Vercel project with Root Directory = web
  ↓
Next.js build and server runtime
  ↓
Prisma PostgreSQL adapter
  ↓
Neon PostgreSQL database
~~~

## Repository roles

| Repository | Purpose |
| --- | --- |
| dwanndanoe-create/thestooges | Course submission and teacher-facing repository |
| Nikhcodes/microjobs.sr | Personal repository used as the production deployment source |

Confirm which repository Vercel is connected to before expecting a Git push to update production.

## Production requirements

- A GitHub repository containing the project.
- A Vercel account and project.
- A Neon PostgreSQL production database.
- **DATABASE_URL** and **DIRECT_URL** connection strings.
- Applied Prisma migrations.

## Prepare the database

Use the production database's pooled connection for **DATABASE_URL** and direct connection for **DIRECT_URL**.

Before the application expects a new schema, apply committed migrations from the **web** directory:

~~~powershell
npm install
npx prisma generate
npx prisma migrate deploy
~~~

Run migration commands in a controlled environment. Back up important data first and never use **prisma migrate reset** on production.

## Configure Vercel

1. Sign in to Vercel.
2. Select **Add New → Project**.
3. Import the correct GitHub repository.
4. Set **Root Directory** to:

~~~text
web
~~~

5. Keep the framework preset as **Next.js**.
6. Add these environment variables:

~~~text
DATABASE_URL="your-production-pooled-postgresql-url"
DIRECT_URL="your-production-direct-postgresql-url"
~~~

7. Add the variables to **Production** and, when used, separate Preview and Development environments.
8. Select **Deploy**.

Vercel runs the project's npm install and Next.js build from the **web** directory. The package's **postinstall** script also generates the Prisma client.

## Environment separation

Use different databases for different environments:

| Environment | Recommended database |
| --- | --- |
| Local development | Dedicated development database |
| Vercel Preview | Separate preview or testing database |
| Production | Production database with restricted credentials |

Do not place production secrets in source code, screenshots, documentation, or Git commits.

## Test a production build locally

From the **web** directory:

~~~powershell
npm install
npx prisma generate
npm run build
npm start
~~~

Open [http://localhost:3000](http://localhost:3000).

The build can succeed without proving every database feature works. Test registration, login, profile editing, jobs, applications, projects, messages, and administrator access against a safe database.

## Deploy code updates

1. Test the change locally.
2. Run **npm run build** in **web**.
3. Commit the source code and any required migration files.
4. Push to the Git branch connected to Vercel.
5. Apply database migrations when the schema changed.
6. Wait for the Vercel deployment to succeed.
7. Open the production URL and perform a short functional test.

## Production verification checklist

- Homepage loads without console or hydration errors.
- English and Dutch switching works.
- Registration creates an account and opens the Dashboard.
- Login and logout work.
- Inactive users cannot log in.
- Jobs load from the production database.
- A test job can be created and applied for.
- Talent search loads active users.
- Project invitations can be accepted or declined.
- Messages can be sent and marked as read.
- Administrator routes reject normal users.
- Logos, fonts, and responsive layouts load correctly.

## Deploy the documentation separately

The **docs** directory is a separate Astro project and is not part of the Next.js production application unless it is configured as another deployment.

To build it locally:

~~~powershell
cd docs
npm install
npm run build
~~~

The generated static output is written to **docs/dist**. If deploying the documentation as a separate Vercel project, use **docs** as that project's Root Directory.

## Troubleshooting

### The homepage works but Jobs, Talent, or login fails

Check that **DATABASE_URL** and **DIRECT_URL** exist in the correct Vercel environment and point to a reachable database.

### Prisma reports missing tables or columns

Apply the committed migrations:

~~~powershell
npx prisma migrate deploy
~~~

### A push does not create a deployment

Check the connected repository, production branch, and Vercel project Root Directory.

### The wrong application is built

The main site must use **web** as Root Directory. The documentation site must use **docs** as Root Directory.

### Local code works but production does not

Compare environment variables, migration status, Node.js runtime, case-sensitive file names, and build logs. Do not copy a local **.env** file into Git.

## Security and readiness notes

Before treating the project as a public production service, address the known authentication placeholders, project-detail authorization gap, existing-session behavior for deactivated users, missing administrator audit history, and incomplete job-application decision flow.

## Relevant files

| File | Purpose |
| --- | --- |
| web/package.json | Install, development, build, and start scripts |
| web/.env.example | Required environment-variable names |
| web/prisma.config.ts | DIRECT_URL migration configuration |
| web/src/lib/prisma.ts | DATABASE_URL runtime configuration |
| web/next.config.mjs | Next.js configuration |
| docs/package.json | Documentation development and build scripts |
| docs/astro.config.mjs | Documentation title, links, and sidebar |