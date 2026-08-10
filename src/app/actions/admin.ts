"use server";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";
import { revalidatePath } from "next/cache";

export async function toggleUserStatus(formData: FormData) {
  const admin = await requireAdmin();

  const userId = formData.get("userId");

  if (typeof userId !== "string") {
    return;
  }

  if (userId === admin.id) {
    return;
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      isActive: true,
    },
  });

  if (!user) {
    return;
  }

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      isActive: !user.isActive,
    },
  });

  revalidatePath("/admin/users");
  revalidatePath("/admin");
}

export async function toggleAdminStatus(formData: FormData) {
  const admin = await requireAdmin();

  const userId = formData.get("userId");

  if (typeof userId !== "string") {
    return;
  }

  if (userId === admin.id) {
    return;
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      isAdmin: true,
    },
  });

  if (!user) {
    return;
  }

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      isAdmin: !user.isAdmin,
    },
  });

  revalidatePath("/admin/users");
  revalidatePath("/admin");
}