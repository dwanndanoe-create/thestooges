---
title: Authentication
description: Registration, login, session security, route protection, and current authentication limitations.
---

Microjobs.sr uses custom email-and-password authentication with database-backed sessions. It does not use NextAuth or an external identity provider.

## Registration flow

The registration form is located at **/signup**.

1. The user enters a full name, email address, and password.
2. The client checks the basic form format.
3. The **signup()** server action trims the name, normalizes the email to lowercase, and validates all values again.
4. The password is hashed with bcrypt using 12 salt rounds.
5. A new User record is created.
6. A 30-day Session record and browser cookie are created.
7. The user is sent directly to **/dashboard**.

### Registration rules

| Field | Rule |
| --- | --- |
| Name | At least 2 characters after trimming |
| Email | Must match a valid email format and be unique |
| Password | At least 8 characters |

There is currently no password-confirmation field and no email-verification step.

## Login flow

The login form is located at **/login**.

1. The email is trimmed and converted to lowercase.
2. The user is loaded by unique email address.
3. Inactive users are denied access.
4. bcrypt compares the entered password with the stored password hash.
5. A new 30-day session is created.
6. Administrators are sent to **/admin** and normal users to **/dashboard**.

The same error message is used for an unknown email and an incorrect password so the form does not reveal whether an account exists.

## Session implementation

The session code is in **web/src/lib/auth.ts**.

Each login or registration creates:

- A cryptographically random 32-byte token encoded as hexadecimal.
- A Session database record connected to the User.
- A **session_token** HTTP-only cookie.
- An expiration time 30 days in the future.

The cookie settings are:

| Setting | Value |
| --- | --- |
| httpOnly | true |
| secure | true in production |
| sameSite | lax |
| path | / |
| expires | 30 days after creation |

Because the token is HTTP-only, normal browser JavaScript cannot read it.

## Reading the current user

The **getCurrentUser()** helper:

1. Reads the **session_token** cookie.
2. Loads the matching Session and related User.
3. Returns no user when the token is missing or unknown.
4. Deletes and rejects an expired session.
5. Returns the authenticated User when the session is valid.

## Route protection

| Area | Protection |
| --- | --- |
| Dashboard, profile, job creation, listings, requests, projects, and messages | Redirect to /login when no valid user session exists |
| Admin pages | requireAdmin() redirects unauthenticated users to /login and non-admin users to /dashboard |
| Conversation details | Database query requires the user to be the conversation starter or receiver |
| Project details | Login is required, but creator/member authorization still needs to be added |

Server actions repeat authentication checks. Hiding a button in the browser is not treated as sufficient protection.

## Inactive accounts

An administrator can deactivate a user. The login action blocks an inactive account with the message **This account is inactive.**

An existing session for a user who is deactivated is not currently rejected by **getCurrentUser()**, because that helper does not check **user.isActive** after loading the session. If immediate lockout is required, add an active-user check and delete existing sessions when the account is deactivated.

## Log out

The **logout()** server action:

1. Finds the current token in the cookie.
2. Deletes matching Session records.
3. Deletes the browser cookie.

## Administrator authentication

Administrator access is controlled by the User field **isAdmin**. Knowing an admin URL is not enough; every admin page calls **requireAdmin()** on the server.

The first administrator must be assigned directly in the database. After that, an existing administrator can grant or remove administrator access from **Admin → Users**.

## Language preference

The language setting uses a separate **microjobs_language** cookie. It does not contain authentication data and does not affect the user session.

## Current limitations

- **Continue with Google** is not connected to Google authentication.
- **Forgot password?** does not open a recovery flow.
- **Remember me** does not change the 30-day session duration.
- There is no email verification, multi-factor authentication, or password-change page.
- Terms of Service and Privacy Policy links are placeholders.

Do not document or present these controls as working until their server-side flows have been implemented and tested.

## Relevant files

| File | Purpose |
| --- | --- |
| web/src/app/actions/auth.ts | Registration, login, and logout server actions |
| web/src/lib/auth.ts | Session creation, lookup, expiration, and deletion |
| web/src/lib/admin.ts | Administrator route guard |
| web/src/app/signup/page.tsx | Registration form |
| web/src/app/login/page.tsx | Login form |
| web/prisma/schema.prisma | User and Session database models |