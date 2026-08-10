"use server";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";
import { revalidatePath } from "next/cache";

export async function toggleJobStatus(formData: FormData) {
  await requireAdmin();

  const jobId = formData.get("jobId");

  if (typeof jobId !== "string") {
    return;
  }

  const job = await prisma.job.findUnique({
    where: {
      id: jobId,
    },
    select: {
      status: true,
    },
  });

  if (!job) {
    return;
  }

  await prisma.job.update({
    where: {
      id: jobId,
    },
    data: {
      status: job.status === "OPEN" ? "CLOSED" : "OPEN",
    },
  });

  revalidatePath("/admin/jobs");
  revalidatePath("/jobs");
  revalidatePath("/dashboard");
}