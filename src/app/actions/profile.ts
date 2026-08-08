"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

type UpdateProfileResult =
  | { success: true }
  | { success: false; error: string };

export async function updateProfile(
  name: string,
  location: string,
  bio: string,
  skills: string[]
): Promise<UpdateProfileResult> {
  const user = await getCurrentUser();

  if (!user) {
    return {
      success: false,
      error: "You must be logged in.",
    };
  }

  const cleanName = name.trim();
  const cleanLocation = location.trim();
  const cleanBio = bio.trim();

  const cleanSkills = skills
    .map((skill) => skill.trim())
    .filter(Boolean)
    .filter(
      (skill, index, array) =>
        array.findIndex(
          (item) => item.toLowerCase() === skill.toLowerCase()
        ) === index
    );

  if (cleanName.length < 2) {
    return {
      success: false,
      error: "Name must be at least 2 characters.",
    };
  }

  if (cleanBio.length > 500) {
    return {
      success: false,
      error: "Bio must be 500 characters or less.",
    };
  }

  if (cleanSkills.length > 10) {
    return {
      success: false,
      error: "You can add up to 10 skills.",
    };
  }

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      name: cleanName,
      location: cleanLocation || null,
      bio: cleanBio || null,
      skills: cleanSkills,
    },
  });

  return {
    success: true,
  };
}