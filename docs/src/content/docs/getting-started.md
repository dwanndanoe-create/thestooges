---
title: Getting Started
description: Learn how to use Microjobs.sr and run the website locally.
---

Microjobs.sr is a marketplace where people can find work, advertise jobs, discover talent, create projects, and communicate directly.

A single account can perform both roles:

- Apply for jobs as a worker.
- Post jobs as an employer.
- Search for talent.
- Create collaboration or mentorship projects.
- Send and receive messages.

## Open the website

The production website is available at:

[https://microjobs-sr.vercel.app/](https://microjobs-sr.vercel.app/)

From the homepage, you can:

- Browse available jobs.
- View public talent profiles.
- Create an account.
- Log in.
- Change the website language between English and Dutch.

## Create an account

1. Open the Microjobs.sr homepage.
2. Select **Sign up**.
3. Enter your full name.
4. Enter a valid email address.
5. Enter a password containing at least 8 characters.
6. Select **Create account**.

After successful registration, the website creates a session and sends you directly to the Dashboard.

The email address must be unique. If an account already exists with the entered email address, the registration form displays an error.

## Log in

1. Open the homepage.
2. Select **Log in**.
3. Enter your email address.
4. Enter your password.
5. Select **Log in**.

Normal users are sent to the Dashboard. Administrators are sent to the Admin Dashboard.

If the email address, password, or account status is incorrect, the website displays an error message.

> **Remember me** does not currently change the session duration, and **Forgot password?** is not connected to a password-reset page.

## Use the Dashboard

The Dashboard is the main workspace after login. It provides access to:

- **Find jobs** — browse open job listings.
- **Find talent** — search active user profiles.
- **Post a job** — publish a new job listing.
- **Create project** — choose a person and invite them to a collaboration or mentorship project.
- **Current Projects** — open projects you created or joined.
- **Requests Sent** — review jobs you applied for.
- **My Listings** — review jobs you posted.
- **Recommended Jobs** — see recent open jobs that you have not applied for.
- **Messages** — open conversations with other users.
- **Notifications** — review pending project invitations.
- **Account menu** — view your profile, edit it, or log out.

## Complete your profile

1. Open the account menu in the upper-right corner of the Dashboard.
2. Select **Edit profile**.
3. Update your name, location, biography, and skills.
4. Select **Save changes**.

The name must contain at least 2 characters. The biography can contain up to 500 characters, and a profile can contain up to 10 unique skills.

Your public talent profile helps other users understand who you are and whether your skills match their work.

## Change the language

Select the language control marked **EN** or **NL**. The interface changes between English and Dutch, while the layout, colors, and features remain the same.

The selected language is stored in the **microjobs_language** browser cookie for one year.

## Log out

1. Open the account menu on the Dashboard.
2. Select **Log out**.

Logging out deletes the current session from the database and removes the session cookie from the browser.

## Run the main website in Visual Studio Code

The main application is inside the **web** folder. Do not use Live Server and do not try to open an HTML file directly.

1. Extract the project ZIP file.
2. Open Visual Studio Code.
3. Select **File → Open Folder**.
4. Open the **thestooges/web** folder.
5. Select **Terminal → New Terminal**.
6. Run the following commands:

~~~powershell
npm install
Copy-Item .env.example .env
~~~

7. Open **web/.env** and enter development database connections:

~~~text
DATABASE_URL="your-pooled-postgresql-url"
DIRECT_URL="your-direct-postgresql-url"
~~~

Use a development database and never commit the **.env** file.

8. Prepare Prisma and the database:

~~~powershell
npx prisma generate
npx prisma migrate deploy
~~~

9. Start the website:

~~~powershell
npm run dev
~~~

10. Open [http://localhost:3000](http://localhost:3000).

Press **Ctrl + C** in the terminal to stop the development server.

## Run the documentation website

The documentation is a separate Astro Starlight project inside the **docs** folder.

1. Open a second terminal.
2. Move to the documentation folder.
3. Install its dependencies and start it:

~~~powershell
cd docs
npm install
npm run dev
~~~

Open [http://localhost:4321](http://localhost:4321). Saved Markdown changes should appear automatically.

## Quick reference

| Task | Path |
| --- | --- |
| Create an account | Home → Sign up → Enter details → Create account |
| Log in | Home → Log in → Enter email and password → Log in |
| Update a profile | Dashboard → Account menu → Edit profile → Save changes |
| Find a job | Dashboard → Find jobs → Select a job |
| Check an application | Dashboard → Requests Sent |
| Post a job | Dashboard → Post a job → Enter details → Post job |
| Find workers | Dashboard → Find talent → Select a profile |
| Start a project | Talent profile → Start a project → Enter details → Create project |
| Open projects | Dashboard → Current Projects |
| Read messages | Dashboard → Messages → Select a conversation |
| Log out | Dashboard → Account menu → Log out |