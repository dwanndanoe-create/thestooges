"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

type CreateProjectResult =
  | {
      success: true;
      projectId: string;
    }
  | {
      success: false;
      error: string;
    };

type InvitationResult =
  | {
      success: true;
    }
  | {
      success: false;
      error: string;
    };

export async function createProject(
  title: string,
  description: string,
  type: "COLLABORATION" | "MENTORSHIP",
  talentId: string
): Promise<CreateProjectResult> {
  const user = await getCurrentUser();

  if (!user) {
    return {
      success: false,
      error: "You must be logged in to create a project.",
    };
  }

  if (user.id === talentId) {
    return {
      success: false,
      error: "You cannot create a project with yourself.",
    };
  }

  const cleanTitle = title.trim();
  const cleanDescription = description.trim();

  if (!cleanTitle) {
    return {
      success: false,
      error: "Please enter a project title.",
    };
  }

  if (cleanTitle.length < 5) {
    return {
      success: false,
      error: "Project title must be at least 5 characters.",
    };
  }

  if (!cleanDescription) {
    return {
      success: false,
      error: "Please describe the project.",
    };
  }

  if (cleanDescription.length < 20) {
    return {
      success: false,
      error: "Project description must be at least 20 characters.",
    };
  }

  if (!["COLLABORATION", "MENTORSHIP"].includes(type)) {
    return {
      success: false,
      error: "Invalid project type.",
    };
  }

  const talent = await prisma.user.findUnique({
    where: {
      id: talentId,
    },
    select: {
      id: true,
      isActive: true,
    },
  });

  if (!talent || !talent.isActive) {
    return {
      success: false,
      error: "This talent is no longer available.",
    };
  }

  try {
    const project = await prisma.project.create({
      data: {
        title: cleanTitle,
        description: cleanDescription,
        type,
        creatorId: user.id,

        members: {
          create: {
            userId: talentId,
            role: "MEMBER",
            status: "PENDING",
          },
        },
      },
      select: {
        id: true,
      },
    });

    return {
      success: true,
      projectId: project.id,
    };
  } catch (error) {
    console.error("Failed to create project:", error);

    return {
      success: false,
      error: "Something went wrong while creating the project.",
    };
  }
}

export async function acceptProjectInvitation(projectId: string):
  Promise<InvitationResult> {
  const user = await getCurrentUser();

  if (!user) {
    return {
      success: false,
      error: "You must be logged in.",
    };
  }

  const membership = await prisma.projectMember.findUnique({
    where: {
      projectId_userId: {
        projectId,
        userId: user.id,
      },
    },
  });

  if (!membership || membership.status !== "PENDING") {
    return {
      success: false,
      error: "This invitation is no longer available.",
    };
  }

  await prisma.projectMember.update({
    where: {
      id: membership.id,
    },
    data: {
      status: "ACCEPTED",
    },
  });

  return {
    success: true,
  };
}

export async function declineProjectInvitation(projectId: string
): Promise<InvitationResult> {
  const user = await getCurrentUser();

  if (!user) {
    return {
      success: false,
      error: "You must be logged in.",
    };
  }

  const membership = await prisma.projectMember.findUnique({
    where: {
      projectId_userId: {
        projectId,
        userId: user.id,
      },
    },
  });

  if (!membership || membership.status !== "PENDING") {
    return {
      success: false,
      error: "This invitation is no longer available.",
    };
  }

  await prisma.projectMember.update({
    where: {
      id: membership.id,
    },
    data: {
      status: "DECLINED",
    },
  });

  return {
    success: true,
  };
}