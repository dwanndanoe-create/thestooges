import { cookies } from "next/headers";
import { randomBytes } from "crypto";
import { prisma } from "@/lib/prisma";

const SESSION_DURATION = 1000 * 60 * 60 * 24 * 30; // 30 days

export async function createSession(userId: string) {
  const token = randomBytes(32).toString("hex");

  const expiresAt = new Date(Date.now() + SESSION_DURATION);

  await prisma.session.create({
    data: {
      token,
      userId,
      expiresAt,
    },
  });

  const cookieStore = await cookies();

  cookieStore.set("session_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
    path: "/",
  });
}

export async function getCurrentUser() {
  const cookieStore = await cookies();

  const token = cookieStore.get("session_token")?.value;

  if (!token) {
    return null;
  }

  const session = await prisma.session.findUnique({
    where: {
      token,
    },
    include: {
      user: true,
    },
  });

  if (!session) {
    return null;
  }

  if (session.expiresAt < new Date()) {
    await prisma.session.delete({
      where: {
        id: session.id,
      },
    });

    return null;
  }

  return session.user;
}

export async function deleteSession() {
  const cookieStore = await cookies();

  const token = cookieStore.get("session_token")?.value;

  if (token) {
    await prisma.session.deleteMany({
      where: {
        token,
      },
    });
  }

  cookieStore.delete("session_token");
}