"use server";

import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { createSession, deleteSession } from "@/lib/auth";

type SignupResult =
  | { success: true }
  | { success: false; error: string };

export async function signup(
  name: string,
  email: string,
  password: string
): Promise<SignupResult> {
  const cleanName = name.trim();
  const cleanEmail = email.trim().toLowerCase();

  if (cleanName.length < 2) {
    return {
      success: false,
      error: "Name must be at least 2 characters.",
    };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
    return {
      success: false,
      error: "Enter a valid email address.",
    };
  }

  if (password.length < 8) {
    return {
      success: false,
      error: "Password must be at least 8 characters.",
    };
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email: cleanEmail,
    },
  });

  if (existingUser) {
    return {
      success: false,
      error: "An account with that email already exists.",
    };
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      name: cleanName,
      email: cleanEmail,
      passwordHash,
    },
  });

  await createSession(user.id);

  return {
    success: true,
  };
}

type LoginResult =
  | { success: true; isAdmin: boolean }
  | { success: false; error: string };

export async function login(
  email: string,
  password: string
): Promise<LoginResult> {
  const cleanEmail = email.trim().toLowerCase();

  if (!cleanEmail || !password) {
    return {
      success: false,
      error: "Enter your email and password.",
    };
  }

  const user = await prisma.user.findUnique({
    where: {
      email: cleanEmail,
    },
  });

  if (!user) {
    return {
      success: false,
      error: "Invalid email or password.",
    };
  }

  if (!user.isActive) {
    return {
      success: false,
      error: "This account is inactive.",
    };
  }

  const passwordMatches = await bcrypt.compare(
    password,
    user.passwordHash
  );

  if (!passwordMatches) {
    return {
      success: false,
      error: "Invalid email or password.",
    };
  }

  await createSession(user.id);

  return {
    success: true,
    isAdmin: user.isAdmin,
  };
}

export async function logout() {
  await deleteSession();
}