"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function getOrCreateConversation(otherUserId: string) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return {
      success: false,
      error: "You must be logged in.",
    };
  }

  if (currentUser.id === otherUserId) {
    return {
      success: false,
      error: "You cannot message yourself.",
    };
  }

  const otherUser = await prisma.user.findUnique({
    where: {
      id: otherUserId,
    },
    select: {
      id: true,
      isActive: true,
    },
  });

  if (!otherUser || !otherUser.isActive) {
    return {
      success: false,
      error: "This user is not available.",
    };
  }

  const existingConversation =
    await prisma.conversation.findFirst({
      where: {
        OR: [
          {
            starterId: currentUser.id,
            receiverId: otherUserId,
          },
          {
            starterId: otherUserId,
            receiverId: currentUser.id,
          },
        ],
      },
      select: {
        id: true,
      },
    });

  if (existingConversation) {
    return {
      success: true,
      conversationId: existingConversation.id,
    };
  }

  const conversation = await prisma.conversation.create({
    data: {
      starterId: currentUser.id,
      receiverId: otherUserId,
    },
    select: {
      id: true,
    },
  });

  return {
    success: true,
    conversationId: conversation.id,
  };
}

export async function sendMessage(
  conversationId: string,
  content: string
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return {
      success: false,
      message: "You must be logged in.",
    };
  }

  const trimmed = content.trim();

  if (!trimmed) {
    return {
      success: false,
      message: "Message cannot be empty.",
    };
  }

  const conversation = await prisma.conversation.findFirst({
    where: {
      id: conversationId,
      OR: [
        { starterId: currentUser.id },
        { receiverId: currentUser.id },
      ],
    },
    select: {
      id: true,
    },
  });

  if (!conversation) {
    return {
      success: false,
      message: "Conversation not found.",
    };
  }

  await prisma.message.create({
    data: {
      content: trimmed,
      conversationId: conversation.id,
      senderId: currentUser.id,
    },
  });

  return {
    success: true,
    message: "Message sent.",
  };
}