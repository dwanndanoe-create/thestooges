---
title: Messaging
description: Start conversations, send direct messages, and understand unread-message behavior.
---

Microjobs.sr provides direct one-to-one conversations between users. Messages are stored in PostgreSQL and are visible only to the two conversation participants.

## Start a conversation

1. Open **Talent**.
2. Search for and open an active person's profile.
3. Select **Message**.
4. If a conversation already exists, the website opens it.
5. Otherwise, the website creates a new conversation and opens it.

You must be logged in before a conversation can be created.

The server prevents:

- Messaging yourself.
- Messaging an inactive or missing user.
- Creating separate duplicate conversations between the same two people.

## View the inbox

Open **Dashboard → Messages** or select **View all messages** from the message panel.

Each inbox row shows:

- The other person's name and initials.
- The newest message preview available for that conversation.
- The message date.
- An unread dot when the latest message came from the other person and has not been read.

Selecting a row opens the full conversation.

## Send a message

1. Open a conversation.
2. Type in the **Write a message...** box.
3. Select the send button.

Empty or whitespace-only messages are rejected. Sent messages display on the right, and received messages display on the left.

The server verifies that the sender is one of the two conversation participants before saving a message.

## Read state

Each Message has an optional **readAt** date.

When a user opens a conversation, the server marks every unread message from the other participant with the current date and time. The inbox uses that field to decide whether to show the unread dot.

The interface does not currently show read receipts inside the conversation.

## Conversation security

The conversation detail query requires both:

- The requested conversation identifier.
- The current user to be either the conversation starter or receiver.

If the user is not a participant, the page returns not found. The send action repeats this participant check before writing a message.

## Current limitations

- Messages support text only; there are no file attachments.
- Messages cannot be edited, deleted, searched, or reported.
- There is no group conversation support.
- The Dashboard's small message badge is hard-coded to **0** and its dropdown always displays **No messages yet**. Use the full Messages page for real conversation data.
- There are no email or push notifications for new messages.
- The inbox orders conversations by the Conversation record's **updatedAt** value. Sending a Message does not currently update that parent Conversation record, so the newest active conversation may not move to the top.

## Relevant files

| File | Purpose |
| --- | --- |
| web/src/app/messages/page.tsx | Conversation inbox and unread indicator |
| web/src/app/messages/[conversationId]/page.tsx | Protected conversation details and read updates |
| web/src/components/messages/MessageButton.tsx | Starts or reuses a conversation |
| web/src/components/messages/MessageComposer.tsx | Message entry and submit control |
| web/src/app/actions/messages.ts | Conversation creation and message sending |
| web/prisma/schema.prisma | Conversation and Message models |