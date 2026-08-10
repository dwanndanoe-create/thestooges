import Link from "next/link";
import { ArrowLeft, CheckCircle2, Clock3, Users } from "lucide-react";
import { notFound, redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { ProjectInvitationActions } from "@/components/projects/ProjectInvitationActions";

interface ProjectPageProps {
  params: Promise<{
    projectId: string;
  }>;
}

export default async function ProjectPage({
  params,
}: ProjectPageProps) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const { projectId } = await params;

  const project = await prisma.project.findUnique({
    where: {
      id: projectId,
    },
    include: {
      creator: {
        select: {
          id: true,
          name: true,
        },
      },
      members: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              location: true,
            },
          },
        },
      },
    },
  });

  if (!project) {
    notFound();
  }

  const isCreator = project.creatorId === user.id;

  const currentMember = project.members.find(
    (member) => member.userId === user.id
  );
  const isAcceptedMember =
    !isCreator && currentMember?.status === "ACCEPTED";

  const isDeclinedMember =
    !isCreator && currentMember?.status === "DECLINED";

  const pendingInvitation =
    !isCreator && currentMember?.status === "PENDING";

  const initials = project.creator.name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        {/* Back */}
        <Link
          href="/talent"
          className="
            inline-flex
            items-center
            gap-2
            text-sm
            text-ink-muted
            transition
            hover:text-emerald-700
          "
        >
          <ArrowLeft size={15} />
          Back to talent
        </Link>

        {/* Project header */}
        <section
          className="
            mt-8
            overflow-hidden
            rounded-3xl
            border
            border-line
            bg-white
            shadow-sm
          "
        >
          <div className="h-2 bg-emerald-700" />

          <div className="p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="
                  rounded-full
                  bg-emerald-50
                  px-2.5
                  py-1
                  text-xs
                  font-medium
                  text-emerald-800
                "
              >
                {project.type === "COLLABORATION"
                  ? "Collaboration"
                  : "Mentorship"}
              </span>

              <span
                className="
                  rounded-full
                  bg-bg-sunken
                  px-2.5
                  py-1
                  text-xs
                  font-medium
                  text-ink-muted
                "
              >
                {project.status}
              </span>
            </div>

            <h1
              className="
                mt-4
                font-display
                text-3xl
                tracking-[-0.025em]
                text-ink
                sm:text-4xl
              "
            >
              {project.title}
            </h1>

            <p
              className="
                mt-4
                max-w-2xl
                whitespace-pre-wrap
                text-base
                leading-relaxed
                text-ink-muted
              "
            >
              {project.description}
            </p>
          </div>
        </section>

        {/* Invitation status */}
        {pendingInvitation && (
          <section
            className="
              mt-6
              rounded-2xl
              border
              border-emerald-200
              bg-emerald-50
              p-6
            "
          >
            <div className="flex items-start gap-4">
              <div
                className="
                  grid
                  h-11
                  w-11
                  shrink-0
                  place-items-center
                  rounded-xl
                  bg-white
                  text-emerald-700
                  shadow-sm
                "
              >
                <Clock3 size={20} />
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
                  Project invitation
                </p>

                <h2
                  className="
                    mt-1
                    font-display
                    text-xl
                    text-ink
                  "
                >
                  You&apos;ve been invited to collaborate
                </h2>

                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {project.creator.name} invited you to join this
                  project. Review the project details before deciding
                  whether you want to participate.
                </p>

                <ProjectInvitationActions projectId={project.id} />
              </div>
            </div>
          </section>
        )}

          {isAcceptedMember && (
            <section
              className="
                mt-6
                rounded-2xl
                border
                border-emerald-200
                bg-emerald-50
                p-6
              "
            >
              <div className="flex items-start gap-4">
                <div
                  className="
                    grid
                    h-11
                    w-11
                    shrink-0
                    place-items-center
                    rounded-xl
                    bg-white
                    text-emerald-700
                    shadow-sm
                  "
                >
                  <CheckCircle2 size={20} />
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
                    Project member
                  </p>

                  <h2
                    className="
                      mt-1
                      font-display
                      text-xl
                      text-ink
                    "
                  >
                    You&apos;re part of this project
                  </h2>

                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    You accepted the invitation and are now a member
                    of this project.
                  </p>
                </div>
              </div>
            </section>
          )}

        {/* Creator status */}
        {isCreator && (
          <section
            className="
              mt-6
              rounded-2xl
              border
              border-line
              bg-bg-raised
              p-6
            "
          >
            <div className="flex items-start gap-4">
              <div
                className="
                  grid
                  h-11
                  w-11
                  shrink-0
                  place-items-center
                  rounded-xl
                  bg-emerald-50
                  text-emerald-700
                "
              >
                <CheckCircle2 size={20} />
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
                  Project created
                </p>

                <h2
                  className="
                    mt-1
                    font-display
                    text-xl
                    text-ink
                  "
                >
                  Your project is ready
                </h2>

                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  The invited talent has been added as a pending
                  member. They&apos;ll need to accept the invitation
                  before becoming an active project member.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Creator */}
        <section className="mt-8">
          <div className="mb-4 flex items-center gap-3">
            <div
              className="
                grid
                h-9
                w-9
                place-items-center
                rounded-xl
                bg-emerald-50
                text-emerald-700
              "
            >
              <Users size={16} />
            </div>

            <div>
              <p
                className="
                  font-mono
                  text-[11px]
                  uppercase
                  tracking-[0.12em]
                  text-emerald-700
                "
              >
                Project owner
              </p>

              <h2 className="font-display text-xl text-ink">
                People
              </h2>
            </div>
          </div>

          <div
            className="
              rounded-2xl
              border
              border-line
              bg-white
              p-5
            "
          >
            <div className="flex items-center gap-4">
              <div
                className="
                  grid
                  h-12
                  w-12
                  shrink-0
                  place-items-center
                  rounded-xl
                  bg-emerald-50
                  font-display
                  font-semibold
                  text-emerald-800
                "
              >
                {initials}
              </div>

              <div>
                <p className="font-medium text-ink">
                  {project.creator.name}
                </p>

                <p className="text-sm text-ink-muted">
                  Creator
                </p>
              </div>
            </div>

            {/* Members */}
            {project.members.length > 0 && (
              <div className="mt-5 border-t border-line pt-5">
                <p className="text-xs font-medium uppercase tracking-wide text-ink-faint">
                  Project members
                </p>

                <div className="mt-3 space-y-3">
                  {project.members.map((member) => (
                    <div
                      key={member.id}
                      className="
                        flex
                        items-center
                        justify-between
                        gap-4
                        rounded-xl
                        bg-bg-sunken
                        px-4
                        py-3
                      "
                    >
                      <div>
                        <p className="text-sm font-medium text-ink">
                          {member.user.name}
                        </p>

                        {member.user.location && (
                          <p className="text-xs text-ink-muted">
                            {member.user.location}
                          </p>
                        )}
                      </div>

                      <span
                        className={`
                          shrink-0
                          rounded-full
                          px-2.5
                          py-1
                          text-[11px]
                          font-medium
                          ${
                            member.status === "PENDING"
                              ? "bg-amber-50 text-amber-700"
                              : member.status === "ACCEPTED"
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-red-50 text-red-700"
                          }
                        `}
                      >
                        {member.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}