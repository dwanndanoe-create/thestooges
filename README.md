# ✦ Microjobs.sr

### a local-first micro-jobs & talent marketplace — simple, friendly, and built around people

designed to make finding work, finding talent, and starting a conversation feel effortless

<p align="center">
  <img src="./public/mj-logo-full.png" width="800" alt="Microjobs.sr logo">
</p>

---

## ✦ a different kind of marketplace

most job platforms feel corporate

Microjobs.sr is built for something smaller

something local

something human

> **discover someone → understand what they can do → connect → work**

no complicated hiring systems

no unnecessary roles

just people, skills, jobs, and conversations

---

## ✦ built for

```text
people who need something done
people with skills to offer
students & freelancers
local businesses
anyone looking for an opportunity
```

one account can do everything.

```text
post a job
      +
apply for a job
      +
offer your skills
      +
message people
```

no artificial separation between "employer" and "worker".

---

## ✦ the core system

```text
                  ┌───────────────┐
                  │    PROFILE    │
                  │ who you are   │
                  │ what you do   │
                  └───────┬───────┘
                          │
                          ▼
┌──────────────┐   ┌───────────────┐   ┌──────────────┐
│    TALENT    │ → │    CONNECT    │ ← │     JOBS     │
│ find people  │   │   messages    │   │  find work   │
└──────────────┘   └───────┬───────┘   └──────────────┘
                          │
                          ▼
                  ┌───────────────┐
                  │     WORK      │
                  │ applications  │
                  │    activity   │
                  └───────────────┘
```

everything connects

**profiles → talent → messages → jobs → applications → dashboard**

nothing should feel isolated.

---

## ✦ discover talent

find people by:

```text
name
skills
location
```

open someone's profile

see what they can do

start a conversation

all without leaving Microjobs.

---

## ✦ create & find jobs

post a job with:

```text
title
description
budget
location
skills
```

jobs can be:

```text
OPEN
CLOSED
```

and users can apply with an optional message.

```text
JOB
 ↓
APPLICATION
 ↓
PENDING
 ↓
ACCEPTED / REJECTED
```

---

## ✦ messaging

communication stays inside Microjobs.

```text
talent profile
      ↓
    message
      ↓
conversation
      ↓
    reply
```

conversations are shared between two people.

```text
A → B
B → A
```

doesn't create two chats.

it stays one conversation.

users also can't:

```text
message themselves
message inactive users
create duplicate conversations
```

---

## ✦ your workspace

the dashboard brings everything together.

```text
┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│   PROFILE    │   │   MESSAGES   │   │ NOTIFICATIONS│
│   identity   │   │ conversations│   │    updates   │
└──────────────┘   └──────────────┘   └──────────────┘

┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│ APPLICATIONS │   │    JOBS      │   │   ACTIVITY   │
│    status    │   │   posted     │   │   what's new │
└──────────────┘   └──────────────┘   └──────────────┘
```

one place to see what's happening.

---

## ✦ local by design

Microjobs.sr is built around **Suriname**.

location matters

skills matter

people matter

the goal isn't to compete with massive global marketplaces.

it's to make it easier to find the person you need —

**close to home.**

---

## ✦ little details

the interface is designed to feel:

```text
clean
friendly
lightweight
trustworthy
slightly playful
```

soft surfaces

emerald accents

quiet borders

rounded cards

subtle motion

small interactions

even the account menu has a little **toucan** personality.

because software doesn't have to feel sterile.

---

## ✦ visual language

```text
┌─────────────────────────────────────────────┐
│                                             │
│   soft backgrounds                          │
│   rounded surfaces                          │
│   emerald accents                           │
│   minimal borders                           │
│   subtle shadows                            │
│   responsive layouts                        │
│                                             │
└─────────────────────────────────────────────┘
```

the goal:

> **feel like an app, not a corporate website.**

---

## ✦ stack

<div align="center">

<table>
<tr>
<td align="center">
<img src="https://cdn.simpleicons.org/nextdotjs" width="42"><br>
<b>Next.js</b>
</td>
<td align="center">
<img src="https://cdn.simpleicons.org/react" width="42"><br>
<b>React</b>
</td>
<td align="center">
<img src="https://cdn.simpleicons.org/typescript" width="42"><br>
<b>TypeScript</b>
</td>
<td align="center">
<img src="https://cdn.simpleicons.org/tailwindcss" width="42"><br>
<b>Tailwind</b>
</td>
</tr>

<tr>
<td align="center">
<img src="https://cdn.simpleicons.org/prisma" width="42"><br>
<b>Prisma</b>
</td>
<td align="center">
<img src="https://cdn.simpleicons.org/postgresql" width="42"><br>
<b>PostgreSQL</b>
</td>
<td align="center">
<img src="https://cdn.simpleicons.org/neon" width="42"><br>
<b>Neon</b>
</td>
<td align="center">
<img src="https://cdn.simpleicons.org/nodedotjs" width="42"><br>
<b>Node.js</b>
</td>
</tr>

<tr>
<td align="center">
<img src="https://cdn.simpleicons.org/framer" width="42"><br>
<b>Framer Motion</b>
</td>
<td align="center">
<img src="https://cdn.simpleicons.org/lucide" width="42"><br>
<b>Lucide</b>
</td>
<td align="center">
<img src="https://cdn.simpleicons.org/git" width="42"><br>
<b>Git</b>
</td>
<td align="center">
<img src="https://cdn.simpleicons.org/github" width="42"><br>
<b>GitHub</b>
</td>
</tr>
</table>

</div>

small stack → fast development → focused experience

---

## ✦ architecture

```text
Next.js
   │
   ├── App Router
   ├── React
   ├── Server Actions
   └── Authentication
          │
          ▼
       Prisma
          │
          ▼
     PostgreSQL
          │
          ▼
         Neon
```

database access lives through Prisma.

generated client:

```text
src/generated/prisma
```

---

## ✦ database

```text
                 ┌──────────┐
                 │   USER   │
                 └────┬─────┘
                      │
       ┌──────────────┼──────────────┐
       ▼              ▼              ▼
     JOBS        APPLICATIONS    CONVERSATIONS
                                      │
                                      ▼
                                   MESSAGES
```

additional system data handles:

```text
sessions
blacklisted names
error logs
```

important rules are enforced at the database/application level.

```text
one application per job
no duplicate conversations
no self messaging
inactive users cannot be contacted
```

---

## ✦ project structure

```text
src/
├── app/
│   ├── actions/
│   ├── dashboard/
│   ├── login/
│   ├── register/
│   ├── profile/
│   ├── talent/
│   └── messages/
│
├── components/
│   ├── auth/
│   ├── dashboard/
│   ├── layout/
│   ├── messages/
│   ├── talent/
│   ├── sections/
│   └── ui/
│
├── hooks/
├── lib/
└── generated/
    └── prisma/

prisma/
├── schema.prisma
└── migrations/
```

modular by design.

new features should connect to the existing system rather than becoming isolated pages.

---

## ✦ local setup

```bash
git clone https://github.com/dwanndanoe-create/thestooges.git

cd thestooges

npm install
```

create your environment:

```bash
cp .env.example .env
```

add your database:

```env
DATABASE_URL="your-neon-database-url"
```

generate Prisma:

```bash
npx prisma generate
```

sync your development database:

```bash
npx prisma db push
```

start Microjobs:

```bash
npm run dev
```

then open:

```text
http://localhost:3000
```

---

## ✦ database tools

generate the Prisma client:

```bash
npx prisma generate
```

push schema changes:

```bash
npx prisma db push
```

create a migration:

```bash
npx prisma migrate dev --name your-migration-name
```

inspect the database:

```bash
npx prisma studio
```

---

## ✦ current status

Microjobs is actively being built.

the main marketplace loop is already connected:

```text
USER
 ↓
PROFILE
 ↓
DISCOVER
 ↓
CONNECT
 ↓
MESSAGE
 ↓
CONVERSATION
 ↓
REPLY
```

and the job loop:

```text
USER
 ↓
CREATE JOB
 ↓
DISCOVER JOB
 ↓
APPLY
 ↓
MANAGE APPLICATION
```

the project is now moving from:

```text
"does it work?"
```

toward:

```text
"does it feel good?"
```

---

## ✦ next

```text
unread message counts
message read states
better conversation UI
notifications
dashboard activity
talent search
job search
filters
mobile polish
admin dashboard
error monitoring
```

the focus is refinement.

not feature bloat.

---

## ✦ design principle

> people first
> clarity over complexity
> connection over bureaucracy
> local over corporate
> useful over noisy
> simple over bloated

Microjobs should make three things obvious:

```text
who can help me?

what can I do?

how do I connect?
```

---

## ✦ the bigger idea

a job doesn't always need a company.

a worker doesn't always need a resume.

a skill doesn't always need a degree.

sometimes someone just needs help.

and someone else knows how to do it.

**Microjobs.sr exists to make that connection easier.**

---

## ✦

not LinkedIn.

not Upwork.

not another giant job board.

something smaller.

something local.

something human.

```text
discover → understand → connect → work
```

---

✦ **built for Suriname, built with intention.**
