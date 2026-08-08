"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function createJob(
  title: string,
  description: string,
  budget: string,
  location: string,
  skills: string[]
) {
  const user = await getCurrentUser();

  if (!user) {
    return {
      success: false,
      error: "You must be logged in to post a job.",
    };
  }

  const cleanTitle = title.trim();
  const cleanDescription = description.trim();
  const cleanLocation = location.trim();
  const cleanSkills = skills
    .map((skill) => skill.trim())
    .filter(Boolean);

  const parsedBudget = Number(budget);

  if (!cleanTitle) {
    return {
      success: false,
      error: "Please enter a job title.",
    };
  }

  if (cleanTitle.length < 5) {
    return {
      success: false,
      error: "Job title must be at least 5 characters.",
    };
  }

  if (!cleanDescription) {
    return {
      success: false,
      error: "Please describe the job.",
    };
  }

  if (cleanDescription.length < 20) {
    return {
      success: false,
      error: "Description must be at least 20 characters.",
    };
  }

  if (!Number.isFinite(parsedBudget) || parsedBudget <= 0) {
    return {
      success: false,
      error: "Please enter a valid budget.",
    };
  }

  if (cleanSkills.length > 10) {
    return {
      success: false,
      error: "You can add up to 10 skills.",
    };
  }

  try {
    await prisma.job.create({
      data: {
        title: cleanTitle,
        description: cleanDescription,
        budget: Math.round(parsedBudget),
        location: cleanLocation || null,
        skills: cleanSkills,
        creatorId: user.id,
      },
    });
  } catch (error) {
    console.error("Failed to create job:", error);

    return {
      success: false,
      error: "Something went wrong while posting the job.",
    };
  }

  redirect("/jobs");
}