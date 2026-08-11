import Link from "next/link";
import { MessageCircle } from "lucide-react";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { MarketplaceHeader } from "@/components/layout/MarketplaceHeader";

export default async function MessagesPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const conversations = await prisma.conversation.findMany({
    where: {
      OR: [
        { starterId: user.id },
        { receiverId: user.id },
      ],
    },
    orderBy: {
      updatedAt: "desc",
    },
    include: {
      starter: {
        select: {
          id: true,
          name: true,
        },
      },
      receiver: {
        select: {
          id: true,
          name: true,
        },
      },
      messages: {
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
        select: {
          content: true,
          createdAt: true,
          senderId: true,
          readAt: true,
        },
      },
    },
  });

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
      {/* Branded navigation only */}
      <MarketplaceHeader />

      {/* Messages heading */}
      <div className="mt-14 max-w-3xl">
        <p
          className="
            font-mono
            text-xs
            uppercase
            tracking-[0.12em]
            text-emerald-700
          "
        >
          Inbox
        </p>

        <h1
          className="
            font-display
            text-4xl
            sm:text-5xl
            tracking-[-0.03em]
            text-ink
            mt-3
          "
        >
          Messages
        </h1>

        <p className="text-ink-muted mt-3 max-w-2xl">
          Keep conversations with clients and freelancers in one place.
        </p>
      </div>

      {/* Conversations */}
      <section className="mt-10">
        {conversations.length > 0 ? (
          <div className="rounded-2xl border border-line bg-white overflow-hidden">
            {conversations.map((conversation) => {
              const otherPerson =
                conversation.starterId === user.id
                  ? conversation.receiver
                  : conversation.starter;

              const lastMessage = conversation.messages[0];

              const hasUnread =
                lastMessage &&
                lastMessage.senderId !== user.id &&
                !lastMessage.readAt;

              return (
                <Link
                  key={conversation.id}
                  href={`/messages/${conversation.id}`}
                  className="
                    flex
                    items-center
                    gap-4
                    px-5
                    py-4
                    border-b
                    border-line
                    last:border-b-0
                    hover:bg-bg-sunken
                    transition
                  "
                >
                  {/* Avatar */}
                  <div
                    className="
                      h-11
                      w-11
                      shrink-0
                      rounded-xl
                      bg-emerald-100
                      text-emerald-800
                      font-semibold
                      text-sm
                      grid
                      place-items-center
                    "
                  >
                    {otherPerson.name
                      .split(" ")
                      .map((part) => part[0])
                      .slice(0, 2)
                      .join("")
                      .toUpperCase()}
                  </div>

                  {/* Conversation preview */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-4">
                      <h2 className="font-medium text-ink truncate">
                        {otherPerson.name}
                      </h2>

                      {lastMessage && (
                        <span className="text-xs text-ink-faint shrink-0">
                          {new Date(
                            lastMessage.createdAt
                          ).toLocaleDateString()}
                        </span>
                      )}
                    </div>

                    <p
                      className={`text-sm truncate mt-1 ${
                        hasUnread
                          ? "text-ink font-medium"
                          : "text-ink-muted"
                      }`}
                    >
                      {lastMessage
                        ? lastMessage.content
                        : "No messages yet."}
                    </p>
                  </div>

                  {/* Unread indicator */}
                  {hasUnread && (
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-600 shrink-0" />
                  )}
                </Link>
              );
            })}
          </div>
        ) : (
          <div
            className="
              rounded-2xl
              border
              border-line
              bg-bg-raised
              px-6
              py-16
              text-center
            "
          >
            <MessageCircle
              size={32}
              className="mx-auto text-emerald-700"
            />

            <h2
              className="
                font-display
                text-2xl
                text-ink
                mt-4
              "
            >
              No conversations yet
            </h2>

            <p
              className="
                text-sm
                text-ink-muted
                mt-2
                max-w-md
                mx-auto
              "
            >
              When you contact a client or freelancer, your conversation
              will appear here.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}