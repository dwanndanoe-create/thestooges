import Link from "next/link";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { redirect, notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { MarketplaceHeader } from "@/components/layout/MarketplaceHeader";
import { MessageComposer } from "@/components/messages/MessageComposer";

interface ConversationPageProps {
  params: Promise<{
    conversationId: string;
  }>;
}

export default async function ConversationPage({
  params,
}: ConversationPageProps) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const { conversationId } = await params;

  const conversation = await prisma.conversation.findFirst({
    where: {
      id: conversationId,
      OR: [
        { starterId: user.id },
        { receiverId: user.id },
      ],
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
          createdAt: "asc",
        },
        select: {
          id: true,
          content: true,
          senderId: true,
          createdAt: true,
        },
      },
    },
  });

  if (!conversation) {
    notFound();
  }

  const otherPerson =
    conversation.starterId === user.id
      ? conversation.receiver
      : conversation.starter;

  // Mark messages from the other person as read.
  await prisma.message.updateMany({
    where: {
      conversationId: conversation.id,
      senderId: {
        not: user.id,
      },
      readAt: null,
    },
    data: {
      readAt: new Date(),
    },
  });

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
      <MarketplaceHeader />

      {/* Conversation header */}
      <div className="mt-10">
        <Link
          href="/messages"
          className="
            inline-flex
            items-center
            gap-2
            text-sm
            text-ink-muted
            hover:text-emerald-700
            transition
          "
        >
          <ArrowLeft size={15} />
          Back to messages
        </Link>

        <div className="flex items-center gap-4 mt-6">
          <div
            className="
              h-12
              w-12
              rounded-xl
              bg-emerald-100
              text-emerald-800
              font-semibold
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

          <div>
            <p
              className="
                font-mono
                text-xs
                uppercase
                tracking-[0.12em]
                text-emerald-700
              "
            >
              Conversation
            </p>

            <h1
              className="
                font-display
                text-3xl
                sm:text-4xl
                tracking-[-0.025em]
                text-ink
                mt-1
              "
            >
              {otherPerson.name}
            </h1>
          </div>
        </div>
      </div>

      {/* Messages */}
      <section
        className="
          mt-8
          rounded-2xl
          border
          border-line
          bg-white
          overflow-hidden
        "
      >
        <div
          className="
            min-h-[420px]
            max-h-[600px]
            overflow-y-auto
            p-5
            sm:p-6
          "
        >
          {conversation.messages.length > 0 ? (
            <div className="flex flex-col gap-3">
              {conversation.messages.map((message) => {
                const isMine = message.senderId === user.id;

                return (
                  <div
                    key={message.id}
                    className={`flex ${
                      isMine
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`
                        max-w-[80%]
                        sm:max-w-[65%]
                        rounded-2xl
                        px-4
                        py-3
                        ${
                          isMine
                            ? "bg-emerald-800 text-white rounded-br-md"
                            : "bg-bg-sunken text-ink rounded-bl-md"
                        }
                      `}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">
                        {message.content}
                      </p>

                      <p
                        className={`
                          text-[11px]
                          mt-1.5
                          ${
                            isMine
                              ? "text-emerald-100"
                              : "text-ink-faint"
                          }
                        `}
                      >
                        {new Date(
                          message.createdAt
                        ).toLocaleString()}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="min-h-[380px] grid place-items-center text-center">
              <div>
                <MessageCircle
                  size={32}
                  className="mx-auto text-emerald-700"
                />

                <h2 className="font-display text-xl text-ink mt-4">
                  Start the conversation
                </h2>

                <p className="text-sm text-ink-muted mt-2 max-w-sm">
                  Send a message to {otherPerson.name} to get things
                  moving.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Composer */}
        <div className="border-t border-line p-4 sm:p-5">
          <MessageComposer
            conversationId={conversation.id}
          />
        </div>
      </section>
    </main>
  );
}